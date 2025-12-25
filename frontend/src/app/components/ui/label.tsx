"use client";

import { Root as LabelRoot } from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const labelVariants = cva( "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelRoot> &  VariantProps<typeof labelVariants>;

export const Label = forwardRef<React.ComponentRef<typeof LabelRoot>, LabelProps>(
  ({ className, ...props }, ref) => {
    return <LabelRoot ref={ref} className={cn(labelVariants(), className)} {...props} />;
  }
);

Label.displayName = "Label";