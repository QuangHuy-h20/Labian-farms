import { Arg, Ctx, ID, Mutation, Query, Resolver, registerEnumType, UseMiddleware, FieldResolver, Root, } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { validateRegisterInput, validateChangePasswordInput, validateResetPasswordInput } from "../../utils/validateInput"
import { ChangePasswordInput, ForgotPasswordInput, LoginInput, ProfileInput, RegisterInput, ResetPasswordInput } from "./user.input";
import { UserMutationResponse } from "./user.mutation";
import { Gender, User } from "../../entities/User";
import { Address } from "../../entities/Address";
import { Farm } from "../../entities/Farm";
import { Context } from "../../types/Context";
import { COOKIE_NAME } from "../../constants";
import { checkAuth } from "../../middleware/checkAuth";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { TokenModel } from "../../models/Token";
import { sendEmail } from "../../utils/sendEmail";
import { deleteFile, singleUpload } from "../../utils/s3";


registerEnumType(Gender, {
  name: "Gender"
})

@Resolver((_of) => User)
export class UserResolver {

  //-------------------- Field resolver ----------------------

  @FieldResolver(_return => [Address], { nullable: true })
  async addresses(@Root() root: User, @Ctx() { dataLoaders: { addressLoader } }: Context) {
    try {
      return await addressLoader.loadMany(root.userAddressIds)
    } catch (error) {
      return null
    }
  }

  @FieldResolver(_return => [Farm], { nullable: true })
  async farms(@Root() root: User, @Ctx() { dataLoaders: { farmLoader } }: Context) {
    try {
      return await farmLoader.loadMany(root.userFarmIds)
    } catch (error) {
      return null
    }
  }

  //----------------------- Query -----------------------

  @Query((_return) => User, { description: "User information", nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | undefined | null> {
    if (!req.session.userId) return null;
    return await User.findOne(req.session.userId);
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
      const { phone, email, password } = registerInput;
      const validateRegisterInputError = validateRegisterInput(registerInput);

      if (validateRegisterInputError !== null) {
        return { code: 400, success: false, ...validateRegisterInputError };
      }

      const existingUser = await User.findOne({ where: [{ email }, { phone }] });

      //Check user existed or not
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "Email hoặc số điện thoại đã được sử dụng",
          errors: [
            {
              field: existingUser.email === email ? "email" : "phone",
              message: `${existingUser.email === email ? "email" : "số điện thoại"} đã được sử dụng`,
            },
          ],
        };
      }

      //Hash password before create save account
      const hashedPassword = await argon2.hash(password);

      // Initial create account
      const newUser = User.create({
        email,
        phone,
        password: hashedPassword,
      });
      await newUser.save();

      req.session.userId = newUser.id
      req.session.roleId = newUser.roleId

      return { code: 200, success: true, message: "Đăng ký thành công!", user: newUser }

    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation((_return) => UserMutationResponse, { description: "Register for farmer" })
  async farmerRegister(@Arg("registerInput") registerInput: RegisterInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    try {
      const { phone, email, password } = registerInput;
      const validateRegisterInputError = validateRegisterInput(registerInput);

      if (validateRegisterInputError !== null) {
        return { code: 400, success: false, ...validateRegisterInputError };
      }

      const existingUser = await User.findOne({ where: [{ email }, { phone }] });

      //Check user existed or not
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "Email hoặc số điện thoại đã được sử dụng",
          errors: [
            {
              field: existingUser.email === email ? "email" : "phone",
              message: `${existingUser.email === email ? "email" : "số điện thoại"} đã được sử dụng`,
            },
          ],
        };
      }

      //Hash password before create save account
      const hashedPassword = await argon2.hash(password);

      // Initial create account
      const newFarmer = User.create({ email, phone, password: hashedPassword, roleId: "farmer" });
      await newFarmer.save();

      req.session.userId = newFarmer.id
      req.session.roleId = newFarmer.roleId

      return { code: 200, success: true, message: "Đăng ký thành công!", user: newFarmer }
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation(_return => Boolean, { description: "Confirm email" })
  async confirmEmail(@Arg("email") email: string) {
    try {

      const existingUser = await User.findOne({ email })
      if (!existingUser) return false
      await TokenModel.findOneAndDelete({ userId: `${existingUser.id}` })

      const activeToken = uuidv4();
      const hashedToken = await argon2.hash(activeToken)

      await new TokenModel({ userId: `${existingUser.id}`, token: hashedToken }).save();

      let html = `<p>Ấn vào đường dẫn bên dưới để kích hoạt email của bạn.</p><a href="http://localhost:3000/confirm-email?token=${activeToken}&userId=${existingUser.id}}">Nhấn vào đây để kích hoạt email.</a> `
      await sendEmail(email, html)
      return true
    } catch (error) {
      return false
    }
  }

  @Mutation(_return => UserMutationResponse, { description: "Active email" })
  async activeEmail(@Arg("token") token: string, @Arg("userId") userId: string): Promise<UserMutationResponse> {
    try {
      const activeEmailTokenRecord = await TokenModel.findOne({ userId });
      if (!activeEmailTokenRecord) return failureResponse(404, false, "Token không hợp lệ hoặc đã hết hạn.")

      const activeEmailTokenValid = argon2.verify(activeEmailTokenRecord.token, token);
      if (!activeEmailTokenValid) return failureResponse(404, false, "Token không hợp lệ hoặc đã hết hạn.")

      const userIdNum = parseInt(userId);
      const user = await User.findOne(userIdNum);

      if (!user) return failureResponse(404, false, "Thông tin người dùng không còn hiệu lực.")
      await activeEmailTokenRecord.deleteOne();
      await User.update({ id: userIdNum }, { isActiveEmail: true })

      return successResponse(200, true, "Kích hoạt email thành công.")
    } catch (error) {
      return failureResponse(500, false, `Internal server error ${error.message}`)
    }
  }

  @Mutation((_return) => UserMutationResponse, { description: "Login" })
  async login(@Arg("loginInput") loginInput: LoginInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    try {
      const { loginField, password } = loginInput;

      const existingUser = await User.findOne({ where: [{ email: loginField }, { nickname: loginField }, { phone: loginField }] });

      //Check user existed or not
      if (!existingUser) return {
        code: 400,
        success: false,
        message: "Tài khoản hoặc mật khẩu không hợp lệ.",
        errors: [
          {
            field: "loginField",
            message: "Tài khoản hoặc mật khẩu không hợp lệ",
          },
        ],
      };

      //Verify password matched password of user or not
      const isValidPassword = await argon2.verify(existingUser.password, password);
      if (!isValidPassword) return {
        code: 400,
        success: false,
        message: "Tài khoản hoặc mật khẩu không hợp lệ.",
        errors: [
          {
            field: "password",
            message: "Tài khoản hoặc mật khẩu không hợp lệ",
          },
        ],
      };

      //All good
      req.session.userId = existingUser.id;
      req.session.roleId = existingUser.roleId;

      return { code: 200, success: true, message: "Đăng nhập thành công.", user: existingUser }
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
      const { fullName, nickname, gender, dateOfBirth, address } = profileInput
      const existingUser = await User.findOne(req.session.userId)

      if (!existingUser) return failureResponse(400, false, "Người dùng không hợp lệ.")

      existingUser.fullName = fullName
      existingUser.nickname = nickname
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

      if (!existingUser) return failureResponse(400, false, "Người dùng không tồn tại.")

      //verify password
      const isMatchedPassword = await argon2.verify(existingUser.password, oldPassword)

      if (!isMatchedPassword) return {
        code: 400,
        success: false,
        message: "Mật khẩu cũ không đúng.",
        errors: [
          {
            field: "oldPassword",
            message: "Mật khẩu cũ không đúng."
          }
        ]
      }

      const validateChangePasswordInputError = validateChangePasswordInput(changePasswordInput)

      if (validateChangePasswordInputError !== null) return { code: 400, success: false, ...validateChangePasswordInputError }

      //Hash new password
      const updatedPassword = await argon2.hash(newPassword)

      //Update user's password
      existingUser.password = updatedPassword
      existingUser.save()

      return successResponse(200, true, "Mật khẩu đã được cập nhật thành công.", existingUser)
    } catch (error) {
      return failureResponse(500, false, `Internal server error ${error.message}`)
    }
  }

  @Mutation(_return => Boolean, { description: "Forgot password" })
  async forgotPassword(@Arg("forgotPasswordInput") { email }: ForgotPasswordInput): Promise<boolean> {

    const user = await User.findOne({ email })

    if (!user) return true

    await TokenModel.findOneAndDelete({ userId: `${user.id}` })

    const resetToken = uuidv4();
    const hashedToken = await argon2.hash(resetToken)

    await new TokenModel({ userId: `${user.id}`, token: hashedToken }).save();

    let html = `<span>Xin hãy click vào đường dẫn để thay đổi mật khẩu của bạn: </span>
    <a style="color:#059669;text-decoration: underline" href="http://localhost:3000/reset-password?token=${resetToken}&userId=${user.id}">Tại đây.</a> 
    <p>Lưu ý: Vui lòng hoàn thành việc cập nhật mật khẩu, đường dẫn sẽ hết hạn sau 15 phút.</p>`

    await sendEmail(email, html)
    return true
  }

  @Mutation(_return => UserMutationResponse, { description: "Reset password" })
  async resetPassword(@Arg("token") token: string, @Arg("userId") userId: string, @Arg("resetPasswordInput") resetPasswordInput: ResetPasswordInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    const { newPassword, confirmPassword } = resetPasswordInput
    const validateResetPasswordInputError = validateResetPasswordInput({ newPassword, confirmPassword })
    if (validateResetPasswordInputError !== null) return { code: 400, success: false, ...validateResetPasswordInputError }
    try {
      const resetPasswordTokenRecord = await TokenModel.findOne({ userId });
      if (!resetPasswordTokenRecord) return failureResponse(404, false, "Token không hợp lệ hoặc đã hết hạn.")

      const resetPasswordTokenValid = argon2.verify(resetPasswordTokenRecord.token, token);
      if (!resetPasswordTokenValid) return failureResponse(404, false, "Token không hợp lệ hoặc đã hết hạn.")

      const userIdNum = parseInt(userId);
      const user = await User.findOne(userIdNum);

      if (!user) return failureResponse(404, false, "Thông tin người dùng không còn hiệu lực.")

      const hashedPassword = await argon2.hash(newPassword)

      await User.update({ id: userIdNum }, { password: hashedPassword })
      await resetPasswordTokenRecord.deleteOne();


      req.session.userId = user.id;
      req.session.roleId = user.roleId
      return { code: 200, success: true, message: "Mật khẩu đã được thay đổi thành công.", user }

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

      await singleUpload(file, folderName).then(async value => {
        imageUrl = value as string
        const existingImage = existingUser.avatar
        if (existingImage) {
          new Promise(_ => deleteFile(existingImage.split("/").pop() as string, folderName))
        }

        existingUser.avatar = imageUrl
        existingUser.save();
      })
      return true
    } catch (error) {
      return false
    }
  }
}
