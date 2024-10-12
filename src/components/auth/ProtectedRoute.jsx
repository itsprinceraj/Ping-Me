import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  const profileCompleted = user?.profileSetup;

  if (token && !profileCompleted) {
    return <Navigate to={"/profile"} />;
  }
  return token ? children : <Navigate to={"/auth"} />;
};
