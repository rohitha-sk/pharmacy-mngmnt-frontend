import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken');  // Check if the auth token exists

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect them to the login page
        return <Navigate to="/" replace />;
    }

    return children;  // If authenticated, render the children (protected route)
};

export default ProtectedRoute;
