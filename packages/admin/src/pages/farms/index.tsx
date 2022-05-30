import Card from "@components/common/card";
import FarmList from "@components/farm/farm-list";
import AdminLayout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import PageLoader from "@components/ui/page-loader";
import { FarmsDocument, useFarmsQuery } from "@generated/graphql";
import { addApolloState, initializeApollo } from "@lib/apolloClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const FarmsAdmin = () => {
  const { data, loading, error } = useFarmsQuery();

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Card className="flex flex-col mb-8 justify-between">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-gray-600">Nông trại</h1>
          </div>
        </div>
      </Card>

      <FarmList farms={data?.allFarms} />
    </>
  );
};

FarmsAdmin.Layout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req.headers });

  await apolloClient.query({
    query: FarmsDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
export default FarmsAdmin;
