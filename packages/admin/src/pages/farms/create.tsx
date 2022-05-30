import CreateOrUpdateFarmForm from "@components/farm/farm-form";
import FarmerLayout from "@components/layouts/farmer";

const CreateFarm = () => {
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-gray-600">Tạo nông trại</h1>
      </div>
      <CreateOrUpdateFarmForm />
    </>
  );
};

CreateFarm.Layout = FarmerLayout;

export default CreateFarm;
