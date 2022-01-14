import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { checkRole } from "../../middleware/checkRole";
import { CreateProductInput } from "./product.input";
import { ProductMutationResponse } from "./product.mutation";
import { Product } from "../../entities/Product";
import { toSlug } from "../../utils/toSlug";
import { failureResponse } from "../../utils/statusResponse";

@Resolver()
export class ProductResolver {
  @Mutation((_return) => ProductMutationResponse)
  @UseMiddleware(checkRole)
  async createProduct(
    @Arg("createProductInput") createProductInput: CreateProductInput
  ): Promise<ProductMutationResponse> {
    try {
      const { name } = createProductInput;

      const existingProduct = await Product.findOne({
        where: [{ name }],
      });

      if (existingProduct) return failureResponse(400, false,"Product's name has already existed." )
      

      const slug = toSlug(name)

      const newProduct = Product.create({ ...createProductInput, slug });
      await newProduct.save();

      return {
        code: 200,
        success: true,
        message: "Product has been created successfully",
        product: newProduct,
      };
    } catch (error) {
     return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }
}
