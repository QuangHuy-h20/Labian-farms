import { Input, PasswordInput } from '@components/forms';
import { useModalAction } from '@components/modal/modal.context';
import { MeDocument, MeQuery, RegisterInput, useRegisterMutation } from '@generated/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { Spinner, WrapperForm } from '@components/index';

const schema: yup.SchemaOf<RegisterInput> = yup.object().shape({
  email: yup.string().email().required("Yêu cầu cần có email.").default(""),
  password: yup.string().required("Yêu cầu cần có mật khẩu.").default(""),
  phone: yup.string().required("Yêu cầu cần có số điện thoại").default(""),
});

type FieldErrorType = 'email' | 'password' | 'phone'

const Register = () => {
  const { openModal, closeModal } = useModalAction();
  const [registerUser] = useRegisterMutation()

  const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (values) => {
    const response = await registerUser({
      variables: { registerInput: values }, update(cache, { data }) {

        if (data?.register.message) {
          cache.writeQuery<MeQuery>({ query: MeDocument, data: { me: data.register.user } })
        }
      }
    })
    const registerFieldErrors = response.data?.register?.errors;

    if (registerFieldErrors) registerFieldErrors.map(({ field, message }) => { setError(field as FieldErrorType, { message }) })

    else if (response.data?.register?.user) closeModal()
  };

  return (
    <>
      <WrapperForm>
        <div className="grid md:grid-cols-2 w-full">
          <div className="py-6 px-5 sm:p-6 bg-white w-screen md:max-w-[420px] min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center rounded-l-lg">
            <h2 className="text-3xl mt-4 mb-10">Đăng ký</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input name="email" label="Email" type="email" {...register("email")} placeholder="Nhập email" error={errors?.email?.message!} />
              <PasswordInput name="password" label="Mật khẩu" {...register("password")} placeholder="Nhập mật khẩu" error={errors?.password?.message!} />
              <Input name="phone" label="Số điện thoại" type="text" {...register("phone")} placeholder="Nhập số điện thoại" error={errors?.phone?.message!} />

              <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-500 hover:bg-emerald-600 duration-200 text-white py-3 font-semibold my-4 rounded-md">{isSubmitting && isSubmitting ? (<div className="flex justify-center">
                <Spinner />
              </div>
              ) : (
                <span className="cursor-pointer text-xl">Đăng ký</span>
              )}
              </button>
              <div className="mt-10 mb-6">
                <hr />
              </div>
              <div className="text-center text-md">
                <span className="mr-2 font-light">Đã có tài khoản?</span>
                <button onClick={() => openModal('LOGIN')} className="bg-none font-semibold text-blue-400 hover:underline">Đăng nhập ngay!</button>
              </div>
            </form>
          </div>
          <div className="hidden md:block">
            <Image className="col-span 2 rounded-r-lg" src="https://labian-farms.s3.ap-southeast-1.amazonaws.com/register-image.jpg" width={240} height={400} layout="responsive" objectFit="cover" />
          </div>
        </div>
      </WrapperForm>
    </>
  )
};

export default Register;
