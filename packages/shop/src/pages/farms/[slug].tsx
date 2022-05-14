import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ProductsDocument, useProductsQuery } from "../../generated/graphql";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import NextLink from "next/link";
import Image from "next/image";
import { NetworkStatus } from "@apollo/client";
import PageLoader from "@components/loader/page-loader";
import { ArrowDownIcon } from "@components/icons/arrow-down";
import Spinner from "@components/loader/spinner";

export const limit = 10;

const Farms = () => {
  const { data, loading, fetchMore, networkStatus } = useProductsQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMoreProducts = networkStatus === NetworkStatus.fetchMore;

  const loadMoreProducts = () => {
    fetchMore({
      variables: { cursor: data?.products?.cursor },
    });
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-white ">
      {data?.products?.paginatedProducts.map((product) => (
        <NextLink key={product.id} href={`/products/${product.slug}`}>
          <a className="course-item flex flex-wrap border-b border-gray-500 border-opacity-30 last:border-b-0 mt-12 pb-6">
            <Image
              src={product.image1}
              width={240}
              height={135}
              alt={product.name}
            />
            <div className="flex flex-col flex-1 ml-4">
              <h1 className="font-bold text-md mb-3 tracking-wide">
                {product.name}
              </h1>
            </div>
          </a>
        </NextLink>
      ))}
      <>
        {data?.products?.hasMore && (
          <div className="flex justify-center">
            {loadingMoreProducts ? (
              <div className="my-4">
                <Spinner size="small" />
              </div>
            ) : (
              <button
                className="flex justify-between items-center mt-10 flex-row bg-emerald-500 text-white  font-semibold text-sm pr-4 pl-2 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={loadMoreProducts}
              >
                <>
                  <ArrowDownIcon />
                  <span className="ml-2 text-md">Xem thêm</span>
                </>
              </button>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req.headers });

  await apolloClient.query({
    query: ProductsDocument,
    variables: {
      limit,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Farms;
