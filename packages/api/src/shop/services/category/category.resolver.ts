import { Category } from "../../../entities/Category";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CreateCategoryInput } from "./category.input";
import { CategoryMutationResponse } from "./category.mutation";
import { checkAuth } from "../../middleware/checkAuth";
import slugify from 'slugify'
@Resolver()
export class CategoryResolver {
  @Query((_return) => [Category], {
    description: "Get all the categories",
    nullable: true,
  })
  async categories() {
    try {
      return await Category.find();
    } catch (error) {
      return null;
    }
  }

  @Mutation(_return => CategoryMutationResponse)
  @UseMiddleware(checkAuth)
  async createCategory(
    @Arg("createCategoryInput") createCategoryInput: CreateCategoryInput
  ): Promise<CategoryMutationResponse> {
    try {
      const { name } = createCategoryInput;

      const existingCategory = await Category.findOne({
        where: [{ name }],
      });

      if (existingCategory) {
        return {
          code: 400,
          success: false,
          message: "Category has already existed.",
          errors: [
            {
              field: existingCategory.name === name ? "name" : "slug",
              message: `${
                existingCategory.name === name ? "name" : "slug"
              } has already taken.`,
            },
          ],
        };
      }
      const converToSlug = slugify(name, {lower: true})

      const newCategory = Category.create({ ...createCategoryInput, slug: converToSlug});
      await newCategory.save();
      return {
        code: 200,
        success: true,
        message: "Category has been created successfully",
        category: newCategory,
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
