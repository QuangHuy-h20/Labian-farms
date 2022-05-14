import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LoginInput,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from "@generated/graphql";
import * as yup from "yup";
import Spinner from "@components/loader/spinner";
import Button from "@components/ui/button";
import { Input, PasswordInput } from "@components/form";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import Link from "@components/ui/link";

type FieldErrorType = "loginField" | "password";

const schema: yup.SchemaOf<LoginInput> = yup.object().shape({
  loginField: yup.string().required("Bạn chưa nhập tên đăng nhập.").default(""),
  password: yup.string().required("Bạn chưa nhập mật khẩu.").default(""),
});

export default function LoginPage() {
  const [loginUser] = useLoginMutation();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (values) => {
    const response = await loginUser({
      variables: { loginInput: values },
      update(cache, { data }) {
        if (data?.login.message) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.login.user },
          });
        }
      },
    });
    const loginFieldErrors = response.data?.login?.errors;

    if (loginFieldErrors)
      loginFieldErrors.map(({ field, message }) => {
        setError(field as FieldErrorType, { message });
      });
    else if (response.data?.login?.user) router.push(ROUTES.DASHBOARD);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="loginField"
          defaultValue="0903633113"
          label="Tài khoản"
          type="text"
          {...register("loginField")}
          placeholder="Nhập email/số điện thoại/tài khoản"
          error={errors?.loginField?.message!}
        />

        <PasswordInput
          name="password"
          defaultValue="1234567"
          label="Mật khẩu"
          {...register("password")}
          placeholder="Nhập mật khẩu"
          error={errors?.password?.message!}
        />

        <div className="flex justify-end">
          <button className="bg-none text-sm font-semibold text-emerald-500 hover:text-emerald-600 mb-1">
            Quên mật khẩu?
          </button>
        </div>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          size="large"
          variant="normal"
        >
          <span className="cursor-pointer text-xl">Đăng nhập</span>
        </Button>
        <div className="mt-10 mb-6">
          <hr />
        </div>
        <div className="text-center text-md">
          <span className="mr-2 font-light">Chưa có tài khoản?</span>
          <Link
            href={ROUTES.REGISTER}
            className="bg-none font-semibold text-blue-400 hover:underline"
          >
            Đăng ký ngay!
          </Link>
        </div>
      </form>
    </>
  );
}
