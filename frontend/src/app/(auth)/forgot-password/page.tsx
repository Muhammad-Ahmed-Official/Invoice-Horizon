'use client'

import { Mail, ArrowLeft, Loader } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AuthFormWrapper } from "@/app/components/ui/auth-modal";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useForm } from "react-hook-form";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import { apiClient } from "@/lib/apiClient";

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export default function ForgotPasswordForm({ onSwitchToLogin } : ForgotPasswordFormProps) {
  const { register, reset, handleSubmit, formState: { isSubmitting, errors} } = useForm({
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = async(data:any) => {
    await asyncHandlerFront(
        async() => {
          await apiClient.forgotPassword(data)
        },
        (error:any) => {
          // toast.error("Failed to login", error)
        }
    )
    reset()
  };
  

  return (
    <div className="w-full lg:w-1/3 m-auto items-center justify-center p-8">
    {/* <AuthFormWrapper> */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2"> Forgot Password? </h2>
        <p className="text-muted-foreground"> No worries! Enter your email and we'll send you a reset code. </p>
      </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email py-2">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                {...register('email')}
              />
            </div>
            { errors.email && ( <p className="text-sm text-red-500">{errors.email.message}</p> )}
          </div>
            <Button type="submit" disabled={isSubmitting} variant="gold" size='lg' className="w-full group cursor-pointer">
                {!isSubmitting ? "Send Reset Code" : "Sending Code..."} 
                {!isSubmitting ? <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <Loader className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
        </form>

      <div className="mt-6 text-center">
        <button
          onClick={onSwitchToLogin}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </button>
      </div>
    {/* </AuthFormWrapper> */}
    </div>
  );
};