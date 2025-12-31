import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Building2, Loader, Mail, PhoneCallIcon, User } from "lucide-react";
import { clientSchema } from "@/features/auth/schemas/clientSchema";
import z from "zod";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/apiClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ModelProp {
    clientModel: boolean;
    setClientModel: (value:boolean) => void;
}

export default function CreateClientModel({ clientModel, setClientModel }: ModelProp) {
  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      clientType: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    await asyncHandlerFront(
      async() => {
        console.log("Client Data:", data);
        await apiClient.createClient(data);
      },
      (error) => toast.error(error.message) 
    )
    reset();
    setClientModel(false);
  };

  if (!clientModel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm bg-black/50">
  <div className="w-full max-w-md sm:max-w-lg bg-background rounded-xl sm:rounded-2xl shadow-xl mx-3 sm:mx-4 max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <div className="flex justify-between items-start md:items-center p-4 md:p-6 border-b sticky top-0 bg-background z-10">
      <div className="pr-4">
        <h2 className="text-lg md:text-2xl font-bold text-gradient-gold leading-tight">
          Create New Client
        </h2>
        <p className="text-xs sm:text-md text-muted-foreground mt-1 hidden sm:block">
          Add a new client to your database
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setClientModel(false)}
        className="h-7 w-7 md:h-8 md:w-8 rounded-full shrink-0 mt-1 sm:mt-0"
      >
        ✕
        <span className="sr-only">Close</span>
      </Button>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4 p-4 md:p-6">
      {/* Client Name */}
      <div className="space-y-1.5 md:space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Client Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="pl-9 md:pl-10 h-9 md:h-10 text-sm md:text-base"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-xs sm:text-sm text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5 md:space-y-2">
        <Label>Client Type</Label>
          <Controller
            control={control}
            name="clientType"
            rules={{ required: 'Client is required' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {["CUSTOMER", "VENDOR"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        {errors.clientType && ( <p className="text-xs text-red-500"> {errors.clientType.message as string} </p> )}
      </div>

      {/* Company */}
      <div className="space-y-1.5 md:space-y-2">
        <Label htmlFor="company" className="text-sm font-medium">
          Company
        </Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          <Input
            id="company"
            type="text"
            placeholder="Acme Inc."
            className="pl-9 md:pl-10 h-9 md:h-10 text-sm md:text-base"
            {...register('company')}
          />
        </div>
        {errors.company && (
          <p className="text-xs md:text-sm text-red-500 mt-1">
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5 md:space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="pl-9 md:pl-10 h-9 md:h-10 text-sm md:text-base"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="text-xs md:text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5 md:space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Contact Number
        </Label>
        <div className="relative">
          <PhoneCallIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="pl-9 sm:pl-10 h-9 sm:h-10 text-sm sm:text-base"
            {...register('phone')}
          />
        </div>
        {errors.phone && (
          <p className="text-xs sm:text-sm text-red-500 mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border mt-4 sm:mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setClientModel(false)}
          className="h-9 md:h-10 w-full sm:w-auto text-sm order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold hover:bg-gold/90 text-charcoal font-medium h-9 sm:h-10 w-full sm:w-auto text-sm order-1 md:order-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-1.5">
              Creating...
              <Loader className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" />
            </span>
          ) : (
            "Create Client"
          )}
        </Button>
      </div>
    </form>
  </div>
</div>
  );
}