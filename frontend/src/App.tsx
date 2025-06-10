import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"
import './App.css'

import Landing from "./Pages/Landing"
import NotFound from "./Pages/NotFound"
import Projects from "./Pages/Projects"

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
    path: "/*",
    element: <NotFound />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
