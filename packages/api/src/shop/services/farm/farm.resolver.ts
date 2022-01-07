import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Farm } from "../../../entities/Farm";
import { FarmMutationResponse } from "./farm.mutation";
import { CreateFarmInput } from "./farm.input";
import { Context } from "../../types/Context";
import { checkRole } from "../../middleware/checkRole";
import slugify from 'slugify'
@Resolver()
export class FarmResolver {

  @Query(_return => [Farm], {nullable :true})
  async farmsByFarmer(@Arg("userId") userId: number): Promise<Farm[] | null>{
    try {
      const farms = await Farm.find({userId})
      return farms;
    } catch (error) {
      return null
    }
  }



  @Mutation((_return) => FarmMutationResponse, {
    description: "Create new farm",
  })
  @UseMiddleware(checkRole)
  async createFarm(
    @Arg("createFarmInput") createFarmInput: CreateFarmInput,
    @Ctx() { req }: Context
  ): Promise<FarmMutationResponse> {
    try {
      const { name } = createFarmInput;

      const existingFarm = await Farm.findOne({
        where: [{ name }],
      });

      //Role existing
      if (existingFarm)
        return {
          code: 400,
          success: false,
          message: "Farm's name has already existed.",
        };

        const converToSlug = slugify(name, {lower: true})
      // new farm
      const newFarm = Farm.create({
        ...createFarmInput,
        slug: converToSlug,
        userId: req.session.userId,
      });
      await newFarm.save();

      //All good
      return {
        code: 200,
        success: true,
        message: "Farm has been created successfully.",
        farm: newFarm,
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
