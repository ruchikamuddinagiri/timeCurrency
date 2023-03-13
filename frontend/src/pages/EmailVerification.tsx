import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import { Button } from "../components/LoadingButton";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/authApi";
import { ApiResponse } from "../api/types";

interface EmailVerificationFormInputs {
}; 
export type EmailVerificationInput = TypeOf<typeof emailVerificationSchema>;

const emailVerificationSchema = object({
  verificationCode: string(),
});

const EmailVerification = () => {
    const { verificationCode } = useParams<{ verificationCode: string }>();
    const navigate = useNavigate();;

  const methods = useForm<EmailVerificationFormInputs>({
    resolver: zodResolver(emailVerificationSchema),
  });

  const { reset, handleSubmit, formState: { isSubmitSuccessful } } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<EmailVerificationFormInputs> = (data) => {
    navigate("/login");
  };

  return (
    <section className="bg-ct-black-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-6x1 xl:text-6x2 text-center font-[600] text-ct-green-600 mb-7">
          User Successfully Verified </h1>        
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 squared-2xl p-8 space-y-5"> 
        <span className="block">
              <Link to="/login" className="text-ct-blue-600">
                Login
              </Link>
            </span>
        </form>
      </div>
    </section>
  );
};
export default EmailVerification;
