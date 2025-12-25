'use client'

import { Lock, CheckCircle, Loader } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";
import { asyncHandlerFront } from "@/utils/asyncHandler";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, reset, handleSubmit, formState: { isSubmitting, errors} } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: ""
    }
  });

  const onSubmit = async(data:any) => {
    await asyncHandlerFront(
        async() => {
          
        },
        (error:any) => {
          // toast.error("Failed to login", error)
        }
    )
    reset()
  };

  let isSuccess

  if (!isSuccess) {
    return (
      <div className="w-full lg:w-1/3 m-auto items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Password Reset!
          </h2>
          <p className="text-muted-foreground mb-8">
            Your password has been successfully reset.
            <br />
            You can now sign in with your new password.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/3 m-auto items-center justify-center p-8">
      <div className=" text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Reset Password
        </h2>
        <p className="text-muted-foreground">
          Create a new secure password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="password">Old Password</Label>
            <div className="relative py-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••"
              className="pl-10 pr-10"
              {...register('oldPassword')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            </button>
            </div>
            { errors.oldPassword && ( <p className="text-sm text-red-500">{errors.oldPassword.message}</p> )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative py-2">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••"
            className="pl-10 pr-10"
            {...register('newPassword')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          </button>
          </div>
          { errors.newPassword && ( <p className="text-sm text-red-500">{errors.newPassword.message}</p> )}
        </div>
        <Button type="submit" disabled={isSubmitting} variant="gold" size='lg' className="w-full group cursor-pointer">
            {!isSubmitting ? "Reset Password" : "Resetting Password..."} 
            {!isSubmitting ? <Lock className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <Loader className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </Button>

        {/* <div className="space-y-2">
          <FormInput
          label="New Password"
          placeholder="Enter new password"
          showPasswordToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          />
          <PasswordStrength password={password} />
          </div>
          <FormInput
          label="Confirm New Password"
          placeholder="Confirm your new password"
          showPasswordToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        /> */}
        {/* <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full mt-6"
          disabled={isLoading}
          >
          {isLoading ? (
              <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Resetting Password...
            </>
          ) : (
              <>
              <Lock className="h-5 w-5" />
              Reset Password
            </>
          )}
        </Button> */}
      </form>
    </div>
  );
};