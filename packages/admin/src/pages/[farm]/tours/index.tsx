import Card from "@components/common/card";
import FarmLayout from "@components/layouts/farm";
import TourList from "@components/tour/tour-list";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import PageLoader from "@components/ui/page-loader";
import {
  ToursDocument,
  useFarmQuery,
  useToursByFarmQuery,
} from "@generated/graphql";
import { addApolloState, initializeApollo } from "@lib/apolloClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";

const Tours = () => {
  const {
    query: { farm },
  } = useRouter();
  const { data: farmData, loading: farmLoading } = useFarmQuery({
    variables: {
      slug: farm as string,
    },
  });
  const farmId = farmData?.farm?.id!;

  return (
    <>
      <Card className="flex flex-col mb-8 justify-between">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-gray-600">
              Tour tham quan
            </h1>
          </div>

          <div className="w-full md:w-3/4 flex md:flex-row">
            <div className="w-full flex justify-end">
              <LinkButton
                disabled={!farmData?.farm?.isActive}
                href={`/${farm}/tours/create`}
                className="h-12 ms-4 md:ms-6"
              >
                <span className="hidden md:block">+ Tạo tour tham quan</span>
                <span className="md:hidden">+ Thêm</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </Card>

      <TourList farmId={farmId} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req.headers });

  await apolloClient.query({
    query: ToursDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

Tours.Layout = FarmLayout;
export default Tours;
