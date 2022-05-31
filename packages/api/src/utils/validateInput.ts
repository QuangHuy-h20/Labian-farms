import { ChangePasswordInput, RegisterInput, ResetPasswordInput } from "../services/user/user.input";

const MIN_LENGTH = 6;
const MAX_LENGTH = 16;
const REGEXP_PHONE_NUMBER = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const validateEmailAndPhone = (email: string, phone: string) => {
  if (!email.includes("@"))
    return {
      message: "Email không hợp lệ.",
      errors: [{ field: "email", message: "Email phải bao gồm ký tự @." }],
    };

  if (!phone.match(REGEXP_PHONE_NUMBER))
    return {
      message: "Số điện thoại không hợp lệ."
    };

  return null
}

export const validateRegisterInput = (registerInput: RegisterInput) => {
  const { email, phone, password } = registerInput;
  if (!email.includes("@"))
    return {
      message: "Email không hợp lệ.",
      errors: [{ field: "email", message: "Email phải bao gồm ký tự @." }],
    };

  if (!phone.match(REGEXP_PHONE_NUMBER))
    return {
      message: "Số điện thoại không hợp lệ.",
      errors: [{ field: "phone", message: "Số điện thoại không hợp lệ." }],
    };

  if (password.length >= MAX_LENGTH || password.length <= MIN_LENGTH)
    return {
      message: "Mật khẩu không hợp lệ",
      errors: [
        {
          field: "password",
          message: `${password.length <= MIN_LENGTH
            ? "Độ dài mật khẩu phải lớn hơn 6."
            : "Độ dài mật khẩu phải nhỏ hơn 16."
            }`,
        },
      ],
    };
  return null;
};

export const validateChangePasswordInput = (changePasswordInput: ChangePasswordInput) => {
  const { oldPassword, newPassword, confirmPassword } = changePasswordInput
  if (newPassword.length >= MAX_LENGTH || newPassword.length <= MIN_LENGTH)
    return {
      message: "Mật khẩu không hợp lệ",
      errors: [
        {
          field: "newPassword",
          message: `${newPassword.length <= MIN_LENGTH
            ? "Độ dài mật khẩu phải lớn hơn 6."
            : "Độ dài mật khẩu phải nhỏ hơn 16."
            }`,
        },
      ],
    };

  if (newPassword === oldPassword)
    return {
      message: "Mật khẩu mới phải khác với mật khẩu cũ.",
      errors: [
        {
          field: "newPassword",
          message: "Mật khẩu mới phải khác với mật khẩu cũ."
        }
      ]
    }

  if (confirmPassword !== newPassword)
    return {
      code: 400, success: false, message: "Xác nhận mật khẩu không khớp với mật khẩu mới.", errors: [{
        field: "confirmPassword",
        message: "Xác nhận mật khẩu không khớp với mật khẩu mới."
      }]
    }
  return null;
}


export const validateResetPasswordInput = ({ newPassword, confirmPassword }: ResetPasswordInput) => {

  if (newPassword.length >= MAX_LENGTH || newPassword.length <= MIN_LENGTH)
    return {
      message: "Mật khẩu không hợp lệ",
      errors: [
        {
          field: "newPassword",
          message: `${newPassword.length <= MIN_LENGTH
            ? "Độ dài mật khẩu phải lớn hơn 6."
            : "Độ dài mật khẩu phải nhỏ hơn 16."
            }`,
        },
      ],
    };

  if (confirmPassword !== newPassword)
    return {
      code: 400, success: false, message: "Xác nhận mật khẩu không khớp với mật khẩu mới.", errors: [{
        field: "confirmPassword",
        message: "Xác nhận mật khẩu không khớp với mật khẩu mới."
      }]
    }
  return null;
}
