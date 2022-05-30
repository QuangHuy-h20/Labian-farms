import FarmLayout from "@components/layouts/farm";
import CreateOrUpdateTourForm from "@components/tour/tour-form";
import PageLoader from "@components/ui/page-loader";
import { useCheckAuth } from "@utils/useCheckAuth";

export default function CreateTourPage() {
  const { farmActive, farmLoading } = useCheckAuth();
  if (farmLoading && farmActive === false) return <PageLoader />;
  else
    return (
      <>
        <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
          <h1 className="text-lg font-semibold text-gray-600">
            Tạo tour tham quan
          </h1>
        </div>
        <CreateOrUpdateTourForm />
      </>
    );
}

CreateTourPage.Layout = FarmLayout;
