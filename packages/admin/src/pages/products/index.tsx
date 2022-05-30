import Card from "@components/common/card";
import AdminLayout from "@components/layouts/admin";
import ProductList from "@components/product/product-list";
import ErrorMessage from "@components/ui/error-message";
import PageLoader from "@components/ui/page-loader";
import {
  ProductsDocument,
  useMeQuery,
  useProductsQuery,
} from "@generated/graphql";
import { addApolloState, initializeApollo } from "@lib/apolloClient";
import { EXECUTIVE_ADMIN } from "@utils/constants";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

function ProductsAdminPage() {
  const { data: meData } = useMeQuery();
  const { data, loading, error } = useProductsQuery();

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Card className="flex flex-col mb-8 justify-between">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-gray-600">Sản phẩm</h1>
          </div>
        </div>
      </Card>

      <ProductList
        permission={meData?.me?.roleId === EXECUTIVE_ADMIN ? true : false}
        products={data?.allProducts}
      />
    </>
  );
}

ProductsAdminPage.Layout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req.headers });

  await apolloClient.query({
    query: ProductsDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default ProductsAdminPage;
