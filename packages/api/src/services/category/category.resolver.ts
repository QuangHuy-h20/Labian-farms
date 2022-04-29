import { Category } from "../../entities/Category";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CreateCategoryInput } from "./category.input";
import { CategoryMutationResponse } from "./category.mutation";
import { checkAuth } from "../../middleware/checkAuth";
import { failureResponse } from "../../utils/statusResponse";
import { toSlug } from "../../utils/common";

@Resolver()
export class CategoryResolver {
  @Query((_return) => [Category], { description: "Get all the categories.", nullable: true })
  async categories() {
    try {
      return await Category.find();
    } catch (error) {
      return null;
    }
  }

  @Mutation(_return => CategoryMutationResponse, { description: "Create new category." })
  @UseMiddleware(checkAuth)
  async createCategory(
    @Arg("createCategoryInput") createCategoryInput: CreateCategoryInput
  ): Promise<CategoryMutationResponse> {
    try {
      const { name } = createCategoryInput;

      const existingCategory = await Category.findOne({ where: [{ name }] });

      if (existingCategory) return failureResponse(400, false, "Category has already existed.")

      const slug = toSlug(name)

      const newCategory = Category.create({ ...createCategoryInput, slug });
      await newCategory.save();
      return { code: 200, success: true, message: "Category has been created successfully", category: newCategory }


    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }
}
