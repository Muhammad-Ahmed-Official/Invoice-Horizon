'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Mail, MapPin, Percent, Clock, ArrowRight, Phone, Loader } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { companySchema } from "@/features/auth/schemas/companySchema";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { SETTING_MUTATION } from "@/graphql/setting";


const CompanyInfo = () => {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer <typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      address: "",
      taxRate: 0,
      paymentTerms: "",
    },
  });

  const [settingMutation] = useMutation(SETTING_MUTATION);

  const onSubmit = async (data: z.infer<typeof companySchema>) => {
    await asyncHandlerFront(
      async() => {
        console.log("Company Info:", data);
        const { data: response } = await settingMutation({
          variables: {
            input: {
              companyName: data.companyName,
              email: data.email,
              phone: data.phone,
              address: data.address,
              taxRate: data.taxRate,
              paymentTerms: data.paymentTerms,
            },
          },
        });
        router.push('/home')
      },
      (error) => toast.error(error.message)
    ),
    reset()
  };

  return (
    <div className="min-h-screen gradient-dark flex items-center justify-center p-4 md:p-8">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-4 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-sans font-bold text-foreground mb-1">
            Complete Your <span className="text-gradient-gold">Profile</span>
          </h1>
          <p className="text-muted-foreground font-body text-base md:text-lg"> Tell us about your business to get started </p>
        </div>

        {/* Form Card */}
        <div className="gradient-card rounded-2xl p-5 md:px-8 border border-border shadow-lg animate-slide-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gold" />
                Company Name
              </Label>
              <Input
                id="companyName"
                placeholder="Enter your company name"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive font-body">{errors.companyName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@company.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive font-body">{errors.email.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                Phone
              </Label>
              <Input
                type="tel"
                placeholder="+923249106612"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive font-body">{errors.phone.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                Business Address
              </Label>
              <Input
                id="address"
                placeholder="123 Main Street, City, State"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-destructive font-body">{errors.address.message}</p>
              )}
            </div>

            {/* Tax Rate & Payment Terms Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tax Rate */}
              <div className="space-y-2">
                <Label htmlFor="taxRate" className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-gold" />
                  Tax Rate (%)
                </Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="8.5"
                  {...register("taxRate",{valueAsNumber: true}  )}
                />
                {errors.taxRate && (
                  <p className="text-sm text-destructive font-body">{errors.taxRate.message}</p>
                )}
              </div>

              {/* Payment Terms */}
              <div className="space-y-2">
                <Label htmlFor="paymentTerms" className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  Payment Terms
                </Label>
                <Input
                  id="paymentTerms"
                  type="text"
                  placeholder="Net 30"
                  {...register("paymentTerms")}
                />
                {errors.paymentTerms && ( <p className="text-sm text-destructive font-body">{errors.paymentTerms.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  Saving... <Loader className="animate-spin" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Continue
                  <ArrowRight className="w-5 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm font-body mt-6 animate-fade-in">
          You can update these details later in settings
        </p>
      </div>
    </div>
  );
};

export default CompanyInfo;