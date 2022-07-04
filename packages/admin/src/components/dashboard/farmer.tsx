import Link from "@components/ui/link";
import PageLoader from "@components/ui/page-loader";
import { useFarmByFarmerQuery, useProductsByFarmQuery, useToursByFarmQuery } from "@generated/graphql";
import greetingLottie from "@lotties/greeting.json";
import waitingForApprove from "@lotties/waiting-to-approve.json";
import haveAGoodDay from "@lotties/have-a-good-day.json";
import { useCheckAuth } from "@utils/useCheckAuth";
import Lottie from "react-lottie";
import StickerCard from "@components/widgets/sticker-card";
import { ProductIcon } from "@components/icons/product-icon";
import usePrice from "@utils/use-price";
import { DiaryIcon, MyShopIcon } from "@components/icons/sidebar";
import { CoinIcon } from "@components/icons/coin-icon";
import ColumnChart from "@components/widgets/column-chart";

const FarmerDashboard = () => {
  const { meData, meLoading } = useCheckAuth();
  const { data, loading } = useFarmByFarmerQuery({
    variables: {
      ownerId: meData?.me?.id,
    },
  });

  const { data: productData, loading: productLoading } = useProductsByFarmQuery({
    variables: { farmId: data?.farmByFarmer?.id }
  });

  const { data: tourData, loading: tourLoading } = useToursByFarmQuery({
    variables: {
      farmId: data?.farmByFarmer?.id
    }
  })

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
  const { price: total_revenue } = usePrice({
    amount: 10000000,
    currencyCode: "VND"
  });

  let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0);

  salesByYear = [0.6, 0.9, 1.8, 1.5, 1.1, 1.7, 1.4, 1.2, 0.7, 0.5, 1.2, 0.5]


  if (meLoading || productLoading || loading) return <PageLoader />;

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
            <Lottie options={options} height={360} width={1024} />
          </div>
          <h3 className="mt-5 sm:mt-10 text-xl italic md:text-3xl text-gray-400 font-medium text-center">
            Cô chú/anh chị vui lòng chờ tụi con/tụi em xác thực thông tin nông
            trại mình đã tạo nhé!
          </h3>
        </>
      ) : (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            {/* <div className="w-full ">
              <StickerCard
                titleTransKey="Tổng số khách hàng"
                subtitleTransKey=""
                icon={<UserIcon className="w-7 h-7" color="#047857" />}
                iconBgStyle={{ backgroundColor: "#A7F3D0" }}
                count={userData.users.length}
              />
            </div> */}
            <div className="w-full">
              <StickerCard
                titleTransKey="Tổng số sản phẩm"
                subtitleTransKey=""
                icon={<ProductIcon />}
                count={productData?.productsByFarm?.length}
              />
            </div>
            <div className="w-full">
              <StickerCard
                titleTransKey="Tổng doanh thu"
                icon={<CoinIcon />}
                count={total_revenue}
              />
            </div>
            <div className="w-full">
              <StickerCard
                titleTransKey="Tổng số nông trại"
                icon={<DiaryIcon className="w-6" color="#1D4ED8" />}
                iconBgStyle={{ backgroundColor: "#93C5FD" }}
                count={tourData?.toursByFarm.length}
              />
            </div>
          </div>

          <div className="w-full flex flex-wrap mb-6">
            <ColumnChart
              widgetTitle="Doanh thu theo tháng"
              colors={["#03D3B5"]}
              series={salesByYear}
              categories={[
                "Th.1",
                "Th.2",
                "Th.3",
                "Th.4",
                "Th.5",
                "Th.6",
                "Th.7",
                "Th.8",
                "Th.9",
                "Th.10",
                "Th.11",
                "Th.12",
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FarmerDashboard;
