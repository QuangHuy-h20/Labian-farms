import { Input, PasswordInput } from "@components/form";
import Spinner from "@components/loader/spinner";
// import { useModalAction } from '@components/modal/modal.context';
import Button from "@components/ui/button";
// import WrapperForm from '@components/ui/form-wrapper';
import {
  MeDocument,
  MeQuery,
  RegisterInput,
  useRegisterMutation,
} from "@generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { constants as c } from "@constants/index";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";

const schema: yup.SchemaOf<RegisterInput> = yup.object().shape({
  email: yup
    .string()
    .email("Email phải đúng định dạng có đuôi @gmail.com")
    .required("Email không được để trống")
    .default(""),
  password: yup.string().required("Mật khẩu không được để trống").default(""),
  phone: yup.string().required("Số điện thoại không được để trống").default(""),
});

type FieldErrorType = "email" | "password" | "phone";

const RegisterForm = () => {
  const router = useRouter();
  const [farmerRegister] = useRegisterMutation({
    onCompleted: (data) => {
      if (data?.farmerRegister?.success) {
        toast.success(c.REGISTER_SUCCESS);
      }
    },
    onError: (err) => {
      toast.error(`Đã xảy ra lỗi: ${err}`);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (values) => {
    const response = await farmerRegister({
      variables: { registerInput: values },
      update(cache, { data }) {
        if (data?.farmerRegister.message) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.farmerRegister.user },
          });
        }
      },
    });
    const registerFieldErrors = response.data?.farmerRegister?.errors;

    if (registerFieldErrors)
      registerFieldErrors.map(({ field, message }) => {
        setError(field as FieldErrorType, { message });
      });
    else if (response.data?.farmerRegister?.user) router.push(ROUTES.DASHBOARD);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          label="Email"
          type="email"
          {...register("email")}
          placeholder="Nhập email"
          error={errors?.email?.message!}
        />
        <PasswordInput
          name="password"
          label="Mật khẩu"
          {...register("password")}
          placeholder="Nhập mật khẩu"
          error={errors?.password?.message!}
        />
        <Input
          name="phone"
          label="Số điện thoại"
          type="text"
          {...register("phone")}
          placeholder="Nhập số điện thoại"
          error={errors?.phone?.message!}
        />

        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          size="large"
          variant="normal"
        >
          <span className="cursor-pointer text-xl">Đăng ký</span>
        </Button>
        <div className="mt-10 mb-6">
          <hr />
        </div>
        <div className="text-center text-md">
          <span className="mr-2 font-light">Đã có tài khoản?</span>
          <Link
            href={ROUTES.LOGIN}
            className="bg-none font-semibold text-blue-400 hover:underline"
          >
            Đăng nhập ngay!
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
