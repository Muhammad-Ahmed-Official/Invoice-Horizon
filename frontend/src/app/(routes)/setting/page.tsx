'use client';

import { Loader, Save } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { companySchema } from '@/features/auth/schemas/companySchema';
import { asyncHandlerFront } from '@/utils/asyncHandler';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import SettingsSkeleton from '@/app/components/skelton/settingSkelton';
import { useMutation, useQuery } from '@apollo/client/react';
import { ME_SETTING, UPDATE_SETTING } from '@/graphql/setting';
import { GetSettingData } from '@/features/auth/types/settingType';


export default function Settings() {
  const {register, reset, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      address: "",
      taxRate: 0,
      paymentTerms: "",
    }
  })
  
  const { data, loading } = useQuery<GetSettingData>(ME_SETTING, {
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (data?.getSetting) {
      reset({
        companyName: data.getSetting.companyName ?? "",
        email: data.getSetting.email ?? "",
        phone: data.getSetting.phone ?? "",
        address: data.getSetting.address ?? "",
        taxRate: Number(data.getSetting.taxRate) ?? 0,
        paymentTerms: data.getSetting.paymentTerms ?? "",
      });
    }
  }, [data, reset]);
// GetSettingData, { input: z.infer<typeof companySchema> }
  const [updateSetting] = useMutation<any>(UPDATE_SETTING, {
   update(cache, { data:  mutationData}) {
    if(!mutationData) return;
    
    cache.writeQuery({
      query: ME_SETTING,
      data: {
        getSetting: mutationData?.updateSetting
      }
    })
   }
  });

  const onsubmit = async (data:z.infer<typeof companySchema>) => {
    await asyncHandlerFront(
      async() => {
        console.log(data)
        const input = {
          ...data,
          taxRate: Number(data.taxRate)
        }
        await updateSetting({
          variables: { input },
        });
      },
      (error) => toast.error(error.message)
    )
    reset()
  }

  if(loading) return <SettingsSkeleton />

  return (
    <div className="w-full px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8 animate-fade-in">
  <div className="mb-6 sm:mb-8 max-w-4xl mx-auto">
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-gold leading-tight sm:leading-normal">Settings</h1>
    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
      Manage your company information and preferences
    </p>
  </div>

  <form onSubmit={handleSubmit(onsubmit)} className="mx-auto max-w-4xl space-y-4 sm:space-y-6 pb-16 sm:pb-20 md:pb-24">
    <Card className="bg-gradient-card border border-border shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-foreground">
          Company Information
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
          This information will appear on your invoices
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 p-4  pt-0">
        <div className="space-y-1.5">
          <Label className="text-xs sm:text-sm font-medium text-foreground/80">
            Company Name
          </Label>
          <div className="py-2">
            <Input
              id="companyName"
              type="text"
              className="bg-input border-border text-foreground focus:ring-gold h-9 sm:h-10 md:h-11 text-sm sm:text-base"
              {...register("companyName")}
            />
          </div>
          {errors.companyName && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-medium text-foreground/80">
              Email
            </Label>
            <div className="py-2">
              <Input
                id="email"
                type="email"
                className="bg-input border-border text-foreground focus:ring-gold h-9 sm:h-10 md:h-11 text-sm sm:text-base"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs sm:text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-medium text-foreground/80">
              Phone
            </Label>
            <div className="py-2">
              <Input
                id="phone"
                type="tel"
                className="bg-input border-border text-foreground focus:ring-gold h-9 sm:h-10 md:h-11 text-sm sm:text-base"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="text-xs sm:text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs sm:text-sm font-medium text-foreground/80">
            Address
          </Label>
          <div className="py-2">
            <Textarea
              id="address"
              rows={2}
              className="bg-input border-border text-foreground focus:ring-gold text-sm sm:text-base resize-none"
              {...register("address")}
            />
          </div>
          {errors.address && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Invoice Settings Card */}
    <Card className="bg-gradient-card border border-border shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-foreground">
          Invoice Settings
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
          Configure default invoice settings
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-3 sm:gap-4 md:grid-cols-2 p-4  pt-0">
        <div className="space-y-1.5">
          <Label className="text-xs sm:text-sm font-medium text-foreground/80">
            Tax Rate (%)
          </Label>
          <div className="py-1 sm:py-2">
            <Input
              id="taxRate"
              type="number"
              className="bg-input border-border text-foreground focus:ring-gold h-9 sm:h-10 md:h-11 text-sm sm:text-base"
              {...register("taxRate", { valueAsNumber: true })}
            />
          </div>
          {errors.taxRate && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.taxRate.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-sm font-medium text-foreground/80">
            Payment Terms
          </Label>
          <div className="py-1 sm:py-2">
            <Input
              id="paymentTerms"
              className="bg-input border-border text-foreground focus:ring-gold h-9 sm:h-10 md:h-11 text-sm sm:text-base"
              {...register("paymentTerms")}
            />
          </div>
          {errors.paymentTerms && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.paymentTerms.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>

    

    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6">
      <Button
        variant="outline"
        disabled={isSubmitting}
        className="border-border text-foreground hover:bg-gold/10 h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto order-2 sm:order-1"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-gold hover:bg-gold-light text-charcoal font-semibold h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto order-1 sm:order-2"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-1.5">
            Saving...
            <Loader className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
          </span>
        ) : (
          <span className="flex items-center justify-center gap-1.5">
            <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Update setting
          </span>
        )}
      </Button>
    </div>
  </form>
</div>  );
}