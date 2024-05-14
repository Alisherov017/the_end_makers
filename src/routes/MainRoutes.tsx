import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Error from "../ErrorPage/Error";
import NotFountPage from "../notFoundPage/NotFountPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import Photo from "../pages/photoPage/Photo";

export const router = createBrowserRouter([
  {
    id: "root",
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      { path: "*", element: <NotFountPage /> },
      { path: "/registor", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/photo", element: <Photo /> },
    ],
  },
]);
