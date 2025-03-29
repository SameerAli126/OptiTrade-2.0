import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const Trading = () => {

    const token = localStorage.getItem("token");

    // If token exists, redirect to Dashboard, else redirect to login page
    return token ? <Navigate to="/dashboard/home" /> : <Navigate to="/login" />;


};

export default Trading;
