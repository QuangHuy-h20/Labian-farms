import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { validateRegisterInput, validateChangePasswordInput, validateResetPasswordInput } from "../../utils/validateInput"
import { ChangePasswordInput, LoginInput, ProfileInput, RegisterInput } from "./user.input";
import { UserMutationResponse } from "./user.mutation";
import { User } from "../../entities/User";
import { Context } from "../../types/Context";
import { COOKIE_NAME } from "../../constants";
import { checkAuth } from "../../middleware/checkAuth";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { TokenModel } from "../../models/Token";
import { sendEmail } from "../../utils/sendEmail";
import {
  deleteFile,
  // s3, s3DefaultParams,
  uploadFile
} from "../../utils/s3";

@Resolver((_of) => User)
export class UserResolver {

  //----------------------- Query -----------------------

  @Query((_return) => User, { description: "User information", nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | undefined | null> {
    if (!req.session.userId) return null;

    const user = await User.findOne(req.session.userId);
    return user;
  }

  @Query((_return) => [User], { description: "Get all users", nullable: true })
  @UseMiddleware(checkAuth)
  async users() {
    try {
      return await User.find();
    } catch (error) {
      return null;
    }
  }

  //----------------------- Mutation -----------------------

  @Mutation((_return) => UserMutationResponse, { description: "Register for customer." })
  async register(@Arg("registerInput") registerInput: RegisterInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    try {
      const { phoneNumber, email, password } = registerInput;
      const validateRegisterInputError = validateRegisterInput(registerInput);

      if (validateRegisterInputError !== null) {
        return { code: 400, success: false, ...validateRegisterInputError };
      }

      const existingUser = await User.findOne({ where: [{ email }, { phoneNumber }] });

      //Check user existed or not
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "Email hoặc số điện thoại đã được sử dụng",
          errors: [
            {
              field: existingUser.email === email ? "email" : "phoneNumber",
              message: `${existingUser.email === email ? "email" : "số điện thoại"
                } đã được sử dụng`,
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
        roleId: "admin"
      });

      await newUser.save();

      req.session.userId = newUser.id;
      req.session.roleId = newUser.roleId;

      return { code: 200, success: true, message: "Đăng ký thành công!", user: newUser }

    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation((_return) => UserMutationResponse, { description: "Register for farmer" })
  async farmerRegister(@Arg("registerInput") registerInput: RegisterInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    try {
      const { phoneNumber, email, password } = registerInput;
      const validateRegisterInputError = validateRegisterInput(registerInput);

      if (validateRegisterInputError !== null) {
        return { code: 400, success: false, ...validateRegisterInputError };
      }

      const existingUser = await User.findOne({ where: [{ email }, { phoneNumber }] });

      //Check user existed or not
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "Email hoặc số điện thoại đã được sử dụng",
          errors: [
            {
              field: existingUser.email === email ? "email" : "phoneNumber",
              message: `${existingUser.email === email ? "email" : "số điện thoại"
                } đã được sử dụng`,
            },
          ],
        };
      }

      //Hash password before create save account
      const hashedPassword = await argon2.hash(password);

      // Initial create account
      const newFarmer = User.create({ email, phoneNumber, password: hashedPassword, roleId: "farmer" });

      await newFarmer.save();

      req.session.userId = newFarmer.id;
      req.session.roleId = newFarmer.roleId;

      return { code: 200, success: true, message: "Đăng ký thành công!", user: newFarmer }
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation((_return) => UserMutationResponse, { description: "Login" })
  async login(@Arg("loginInput") loginInput: LoginInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    try {
      const { loginField, password } = loginInput;

      const existingUser = await User.findOne({ where: [{ email: loginField }, { nickname: loginField }, { phoneNumber: loginField }] });

      //Check user existed or not
      if (!existingUser) return failureResponse(400, false, "Tên đăng nhập hoặc mật khẩu không hợp lệ.")

      //Verify password matched password of user or not
      const isValidPassword = argon2.verify(existingUser.password, password);
      if (!isValidPassword) return failureResponse(400, false, "Tên đăng nhập hoặc mật khẩu không hợp lệ")

      //All good
      req.session.userId = existingUser.id;
      req.session.roleId = existingUser.roleId;

      return successResponse(200, true, "Đăng nhập thành công!")
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
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

  @Mutation(_return => UserMutationResponse, { description: "Update user profile" })
  async updateProfile(@Arg("profileInput") profileInput: ProfileInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    try {
      const { fullName, gender, dateOfBirth, address } = profileInput
      const existingUser = await User.findOne(req.session.userId)

      if (!existingUser) return failureResponse(400, false, "Người dùng không hợp lệ.")

      existingUser.fullName = fullName;
      existingUser.gender = gender
      existingUser.dateOfBirth = dateOfBirth
      existingUser.address = address

      existingUser.save();
      return { code: 200, success: true, message: "Cập nhật thông tin thành công.", user: existingUser }
    } catch (error) {
      return failureResponse(500, false, `Internal server error ${error.message}`)
    }
  }

  @Mutation(_return => UserMutationResponse, { description: "Change user password" })
  async changePassword(@Arg("changePasswordInput") changePasswordInput: ChangePasswordInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    try {

      const { oldPassword, newPassword } = changePasswordInput
      const existingUser = await User.findOne(req.session.userId)

      if (!existingUser) return failureResponse(400, false, "Người dùng không hợp lệ.")

      //verify password
      const isMatchedPassword = await argon2.verify(existingUser.password, oldPassword)

      if (!isMatchedPassword) return failureResponse(400, false, "Mật khẩu cũ không đúng.")

      const validateChangePasswordInputError = validateChangePasswordInput(changePasswordInput)

      if (validateChangePasswordInputError !== null) return { code: 400, success: false, ...validateChangePasswordInputError }

      //Hash new password
      const updatedPassword = await argon2.hash(newPassword)

      //Update user's password
      existingUser.password = updatedPassword
      existingUser.save()

      return successResponse(200, true, "Mật khẩu đã được cập nhật thành công.")
    } catch (error) {
      return failureResponse(500, false, `Internal server error ${error.message}`)
    }
  }

  @Mutation(_return => Boolean, { description: "Forgot password" })
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {

    const user = await User.findOne({ email })

    if (!user) return true

    await TokenModel.findOneAndDelete({ userId: `${user.id}` })

    const resetToken = uuidv4();
    const hashedToken = await argon2.hash(resetToken)

    await new TokenModel({ userId: `${user.id}`, token: hashedToken }).save();

    await sendEmail(email, `<a href="http://localhost:3000/change-password?token=${resetToken}&userId=${user.id}">Nhấn vào đây để thay đổi mật khẩu.</a>`)

    return true
  }

  @Mutation(_return => UserMutationResponse, { description: "Reset password" })
  async resetPassword(@Arg("token") token: string, @Arg("userId") userId: string, @Arg("resetPassword") resetPassword: string, @Ctx() { req }: Context): Promise<UserMutationResponse> {

    const validateResetPasswordInputError = validateResetPasswordInput(resetPassword)
    if (validateResetPasswordInputError !== null) return { code: 400, success: false, ...validateResetPasswordInputError }
    try {
      const resetPasswordTokenRecord = await TokenModel.findOne({ userId });
      if (!resetPasswordTokenRecord) return failureResponse(400, false, "Reset token mật khẩu không hợp lệ hoặc đã hết hạn.")

      const resetPasswordTokenValid = argon2.verify(resetPasswordTokenRecord.token, token);
      if (!resetPasswordTokenValid) return failureResponse(400, false, "Reset token mật khẩu không hợp lệ hoặc đã hết hạn.")

      const userIdNum = parseInt(userId);
      const user = await User.findOne(userIdNum);

      if (!user) return failureResponse(400, false, "Thông tin người dùng không còn hiệu lực.")

      const newPassword = await argon2.hash(resetPassword)

      await User.update({ id: userIdNum }, { password: newPassword })

      await resetPasswordTokenRecord.deleteOne();

      req.session.userId = user.id;
      req.session.roleId = user.roleId

      return successResponse(200, true, "Mật khẩu đã được thay đổi thành công.")
    } catch (error) {
      return failureResponse(500, false, `Internal server error ${error.message}`)
    }
  }

  @Mutation(() => Boolean, { description: "Update user's avatar" })
  async updateAvatar(@Arg("id", _type => ID) id: number, @Arg("file", () => GraphQLUpload) file: FileUpload): Promise<boolean> {

    const folderName = 'users'
    let imageUrl = ""

    try {
      const existingUser = await User.findOne(id)
      if (!existingUser) return false
      new Promise(reject => {
        uploadFile(file, folderName, (err: any, data: any) => {
          if (err) reject(err)

          imageUrl = data.Location

          const existingFile = existingUser?.avatar
          console.log('existingFile: ', existingFile)
          console.log('imageUrl: ', imageUrl)

          if (existingFile) {
            deleteFile(existingFile.split("/").pop() as string, folderName)
          }

          existingUser.avatar = imageUrl
          existingUser.save();
        })
      })



      return true
    } catch (error) {
      return false
    }
  }
}
