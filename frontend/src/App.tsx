import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"
import { useAuthStore } from './Stores/AuthStore';

import Landing from "./Pages/Landing"
import NotFound from "./Pages/NotFound"
import Projects from "./Pages/Projects"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import RootLayout from './Layouts/RootLayout';

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Landing },
      { path: "projects", Component: Projects },
    ]
  },
  {
    path: "/register",
    Component: Register
  },
  {
    path: "login",
    Component: Login
  },
  {
    path: "/*",
    Component: NotFound
  },
])

function App() {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App