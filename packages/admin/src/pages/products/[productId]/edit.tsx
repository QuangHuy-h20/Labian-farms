import FarmLayout from "@components/layouts/farm";
import CreateOrUpdateProductForm from "@components/product/product-form";
import ErrorMessage from "@components/ui/error-message";
import PageLoader from "@components/ui/page-loader";
import { useProductQuery } from "@generated/graphql";
import { useRouter } from "next/router";
import React from "react";

const UpdateProductPage = () => {
  const { query } = useRouter();
  const { data, loading, error } = useProductQuery({
    variables: {
      id: query.productId as string,
    },
  });

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-gray-600">
          Cập nhật sản phẩm
        </h1>
      </div>
      <CreateOrUpdateProductForm initialValues={data?.product} />
    </>
  );
};

UpdateProductPage.Layout = FarmLayout;

export default UpdateProductPage;
