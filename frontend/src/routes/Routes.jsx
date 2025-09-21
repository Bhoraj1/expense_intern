import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Overview from "../pages/dashboard/Overview";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Register from "./../pages/Register";
import NotFound from "../components/shared/NotFound";
import TransactionMangement from "../pages/dashboard/TransactionMangement";
import Profile from "../pages/dashboard/Profile";
import Users from "../pages/dashboard/Users";

const allPages = [
  { path: "dashboard", element: <Overview /> },
  { path: "transaction-management", element: <TransactionMangement /> },
  { path: "users", element: <Users /> },
  { path: "profile", element: <Profile /> },
];

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <DashboardLayout />,
    children: allPages,
  },
  { path: "*", element: <NotFound /> },
]);
export default router;
