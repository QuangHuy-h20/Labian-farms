import FarmForm from "@components/farm/farm-form";
import FarmerLayout from "@components/layouts/farmer";
import { allowedRoles } from "@utils/auth-utils";

const CreateFarm = () => {
  return (
    <div className="w-full bg-white h-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl text-gray-400 italic font-light my-12">Tạo nông trại</h1>
        <FarmForm />
      </div>
    </div>
  );
};

CreateFarm.authenticate = allowedRoles
CreateFarm.Layout = FarmerLayout;

export default CreateFarm;
