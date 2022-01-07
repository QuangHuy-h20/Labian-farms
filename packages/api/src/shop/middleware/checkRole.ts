import { AuthenticationError } from "apollo-server-core";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/Context";

export const checkRole: MiddlewareFn<Context> = async (
  { context: { req } },
  next
) => {
  if (!req.session.userId) {
    throw new AuthenticationError(
      "Not authenticated to perform GraphQL operations"
    );
  }

  if(req.session.roleId !== "farmer"){
    throw new Error("You do not have permission to access");
  }

  return next();
};
