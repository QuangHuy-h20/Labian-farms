import Link from "@components/ui/Link";
import Lottie from "react-lottie";
import accessDeniedLottie from "@lotties/access-denied.json";
const AccessDeniedPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: accessDeniedLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full h-80 sm:h-96 3xl:h-[420px] relative">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>

      <h3 className="mt-5 sm:mt-10 text-sub-heading text-xl md:text-4xl 3xl:text-3xl font-bold text-center">
        Truy cập bị từ chối
      </h3>
      <p className="text-sm 3xl:text-xl text-body mt-6 text-center">
        Bạn không có quyền để truy cập trang ứng dụng này
        <Link
          href="http://localhost:3000/"
          className="bg-emerald-500 text-white text ml-2 p-3 rounded-sm hover:bg-emerald-600 transition"
        >
          Quay lại trang chủ
        </Link>
      </p>
    </div>
  );
};

export default AccessDeniedPage;
