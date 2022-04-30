import dynamic from "next/dynamic";
import { EXECUTIVE_ADMIN } from "@utils/constants";
import AppLayout from "@components/layouts/app";
import { useMeQuery } from "@generated/graphql";

const AdminDashboard = dynamic(() => import("@components/dashboard/admin"));
const FarmerDashboard = dynamic(() => import("@components/dashboard/farmer"));

export default function Dashboard() {
  const { data } = useMeQuery();
  if (data?.me?.roleId === EXECUTIVE_ADMIN) {
    return <AdminDashboard />;
  }
  return <FarmerDashboard />;
}

Dashboard.Layout = AppLayout;
