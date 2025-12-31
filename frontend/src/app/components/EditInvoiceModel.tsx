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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm ">
  <div className="w-full max-w-full sm:max-w-md md:max-w-2xl bg-background rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] p-4 sm:p-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-4 sm:mb-6 border-b pb-2 sm:pb-3">
      <h2 className="text-xl md:text-3xl font-bold text-gradient-gold">
        Edit Invoice Details
      </h2>
      <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}> ✕ </Button>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Invoice Number */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/80">Invoice Number</Label>
          <Input
            className="w-full bg-input border-border text-foreground focus:ring-gold h-10 sm:h-11"
            {...register("invoiceNumber")}
          />
        </div>

        {/* Status */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/80">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full h-10 sm:h-11">
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


        {/* Client Name */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/80">Client Name</Label>
          <Input
            className="w-full bg-input border-border text-foreground focus:ring-gold h-10 sm:h-11"
            {...register("clientName")}
          />
        </div>

        {/* Client Company */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/80">Client Company</Label>
          <Input
            className="w-full bg-input border-border text-foreground focus:ring-gold h-10 sm:h-11"
            {...register("clientCompany")}
          />
        </div>

        {/* Issue Date */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/80">Issue Date</Label>
          <Input
            type="date"
            className="w-full bg-input border-border text-foreground focus:ring-gold h-10 sm:h-11"
            {...register("issueDate")}
          />
        </div>

        {/* Due Date */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/80">Due Date</Label>
          <Input
            type="date"
            className="w-full bg-input border-border text-foreground focus:ring-gold h-10 sm:h-11"
            {...register("dueDate")}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => setShowEditModal(false)}
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
</div>

  );
}