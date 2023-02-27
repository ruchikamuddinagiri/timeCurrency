import type { RouteObject } from "react-router-dom";
import  LoginForm  from "../pages/LoginForm";
import  RegisterForm  from "../pages/RegisterForm";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";

const authRoutes: RouteObject = {
  path: "*",
  children: [
    {
      path: "login",
      element: <LoginForm />,
    },
    {
      path: "register",
      element: <RegisterForm />,
    },
  ],
};

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
