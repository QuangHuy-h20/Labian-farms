import { Arg, 
  // Ctx, 
  Mutation, Resolver, 
  // UseMiddleware 
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
// import { checkRole } from "../../middleware/checkRole";
import { CreateProductInput } from "./product.input";
import { ProductMutationResponse } from "./product.mutation";
import { failureResponse, successResponse } from "../../utils/statusResponse";
// import { Context } from "../../types/Context";
import { Product } from "../../entities/Product";
// import { Farm } from "../../entities/Farm";
import { uploadMultipleFiles } from "../../utils/s3";
import { toSlug } from "../../utils/toSlug";

@Resolver()
export class ProductResolver {
  @Mutation((_return) => ProductMutationResponse)
  // @UseMiddleware(checkRole)
  async createProduct(
    @Arg("createProductInput") createProductInput: CreateProductInput,
    // @Ctx() { req }: Context,
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<ProductMutationResponse> {


    let list: string[] = []

    try {
      const { name } = createProductInput;
      const existingProduct = await Product.findOne({ where: [{ name }] });
      // const existingFarm = await Farm.findOne({ ownerId: req.session.userId })
      // if (!existingFarm) return failureResponse(404, false, "Nông trại không tồn tại.")

      if (existingProduct) return failureResponse(400, false, "Tên sản phẩm đã được sử dụng.")

      // const getFarmSlug = existingFarm.slug
      const slug = toSlug(name)
      // const folderName = `farms/${getFarmSlug}`
      const folder = `products`
      await uploadMultipleFiles(files, folder).then(async value => {
        list = value as string[]
 
        const newProduct = Product.create({
          ...createProductInput, 
          slug,
          image1: list[0] !== null ? list[0] : undefined,
          image2: list[1] !== null ? list[1] : undefined,
          image3: list[2] !== null ? list[2] : undefined,
          image4: list[3] !== null ? list[3] : undefined,
          image5: list[4] !== null ? list[4] : undefined,
          farmId: 1,
        });
        await newProduct.save();
      })

      return successResponse(200, true, 'Sản phẩm đã được tạo thành công.')
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }
}
