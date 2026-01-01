'use client'

import { Mail, ArrowLeft, Loader, ShieldQuestion } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useForm } from "react-hook-form";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FORGOT_PASSWORD_MUTATION } from "@/graphql/auth";
import { useMutation } from "@apollo/client/react";


export default function ForgotPasswordForm() {
  const { register, reset, handleSubmit, formState: { isSubmitting, errors} } = useForm({
    defaultValues: {
      email: "",
    }
  });

  const [forgotPasswordMutation] = useMutation(FORGOT_PASSWORD_MUTATION);

  const onSubmit = async(data:any) => {
    await asyncHandlerFront(
        async() => {
          const { data: response } = await forgotPasswordMutation({
            variables: { email: data.email }
          });
        },
        (error:any) => toast.error(error.mess)
    )
    reset()
  };
  

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
              <ShieldQuestion className="w-6 h-6 text-gold" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Forgot Password</h2>
            <p className="text-muted-foreground">No worries! Enter your email and we'll send you a link to reset passowrd.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground/80">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="manager@kitchen.com"
                  className="pl-10 h-11 bg-charcoal/50 border-border focus:ring-gold/30 focus:border-gold/50"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-gold hover:bg-gold-light text-charcoal font-semibold rounded-xl transition-all shadow-gold"
            >
              {!isSubmitting ? (
                <>
                  <span>Send Reset Code</span>
                  <Mail className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </>
              ) : (
                <Loader className="w-4 h-4 animate-spin" />
              )}
            </Button>
          </form>

          <div className="pt-8 border-t border-border/60 flex items-center justify-center">
        <Link
          href="/sign-in"
          className="group flex items-center gap-2 text-sm font-bold text-gold hover:text-gold/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to System Sign In
        </Link>
      </div>
        </div>
      </motion.div>
    </div>
  );
};