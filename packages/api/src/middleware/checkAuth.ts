import { AuthenticationError } from "apollo-server-core";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/Context";

export const checkAuth: MiddlewareFn<Context> = async (
  { context: { req } },
  next
) => {
  if (!req.session.userId) {
    throw new AuthenticationError(
      "Not authenticated to perform GraphQL operations"
    );
  }
  console.log(req.session.roleId);

  if (req.session.roleId !== "executive-admin") {
    throw new Error("You do not have permission to access");
  }

  return next();
};
