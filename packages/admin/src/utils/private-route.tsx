import AccessDenied from "@components/AccessDenied";
import Spinner from "@components/loader/spinner";
import PageLoader from "@components/ui/page-loader";
import { useMeQuery } from "@generated/graphql";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CUSTOMER } from "./constants";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading && !data?.me) router.replace(ROUTES.LOGIN);
  }, [data]);

  if (loading) return <PageLoader />;

  // if (!loading && data?.me) {
  //   return <PageLoader />;
  // }

  if (data?.me?.roleId === CUSTOMER) {
    return <AccessDenied />;
  }

  return  <>{children}</>;
};

export default PrivateRoute;
