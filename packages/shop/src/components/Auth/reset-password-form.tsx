import * as yup from "yup";
import { MeDocument, MeQuery, ResetPasswordInput, useResetPasswordMutation } from "@generated/graphql"
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useModalAction } from "@components/modal/modal.context";
import WrapperForm from "@components/ui/form-wrapper";
import { PasswordInput } from "@components/forms";
import Button from "@components/ui/button";

type FieldErrorType = 'newPassword' | 'confirmPassword'

const schema: yup.SchemaOf<ResetPasswordInput> = yup.object().shape({
  newPassword: yup.string().required("Mật khẩu không được để trống.").default(""),
  confirmPassword: yup.string().required("Chưa xác nhận lại mật khẩu.").default("")
});
const ResetPassword = () => {

  const [resetPassword, { data, loading }] = useResetPasswordMutation()
  const { closeModal } = useModalAction();

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ResetPasswordInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: ResetPasswordInput) => {

    const { userId, token } = router.query;

    if (userId && token) {
      const response = await resetPassword({
        variables: {
          userId: userId as string,
          token: token as string,
          resetPasswordInput: values,
        },
        update(cache, { data }) {          
          if (data?.resetPassword.success) {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: { me: data.resetPassword.user },
            });
          }
        },
      });
      const resetPasswordErrors = response.data?.resetPassword?.errors
      
      if (resetPasswordErrors) resetPasswordErrors.map(({ field, message }) => { setError(field as FieldErrorType, { message }) })
      
      else if (response?.data?.resetPassword?.user) {
        closeModal()
        router.push("/")
        toast.success(response.data.resetPassword.message)
      }      
    }
  }

  return (
    <WrapperForm>
      <div className="grid w-full">
        <div className="py-6 px-5 sm:p-6 bg-white w-screen md:max-w-[640px] min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center rounded-sm ">
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-3xl mt-4">Thay đổi mật khẩu mới</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <p className="font-light mb-4 text-left">Mật khẩu dài từ 6 đến 16 kí tự, bao gồm số và chữ</p>
              <PasswordInput name="newPassword" label="Mật khẩu mới" {...register("newPassword")} placeholder="Nhập mật khẩu mới" error={errors?.newPassword?.message!} />
              <PasswordInput name="confirmPassword" label="Nhắc lại mật khẩu" {...register("confirmPassword")} placeholder="Nhắc lại mật khẩu" error={errors?.confirmPassword?.message!} />
              <Button type="submit" loading={isSubmitting} size="large" variant="normal">Đổi mật khẩu</Button>
            </>

          </form>
        </div>
      </div>
    </WrapperForm>
  )
}

export default ResetPassword