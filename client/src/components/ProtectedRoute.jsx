import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = localStorage.getItem("user");
  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default ProtectedRoute;
