import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole, requiredPermission }) => {
  const { user, hasPermission, isAdmin, isProjectManager } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    if (requiredRole === 'Admin' && !isAdmin()) {
      return <Navigate to="/unauthorized" />;
    }
    if (requiredRole === 'Project Manager' && !isProjectManager()) {
      return <Navigate to="/unauthorized" />;
    }
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute; 