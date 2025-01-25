import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import ProtectRoutes from "./components/global/ProtectRoutes";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useAppSelector } from "./lib/store";
import Dashboard from "./pages/dashboard/Links/Dashboard";
import NotFoundPage from "./pages/NotFound";
import OnboardingLayout from "./layouts/OnboardingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/Authlayout";
import ProfilePage from "./pages/public/ProfilePage";
import Analytics from "./pages/dashboard/Analytics";
import Appearance from "./pages/dashboard/Appearance/Appearance";

const router = (isAuthenticated: boolean, loading: boolean) => {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoutes
          navigateTo="/dashboard"
          allowed={!isAuthenticated}
          loading={loading}
        />
      ),
      children: [
        {
          path: "",
          element: <Landing />,
        },
      ],
    },
    {
      path: "/auth",
      element: (
        <ProtectRoutes
          navigateTo="/dashboard"
          allowed={!isAuthenticated}
          // loading={loading}
        >
          <AuthLayout />
        </ProtectRoutes>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectRoutes
          navigateTo="/"
          allowed={isAuthenticated}
          loading={loading}
        >
          <DashboardLayout />
        </ProtectRoutes>
      ),
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "appearance",
          element: <Appearance />,
        },
      ],
    },
    {
      path: "/onboarding",
      element: (
        <ProtectRoutes
          navigateTo="/"
          allowed={isAuthenticated}
          loading={loading}
        />
      ),
      children: [
        {
          index: true,
          element: <OnboardingLayout />,
        },
      ],
    },
    {
      path: "/:slug",
      element: <ProfilePage/>
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
};

function App() {
  const { user, loading } = useAppSelector((state) => state.auth);

  return (
    <div className="w-full h-full">
      <RouterProvider
        router={router(Boolean(user) || false, loading || false)}
      />
      <Toaster />
    </div>
  );
}

export default App;
