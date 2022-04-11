import { ArrowLeft, TickCircle } from "@assets/icons";
import { Input } from "@components/forms";
import Button from "@components/ui/button";
import WrapperForm from "@components/ui/form-wrapper"
import { ForgotPasswordInput, useForgotPasswordMutation } from "@generated/graphql"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useModalAction } from "@components/modal/modal.context";
import { ChangeEventHandler, FormEvent, useState } from "react";

const schema: yup.SchemaOf<ForgotPasswordInput> = yup.object().shape({
  email: yup.string().required("Email không được để trống").email().default(""),
});

const ForgotPassword = () => {
  const [value, setValue] = useState('')
  const { openModal, closeModal } = useModalAction();
  const [forgotPassword, { data, loading }] = useForgotPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: ForgotPasswordInput) => {
    await forgotPassword({
      variables: { forgotPasswordInput: value }
    })
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <WrapperForm>
      <div className="grid w-full">
        <div className="py-6 px-5 sm:p-6 bg-white w-screen md:max-w-[640px] min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center rounded-sm ">
          <div className="flex flex-col items-start mb-8">
            <Button size="none" variant="transparent" onClick={() => openModal('LOGIN')}><ArrowLeft /></Button>
            <h2 className="text-3xl mt-4">Quên mật khẩu ?</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            {!loading && data ? (
              <>
                <div className="flex justify-center"><TickCircle /></div>
                <h3 className="px-2 mt-6 mb-8">Link lấy lại mật khẩu vừa được gửi tới email <b>{`${value}`}</b>, vui lòng kiểm tra email.</h3>
                <Button onClick={() => closeModal()} type="button" size="large" variant="outline">Đóng</Button>
              </>
            )
              : (
                <>
                  <p className="font-light mb-4 text-left">Vui lòng nhập email để lấy lại mật khẩu</p>
                  <Input name="email" label="Email" type="email" {...register("email")} onChange={handleChange} placeholder="Nhập email" error={errors?.email?.message!} />
                  <Button type="submit" loading={isSubmitting}  size="large" variant="normal">Lấy lại mật khẩu</Button>
                </>
              )
            }
          </form>
        </div>
      </div>
    </WrapperForm>
  )
}

export default ForgotPassword