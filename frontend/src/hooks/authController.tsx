'use client'

import { SignupForm } from "@/app/(auth)/signup/page";
import { SignInForm } from "@/app/(auth)/signin/page";
import { AuthModal } from "@/app/components/ui/auth-modal";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ForgotPasswordForm } from "@/app/(auth)/forgot-password/page";
import { VerifyEmail } from "@/app/(auth)/verify-email/page";

type AuthState = "login" | "signup" | "forgot-password" | "otp-verification" | "reset-password";

interface AuthControllerProps {
  isOpen: boolean;
  onClose: () => void;
  initialState?: AuthState;
}
// hey there i really like your post today this what i think about it 

export const AuthController: React.FC<AuthControllerProps> = ({
  isOpen,
  onClose,
  initialState = "login",
}) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAuthState(initialState);
    }
  }, [isOpen, initialState]);

//   const handleLoginSuccess = () => {
//     toast({
//       title: "Welcome back!",
//       description: "You have successfully signed in.",
//     });
//     onClose();
//   };
//   const handleSignupSuccess = () => {
//     toast({
//       title: "Account created!",
//       description: "Welcome to La Maison. Your account is ready.",
//     });
//     onClose();
//   };
//   const handleForgotPasswordSuccess = (email: string) => {
//     setResetEmail(email);
//     setAuthState("otp-verification");
//   };
//   const handleOTPSuccess = () => {
//     setAuthState("reset-password");
//   };
//   const handleResetPasswordSuccess = () => {
//     setAuthState("login");
//     toast({
//       title: "Password reset successful!",
//       description: "You can now sign in with your new password.",
//     });
//   };

  const renderForm = () => {
    switch (authState) {
      case "login":
        return (
          <SignInForm
            onSwitchToSignup={() => setAuthState("signup")}
            onSwitchToForgotPassword={() => setAuthState("forgot-password")}
            // onSuccess={handleLoginSuccess}
          />
        );
      case "signup":
        return (
          <SignupForm
            onSwitchToLogin={() => setAuthState("login")}
            // onSuccess={handleSignupSuccess}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onSwitchToLogin={() => setAuthState("login")}
          />
        );
      case "otp-verification":
        return (
          <VerifyEmail
            email={resetEmail}
            onSwitchToForgotPassword={() => setAuthState("forgot-password")}
            // onSuccess={handleOTPSuccess}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose}>
      <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
    </AuthModal>
  );
};