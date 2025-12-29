import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Building2, Loader, Mail, PhoneCallIcon, User } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  client: any;
}

export default function ClientEditModal({ open, onOpenChange, client }: Props) {
  const { register,  reset, handleSubmit, formState: { errors, isSubmitting} } = useForm();

  useEffect(() => {
    if (client) {
      reset({
        invoiceNumber: client.invoiceNumber,
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone
      });
    }
  }, [client, reset]);

  const onSubmit = (data:any) => {
    console.log("UPDATED DATA:", data);
    onOpenChange(false);
  };

 if (!client) return;

  return (
 (open &&  
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm ">
  <div className="w-full max-w-full sm:max-w-md md:max-w-2xl bg-background rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] p-4 sm:p-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-4 sm:mb-6 border-b pb-2 sm:pb-3">
      <h2 className="text-xl md:text-3xl font-bold text-gradient-gold">
        Edit Invoice Details
      </h2>
      <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}> ✕ </Button>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
       
        {/* Client Name */}
        <div className="space-y-1.5 md:space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Client Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          <Input
            className="pl-9 md:pl-10 h-9 md:h-10 text-sm md:text-base"
            {...register("name")}
          />
        </div>
        {/* { errors.name && ( <p className="text-xs text-destructive mt-1">{errors.name.message}</p> )} */}
      </div>


        {/* Client Company */}
        <div className="space-y-1.5 md:space-y-2">
        <Label htmlFor="company" className="text-sm font-medium">
          Company
        </Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          <Input
            className="pl-9 md:pl-10 h-9 md:h-10 text-sm md:text-base"
            {...register('company')}
          />
        </div>
        
      </div>

         {/* Email */}
      <div className="space-y-1.5 md:space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          <Input
            className="pl-9 md:pl-10 h-9 md:h-10 text-sm md:text-base"
            {...register('email')}
          />
        </div>
        
      </div>

      {/* Phone */}
      <div className="space-y-1.5 md:space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Contact Number
        </Label>
        <div className="relative">
          <PhoneCallIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <Input
            className="pl-9 sm:pl-10 h-9 sm:h-10 text-sm sm:text-base"
            {...register('phone')}
          />
        </div>
       
      </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full sm:w-auto bg-gold text-charcoal flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              Saving...
              <Loader className="animate-spin h-4 w-4" />
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  </div>
</div>)
  );
}