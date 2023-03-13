import type { RouteObject } from "react-router-dom";
import  LoginForm  from "../pages/LoginForm";
import  RegisterForm  from "../pages/RegisterForm";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import EmailVerification from "../pages/EmailVerification";
import Sidebar from '../components/Sidebar';
//import  SidebarData  from "../components/SidebarData";

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterForm />},
  { path: '/emailverification', element: <EmailVerification />},
  { path: '/mainpage', element: <MainPage />},
  { path: '/sidebar', element: <Sidebar />},
  //{ path: '/sidebardata', element: <SidebarData />},
  //{ path: '*', element: <NotFoundPage /> }
];

export default routes;


