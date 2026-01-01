'use client'

import { Lock, CheckCircle, Loader, ShieldBan } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { RESET_PASSWORD_MUTATION } from "@/graphql/auth";
import { useMutation } from "@apollo/client/react";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, reset, handleSubmit, formState: { isSubmitting, errors} } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: ""
    }
  });

  const params = useSearchParams();
  const token = params.get("token")

  const [resetPasswordMutation] = useMutation(RESET_PASSWORD_MUTATION);

  const onSubmit = async(data:any) => {
    await asyncHandlerFront(
        async() => {
          const { data: response } = await resetPasswordMutation({
            variables: { oldPassword: data.oldPassword,  newPassword: data.newPassword, token }
          });
        },
        (error) => toast.error(error.message)
    )
    reset()
  };

  let isSuccess

  if (isSuccess) {
    return (
      <div className="w-full lg:w-1/3 m-auto items-center justify-center px-8 py-10">
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
              <ShieldBan className="w-6 h-6 text-gold" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Reset Password</h2>
            <p className="text-muted-foreground">Create a new secure password for your account.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
           <div className="space-y-2">
             <Label htmlFor="password">Old Password</Label>
             <div className="relative py-2">
             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
             <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••"
              className="pl-10 h-11 bg-charcoal/50 border-border focus:ring-gold/30 focus:border-gold/50"
              {...register('oldPassword')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            </button>
            </div>
            { errors.oldPassword && ( <p className="text-xs text-destructive mt-1">{errors.oldPassword.message}</p> )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative py-2">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••"
            className="pl-10 h-11 bg-charcoal/50 border-border focus:ring-gold/30 focus:border-gold/50"
            {...register('newPassword')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
          </button>
          </div>
          { errors.newPassword && ( <p className="text-xs text-destructive mt-1">{errors.newPassword.message}</p> )}
        </div>

            <Button type="submit" disabled={isSubmitting} variant="gold" size='lg' className="w-full h-11 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl transition-all shadow-gold">
              {!isSubmitting ? "Reset Password" : "Resetting Password..."} 
              {!isSubmitting ? <Lock className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <Loader className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>
          
        </div>
      </motion.div>
    </div>
  );
};