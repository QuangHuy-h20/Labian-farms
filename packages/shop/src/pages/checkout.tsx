import dynamic from "next/dynamic";
import EmptyCartIcon from "@components/icons/empty-cart";

import Head from "next/head";
import { useMeQuery } from "@generated/graphql";
import { useCart } from "@store/quick-cart/cart.context";
import ItemCard from "@components/checkout/item/item-card";

const RightSideView = dynamic(
  () => import("@components/checkout/right-side-view"),
  { ssr: false }
);

export default function CheckoutPage() {
  const { items, total, isEmpty } = useCart();

  return (
    <>
      <Head>
        <title>Giỏ hàng | Labian Farms</title>
      </Head>
      <div className="px-4 py-8 bg-gray-100 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="bg-white flex flex-col items-center w-full max-w-7xl m-auto lg:flex-row lg:items-start justify-between lg:space-x-8">
          <div className=" space-y-6 px-6 py-3 ml-10 mt-4 lg:max-w-3xl flex-grow w-full ">
            <h1 className="text-center text-3xl text-gray-500">
              Thông tin giỏ hàng
            </h1>
            <div className="flex flex-col ">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full mb-4">
                  <EmptyCartIcon width={140} height={176} />
                  <h4 className="mt-6 text-base font-semibold">
                    Chưa có sản phẩm nào trong giỏ hàng
                  </h4>
                </div>
              ) : (
                items?.map((item) => (
                  <ItemCard
                    className="border-b border-border-200"
                    item={item}
                    key={item.id}
                  />
                ))
              )}
            </div>
          </div>
          <div className="p-10 lg:w-1/3">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
