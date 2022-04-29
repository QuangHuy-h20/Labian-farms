import { Grid } from "@components/products/grid";
import { NetworkStatus } from "@apollo/client";
import { useProductsQuery } from "@generated/graphql";
import { useRouter } from "next/router";

const PRODUCTS_PER_PAGE = 9;

interface Props {
  className?: string;
  column?: any;
  gridClassName?: string;
}
export default function Products({ className, column, gridClassName }: Props) {
  const { query } = useRouter();
  const {
    data,
    loading: isLoading,
    fetchMore,
    networkStatus,
  } = useProductsQuery({
    variables: {
      limit: PRODUCTS_PER_PAGE,
      categoryQuery: query.category as string,
    },
    notifyOnNetworkStatusChange: true,
  });

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;

  const handleLoadMore = async () => {
    fetchMore({
      variables: { cursor: data?.products?.cursor },
    });
  };

  return (
    <Grid
      products={data?.products?.paginatedProducts}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      loadMore={handleLoadMore}
      hasMore={data?.products?.hasMore}
      limit={PRODUCTS_PER_PAGE}
      className={className}
      gridClassName={gridClassName}
      column={column}
    />
  );
}
