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
  verificationCode: string;
}; 
export type EmailVerificationInput = TypeOf<typeof emailVerificationSchema>;

const emailVerificationSchema = object({
  verificationCode: string().min(1, "Email verification code is required"),
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

  const verifyEmail = async (data: EmailVerificationFormInputs) => {
    try {
      const response = await api.get<ApiResponse>(
        `auth/verifyemail/${data.verificationCode}`
      );
      toast.success(response.data.message as string, {
        position: "top-left",
      });
      navigate("/login");
    } catch (error: any) {
      const resMessage = (error.response && error.response.data && error.response.data.message) ||
       error.message ||
        error.toString();
      toast.error('Email Invalid', {
        position: "top-left",
      });
    }
  };

  const onSubmit: SubmitHandler<EmailVerificationFormInputs> = (data) => {
    verifyEmail(data);
  };

  return (
    <section className="bg-ct-black-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-4x1 xl:text-5x2 text-center font-[600] text-ct-white-500 mb-7">
          Email Verification </h1>        
        <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 squared-2xl p-8 space-y-5">        
          <FormInput labelText="Verification Code" inputName="verificationCode"  />
          
          <Button> Verify Email </Button>
        </form>
        </FormProvider>
      </div>
    </section>
  );
};
export default EmailVerification;
