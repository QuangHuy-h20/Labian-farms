import FarmerDashboard from "@components/dashboard/farmer";
import FarmerLayout from "@components/layouts/farmer";
import { farmerOnly } from "@utils/auth-utils";



const MyFarms = () => {
  return <FarmerDashboard />;
};

MyFarms.authenticate = {
  permissions: farmerOnly,
};

MyFarms.Layout = FarmerLayout;
export default MyFarms;
