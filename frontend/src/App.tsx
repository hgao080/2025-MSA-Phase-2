import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"
import { useAuthStore } from './Stores/AuthStore';
import { useThemeStore } from './Stores/ThemeStore';
import { Toaster } from 'react-hot-toast';

import Landing from "./Pages/Landing"
import NotFound from "./Pages/NotFound"
import Projects from "./Pages/Projects"
import Register from "./Pages/Register"
import Login from "./Pages/Login"

import RootLayout from './Layouts/RootLayout';
import DashboardLayout from './Layouts/DashboardLayout';
import DashboardProjects from './Pages/DashboardProjects';
import DashboardProfile from './Pages/DashboardProfile';
import DashboardApplications from './Pages/DashboardApplications';
import DashboardMessages from './Pages/DashboardMessages';
import ProtectedRoute from './Components/ProtectedRoute';

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Landing },
      { path: "projects", Component: Projects },
    ]
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "profile", Component: DashboardProfile},
      { path: "projects", Component: DashboardProjects},
      { path: "applications", Component: DashboardApplications},
      { path: "messages", Component: DashboardMessages},
    ]
  },
  {
    path: "/register",
    Component: Register
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/*",
    Component: NotFound
  },
])

function App() {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    checkAuthStatus();
    initializeTheme();
  }, [checkAuthStatus, initializeTheme]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? '#374151' : '#fff',
            color: isDarkMode ? '#f9fafb' : '#333',
            border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: isDarkMode ? '#374151' : '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: isDarkMode ? '#374151' : '#fff',
            },
          },
        }}
      />
    </>
  )
}

export default App