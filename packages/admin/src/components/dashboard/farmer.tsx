// import ErrorMessage from "@components/ui/error-message";
// import Loader from "@components/ui/loader/loader";
// import { useMyShopsQuery } from "@graphql/shops.graphql";
// import ShopCard from "@components/shop/shop-card";
// import Image from "next/image";
// import NoShopSvg from "../../../public/no-shop.svg";

export default function FarmerDashboard() {
  // const { data, loading, error } = useMyShopsQuery();

  // if (loading) return <Loader text={t("common:text-loading")} />;
  // if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      Farmer Dashboard
      {/* <div className="border-b border-dashed border-border-base mb-5 sm:mb-8 pb-8">
        <h1 className="text-lg font-semibold text-heading">
          {t("common:sidebar-nav-item-my-shops")}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 gap-5">
        {data?.me?.shops?.map((myShop: any, idx: number) => (
          <ShopCard shop={myShop} key={idx} />
        ))}
      </div>

      {!data?.me?.managed_shop && !data?.me?.shops?.length ? (
        <div className="w-full flex flex-col items-center p-10">
          <div className="w-[300px] sm:w-[490px] h-[180px] sm:h-[370px] relative">
            <Image
              alt={t("common:text-image")}
              src={NoShopSvg}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className="text-lg font-semibold text-center text-body-dark mt-6 sm:mt-10">
            {t("common:text-no-shop")}
          </span>
        </div>
      ) : null}
      {!!data?.me?.managed_shop ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 gap-5">
          <ShopCard shop={data?.me?.managed_shop} />
        </div>
      ) : null} */}
    </>
  );
}
