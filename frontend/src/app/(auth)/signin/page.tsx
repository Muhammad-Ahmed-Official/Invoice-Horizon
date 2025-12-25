'use client'

import { motion } from "framer-motion";
import { LogIn, Mail, Lock, EyeOff, Eye, Loader } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AuthFormWrapper } from "@/app/components/ui/auth-modal";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useForm } from "react-hook-form";
import z from "zod";
import { signInSchema } from "@/features/auth/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { asyncHandlerFront } from "@/utils/asyncHandler";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
//   onSuccess: () => void;
}

export const SignInForm = ({ onSwitchToSignup,onSwitchToForgotPassword } : LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, reset, handleSubmit, formState: { isSubmitting, errors} } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: '',
    }
  });

  const onSubmit = async(data: z.infer<typeof signInSchema>) => {
    await asyncHandlerFront(
      async() => {
      // const result = await signIn('credentials', {
      //   redirect: false,
      //   identifier: data.email,
      //   password: data.password
      // })
      // if(result?.error) return toast.error(result.error);
      // if(result?.url) router.push(`/dashboard/ngo?ngoId=${params.get("ngoId")}`);
      },
      (error:any) => {
        // toast.error("Failed to login", error)
      }
    )
    reset()
  };


  return (
    <AuthFormWrapper>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to continue your culinary journey
        </p>
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
                />
              </div>
              { errors.email && ( <p className="text-sm text-red-500">{errors.email.message}</p> )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative py-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              { errors.password && ( <p className="text-sm text-red-500">{errors.password.message}</p> ) }
            </div>

            <div className="text-right">
              <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-sm text-primary hover:underline" >
              Forgot Password?
            </button>
            </div>

            <Button type="submit" disabled={isSubmitting} variant="gold" size="lg" className="w-full group cursor-pointer">
              {!isSubmitting ? "Sign In" : "Signing In..."}
              {!isSubmitting ? <LogIn className="w-5 h-5 " /> : <Loader className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </AuthFormWrapper>
  );
};