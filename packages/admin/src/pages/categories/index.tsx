import Card from "@components/common/card";
import AdminLayout from "@components/layouts/admin";
import CategoryList from "@components/category/category-list";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import PageLoader from "@components/ui/page-loader";
import { CategoriesDocument, useCategoriesQuery } from "@generated/graphql";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { addApolloState, initializeApollo } from "@lib/apolloClient";

function CategoriesAdminPage() {
  const { data, loading, error } = useCategoriesQuery();

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Card className="flex flex-col mb-8 justify-between">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-gray-600">
              Loại sản phẩm
            </h1>
          </div>

          <div className="w-full md:w-3/4 flex md:flex-row">
            <div className="w-full flex justify-end">
              <LinkButton
                href="/categories/create"
                className="h-12 ms-4 md:ms-6"
              >
                <span className="hidden md:block">+ Thêm loại sản phẩm</span>
                <span className="md:hidden">+ Thêm</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </Card>

      <CategoryList categories={data?.categories} />
    </>
  );
}

CategoriesAdminPage.Layout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
  ) => {
	const apolloClient = initializeApollo({ headers: context.req.headers });
  
	await apolloClient.query({
	  query: CategoriesDocument,
	});
  
	return addApolloState(apolloClient, {
	  props: {},
	});
  };

export default CategoriesAdminPage;
