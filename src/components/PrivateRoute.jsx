import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSectorContext } from "../context/SectorsContext";
import Users from "../pages/Users";

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  const { user } = useSectorContext();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
