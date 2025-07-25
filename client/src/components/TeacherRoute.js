import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const TeacherRoute = ({ children }) => {
  const { isAuthenticated, isTeacher, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isTeacher) {
    return <Navigate to="/" />;
  }

  return children;
};

export default TeacherRoute;
