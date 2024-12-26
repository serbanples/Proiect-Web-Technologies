import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, loading } = useAuth();

  if(loading === true) {
    return <div>Loading...</div>
  }
  
  return auth.user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;