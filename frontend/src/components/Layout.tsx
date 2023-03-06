import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-5">
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
