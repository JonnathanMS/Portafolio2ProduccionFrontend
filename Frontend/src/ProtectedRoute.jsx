import React from "react";
import { useAuth } from "./Components/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Components/crud/Loader.jsx";

// Outlet permite que se ejecute lo que esta dentro osea permite que no tengamos que poner en el return codigo htmlx
const ProtectedRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();
  console.log(user, `Esta autenticado: ${isAuthenticated} Loading: ${loading}`);

  if (loading) return <Loader />; // muestra loading cuando esta cargando

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />; // con el replace no vuelve a la ruta anterior, se sobreescribe
  return <Outlet />;
};

export default ProtectedRoute;
