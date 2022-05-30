import { NetworkStatus } from "@apollo/client";
import PageLoader from "@components/loader/page-loader";
import TourCard from "@components/tour/tour-card";
import Button from "@components/ui/button";
import NotFound from "@components/ui/not-found";
import {
  ToursPaginatedDocument,
  useToursPaginatedQuery,
} from "@generated/graphql";
import { addApolloState, initializeApollo } from "@lib/apolloClient";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

export const limit = 3;

const TourPage = () => {
  const { data, loading, networkStatus, fetchMore } = useToursPaginatedQuery({
    variables: {
      limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  console.log(data?.toursPaginated?.paginatedTours);
  
  const loadingMoreTours = networkStatus === NetworkStatus.fetchMore;

  const loadMoreTours = () => {
    fetchMore({
      variables: {
        cursor: data?.toursPaginated.cursor,
      },
    });
  };

  if (loading) return <PageLoader />;

  if (!loading && !data?.toursPaginated?.paginatedTours?.length) {
    return (
      <div className="min-h-full px-4 pt-6 pb-8 bg-gray-100 lg:p-8">
        <NotFound text="Không có nông trại nào" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="flex flex-col w-full max-w-7xl mx-auto pt-14">
        <h3 className="mb-8 text-2xl font-bold text-gray-600">
          Tour tham quan
        </h3>
        {data?.toursPaginated.paginatedTours.map((tour) => (
          <TourCard tour={tour} key={tour.id} />
        ))}

        {data?.toursPaginated?.hasMore && (
          <Button loading={loadingMoreTours} onClick={loadMoreTours}>
            Xem thêm
          </Button>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req.headers });

  await apolloClient.query({
    query: ToursPaginatedDocument,
    variables: {
      limit,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default TourPage;
