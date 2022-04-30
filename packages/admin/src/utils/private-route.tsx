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
    if (!data) router.replace(ROUTES.LOGIN);
  }, [data]);

  if (loading) return <PageLoader />;

  if (data?.me?.roleId === CUSTOMER) {
    return <AccessDenied />;
  }

  if (!loading && data) return <>{children}</>;
  
  return <PageLoader />;
  // return <>{!loading && data && <>{children}</>}</>;
};

export default PrivateRoute;
