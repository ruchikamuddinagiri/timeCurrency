import { object as zObject, string as zString, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import { Button } from "../components/LoadingButton";
import { api } from "../api/authApi";
import { ApiResponse } from "../api/types";
import useStore from "../store";

const registerSchema = zObject({
  name: zString().min(1, "Full name is required").max(100),
  email: zString()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: zString()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: zString().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const appStore = useStore();
  const navigate = useNavigate();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const registerUser = async (data: RegisterInput) => {
    try {
      appStore.setRequestLoading(true);
      const response = await api.post<ApiResponse>("/auth/register", data);
      appStore.setRequestLoading(false);

      toast.success("User Succesfully registered", {
        position: "top-left",
      });
      // navigate("/emailverification");
    } catch (error: any) {
      appStore.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error("User already existed", {
        position: "top-right",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    //console.log("I was called");
    registerUser(values);
  };

  return (
    <section className="py-8 bg-ct-black-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-black-600 mb-4">
          SIGN UP
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 squared-2x2 p-8 space-y-5"
          >
            <FormInput labelText="Full Name" inputName="name" />
            <FormInput labelText="Email" inputName="email" inputType="email" />
            <FormInput
              labelText="Password"
              inputName="password"
              inputType="password"
            />
            <FormInput
              labelText="Confirm Password"
              inputName="passwordConfirm"
              inputType="password"
            />
            <span className="block">
              Existing User?{" "}
              <Link to="/login" className="text-ct-blue-600">
                Login Here
              </Link>
            </span>
            <Button
              loading={appStore.isLoading}
              text="Sign up"
              color="ct-black-600"
            ></Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
export default RegisterPage;
