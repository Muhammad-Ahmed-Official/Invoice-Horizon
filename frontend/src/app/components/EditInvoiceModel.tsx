import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Controller } from "react-hook-form";
import { Loader } from "lucide-react";

type InvoiceFormValues = {
  invoiceNumber: string;
  clientName: string;
  clientCompany: string;
  issueDate: string;
  dueDate: string;
  status: string;
};

export default function InvoiceEditModal({ showEditModal, setShowEditModal, invoice }: any) {
  const { register, control, reset, handleSubmit, formState: { errors, isSubmitting} } = useForm<InvoiceFormValues>();

  useEffect(() => {
    if (invoice) {
      reset({
        invoiceNumber: invoice.invoiceNumber,
        clientName: invoice.client.name,
        clientCompany: invoice.client.company,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        status: invoice.status,
      });
    }
  }, [invoice, reset]);

  const onSubmit = (data: InvoiceFormValues) => {
    console.log("UPDATED DATA:", data);
    setShowEditModal(false);
  };

  if (!showEditModal || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-background rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-gradient-gold"> Edit Invoice Details </h2>
          <Button variant="ghost" onClick={() => setShowEditModal(false)}> ✕ </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Invoice Number */}
              <div className="space-y-2">
                <Label className='text-sm font-medium text-foreground/80'>Invoice Number</Label>
                <div className="relative py-2">
                    <Input className="bg-input border-border text-foreground focus:ring-gold" {...register("invoiceNumber")} />
                </div>
              </div>

              {/* Status */}
                <div className="space-y-1">
                    <Label className='text-sm font-medium text-foreground/80'>Status</Label>
                    <div className="relative py-2">
                        <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                            </Select>
                            )}
                        />
                    </div>
                </div>

                {/* Client Name */}
                <div className="space-y-2">
                    <Label className='text-sm font-medium text-foreground/80'>Client Name</Label>
                    <div className="relative py-2">
                        <Input className="bg-input border-border text-foreground focus:ring-gold" {...register("clientName")} />
                    </div>
                </div>

                {/* Client Company */}
                <div className="space-y-2">
                    <Label className='text-sm font-medium text-foreground/80'>Client Company</Label>
                    <div className="relative py-2">
                    <Input className="bg-input border-border text-foreground focus:ring-gold" {...register("clientCompany")} />
                    </div>
                </div>
        
                {/* Issue Date */}
                <div className="space-y-2">
                    <Label className='text-sm font-medium text-foreground/80'>Issue Date</Label>
                    <div className="relative py-2">
                    <Input className="bg-input border-border text-foreground focus:ring-gold" type="date" {...register("issueDate")} />
                    </div>
                </div>
        
                {/* Due Date */}
                <div className="space-y-2">
                    <Label className='text-sm font-medium text-foreground/80'>Due Date</Label>
                    <div className="relative py-2">
                    <Input className="bg-input border-border text-foreground focus:ring-gold" type="date" {...register("dueDate")} />
                    </div>
                </div>
        
            </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}> Cancel </Button>
            <Button disabled={isSubmitting} type="submit" className="bg-gold text-charcoal">
                {isSubmitting ? <span className="flex items-center gap-1">Saving... <Loader className="animate-spin" /></span> :  "Save Changes "}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}