'use client'

import { Shield, Loader } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AuthFormWrapper } from "@/app/components/ui/auth-modal";
import { OTPInput } from "@/app/components/ui/otpInput";
import toast from "react-hot-toast";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import { useForm } from "react-hook-form";
import { apiClient } from "@/lib/apiClient";

interface OTPVerificationFormProps {
  email: string;
  // onSwitchToForgotPassword: () => void;
  onSuccess: () => void;
}

export default function VerifyEmail ({ email, onSuccess } : OTPVerificationFormProps ) {
    const {reset, handleSubmit, watch, setValue, formState: { isSubmitting, errors } } = useForm({
      defaultValues: {
        otp: "",
      }
    })
    const otp = watch("otp");

    const onSubmit = async(data: any) => {
      await asyncHandlerFront(
        async() => {
          console.log(data);
          await apiClient.verifyEmail(email, Number(data.otp));
          toast.success("Email verified successfully");
        },
        (error) => toast.error(error.message)
      )
      reset()
      onSuccess();
    };

    const handleResend = async() => {
      await asyncHandlerFront(
        async() => {
          const response:any = await apiClient.resendOtp(email);
          toast.success(response.resendOtp.message)
        },
        (error) => toast.error(error.message)
      )
    }

  return (
    <div className="w-full lg:w-1/3 m-auto items-center justify-center p-8">
    {/* <AuthFormWrapper> */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2"> Verify Your Email </h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to
          <br />
          <span className="text-foreground font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <OTPInput value={otp} onChange={(value:string) => setValue('otp', value, { shouldValidate: true })} />
          { errors.otp && ( <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p> ) }
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
          disabled={isSubmitting || otp.length !== 6}
        >
          {isSubmitting ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Shield className="h-5 w-5" />
              Verify Code
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-3">
        <p className="text-muted-foreground text-sm">
          Didn't receive the code?{" "}
            <button onClick={handleResend} className="text-primary font-medium hover:underline"> Resend Code </button>
        </p>
      </div>
    {/* </AuthFormWrapper> */}
    </div>
  );
};