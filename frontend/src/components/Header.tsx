import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useAuthStore from "../store";
import Spinner from "./Spinner";
import  { api }  from "../api/authApi";
import  { ApiResponse }  from "../api/types";

const Header = () => {
  const authStore = useAuthStore();
  const user = authStore.authUser;

  const handleLogout = async () => {
    try {
      authStore.setRequestLoading(true);
      await api.get<ApiResponse>("/auth/logout");
      authStore.setRequestLoading(false);
      toast.success("Successfully logged out", {
        position: "top-right",
      });
      window.location.href = "/login";
    } catch (error: any) {
      authStore.setRequestLoading(false);
      authStore.setAuthUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <Link to="/" className="text-ct-dark-600 text-2xl font-semibold">
              Time Currency
            </Link>
          </div>
          <ul className="flex items-center gap-2">
            {!user && (
              <>
                <li>
                  <Link to="/login" className="text-ct-dark-500 text-2xl font-semibold">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-ct-dark-500 text-2xl font-semibold">
                    Sign up
                  </Link>
                </li>
              </>
            )}

          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-ct-black-600 fixed">
        {authStore.isLoading && <Spinner spinnerColor="text-ct-black-600" /> }
      </div>
    </>
  );
};

export default Header;
