import { useForm } from "react-hook-form";
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

interface ModelProp {
    clientModel: boolean;
    setClientModel: (value:boolean) => void;
}

export default function CreateClientModel({ clientModel, setClientModel }: ModelProp) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-lg bg-background rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-gradient-gold"> Create New Client </h2>
          <Button variant="ghost" onClick={() => setClientModel(false)}> ✕ </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="email py-2">Client Name</Label>
              <div className="relative py-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Ahmed"
                  className="pl-10"
                  {...register("name")}
                />
              </div>
              { errors.name && ( <p className="text-sm text-red-500">{errors.name.message}</p> )}
            </div>

          {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company py-2">Company</Label>
              <div className="relative py-2">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="company"
                  type="company"
                  placeholder="LA consulting corp"
                  className="pl-10"
                  {...register('company')}
                />
              </div>
              { errors.email && ( <p className="text-sm text-red-500">{errors.email.message}</p> )}
            </div>

          {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email py-2">Email</Label>
              <div className="relative py-2">
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

          {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone py-2">Contact Number</Label>
              <div className="relative py-2">
                <PhoneCallIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="phone"
                  placeholder="+923219807641"
                  className="pl-10"
                  {...register('phone')}
                />
              </div>
              { errors.email && ( <p className="text-sm text-red-500">{errors.email.message}</p> )}
            </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setClientModel(false)}> Cancel </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-gold text-charcoal">
              {isSubmitting ? 
                ( <span className="flex items-center gap-1"> Creating... <Loader className="animate-spin" /> </span>) : 
                ("Create Client")
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}