import AccessDenied from "@components/AccessDenied";
import Spinner from "@components/loader/spinner";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { getAuthCredentials, hasAccess } from "./auth-utils";

const PrivateRoute: React.FC<{ authProps: any; children: React.ReactNode }> = ({
  children,
  authProps,
}) => {
  const router = useRouter();
  const { token, permissions } = getAuthCredentials();
  console.log(token, permissions);
  
  const isUser = !!token;
  const hasPermission =
    Array.isArray(permissions) &&
    !!permissions.length &&
    hasAccess(authProps.permissions, permissions);
  useEffect(() => {
    if (!isUser) router.replace(ROUTES.LOGIN);
  }, [isUser]);

  if (isUser && hasPermission) {
    return <>{children}</>;
  }
  if (isUser && !hasPermission) {
    return <AccessDenied />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="large" />
    </div>
  );
};

export default PrivateRoute;
