import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";
import React, { ReactNode } from "react";

type Props = {
  navigateTo: string;
  allowed: boolean;
  loading?: boolean;
  children?: ReactNode;
};

const ProtectRoutes: React.FC<Props> = ({
  navigateTo,
  allowed,
  loading = false,
  children,
}: Props) => {
  if (loading) {
    return <Loader />;
  }

  if (!allowed) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <>
      {children ? (
        React.cloneElement(children as React.ReactElement)
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ProtectRoutes;
