import CreateOrUpdateFarmForm from "@components/farm/farm-form";
import FarmLayout from "@components/layouts/farm";
import ErrorMessage from "@components/ui/error-message";
import PageLoader from "@components/ui/page-loader";
import { useFarmQuery } from "@generated/graphql";
import { useRouter } from "next/router";
import React from "react";

const EditFarm = () => {
  const { query } = useRouter();
  const { data, loading, error } = useFarmQuery({
    variables: {
      slug: query.farm as string,
    },
  });

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-gray-600">Cập nhật nông trại</h1>
      </div>
      <CreateOrUpdateFarmForm initialValues={data?.farm} />
    </>
  );
};

EditFarm.Layout = FarmLayout;
export default EditFarm;
