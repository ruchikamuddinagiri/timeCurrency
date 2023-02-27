import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useStore from "../store";
import Spinner from "./Spinner";
import { authApi } from "../api/authApi";
import { GenericResponse } from "../api/types";

const Header = () => {
  const store = useStore();
  const user = store.authUser;

  const logoutUser = async () => {
    try {
      store.setRequestLoading(true);
      await authApi.get<GenericResponse>("/auth/logout");
      store.setRequestLoading(false);
      toast.success("Successfully logged out", {
        position: "top-right",
      });
      document.location.href = "/login";
    } catch (error: any) {
      store.setRequestLoading(false);
      store.setAuthUser(null);
      document.location.href = "/login";
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
          <ul className="flex items-center gap-4">
            {!user && (
              <>
                
                <li>
                  <Link to="/login" className="text-ct-dark-600">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-ct-dark-600">
                    SignUp
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link to="/profile" className="text-ct-dark-600">
                    Profile
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={logoutUser}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-ct-black-600 fixed">
        {store.requestLoading && <Spinner color="text-ct-black-600" />}
      </div>
    </>
  );
};

export default Header;
