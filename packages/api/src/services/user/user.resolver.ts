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
          message: "Email ho???c s??? ??i???n tho???i ???? ???????c s??? d???ng",
          errors: [
            {
              field: existingUser.email === email ? "email" : "phone",
              message: `${existingUser.email === email ? "email" : "s??? ??i???n tho???i"} ???? ???????c s??? d???ng`,
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

      return { code: 200, success: true, message: "????ng k?? th??nh c??ng!", user: newUser }

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
          message: "Email ho???c s??? ??i???n tho???i ???? ???????c s??? d???ng",
          errors: [
            {
              field: existingUser.email === email ? "email" : "phone",
              message: `${existingUser.email === email ? "email" : "s??? ??i???n tho???i"} ???? ???????c s??? d???ng`,
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

      return { code: 200, success: true, message: "????ng k?? th??nh c??ng!", user: newFarmer }
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

      let html = `<p>???n v??o ???????ng d???n b??n d?????i ????? k??ch ho???t email c???a b???n.</p><a href="http://localhost:3000/confirm-email?token=${activeToken}&userId=${existingUser.id}}">Nh???n v??o ????y ????? k??ch ho???t email.</a> `
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
      if (!activeEmailTokenRecord) return failureResponse(404, false, "Token kh??ng h???p l??? ho???c ???? h???t h???n.")

      const activeEmailTokenValid = argon2.verify(activeEmailTokenRecord.token, token);
      if (!activeEmailTokenValid) return failureResponse(404, false, "Token kh??ng h???p l??? ho???c ???? h???t h???n.")

      const userIdNum = parseInt(userId);
      const user = await User.findOne(userIdNum);

      if (!user) return failureResponse(404, false, "Th??ng tin ng?????i d??ng kh??ng c??n hi???u l???c.")
      await activeEmailTokenRecord.deleteOne();
      await User.update({ id: userIdNum }, { isActiveEmail: true })

      return successResponse(200, true, "K??ch ho???t email th??nh c??ng.")
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
        message: "T??i kho???n ho???c m???t kh???u kh??ng h???p l???.",
        errors: [
          {
            field: "loginField",
            message: "T??i kho???n ho???c m???t kh???u kh??ng h???p l???",
          },
        ],
      };

      //Verify password matched password of user or not
      const isValidPassword = await argon2.verify(existingUser.password, password);
      if (!isValidPassword) return {
        code: 400,
        success: false,
        message: "T??i kho???n ho???c m???t kh???u kh??ng h???p l???.",
        errors: [
          {
            field: "password",
            message: "T??i kho???n ho???c m???t kh???u kh??ng h???p l???",
          },
        ],
      };

      //All good
      req.session.userId = existingUser.id;
      req.session.roleId = existingUser.roleId;

      return { code: 200, success: true, message: "????ng nh???p th??nh c??ng.", user: existingUser }
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

      if (!existingUser) return failureResponse(400, false, "Ng?????i d??ng kh??ng h???p l???.")

      existingUser.fullName = fullName
      existingUser.nickname = nickname
      existingUser.gender = gender
      existingUser.dateOfBirth = dateOfBirth
      existingUser.address = address

      existingUser.save();
      return { code: 200, success: true, message: "C???p nh???t th??ng tin th??nh c??ng.", user: existingUser }
    } catch (error) {
      return failureResponse(500, false, `Internal server error ${error.message}`)
    }
  }

  @Mutation(_return => UserMutationResponse, { description: "Change user password" })
  async changePassword(@Arg("changePasswordInput") changePasswordInput: ChangePasswordInput, @Ctx() { req }: Context): Promise<UserMutationResponse> {
    try {

      const { oldPassword, newPassword } = changePasswordInput
      const existingUser = await User.findOne(req.session.userId)

      if (!existingUser) return failureResponse(400, false, "Ng?????i d??ng kh??ng t???n t???i.")

      //verify password
      const isMatchedPassword = await argon2.verify(existingUser.password, oldPassword)

      if (!isMatchedPassword) return {
        code: 400,
        success: false,
        message: "M???t kh???u c?? kh??ng ????ng.",
        errors: [
          {
            field: "oldPassword",
            message: "M???t kh???u c?? kh??ng ????ng."
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

      return successResponse(200, true, "M???t kh???u ???? ???????c c???p nh???t th??nh c??ng.", existingUser)
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

    let html = `<span>Xin h??y click v??o ???????ng d???n ????? thay ?????i m???t kh???u c???a b???n: </span>
    <a style="color:#059669;text-decoration: underline" href="http://localhost:3000/reset-password?token=${resetToken}&userId=${user.id}">T???i ????y.</a> 
    <p>L??u ??: Vui l??ng ho??n th??nh vi???c c???p nh???t m???t kh???u, ???????ng d???n s??? h???t h???n sau 15 ph??t.</p>`

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
      if (!resetPasswordTokenRecord) return failureResponse(404, false, "Token kh??ng h???p l??? ho???c ???? h???t h???n.")

      const resetPasswordTokenValid = argon2.verify(resetPasswordTokenRecord.token, token);
      if (!resetPasswordTokenValid) return failureResponse(404, false, "Token kh??ng h???p l??? ho???c ???? h???t h???n.")

      const userIdNum = parseInt(userId);
      const user = await User.findOne(userIdNum);

      if (!user) return failureResponse(404, false, "Th??ng tin ng?????i d??ng kh??ng c??n hi???u l???c.")

      const hashedPassword = await argon2.hash(newPassword)

      await User.update({ id: userIdNum }, { password: hashedPassword })
      await resetPasswordTokenRecord.deleteOne();


      req.session.userId = user.id;
      req.session.roleId = user.roleId
      return { code: 200, success: true, message: "M???t kh???u ???? ???????c thay ?????i th??nh c??ng.", user }

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
