import { Image } from "@components/ui/image";
import { productPlaceholder } from "@lib/placeholders";
import ProductsGrid from "@components/products/grid";
import { getLayout } from "@components/layouts/site-layout";
import { useRouter } from "next/router";
import {
  useFarmQuery,
  useProductsByFarmQuery,
  useToursByFarmQuery,
} from "@generated/graphql";
import FarmSidebar from "@components/shops/sidebar";
import PageLoader from "@components/loader/page-loader";
import TourList from "@components/tour/tour-list";
import CartCounterButton from "@components/cart/cart-counter-button";

const FarmPage = () => {
  const router = useRouter();

  const { data: farmData } = useFarmQuery({
    variables: {
      slug: router.query.slug as string,
    },
  });

  const { data: productData, loading: productLoading } = useProductsByFarmQuery(
    {
      variables: {
        farmId: farmData?.farm?.id,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const { data: tourData, loading: tourLoading } = useToursByFarmQuery({
    variables: {
      farmId: farmData?.farm?.id,
    },
  });

  if (productLoading || tourLoading) return <PageLoader />;

  return (
    <div className="flex flex-col bg-gray-100 lg:flex-row lg:items-start lg:p-8">
      <FarmSidebar farm={farmData?.farm} className="sticky top-24 lg:top-28" />

      <div className="flex w-full flex-col lg:px-4">
        <div className="relative h-full w-full overflow-hidden rounded">
          <Image
            src={farmData?.farm?.logoImage ?? productPlaceholder}
            layout="responsive"
            width={2340}
            height={870}
            className="h-full w-full"
          />
        </div>

        {tourData && (
          <div className="mt-8">
            <h3 className="text-2xl text-gray-600 font-semibold mb-4">
              Tour tham quan
            </h3>
            <TourList tours={tourData?.toursByFarm} />
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-2xl text-gray-600 font-semibold mb-4">
            Sản phẩm của nông trại
          </h3>
          <ProductsGrid products={productData?.productsByFarm} />
        </div>
      </div>
      <CartCounterButton />
    </div>
  );
};

export default FarmPage;
