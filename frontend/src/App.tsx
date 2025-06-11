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

const router = createBrowserRouter([
  {
    index: true,
    element: <Landing />,
  },
  {
    path: "/projects",
    element: <Projects />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "/*",
    element: <NotFound />
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