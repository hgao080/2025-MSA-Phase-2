import { Outlet } from "react-router"

import Header from "../Components/Header";

export default function RootLayout() {
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <Header />

      <Outlet />
    </div>
  )
}
