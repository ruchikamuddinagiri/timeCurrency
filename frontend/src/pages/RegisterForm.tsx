import { object as zObject, string as zString, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormInput from "../components/FormInput";
import { LoadingButton } from "../components/LoadingButton";

import { authApi } from "../api/authApi";
import { GenericResponse } from "../api/types";
import useStore from "../store";

const registerSchema = zObject({
  name: zString().min(1, "Full name is required").max(100),
  email: zString().min(1, "Email address is required").email("Email Address is invalid"),
  password: zString().min(1, "Password is required").min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
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
      const response = await authApi.post<GenericResponse>("/auth/register", data);
      appStore.setRequestLoading(false);
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      navigate("/verifyemail");
    } catch (error: any) {
      appStore.setRequestLoading(false);
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log("I was called");
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
            <FormInput label="Full Name" name="name" />
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Password" name="password" type="password" />
            <FormInput
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
            />
            <span className="block">
              Already have an account?{" "}
              <Link to="/login" className="text-ct-blue-600">
                Login Here
              </Link>
            </span>
            <LoadingButton
              loading={appStore.requestLoading}
              textColor="text-ct-black-600">
              Sign Up
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
export default RegisterPage;
