import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

function MainLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
