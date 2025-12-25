'use client'

import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AuthFormWrapper } from "@/app/components/ui/auth-modal";
import { useEffect, useState } from "react";
import { OTPInput } from "@/app/components/ui/otpInput";

interface OTPVerificationFormProps {
  email: string;
  onSwitchToForgotPassword: () => void;
}

export const VerifyEmail = ({ email, onSwitchToForgotPassword } : OTPVerificationFormProps ) => {
  const [otp, setOtp] = useState("");
//   const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
    //   setError("Please enter the complete 6-digit code");
      return;
    }
    
    // setIsLoading(true);
    // setError("");
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // setIsLoading(false);
    // onSuccess();
  };

  const handleResend = async () => {
    setResendTimer(60);
    // Simulate resend
  };

  return (
    <AuthFormWrapper>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Verify Your Email
        </h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to
          <br />
          {/* <span className="text-foreground font-medium">{email}</span> */}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <OTPInput value={otp} onChange={setOtp} />
          {error && (
            <p className="text-sm text-destructive text-center mt-3">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
        //   disabled={isLoading || otp.length !== 6}
        >
          {/* {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Shield className="h-5 w-5" />
              Verify Code
            </>
          )} */}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-3">
        <p className="text-muted-foreground text-sm">
          Didn't receive the code?{" "}
          {resendTimer > 0 ? (
            <span className="text-foreground">Resend in {resendTimer}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-primary font-medium hover:underline"
            >
              Resend Code
            </button>
          )}
        </p>
        
        <button
          onClick={onSwitchToForgotPassword}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Try different email
        </button>
      </div>
    </AuthFormWrapper>
  );
};