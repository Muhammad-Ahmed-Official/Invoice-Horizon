'use client'

import { Shield, Loader } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { OTPInput } from "@/app/components/ui/otpInput";
import toast from "react-hot-toast";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { RESEND_OTP_MUTATION, VERIFY_EMAIL_MUTATION } from "@/graphql/auth";


export default function VerifyEmail () {
  const {reset, handleSubmit, watch, setValue, formState: { isSubmitting, errors } } = useForm({
    defaultValues: {
      otp: "",
    }
  })
  const otp = watch("otp");
  const params = useSearchParams();
  const email = params.get("email")

  const [verifyEmailMutation] = useMutation(VERIFY_EMAIL_MUTATION);

  const router = useRouter();

    const onSubmit = async(data: any) => {
      await asyncHandlerFront(
        async() => {
          console.log(data);
          const { data: response } = await verifyEmailMutation({
            variables: { email, otp: Number(data?.otp) }
          });
          toast.success("Email verified successfully");
          router.push("/sign-in");
        },
        (error) => toast.error(error.message)
      )
      reset()
    };

    const [resendOtpMutation] = useMutation(RESEND_OTP_MUTATION)

    const handleResend = async() => {
      await asyncHandlerFront(
        async() => {
          const { data: response }:any = await resendOtpMutation({
            variables: { email }
          });
          toast.success(response.resendOtp.message)
        },
        (error) => toast.error(error.message)
      )
    }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gold/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4 z-10"
      >
        <div className="bg-card border border-border/50 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 mb-4">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Verify Your Email</h2>
            <p className="text-muted-foreground"> We've sent a 6-digit code to <br /> <span className="text-foreground font-medium">{email}</span> </p>
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
          className="w-full h-11 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl transition-all shadow-gold"
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

      <div className="pt-8 border-t border-border/60 flex items-center justify-center"> Didn't receive the code?
        <button onClick={handleResend} className="group pl-2 flex items-center gap-2 text-sm font-bold text-gold hover:text-gold/80 transition-colors">
          Resend Code
        </button>
      </div>
      </div>
      </motion.div>
    </div>

  );
};