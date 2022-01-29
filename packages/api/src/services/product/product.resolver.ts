import { Arg, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
// import { checkRole } from "../../middleware/checkRole";
import { CreateProductInput, UpdateProductInput } from "./product.input";
import { ProductMutationResponse } from "./product.mutation";
import { Farm } from "../../entities/Farm";
import { Context } from "../../types/Context";
import { Product } from "../../entities/Product";
import { Category } from "../../entities/Category";
import { deleteFile, multipleUploads } from "../../utils/s3";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { toSlug } from "../../utils/toSlug";

@Resolver(_of => Product)
export class ProductResolver {

  //-------------------- Field resolver ----------------------

  @FieldResolver(_return => Farm)
  async farm(@Root() root: Product, @Ctx() { dataLoaders: { farmLoader } }: Context) {
    return await farmLoader.load(root.farmId)
  }

  @FieldResolver(_return => Category)
  async category(@Root() root: Product, @Ctx() { dataLoaders: { categoryLoader } }: Context) {
    return await categoryLoader.load(root.categoryId)
  }

  //------------------------- Query --------------------------

  @Query(_return => [Product], { nullable: true, description: "Get all products" })
  async products(): Promise<Product[] | null> {
    try {
      return await Product.find()
    } catch (error) {
      return null
    }
  }

  @Query(_return => [Product], { nullable: true, description: "Get all products by category" })
  async productsByCategory(@Arg("categoryId") categoryId: number): Promise<Product[] | null> {
    try {
      return await Product.find({ categoryId })
    } catch (error) {
      return null
    }
  }

  @Query(_return => Product, { nullable: true, description: "Get specific product by id" })
  async product(@Arg("id", _type => ID) id: number): Promise<Product | undefined> {
    try {
      return await Product.findOne(id)
    } catch (error) {
      return undefined
    }
  }

  //----------------------- Mutation -----------------------

  @Mutation((_return) => ProductMutationResponse, { description: "Create new product" })
  // @UseMiddleware(checkRole)
  async createProduct(
    @Arg("createProductInput") createProductInput: CreateProductInput,
    // @Ctx() { req }: Context,
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<ProductMutationResponse> {

    let list: string[] = []

    try {
      const { name } = createProductInput;
      const existingFarm = await Farm.findOne({ ownerId: 2 }) //req.session.userId
      const existingProduct = await Product.findOne({ where: [{ name }] });

      if (!existingFarm) return failureResponse(404, false, "Không có quyền truy cập.")
      if (existingProduct) return failureResponse(400, false, "Tên sản phẩm đã được sử dụng.")

      const getFarmSlug = existingFarm.slug
      const slug = toSlug(name)
      const folder = `products/${getFarmSlug}`
      await multipleUploads(files, folder, slug).then(async value => {
        list = value as string[]

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
      })
      return successResponse(200, true, 'Sản phẩm đã được tạo thành công.')
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation((_return) => ProductMutationResponse, { description: "Update product" })
  // @UseMiddleware(checkRole)
  async updateProduct(
    @Arg("createProductInput") updateProductInput: UpdateProductInput,
    // @Ctx() { req }: Context,
    // @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<ProductMutationResponse> {

    // let list: string[] = []

    try {
      const { id, name, description, price, totalInventory, unit, categoryId } = updateProductInput
      const existingProduct = await Product.findOne(id)
      const existingFarm = await Farm.findOne({ ownerId: 2 }) //req.session.userId

      if (!existingFarm) return failureResponse(404, false, "Không có quyền truy cập.")
      if (!existingProduct) return failureResponse(404, false, "Sản phẩm không tồn tại.")

      // const getFarmSlug = existingFarm.slug
      // const folder = `products/${getFarmSlug}`
      const slug = toSlug(name)

      // let existingImage1 = existingProduct.image1
      // let existingImage2 = existingProduct.image2
      // let existingImage3 = existingProduct.image3
      // let existingImage4 = existingProduct.image4
      // let existingImage5 = existingProduct.image5


      existingProduct.slug = slug
      existingProduct.description = description
      existingProduct.price = price
      existingProduct.totalInventory = totalInventory
      existingProduct.unit = unit
      existingProduct.categoryId = categoryId
      return successResponse(200, true, 'Cập nhật thông tin sản phẩm thành công.')
    } catch (error) {
      return failureResponse(500, false, `Internal server error ${error.message}`)
    }
  }

  @Mutation(_return => ProductMutationResponse, { description: 'Delete product' })
  // @UseMiddleware(checkRole)
  async deleteProduct(@Arg("id", _type => ID) id: number,
    // @Ctx() { req }: Context
  ): Promise<ProductMutationResponse> {
    try {
      const existingProduct = await Product.findOne(id)
      const existingFarm = await Farm.findOne({ ownerId: 2 }) //req.session.userId

      if (!existingFarm) return failureResponse(401, false, "Không có quyền truy cập.")
      if (!existingProduct) return failureResponse(404, false, 'Không tìm thấy sản phẩm.')

      const folder = `products/${existingFarm.slug}/${existingProduct.slug}`
      await Product.delete({ id })

      new Promise(_ => deleteFile(folder))

      return successResponse(200, true, 'Xoá sản phẩm thành công.')
    } catch (error) {
      return failureResponse(500, false, `Internal server error ${error.message}`)
    }
  }
}
