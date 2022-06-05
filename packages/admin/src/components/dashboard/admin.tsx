import { CoinIcon } from "@components/icons/coin-icon";
import { ProductIcon } from "@components/icons/product-icon";
import { ShopIcon } from "@components/icons/sidebar";
import { UserIcon } from "@components/icons/user-icon";
import PageLoader from "@components/ui/page-loader";
import ColumnChart from "@components/widgets/column-chart";
import StickerCard from "@components/widgets/sticker-card";
import {
  useFarmsQuery,
  useProductsQuery,
  useToursQuery,
  useUsersQuery
} from "@generated/graphql";
import usePrice from "@utils/use-price";

export default function Dashboard() {
  const { data: userData, loading: userLoading } = useUsersQuery();

  const { data: productData, loading: productLoading } = useProductsQuery();

  const { data: farmData, loading: farmLoading } = useFarmsQuery();

  const { price: total_revenue } = usePrice({
    amount: 6969696969,
  });

  if (userLoading || productLoading || farmLoading) return <PageLoader />;
  let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0);

  salesByYear = [0.6, 0.9, 1.8, 1.5, 1.1, 1.7, 1.4, 1.2, 0.7, 0.5, 1.2, 0.5]

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <div className="w-full ">
          <StickerCard
            titleTransKey="Tổng số khách hàng"
            subtitleTransKey=""
            icon={<UserIcon className="w-7 h-7" color="#047857" />}
            iconBgStyle={{ backgroundColor: "#A7F3D0" }}
            count={userData.users.length}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="Tổng số sản phẩm"
            subtitleTransKey=""
            icon={<ProductIcon />}
            count={productData?.allProducts?.length}
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
            icon={<ShopIcon className="w-6" color="#1D4ED8" />}
            iconBgStyle={{ backgroundColor: "#93C5FD" }}
            count={farmData.allFarms.length}
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
  );
}
