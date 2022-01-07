import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { checkRole } from "../../middleware/checkRole";
import { CreateProductInput } from "./product.input";
import { ProductMutationResponse } from "./product.mutation";
import { Product } from "../../../entities/Product";
import slugify from 'slugify'

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

      if (existingProduct)
        return {
          code: 400,
          success: false,
          message: "Product's name has already existed.",
          errors: [
            {
              field: "name",
              message:
                "name has already taken.",
            },
          ],
        };
        
      const converToSlug = slugify(name, {lower: true})

      const newProduct = Product.create({ ...createProductInput, slug:converToSlug });
      await newProduct.save();

      return {
        code: 200,
        success: true,
        message: "Product has been created successfully",
        product: newProduct,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal Server Error ${error.message}`,
      };
    }
  }
}
