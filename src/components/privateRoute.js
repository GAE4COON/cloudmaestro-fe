import React from "react";
import { Navigate } from "react-router-dom";

const getLocalStorageToken = () => {
  return localStorage.getItem("accessToken");
};

const PrivateRoute = ({ children }) => {
  const isLogined = getLocalStorageToken();
  return isLogined ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
