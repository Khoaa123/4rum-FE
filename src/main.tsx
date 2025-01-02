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
import CategoryManagementScreen from "./pages/CategoryManagementScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchScreen from "./pages/SearchScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SearchDetailScreen from "./pages/SearchDetailScreen";

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
      {
        path: "search",
        element: <SearchScreen />,
      },
      {
        path: "search/:keyword",
        element: <SearchDetailScreen />,
      },
      { path: "profile", element: <ProfileScreen /> },
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
        path: "categories",
        element: <CategoryManagementScreen />,
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer closeOnClick draggable />
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>
);
