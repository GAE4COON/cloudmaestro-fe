import React from "react";
import { Navigate } from "react-router-dom";

const getLocalStorageToken = () => {
  return localStorage.getItem("accessToken");
};

const PublicRoute = ({ children }) => {
  const isLogined = getLocalStorageToken();
  return isLogined ? <Navigate to="/draw" /> : children;
};

export default PublicRoute;
