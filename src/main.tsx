import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NotFoundScreen from "./pages/NotFoundScreen";
import ForumDetailScreen from "./pages/ForumDetailScreen";
import { CookiesProvider } from "react-cookie";
import ThreadScreen from "./pages/ThreadScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./pages/HomeScreen";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import PostThreadScreen from "./pages/PostThreadScreen";
import AdminScreen from "./pages/AdminScreen";
import UserManagementScreen from "./pages/UserManagementScreen";
import ForumManagementScreen from "./pages/ForumManagementScreen";
import RoleManagementScreen from "./pages/RoleManagementScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "forum/:id",
        element: <ForumDetailScreen />,
      },
      {
        path: "thread/:id",
        element: <ThreadScreen />,
      },
      {
        path: "post",
        element: <PostThreadScreen />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminScreen />,
    children: [
      {
        path: "users",
        element: <UserManagementScreen />,
      },
      {
        path: "forums",
        element: <ForumManagementScreen />,
      },
      {
        path: "roles",
        element: <RoleManagementScreen />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundScreen />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
      <ToastContainer closeOnClick draggable />
    </CookiesProvider>
  </StrictMode>
);
