import FarmLayout from "@components/layouts/farm";
import CreateOrUpdateTourForm from "@components/tour/tour-form";
import ErrorMessage from "@components/ui/error-message";
import PageLoader from "@components/ui/page-loader";
import { useTourQuery } from "@generated/graphql";
import { useRouter } from "next/router";

const UpdateTourPage = () => {
  const { query } = useRouter();
  const { data, loading, error } = useTourQuery({
    variables: {
      id: query.tourId as string,
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
      <CreateOrUpdateTourForm initialValues={data?.tour} />
    </>
  );
};

UpdateTourPage.Layout = FarmLayout;

export default UpdateTourPage;
