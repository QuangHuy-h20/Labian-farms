import LoginForm from "@components/auth/login-form";
import Spinner from "@components/loader/spinner";
import { useCheckAuth } from "@utils/useCheckAuth";

const Login = () => {
  const { data, loading } = useCheckAuth();

  return (
    <>
      {loading || (!data && data?.me) ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="large" />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-white sm:bg-gray-100">
          <div className="m-auto max-w-[420px] w-full bg-white sm:shadow p-5 sm:p-8 rounded">
            <div className="flex flex-col items-center justify-center mb-6">
              <h1 className="font-medium text-3xl text-emerald-600 mb-6">
                Labian Farms
              </h1>
              <span className="text-xl text-gray-400 italic font-light">
                Đăng nhập
              </span>
            </div>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
