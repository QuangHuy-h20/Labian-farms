import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { validateRegisterInput } from "../../../shop/utils/validateRegister";
import { LoginInput, RegisterInput } from "./user.input";
import { UserMutationResponse } from "./user.mutation";
import { User } from "../../../entities/User";
import { Context } from "../../types/Context";
import { COOKIE_NAME } from "../../../constants";
import { checkAuth } from "../../middleware/checkAuth";

@Resolver((_of) => User)
export class UserResolver {
  //----------------------- Query -----------------------
  @Query((_return) => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | undefined | null> {
    if (!req.session.userId) return null;

    const user = await User.findOne(req.session.userId);
    return user;
  }

  @Query((_return) => [User], {
    description: "Get all the users",
    nullable: true,
  })
  @UseMiddleware(checkAuth)
  async users() {
    try {
      return await User.find();
    } catch (error) {
      return null;
    }
  }

  //----------------------- Mutation -----------------------

  @Mutation((_return) => UserMutationResponse, {
    description: "Register for customer",
  })
  async register(
    @Arg("registerInput") registerInput: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    try {
      const { phoneNumber, email, password } = registerInput;

      const validateRegisterInputError = validateRegisterInput(registerInput);

      if (validateRegisterInputError !== null) {
        return { code: 400, success: false, ...validateRegisterInputError };
      }

      const existingUser = await User.findOne({
        where: [{ email }, { phoneNumber }],
      });

      //Check user existed or not
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "Email or phone number has already been used",
          errors: [
            {
              field: existingUser.email === email ? "email" : "phoneNumber",
              message: `${
                existingUser.email === email ? "email" : "phoneNumber"
              } has already been used`,
            },
          ],
        };
      }

      //Hash password before create save account
      const hashedPassword = await argon2.hash(password);

      // Initial create account
      const newUser = User.create({
        email,
        phoneNumber,
        password: hashedPassword,
      });

      await newUser.save();

      req.session.userId = newUser.id;
      req.session.roleId = newUser.roleId;

      return {
        code: 200,
        success: true,
        message: "Registered successfully!",
        user: newUser,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal Server Error ${error.message}`,
      };
    }
  }

  @Mutation((_return) => UserMutationResponse, {
    description: "Register for farmer",
  })
  async becomeAFarmer(
    @Arg("registerInput") registerInput: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    try {
      const { phoneNumber, email, password } = registerInput;

      const validateRegisterInputError = validateRegisterInput(registerInput);

      if (validateRegisterInputError !== null) {
        return { code: 400, success: false, ...validateRegisterInputError };
      }

      const existingUser = await User.findOne({
        where: [{ email }, { phoneNumber }],
      });

      //Check user existed or not
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "Email or phone number has already been used",
          errors: [
            {
              field: existingUser.email === email ? "email" : "phoneNumber",
              message: `${
                existingUser.email === email ? "email" : "phoneNumber"
              } has already been used`,
            },
          ],
        };
      }

      //Hash password before create save account
      const hashedPassword = await argon2.hash(password);

      // Initial create account
      const newFarmer = User.create({
        email,
        phoneNumber,
        password: hashedPassword,
        roleId: "farmer"
      });

      await newFarmer.save();

      req.session.userId = newFarmer.id;
      req.session.roleId = newFarmer.roleId;

      return {
        code: 200,
        success: true,
        message: "Registered successfully!",
        user: newFarmer,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal Server Error ${error.message}`,
      };
    }
  }

  @Mutation((_return) => UserMutationResponse, { description: "Login" })
  async login(
    @Arg("loginInput") loginInput: LoginInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    try {
      const { emailOrPhoneNumber, password } = loginInput;

      const existingUser = await User.findOne(
        emailOrPhoneNumber.includes("@")
          ? { email: emailOrPhoneNumber }
          : { phoneNumber: emailOrPhoneNumber }
      );

      //Check user existed or not
      if (!existingUser)
        return {
          code: 400,
          success: false,
          message: "Invalid email or phone number",
          errors: [
            {
              field: "emailOrPhoneNumber",
              message: "Incorrect email or phone number",
            },
          ],
        };

      //Verify password matched password of user or not
      const isValidPassword = argon2.verify(existingUser.password, password);
      if (!isValidPassword)
        return {
          code: 400,
          success: false,
          message: "Invalid username or password",
        };

      //All good
      req.session.userId = existingUser.id;
      req.session.roleId = existingUser.roleId;

      return {
        code: 200,
        success: true,
        message: "Login successfully!",
        user: existingUser,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal Server Error ${error.message}`,
      };
    }
  }

  @Mutation((_return) => Boolean, { description: "Logout" })
  logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      res.clearCookie(COOKIE_NAME);
      req.session.destroy((err) => {
        if (err) {
          console.log("Destroying session error: ", err);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
