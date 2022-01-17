import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Farm } from "../../entities/Farm";
import { User } from "../../entities/User";
import { FarmMutationResponse } from "./farm.mutation";
import { CreateFarmInput, UpdateFarmInput } from "./farm.input";
import { Context } from "../../types/Context";
import { checkRole } from "../../middleware/checkRole";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { toSlug } from "../../utils/toSlug";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { deleteFile, uploadMultipleFiles } from "../../utils/s3";

@Resolver(_of => Farm)
export class FarmResolver {

  //----------------------- Field resolver -----------------------
  @FieldResolver(_return => User)
  async owner(@Root() root: Farm, @Ctx() { dataLoaders: { userLoader } }: Context) {
    return await userLoader.load(root.ownerId)
  }

  //----------------------- Query -----------------------

  @Query(_return => [Farm], { description: "Get all farms by farmer", nullable: true })
  async farmsByFarmer(@Arg("ownerId") ownerId: number): Promise<Farm[] | null> {
    try {
      const farms = await Farm.find({ ownerId })
      return farms;
    } catch (error) {
      return null
    }
  }

  @Query(_return => [Farm], { description: "Get all farms", nullable: true })
  async farms(): Promise<Farm[] | null> {
    try {
      return await Farm.find()
    } catch (error) {
      return null
    }
  }

  //----------------------- Mutation -----------------------

  @Mutation((_return) => FarmMutationResponse, { description: "Create new farm." })
  @UseMiddleware(checkRole)
  async createFarm(
    @Arg("createFarmInput") createFarmInput: CreateFarmInput,
    @Ctx() { req }: Context,
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<FarmMutationResponse> {
    let logoImage: string = ""
    let coverImage: string = ""
    let list: string[] = []

    try {
      const { name } = createFarmInput;
      const existingFarm = await Farm.findOne({ where: [{ name }] });
      //Role existing
      if (existingFarm) return failureResponse(400, false, "Tên nông trại đã được sử dụng.")
      // new farm
      const slug = toSlug(name)
      const folderName = `farms/${slug}`

      await uploadMultipleFiles(files, folderName).then(async value => {
        list = value as string[]
        logoImage = list[0]
        coverImage = list[1]

        const newFarm = Farm.create({
          ...createFarmInput,
          slug,
          logoImage,
          coverImage,
          ownerId: req.session.userId,
        });
        await newFarm.save();
      })
      
      //All good
      return successResponse(200, true, "Nông trại đã được tạo thành công.")
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  // @Mutation(() => Boolean)
  // async multipleUpload(@Arg("id", _type => ID) id: number, @Arg("files", () => [GraphQLUpload]) files: [FileUpload]): Promise<boolean> {

  //   let logoUrl: string = ""
  //   let coverUrl: string = ""
  //   let list: string[] = []

  //   try {
  //     const existingFarm = await Farm.findOne(id)
  //     if (!existingFarm) return false

  //     const folderName = `farms/${existingFarm.slug}`

  //     await uploadMultipleFiles(files, folderName).then(value => {
  //       list = value as string[]
  //       logoUrl = list[0]
  //       coverUrl = list[1]
  //       existingFarm.logo = logoUrl
  //       existingFarm.coverImage = coverUrl
  //       existingFarm.save()
  //     })

  //     return true
  //   } catch (error) {
  //     console.log(error);

  //     return false
  //   }
  // }

  @Mutation((_return) => FarmMutationResponse, { description: "Update farm information." })
  @UseMiddleware(checkRole)
  async updateFarmInfo(
    @Arg('updateFarmInput') updateFarmInput: UpdateFarmInput,
    @Ctx() { req }: Context,
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<FarmMutationResponse> {

    let logoUrl: string = ""
    let coverUrl: string = ""
    let list: string[] = []

    try {
      const { id, name, address, description } = updateFarmInput
      const existingFarm = await Farm.findOne(id)

      if (!existingFarm) return failureResponse(400, false, 'Không tìm thấy nông trại.')

      if (req.session.userId !== existingFarm.ownerId) return failureResponse(400, false, 'Không thể thực hiện thao tác này.')

      const slug = toSlug(name)
      const folderName = `farms/${existingFarm.slug}`

      const existingLogoImage = existingFarm.logoImage
      const existingCoverImage = existingFarm.coverImage

      await uploadMultipleFiles(files, folderName).then(value => {
        list = value as string[]
        logoUrl = list[0]
        coverUrl = list[1]
        if (existingLogoImage) deleteFile(existingLogoImage.split("/").pop() as string, folderName)
        if (existingCoverImage) deleteFile(existingCoverImage.split("/").pop() as string, folderName)
        existingFarm.logoImage = logoUrl
        existingFarm.coverImage = coverUrl
        existingFarm.name = name
        existingFarm.slug = slug
        existingFarm.address = address
        existingFarm.description = description
        existingFarm.save()
      })

      return { code: 200, success: true, message: 'Thông tin nông trại đã được cập nhật thành công.', farm: existingFarm }
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }
}
