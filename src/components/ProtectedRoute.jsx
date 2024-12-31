import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element }) => {
    const token = localStorage.getItem("token");

    // If token exists, allow access to the route, else redirect to login page
    return token ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
