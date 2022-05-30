import { useMeQuery } from "@generated/graphql";
import { EXECUTIVE_ADMIN } from "@utils/constants";
import AdminLayout from "./admin";
import FarmLayout from "./farm";

export default function AppLayout({ ...props }) {
  const { data } = useMeQuery();
  if (data?.me?.roleId === EXECUTIVE_ADMIN) {
    return <AdminLayout {...props} />;
  } else {
    return <FarmLayout {...props} />;
  }
}
