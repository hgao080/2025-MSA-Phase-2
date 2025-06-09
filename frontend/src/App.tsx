import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"
import './App.css'

const router = createBrowserRouter([
  {
    index: true,
    element: <div>Hello World!</div>,
  },
  {
    path: "/*",
    element: <div>404 Not Found</div>
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
