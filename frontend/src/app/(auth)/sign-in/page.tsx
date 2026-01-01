"use client"

import { motion } from "framer-motion"
import { Mail, Lock, EyeOff, Eye, Loader, ArrowRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import z from "zod"
import { signInSchema } from "@/features/auth/schemas/signInSchema"
import Link from "next/link"
import { asyncHandlerFront } from "@/utils/asyncHandler"
import AuthLeftSide from "@/app/components/AuthLeftSide"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client/react"
import { LOGIN_MUTATION } from "@/graphql/auth"

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, reset, handleSubmit, formState: { isSubmitting, errors } } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  })

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const router = useRouter();

  const onSubmit = async(data: z.infer<typeof signInSchema>) => {
    await asyncHandlerFront(
      async() => {
        console.log(data) 
        const { data: response } = await loginMutation({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });
      router.push('/companyInfo');
      },
      (error:any) => toast.error(error.message)
    )
    reset()
  };

  return (
    <div className="min-h-screen w-full flex bg-background font-sans selection:bg-gold/30">

      <AuthLeftSide />

      {/* Right Side: Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-cream">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-100 space-y-10"  >
          <div className="m-0 space-y-2">
            <h2 className="text-3xl font-bold text-charcoal tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">Please enter your credentials to access the inventory system.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="manager@restaurant.com"
                    className="pl-10 pr-10 h-12 bg-white text-black border-none outline-none rounded-md"
                    {...register("email")}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive font-medium">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href='/forgot-password'>
                    <button
                      type="button"
                      className="text-xs font-semibold  text-gold hover:text-gold-dark transition-colors"
                    >
                      Forgot password?
                    </button>
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 bg-white text-black border-none outline-none rounded-md"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive font-medium">{errors.password.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-charcoal hover:bg-charcoal/90 text-white font-bold rounded-xl transition-all shadow-xl shadow-charcoal/10 flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-8 border-t border-border/60 flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium">Need system access?</span>
              <Link href="/sign-up">
              <button className="text-gold cursor-pointer font-bold hover:text-gold/80 transition-colors">
                Request Account
              </button>
              </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
