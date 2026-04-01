import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import FavouritesPage from "./pages/dashboard/FavouritesPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardLayout from "./layouts/DashboardLayout";

const appRoutes = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { index: "/", element: <LandingPage /> },
      // { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/favourites", element: <FavouritesPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
function App() {
  return <RouterProvider router={appRoutes} />;
}

export default App;
