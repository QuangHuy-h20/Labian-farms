import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginInput, MeDocument, MeQuery, useLoginMutation } from "@generated/graphql";
import * as yup from "yup";
import Image from "next/image";
import { Input, PasswordInput } from "@components/forms";
import { useModalAction } from "@components/modal/modal.context";
import WrapperForm from "@components/ui/form-wrapper";
import Button from "@components/ui/button";

type FieldErrorType = 'loginField' | 'password'

const schema: yup.SchemaOf<LoginInput> = yup.object().shape({
  loginField: yup.string().required("Bạn chưa nhập tên đăng nhập").default(""),
  password: yup.string().required("Bạn chưa nhập mật khẩu").default("")
})

const Login = () => {
  const { openModal, closeModal } = useModalAction();
  const [loginUser] = useLoginMutation()

  const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: LoginInput) => {
    const response = await loginUser({
      variables: { loginInput: values }, update(cache, { data }) {

        if (data?.login.message) {
          cache.writeQuery<MeQuery>({ query: MeDocument, data: { me: data?.login?.user! } })
        }
      }
    })
    const loginFieldErrors = response.data?.login?.errors;

    if (loginFieldErrors) loginFieldErrors.map(({ field, message }) => { setError(field as FieldErrorType, { message }) })

    else if (response.data?.login?.user) closeModal()
  };

  return (
    <>
      <WrapperForm>
        <div className="grid md:grid-cols-2 w-full">
          <div className="py-6 px-5 sm:p-6 bg-white w-screen md:max-w-[420px] min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center rounded-l-lg">
            <h2 className="text-3xl mt-4 mb-10">Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input name="loginField" label="Tài khoản" type="text" {...register("loginField")} placeholder="Nhập email/số điện thoại/tài khoản" error={errors?.loginField?.message!} />

              <PasswordInput name="password" label="Mật khẩu" {...register("password")} placeholder="Nhập mật khẩu" error={errors?.password?.message!} />

              <div className="flex justify-end">
                <Button type="button" size="none" variant="transparent" className="mb-4 text-sm text-emerald-500 hover:text-emerald-600 font-normal" onClick={() => openModal('FORGOT_PASSWORD')}>Quên mật khẩu?</Button>

              </div>
              <Button type="submit" loading={isSubmitting} disabled={isSubmitting} size="large" variant="normal">Đăng nhập</Button>
              <div className="mt-10 mb-6">
                <hr />
              </div>
              <div className="text-center text-md">
                <span className="mr-2 font-light">Chưa có tài khoản?</span>
                <button type="button" onClick={() => openModal('REGISTER')} className="bg-none font-semibold text-blue-400 hover:underline">Đăng ký ngay!</button>
              </div>
            </form>
          </div>
          <div className="hidden md:block">
            <img className="col-span 2 rounded-r-lg w-96 object-cover bg-contain" style={{ height: "600px" }} src="https://storage.googleapis.com/labian_farms/login-img.jpg" />
          </div>
        </div>
      </WrapperForm>
    </>
  )
};

export default Login;
