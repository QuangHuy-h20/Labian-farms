import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInput, MeDocument, MeQuery, useLoginMutation } from "@generated/graphql";
import * as yup from "yup";
import Image from "next/image";
import { Spinner, WrapperForm } from '@components/index';
import { Input, PasswordInput } from "@components/forms";
import { useModalAction } from "@components/modal/modal.context";

type FieldErrorType = 'loginField' | 'password'

const schema: yup.SchemaOf<LoginInput> = yup.object().shape({
  loginField: yup.string().required("Bạn chưa nhập tên đăng nhập.").default(""),
  password: yup.string().required("Bạn chưa nhập mật khẩu.").default("")
})

const Login= () => {
  const { openModal, closeModal } = useModalAction();
  const [loginUser] = useLoginMutation()

  const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (values) => {
    const response = await loginUser({
      variables: { loginInput: values }, update(cache, { data }) {

        if (data?.login.message) {
          cache.writeQuery<MeQuery>({ query: MeDocument, data: { me: data.login.user } })
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
                  <button onClick={() => openModal('REGISTER')} className="bg-none text-sm font-semibold text-emerald-500 hover:text-emerald-600 mb-1">Quên mật khẩu?</button>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-500 hover:bg-emerald-600 duration-200 text-white py-3 font-semibold my-4 rounded-md">{isSubmitting && isSubmitting ? (<div className="flex justify-center">
                  <Spinner />
                </div>
                ) : (
                  <span className="cursor-pointer text-xl">Đăng nhập</span>
                )}
                </button>
                <div className="mt-10 mb-6">
                  <hr />
                </div>
                <div className="text-center text-md">
                  <span className="mr-2 font-light">Chưa có tài khoản?</span>
                  <button onClick={() => openModal('REGISTER')} className="bg-none font-semibold text-blue-400 hover:underline">Đăng ký ngay!</button>
                </div>
            </form>
          </div>
          <div className="hidden md:block">
            <Image className="col-span 2 rounded-r-lg" src="https://labian-farms.s3.ap-southeast-1.amazonaws.com/login-image.jpg" width={240} height={400} layout="responsive" objectFit="cover" />
          </div>
        </div>
      </WrapperForm>
    </>
  )
};

export default Login;
