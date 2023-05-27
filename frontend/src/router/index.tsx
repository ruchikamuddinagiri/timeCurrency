import type { RouteObject } from "react-router-dom";
import  LoginForm  from "../pages/LoginForm";
import  RegisterForm  from "../pages/RegisterForm";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import EmailVerification from "../pages/EmailVerification";
import Sidebar from '../components/Sidebar';
import Tasks from "../pages/Tasks";
import ProfilePage from "../pages/Profile";
import Analytics from "../pages/Analytics";
import Logout from "../pages/Logout";
import Feed from "../pages/Feed";

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterForm />},
  { path: '/emailverification', element: <EmailVerification />},
  { path: '/mainpage', element: <MainPage />},
  { path: '/sidebar', element: <Sidebar />},
  { path: '/tasks', element: <Tasks /> },
  { path: '/profile', element: <ProfilePage />},
  { path: '/analytics', element: <Analytics />},
  { path: '/logout', element: <Logout />},
  { path: '/feed', element: <Feed />}
  //{ path: '*', element: <NotFoundPage /> }
];

export default routes;


