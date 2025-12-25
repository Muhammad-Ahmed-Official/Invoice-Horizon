'use client'

import { UserPlus, Loader2, Lock, Mail, User, Loader, Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { AuthFormWrapper } from "@/app/components/ui/auth-modal";
import { useEffect, useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { signUpSchema } from "@/features/auth/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import { useDebounceCallback } from "usehooks-ts";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

 export const SignupForm = ({ onSwitchToLogin } : SignupFormProps ) => {
  const [showPassword, setShowPassword] = useState(false);
  const {register, reset, handleSubmit, watch, formState: { isSubmitting, errors } } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    }
  })

  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [userNameMessage, setUserNameMessage] = useState('');
  const userName = watch("userName");
  const debouncedCheck = useDebounceCallback(async(value:string) => {
    if (!value) return;
    setIsCheckingUsername(true);
    setUserNameMessage("");

    await asyncHandlerFront(
      async () => {
        // const res: any = await apiClient.uniqueName(value);
        // if (res.message === "userName is available") {
        //   setUserNameMessage(res.message)
        // } else {
        //   setUserNameMessage("userName already taken")
        // }
      },
      // (error:any) => toast.error("Something went wrong!", error.message)
    );

  }, 1000)

  useEffect(() => {
    debouncedCheck(userName);
  }, [userName]);

  const onSubmit = async(data: z.infer<typeof signUpSchema>) => {
    await asyncHandlerFront(
      async() => {

      },
      (error) => {

      }
    )
    reset()
  }


  return (
    <AuthFormWrapper>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2"> Create Account </h2>
        <p className="text-muted-foreground"> Join us for an exceptional dining experience </p>
      </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="userName">User Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="userName"
                    placeholder="yourname"
                    className="pl-10"
                    {...register('userName')}
                  />

                  {isCheckingUsername && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                    </div>
                  )}
                </div>

                {userNameMessage && (
                    <div className="flex items-center gap-2">
                      {userNameMessage === 'userName is available' && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                      <p className={`text-sm ${userNameMessage === 'userName is available' ? 'text-green-400' : 'text-red-400'}`}>
                        {userNameMessage}
                      </p>
                      {errors.userName && ( <p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>)}
                    </div>
                )}
              </div>


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
                </button>
              </div>
              {errors.password && ( <p className="text-sm text-red-500">{errors.password.message}</p> )}
            </div>

            <Button disabled={isSubmitting} type="submit" variant="gold" size="lg" className="w-full group cursor-pointer">
              {!isSubmitting ? "Create Account" : "Account Creating...."} 
              {!isSubmitting ? <UserPlus className="w-5 h-5" /> : <Loader className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>


      {/* <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <FormInput
            label="Password"
            placeholder="Create a strong password"
            showPasswordToggle
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            error={errors.password}
          />
          <PasswordStrength password={formData.password} />
        </div>
        <FormInput
          label="Confirm Password"
          placeholder="Confirm your password"
          showPasswordToggle
          value={formData.confirmPassword}
          onChange={(e) => updateField("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
        />
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full mt-6"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              Create Account
            </>
          )}
        </Button>
      </form> */}

      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-primary font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </AuthFormWrapper>
  );
};