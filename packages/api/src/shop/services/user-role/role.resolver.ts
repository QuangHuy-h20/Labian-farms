
import { Arg, Mutation, Query, Resolver, 
  UseMiddleware 
} from "type-graphql";
import { UserRole } from "../../../entities/UserRole";
import { RoleMutationResponse } from "./role.mutation";
import { CreateRoleInput } from "./role.input";
import { checkAuth } from "../../middleware/checkAuth";
@Resolver()
export class RoleResolver {

  @Query((_return) => [UserRole], { nullable: true })
  @UseMiddleware(checkAuth)
  async roles() {
    try {
      return await UserRole.find();
    } catch (error) {
      return null;
    }
  }


  @Mutation((_return => RoleMutationResponse))
  @UseMiddleware(checkAuth)
  async createRole(
    @Arg("createRoleInput") createRoleInput: CreateRoleInput
  ): Promise<RoleMutationResponse> {
    try {
      const { id, roleName } = createRoleInput;
      const existingRole = await UserRole.findOne({
        where: [{ id }, { roleName }],
      });

      //Role existing
      if (existingRole)
        return {
          code: 400,
          success: false,
          message: "Role has already existed.",
          errors: [
            {
              field: existingRole.id === id ? "id" : "roleName",
              message: `${
                existingRole.id === id ? "id" : "roleName"
              } has already taken.`,
            },
          ],
        };

      // new role
      const newRole = UserRole.create({ ...createRoleInput });
      await newRole.save();

      //All good
      return {
        code: 200,
        success: true,
        message: "Role has been created successfully.",
        role: newRole,
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
