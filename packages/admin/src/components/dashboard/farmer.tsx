import Link from "@components/ui/link";
import PageLoader from "@components/ui/page-loader";
import { useFarmByFarmerQuery } from "@generated/graphql";
import greetingLottie from "@lotties/greeting.json";
import waitingForApprove from "@lotties/waiting-to-approve.json";
import haveAGoodDay from "@lotties/have-a-good-day.json";
import { useCheckAuth } from "@utils/useCheckAuth";
import Lottie from "react-lottie";

const FarmerDashboard = () => {
  const { meData, meLoading } = useCheckAuth();
  const { data, loading } = useFarmByFarmerQuery({
    variables: {
      ownerId: meData?.me?.id,
    },
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: !data?.farmByFarmer ? greetingLottie : haveAGoodDay,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const options = {
    loop: true,
    autoplay: true,
    animationData: waitingForApprove,
    rendererSettings: {
      preserveAspectRatio: "",
    },
  };

  const NewFarmerScreen = () => (
    <>
      <div className="w-full relative">
        <Lottie options={defaultOptions} height={350} width={350} />
      </div>

      <h3 className="mt-5 sm:mt-10 text-xl italic md:text-5xl text-gray-500 font-semibold text-center">
        Cô chú/ anh chị mới tham gia bán hàng với tụi con/ tụi em?
      </h3>
      <div className="flex items-center justify-center mt-14">
        <p className="text-2xl 3xl:text-xl text-gray-500 text-center">
          Mở nông trại bán hàng cùng với 
          <span className="text-emerald-500 italic">Labian Farms</span> nào!
        </p>
      </div>
        <Link
          className="flex mt-4 items-center py-4 px-3 justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-emerald-500 text-white border border-transparent hover:bg-emerald-500 ml-6"
          href="farms/create"
        >
          Tạo nông trại
        </Link>
    </>
  );

  if (loading || meLoading) return <PageLoader />;

  if (!data?.farmByFarmer) return <NewFarmerScreen />;

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-8">
      {data?.farmByFarmer && !data?.farmByFarmer?.isActive ? (
        <>
          <div className="w-full relative">
            <Lottie options={defaultOptions} height={480} width={1024} />
          </div>
          <h3 className="mt-5 sm:mt-10 text-xl italic md:text-5xl text-gray-400 font-medium text-center">
            Cô chú/ anh chị vui lòng chờ tụi con/ tụi em xác thực thông tin nông
            trại mình đã tạo nhé!
          </h3>
        </>
      ) : (
        <>
          <div className="w-full relative">
            <Lottie options={defaultOptions} height={350} width={350} />
          </div>
          <p className="text-3xl 3xl:text-xl text-gray-500 mt-8 text-center">
          <span className="text-emerald-500 italic ">Labian Farms</span> chúc cô chú/ anh chị ngày làm việc thật vui vẻ!
        </p>
        </>
      )}
    </div>
  );
};

export default FarmerDashboard;
