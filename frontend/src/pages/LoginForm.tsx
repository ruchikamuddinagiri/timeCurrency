import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAppStore from "../store";
import { LoginResponse } from "../api/types";
import  api  from "../api/authApi";
import FormInput from "../components/FormInput";
import { Button } from "../components/LoadingButton";

type LoginInput = TypeOf<typeof loginSchema>;

const loginSchema = object({
  email: string().min(1, "Email address is required").email("Email Address is invalid"),
  password: string().min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
});

const LoginPage = () => {
  const appStore = useAppStore();
  const navigate = useNavigate();

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { reset, handleSubmit, formState: { isSubmitSuccessful } } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const loginUser = async (data: LoginInput) => {
    try {
      appStore.setRequestLoading(true);
      await api.post<LoginResponse>("/auth/Login", data);
      appStore.setRequestLoading(false);
      navigate("/mainpage");
    } catch (error: any) {
      appStore.setRequestLoading(false);
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error('Invalid credentials', {
        position: "top-left",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <section className="bg-ct-black-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-black-600 mb-4">
          LOGIN
        </h1>
        
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 squared-2xl p-8 space-y-5"
          >
            <FormInput labelText="Email" inputName="email" inputType="email" />
            <FormInput labelText="Password" inputName="password" inputType="password" />

            <div className="text-right">
              <Link to="/forgotpassword" className="">
                Forgot Password?
              </Link>
            </div>
            <Button
              loading={appStore.isLoading}
              text="Login"
              color ="ct-black-600"
            >              
            </Button>
            <span className="block">
              New User?{" "}
              <Link to="/register" className="text-ct-blue-600">
                Sign Up Here
              </Link>
            </span>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default LoginPage;
