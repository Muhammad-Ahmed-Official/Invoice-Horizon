import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Controller } from "react-hook-form";
import { Loader } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_INVOICE_MUTATION } from "@/graphql/invoice";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import toast from "react-hot-toast";

type InvoiceItem = {
  description: string;
  quantity: number;
  rate: number;
}

type InvoiceFormValues = {
  id: string;
  name: string;
  issueDate: string;
  dueDate: string;
  status: string;
  total: number;
  items: InvoiceItem[]
};

export default function InvoiceEditModal({ showEditModal, setShowEditModal, invoice }: any) {
  const { register, control, reset, handleSubmit, formState: { errors, isSubmitting} } = useForm<InvoiceFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    if (invoice) {
      reset({
        id: invoice.id,
        name: invoice.client.name,
        issueDate: invoice.issueDate.slice(0, 10),
        dueDate: invoice.dueDate.slice(0, 10),
        status: invoice.status,
        total: invoice.total,
        items: invoice.items
      });
    }
  }, [invoice, reset]);

  const [updateInvoiceMutation] = useMutation(UPDATE_INVOICE_MUTATION)

  const onSubmit = async (data: InvoiceFormValues) => {
    await asyncHandlerFront(
      async() => {
        const cleanItems = invoice.items.map(({ __typename, ...rest }: any) => rest);
        // console.log("UPDATED DATA:", data);
        await updateInvoiceMutation({
          variables: {
            input: {
              id: data.id,
              issueDate: data.issueDate,
              dueDate: data.dueDate,
              total: data.total,
              status: data.status,
              items: cleanItems,
            },
          },
        });
      },
      (error) => toast.error(error.message)
    )
    setShowEditModal(false);
    reset()
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
          <Input disabled
            className="w-full bg-input border-border text-foreground focus:ring-gold h-10 sm:h-11"
            {...register("id")}
          />
        </div>

        {/* Status */}
        <div className="space-y-1">
          <Label  className="text-sm font-medium text-foreground/80">Status</Label>
          <Controller
            control={control}
            name="status"
            defaultValue={invoice?.status}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full h-10 sm:h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>


        {/* Client Name */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/80">Client Name</Label>
          <Input disabled
            className="w-full bg-input border-border text-foreground focus:ring-gold h-10 sm:h-11"
            {...register("name")}
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

        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground/80">
            Total Amount
          </Label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              Rs
            </span>

            <Input
              type="number"
              className="w-full pl-10 bg-input border-border text-foreground focus:ring-gold h-10 sm:h-11"
              {...register("total", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Invoice Items */}
<div className="space-y-3">
  <Label className="text-sm font-medium text-foreground/80">
    Invoice Items
  </Label>

  {fields.map((field, index) => (
    <div
      key={field.id}
      className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end border p-3 rounded-lg"
    >
      {/* Description */}
      <div className="sm:col-span-2">
        <Label className="text-xs">Description</Label>
        <Input
          {...register(`items.${index}.description` as const)}
          placeholder="Item name"
        />
      </div>

      {/* Quantity */}
      <div>
        <Label className="text-xs">Qty</Label>
        <Input
          type="number"
          {...register(`items.${index}.quantity` as const, {
            valueAsNumber: true,
          })}
        />
      </div>

      {/* Rate */}
      <div>
        <Label className="text-xs">Rate</Label>
        <Input
          type="number"
          {...register(`items.${index}.rate` as const, {
            valueAsNumber: true,
          })}
        />
      </div>

      {/* Remove */}
      <div className="sm:col-span-4 text-right">
        <Button
          type="button"
          variant="ghost"
          className="text-red-500"
          onClick={() => remove(index)}
        >
          Remove
        </Button>
      </div>
    </div>
  ))}

  {/* Add Item */}
  <Button
    type="button"
    variant="outline"
    onClick={() =>
      append({ description: "", quantity: 1, rate: 0 })
    }
  >
    + Add Item
  </Button>
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