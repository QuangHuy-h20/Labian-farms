import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { checkRole } from "../../middleware/checkRole";
import { CreateProductInput, UpdateProductInput } from "./product.input";
import { ProductMutationResponse } from "./product.mutation";
import { Farm } from "../../entities/Farm";
import { Context } from "../../types/Context";
import { Product } from "../../entities/Product";
import { Category } from "../../entities/Category";
import { deleteFile, multipleUploads } from "../../utils/s3";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { toSlug } from "../../utils/toSlug";
import { PaginatedProducts } from "../../types/Paginated";
import { LessThan } from "typeorm";

@Resolver((_of) => Product)
export class ProductResolver {
  //-------------------- Field resolver ----------------------

  @FieldResolver((_return) => Farm)
  async farm(
    @Root() root: Product,
    @Ctx() { dataLoaders: { farmLoader } }: Context
  ) {
    return await farmLoader.load(root.farmId);
  }

  @FieldResolver((_return) => Category)
  async category(
    @Root() root: Product,
    @Ctx() { dataLoaders: { categoryLoader } }: Context
  ) {
    return await categoryLoader.load(root.categoryId);
  }

  //------------------------- Query --------------------------

  @Query((_return) => PaginatedProducts, {
    nullable: true,
    description: "Get all products",
  })
  async products(
    @Arg("limit", (_type) => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor?: string,
    @Arg("categoryQuery", (_type) => String, { nullable: true }) categoryQuery?: string | null
  ): Promise<PaginatedProducts | null> {
    try {
      const totalCount = categoryQuery ? await Product.count({
        where: { categoryQuery }
      }) : await Product.count()
      const realLimit = Math.min(10, limit);

      const findOptions: { [key: string]: any } = {
        order: {
          createdAt: "DESC",
        },
        take: realLimit,
      };

      let lastProduct: Product[] = [];

      if (cursor) {
        findOptions.where = { categoryQuery: categoryQuery ? categoryQuery : undefined, createdAt: LessThan(cursor) };
        lastProduct = await Product.find({
          order: {
            createdAt: "ASC",
          },
          take: 1,
        });
      }
      const products = await Product.find(categoryQuery === undefined ? findOptions : { ...findOptions, where: { categoryQuery } });
      
      return {
        totalCount,
        cursor: products[products.length - 1].createdAt,
        hasMore: cursor
          ? products[products.length - 1].createdAt.toString() !==
          lastProduct[0].createdAt.toString()
          : products.length !== totalCount,
        paginatedProducts: products,
      };
    } catch {
      return null;
    }
  }

  @Query((_return) => [Product], {
    nullable: true,
    description: "Get all products by category",
  })
  async productsByCategory(
    @Arg("categoryId", (_type) => ID) categoryId: number
  ): Promise<Product[] | null> {
    try {
      return await Product.find({ categoryId });
    } catch (error) {
      return null;
    }
  }

  @Query((_return) => Product, {
    nullable: true,
    description: "Get specific product by id",
  })
  async product(
    @Arg("id", (_type) => ID) id: number
  ): Promise<Product | undefined> {
    try {
      return await Product.findOne(id);
    } catch (error) {
      return undefined;
    }
  }

  //----------------------- Mutation -----------------------

  @Mutation((_return) => ProductMutationResponse, {
    description: "Create new product",
  })
  @UseMiddleware(checkRole)
  async createProduct(
    @Arg("createProductInput") createProductInput: CreateProductInput,
    // @Ctx() { req }: Context,
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<ProductMutationResponse> {
    let list: string[] = [];

    try {
      const { name } = createProductInput;
      const existingFarm = await Farm.findOne({ ownerId: 5 }); //req.session.userId
      const existingProduct = await Product.findOne({ where: [{ name }] });

      if (!existingFarm)
        return failureResponse(404, false, "Kh??ng c?? quy???n truy c???p.");
      if (existingProduct)
        return failureResponse(400, false, "T??n s???n ph???m ???? ???????c s??? d???ng.");

      const getFarmSlug = existingFarm.slug;
      const slug = toSlug(name);
      const folder = `products/${getFarmSlug}`;
      await multipleUploads(files, folder).then(async (value) => {
        list = value as string[];

        const newProduct = Product.create({
          ...createProductInput,
          slug,
          image1: list[0] !== null ? list[0] : undefined,
          image2: list[1] !== null ? list[1] : undefined,
          image3: list[2] !== null ? list[2] : undefined,
          image4: list[3] !== null ? list[3] : undefined,
          image5: list[4] !== null ? list[4] : undefined,
          farmId: existingFarm.id,
        });
        await newProduct.save();
      });
      return successResponse(200, true, "S???n ph???m ???? ???????c t???o th??nh c??ng.");
    } catch (error) {
      return failureResponse(
        500,
        false,
        `Internal Server Error ${error.message}`
      );
    }
  }

  @Mutation((_return) => ProductMutationResponse, {
    description: "Update product",
  })
  // @UseMiddleware(checkRole)
  async updateProduct(
    @Arg("updateProductInput") updateProductInput: UpdateProductInput,
    @Ctx() { req }: Context,
    // @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<ProductMutationResponse> {
    // let list: string[] = []

    try {
      const { id, name, description, price, totalInventory, unit, categoryQuery } =
        updateProductInput;
      const existingProduct = await Product.findOne(id);
      const existingFarm = await Farm.findOne({ ownerId: req.session.userId });

      if (!existingFarm)
        return failureResponse(404, false, "Kh??ng c?? quy???n truy c???p.");
      if (!existingProduct)
        return failureResponse(404, false, "S???n ph???m kh??ng t???n t???i.");

      // const getFarmSlug = existingFarm.slug
      // const folder = `products/${getFarmSlug}`
      const slug = toSlug(name);

      // let existingImage1 = existingProduct.image1
      // let existingImage2 = existingProduct.image2
      // let existingImage3 = existingProduct.image3
      // let existingImage4 = existingProduct.image4
      // let existingImage5 = existingProduct.image5

      existingProduct.slug = slug;
      existingProduct.description = description;
      existingProduct.price = price;
      existingProduct.totalInventory = totalInventory;
      existingProduct.unit = unit;
      existingProduct.categoryQuery = categoryQuery;
      return successResponse(
        200,
        true,
        "C???p nh???t th??ng tin s???n ph???m th??nh c??ng."
      );
    } catch (error) {
      return failureResponse(
        500,
        false,
        `Internal server error ${error.message}`
      );
    }
  }

  @Mutation((_return) => ProductMutationResponse, {
    description: "Delete product",
  })
  @UseMiddleware(checkRole)
  async deleteProduct(
    @Arg("id", (_type) => ID) id: number,
    @Ctx() { req }: Context
  ): Promise<ProductMutationResponse> {
    try {
      const existingProduct = await Product.findOne(id);
      const existingFarm = await Farm.findOne({ ownerId: req.session.userId });

      if (!existingFarm)
        return failureResponse(401, false, "Kh??ng c?? quy???n truy c???p.");
      if (!existingProduct)
        return failureResponse(404, false, "Kh??ng t??m th???y s???n ph???m.");

      const folder = `products/${existingFarm.slug}/${existingProduct.slug}`;
      await Product.delete({ id });

      new Promise(_ => deleteFile(folder));

      return successResponse(200, true, "Xo?? s???n ph???m th??nh c??ng.");
    } catch (error) {
      return failureResponse(
        500,
        false,
        `Internal server error ${error.message}`
      );
    }
  }
}
