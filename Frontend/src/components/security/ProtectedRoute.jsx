// src/components/security/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // 1. Grab the real authentication state from your Redux store
    const { isAuthenticated } = useSelector(store => store.user);

    if (!isAuthenticated) {
        // 2. If false, bounce them to the login page
        return <Navigate to="/login" replace />;
    }

    // 3. If true, let them into the app
    return children;
};

export default ProtectedRoute;