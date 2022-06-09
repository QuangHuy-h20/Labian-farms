
import {
  Arg, Mutation, Query, Resolver,
  UseMiddleware
} from "type-graphql";
import { toSlug } from "../../utils/common";
import { UserRole } from "../../entities/UserRole";
import { RoleMutationResponse } from "./role.mutation";
import { CreateRoleInput } from "./role.input";
import { checkAuth } from "../../middleware/checkAuth";
import { failureResponse } from "../../utils/statusResponse";
@Resolver()
export class RoleResolver {

  @Query((_return) => [UserRole], { description: "Get all roles", nullable: true })
  @UseMiddleware(checkAuth)
  async roles() {
    try {
      return await UserRole.find();
    } catch (error) {
      return null;
    }
  }

  @Mutation((_return => RoleMutationResponse), { description: "Create new user role." })
  @UseMiddleware(checkAuth)
  async createRole(
    @Arg("createRoleInput") { roleName }: CreateRoleInput
  ): Promise<RoleMutationResponse> {
    try {
      const existingRole = await UserRole.findOne({
        where: [{ roleName }],
      });

      //Role existing
      if (existingRole) return failureResponse(400, false, "Role has already existed.")

      // new role
      const slug = toSlug(roleName)
      const newRole = UserRole.create({ roleName, id: slug });
      await newRole.save();

      //All good
      return { code: 200, success: true, message: "Role has been created successfully.", role: newRole }
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }
}
