import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Farm } from "../../entities/Farm";
import { User } from "../../entities/User";
import { FarmMutationResponse } from "./farm.mutation";
import { CreateFarmInput } from "./farm.input";
import { Context } from "../../types/Context";
import { checkRole } from "../../middleware/checkRole";
import { failureResponse } from "../../utils/statusResponse";
import { toSlug } from "../../utils/toSlug";

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
    @Ctx() { req }: Context
  ): Promise<FarmMutationResponse> {
    try {
      const { name } = createFarmInput;
      const existingFarm = await Farm.findOne({ where: [{ name }] });

      //Role existing
      if (existingFarm) return failureResponse(400, false, "Farm's name has already existed.")

      // new farm
      const slug = toSlug(name)
      const newFarm = Farm.create({
        ...createFarmInput,
        slug,
        ownerId: req.session.userId,
      });

      //All good
      await newFarm.save();
      return { code: 200, success: true, message: "Farm has been created successfully.", farm: newFarm }
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }
}
