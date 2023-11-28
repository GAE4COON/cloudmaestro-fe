import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const getLocalStorageToken = () => {
  return localStorage.getItem("accessToken");
};

const PrivateRoute = ({ children }) => {
  const isLogined = getLocalStorageToken();
  return isLogined ? children || <Outlet/>: <Navigate to="/sign-in" />;
};

export default PrivateRoute;
