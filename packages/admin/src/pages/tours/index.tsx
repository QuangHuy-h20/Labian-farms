import Card from "@components/common/card";
import AdminLayout from "@components/layouts/admin";
import TourList from "@components/tour/tour-list";
import ErrorMessage from "@components/ui/error-message";
import PageLoader from "@components/ui/page-loader";
import { useToursQuery } from "@generated/graphql";
import React from "react";

const ToursAdmin = () => {
  const { data, loading, error } = useToursQuery();

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Card className="flex flex-col mb-8 justify-between">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-gray-600">
              Tour tham quan
            </h1>
          </div>
        </div>
      </Card>

      <TourList tour={data?.tours} />
    </>
  );
};

ToursAdmin.Layout = AdminLayout;
export default ToursAdmin;