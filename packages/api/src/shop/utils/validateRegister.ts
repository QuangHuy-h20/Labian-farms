import { RegisterInput } from "../services/user/user.input";

export const validateRegisterInput = (registerInput: RegisterInput) => {
  const MIN_LENGTH = 6;
  const MAX_LENGTH = 16;
  const { email, phoneNumber, password } = registerInput;
  if (!email.includes("@"))
    return {
      message: "Invalid email",
      errors: [{ field: "email", message: "Email must include @ symbol" }],
    };
  const regExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

  if (!phoneNumber.match(regExp))
    return {
      message: "Invalid phone number",
      errors: [
        { field: "phoneNumber", message: "Invalid phone number format" },
      ],
    };

  if (password.length >= MAX_LENGTH || password.length <= MIN_LENGTH)
    return {
      message: "Invalid password",
      errors: [
        {
          field: "password",
          message: `${
            password.length <= MIN_LENGTH
              ? "Length password must be greater than 6"
              : "Length password must be smaller than 16"
          }`,
        },
      ],
    };
  return null;
};
