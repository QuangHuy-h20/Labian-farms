import Link from "@components/ui/link";
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
      <div className="w-full relative">
        <Lottie options={defaultOptions} height={350} width={350} />
      </div>

      <h3 className="mt-5 sm:mt-10 text-xl md:text-5xl text-gray-600 font-bold text-center">
        Truy cập bị từ chối
      </h3>
      <p className="text-sm 3xl:text-xl text-gray-500 mt-14 text-center">
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
