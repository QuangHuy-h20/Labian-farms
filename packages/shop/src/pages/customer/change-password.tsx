import { ReactElement } from "react";
import { getLayout as getSiteLayout } from "@components/layouts/site-layout";
import {
  ChangePasswordInput,
  useChangePasswordMutation,
} from "@generated/graphql";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordInput } from "@components/forms";
import Button from "@components/ui/button";
import { toast } from "react-toastify";

type FieldErrorType = "confirmPassword" | "newPassword" | "oldPassword";

const schema: yup.SchemaOf<ChangePasswordInput> = yup.object().shape({
  oldPassword: yup.string().required("Bạn chưa nhập mật khẩu cũ").default(""),
  newPassword: yup.string().required("Bạn chưa nhập mật khẩu mới").default(""),
  confirmPassword: yup
    .string()
    .required("Bạn chưa xác nhận mật khẩu mới")
    .default(""),
});

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ChangePasswordInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: ChangePasswordInput) => {
    const response = await changePassword({
      variables: { changePasswordInput: values },
      onCompleted: (data) => {
        if (data.changePassword.success)
          toast.success(data.changePassword.message);
      },
      onError: (error) => toast.error(error.message),
    });

    const changePasswordErrors = response.data?.changePassword?.errors;

    if (changePasswordErrors)
      changePasswordErrors.map(({ field, message }) => {
        setError(field as FieldErrorType, { message });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-10">
      <PasswordInput
        name="oldPassword"
        label="Mật khẩu cũ"
        {...register("oldPassword")}
        placeholder="Nhập mật khẩu cũ"
        error={errors?.oldPassword?.message!}
      />
      <PasswordInput
        name="newPassword"
        label="Mật khẩu mới"
        {...register("newPassword")}
        placeholder="Nhập mật khẩu mới"
        error={errors?.newPassword?.message!}
      />
      <PasswordInput
        name="confirmPassword"
        label="Mật khẩu cũ"
        {...register("confirmPassword")}
        placeholder="Xác nhận mật khẩu"
        error={errors?.confirmPassword?.message!}
      />
      <div className="flex justify-end w-full">
        <Button
          className="px-6"
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          size="medium"
          variant="normal"
        >
          Xác nhận
        </Button>
      </div>
    </form>
  );
};

const getLayout = (page: ReactElement) =>
  getSiteLayout(
    <div className="bg-gray-100 flex flex-col lg:flex-row items-start w-full mx-auto">
      <div className="flex justify-center bg-white w-full px-1 pb-1 overflow-hidden border rounded">
        <>{page}</>
      </div>
    </div>
  );
ChangePassword.getLayout = getLayout;
export default ChangePassword;
