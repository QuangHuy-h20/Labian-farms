import { Arg, Ctx, FieldResolver, ID, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Farm } from "../../entities/Farm";
import { User } from "../../entities/User";
import { FarmMutationResponse } from "./farm.mutation";
import { CreateFarmInput, UpdateFarmInput } from "./farm.input";
import { Context } from "../../types/Context";
import { checkRole } from "../../middleware/checkRole";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { toSlug } from "../../utils/common";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { deleteFile, singleUpload, multipleUploads } from "../../utils/s3";
import { Product } from "../../entities/Product";
import { PaginatedFarms } from "../../types/Paginated";
import { LessThan } from "typeorm";

@Resolver(_of => Farm)
export class FarmResolver {

  //----------------------- Field resolver -----------------------
  @FieldResolver(_return => User)
  async owner(@Root() root: Farm, @Ctx() { dataLoaders: { userLoader } }: Context) {
    return await userLoader.load(root.ownerId)
  }

  @FieldResolver((_return) => Number, { nullable: true })
  async count(@Root() root: Farm, @Ctx() { dataLoaders: { productLoader } }: Context) {
    try {
      return (await productLoader.loadMany(root.productFarmIds)).length
    } catch (error) {
      return 0;
    }
  }

  @FieldResolver(_return => [Product], { nullable: true })
  async products(@Root() root: Farm, @Ctx() { dataLoaders: { productLoader } }: Context) {
    try {
      return await productLoader.loadMany(root.productFarmIds)
    } catch (error) {
      return null
    }
  }

  //----------------------- Query -----------------------

  @Query(_return => Farm, { description: "Get all farms by farmer", nullable: true })
  async farmByFarmer(@Arg("ownerId", _type => ID) ownerId: number): Promise<Farm | null> {
    try {
      return await Farm.findOneOrFail({ ownerId })
    } catch (error) {
      return null
    }
  }

  @Query(_return => [Farm], { nullable: true, description: "query all farms" })
  async allFarms(): Promise<Farm[] | null> {
    try {
      return await Farm.find();
    } catch (error) {
      return null;
    }
  }


  @Query((_return) => PaginatedFarms, {
    nullable: true,
    description: "Get all farms",
  })
  async farms(
    @Arg("limit", (_type) => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor?: string,
  ): Promise<PaginatedFarms | null> {
    try {
      const totalCount = await Farm.count();
      const realLimit = Math.min(10, limit);

      const findOptions: { [key: string]: any } = {
        order: {
          createdAt: "DESC",
        },
        take: realLimit,
      };

      let lastFarm: Farm[] = [];

      if (cursor) {
        findOptions.where = {
          createdAt: LessThan(cursor),
        };

        lastFarm = await Farm.find({
          order: {
            createdAt: "ASC",
          },
          take: 1,
        });
      }
      const farms = await Farm.find(findOptions);

      return {
        totalCount,
        cursor: farms[farms.length - 1].createdAt,
        hasMore: cursor
          ? farms[farms.length - 1].createdAt.toString() !==
          lastFarm[0].createdAt.toString()
          : farms.length !== totalCount,
        paginatedFarms: farms,
      };
    } catch {
      return null;
    }
  }

  @Query(_return => Farm, { nullable: true, description: "Get specific farm by id" })
  async farm(@Arg("slug", _type => String) slug: string): Promise<Farm | undefined> {
    try {
      return await Farm.findOne({ slug })
    } catch (error) {
      return undefined
    }
  }

  //----------------------- Mutation -----------------------

  @Mutation((_return) => FarmMutationResponse, { description: "Create new farm." })
  // @UseMiddleware(checkRole)
  async createFarm(
    @Arg("createFarmInput") createFarmInput: CreateFarmInput,
    @Ctx() { req }: Context,
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<FarmMutationResponse> {

    let list: string[] = []
    try {
      const { name } = createFarmInput;
      const existingFarmName = await Farm.findOne({ where: [{ name }] });

      const existingFarm = await Farm.findOne({ownerId: req.session.userId})
      

      if (existingFarm) return failureResponse(400, false, "Mỗi tài khoản chỉ được phép tạo 1 nông trại.")

      if(existingFarmName) return failureResponse(400, false, "Tên nông trại đã được sử dụng.")

      const slug = toSlug(name)
      const folder = `farms/${slug}`

      await multipleUploads(files, folder, slug).then(async value => {
        list = value as string[]
        const newFarm = Farm.create({
          ...createFarmInput,
          slug,
          logoImage: list[0] !== null ? list[0] : undefined,
          coverImage: list[1] !== null ? list[1] : undefined,
          ownerId: req.session.userId,
        });
        await newFarm.save();
      })

      return successResponse(200, true, "Nông trại đã được tạo thành công.")
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation((_return) => FarmMutationResponse, { description: "Update farm information." })
  @UseMiddleware(checkRole)
  async updateFarmInfo(@Arg('updateFarmInput') updateFarmInput: UpdateFarmInput, @Ctx() { req }: Context,
  ): Promise<FarmMutationResponse> {
    try {
      const { id, name, address, description } = updateFarmInput
      const existingFarm = await Farm.findOne(id)

      if (!existingFarm) return failureResponse(400, false, 'Không tìm thấy nông trại.')
      if (req.session.userId !== existingFarm.ownerId) return failureResponse(400, false, 'Không thể thực hiện thao tác này.')

      const slug = toSlug(name)

      existingFarm.name = name
      existingFarm.slug = slug
      existingFarm.address = address
      existingFarm.description = description
      existingFarm.save()

      return { code: 200, success: true, message: 'Thông tin nông trại đã được cập nhật thành công.', farm: existingFarm }
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation(() => Boolean, { description: "Update farm's logo image" })
  @UseMiddleware(checkRole)
  async updateLogoImage(@Ctx() { req }: Context, @Arg("id", (_type) => ID) id: number, @Arg("file", () => GraphQLUpload) file: FileUpload): Promise<boolean> {

    let logoImageUrl = ""
    try {
      const existingFarm = await Farm.findOne(id)
      if (!existingFarm) return false
      if (req.session.userId !== existingFarm.ownerId) return false

      const folder = `farms/${existingFarm.slug}`

      await singleUpload(file, folder).then(async value => {
        logoImageUrl = value as string
        const existingLogoImage = existingFarm.logoImage
        if (existingLogoImage) new Promise(_ => deleteFile(folder, existingLogoImage.split("/").pop() as string))

        existingFarm.logoImage = logoImageUrl
        existingFarm.save();
      })
      return true
    } catch (error) {
      return false
    }
  }

  @Mutation(() => Boolean, { description: "Update farm's cover image" })
  @UseMiddleware(checkRole)
  async updateCoverImage(
    @Ctx() { req }: Context,
    @Arg("id", (_type) => ID) id: number, @Arg("file", () => GraphQLUpload) file: FileUpload): Promise<boolean> {

    let coverImageUrl = ""
    try {
      const existingFarm = await Farm.findOne(id)
      if (!existingFarm) return false
      if (req.session.userId !== existingFarm.ownerId) return false

      const folder = `farms/${existingFarm.slug}`

      await singleUpload(file, folder).then(async value => {
        coverImageUrl = value as string
        const existingCoverImage = existingFarm.coverImage
        if (existingCoverImage) new Promise(_ => deleteFile(folder, existingCoverImage.split("/").pop() as string))

        existingFarm.coverImage = coverImageUrl
        existingFarm.save();
      })
      return true
    } catch (error) {
      return false
    }
  }

  @Mutation((_return) => Boolean, {
    description: "Delete product",
  })
  @UseMiddleware(checkRole)
  async deleteFarm(
    @Arg("id", (_type) => ID) id: number,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    try {
      const existingFarm = await Farm.findOne({ ownerId: req.session.userId });

      if (!existingFarm) return false


      const farmFolder = `farms/${existingFarm.slug}`;
      const productFolder = `products/${existingFarm.slug}`;

      await Farm.delete({ id });
      await Promise.all([() => deleteFile(farmFolder), () => deleteFile(productFolder)])

      return true
    } catch {
      return false
    }
  }
}






