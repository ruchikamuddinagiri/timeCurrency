import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useAuthStore from "../store";
import Spinner from "./Spinner";
import { api } from "../api/authApi";
import { ApiResponse } from "../api/types";

const Header = () => {
  const authStore = useAuthStore();
  const user = authStore.authUser;

  

  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-around container items-center">
          <div>
            <h1 className="text-4xl xl:text-5xl text-center font-[500] text-ct-black-500 mb-4">
              Time Currency
            </h1>
          </div>
          <ul className="flex items-center gap-2">
            {!user && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-ct-dark-500 text-2xl font-semibold"
                  >
                    Login
                  </Link>
                </li>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <li>
                  <Link
                    to="/register"
                    className="text-ct-dark-500 text-2xl font-semibold"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-auto-blue-600 fixed">
        {authStore.isLoading && <Spinner spinnerColor="text-base-black-600" />}
      </div>
    </>
  );
};

export default Header;
