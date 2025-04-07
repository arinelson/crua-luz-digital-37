
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the default language (Portuguese)
  return <Navigate to="/pt" replace />;
};

export default Index;
