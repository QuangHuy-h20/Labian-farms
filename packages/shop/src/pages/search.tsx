import CartCounterButton from "@components/cart/cart-counter-button";
import PageLoader from "@components/loader/page-loader";
import ProductsGrid from "@components/products/grid";
import NotFound from "@components/ui/not-found";
import { useSearchQuery } from "@generated/graphql";
import { isEngCharacters } from "@utils/helper";
import { useRouter } from "next/router";
import React from "react";

const SearchPage = () => {
  const { query } = useRouter();

  const text = query?.keyword! as string;

  console.log(isEngCharacters(text));

  const { data, loading } = useSearchQuery({
    variables: {
      searchInput: {
        name: !isEngCharacters(text) ? text : null,
        unAccentName: isEngCharacters(text) ? text : null,
      },
    },
  });
  if (loading) return <PageLoader />;

  if (data?.search.length === 0)
    return <NotFound text="Không tìm thấy sản phẩm bạn cần tìm." />;

  return (
    <div className="bg-white p-16 mt-8">
      <div className="flex items-center text-2xl mb-10">
        <h2 className=" text-gray-500 mr-2">
          Có {data?.search?.length} kết quả cho từ khoá
        </h2>
        <span className="italic text-gray-400">"{text}"</span>
      </div>
      <ProductsGrid products={data?.search} />
      <CartCounterButton />
    </div>
  );
};

export default SearchPage;
