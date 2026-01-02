import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class InvoiceStats {
  @Field(() => Float)
  totalRevenue: number;

  @Field(() => Float)
  paidAmount: number;

  @Field(() => Float)
  pendingAmount: number;

  @Field(() => Float)
  overdueAmount: number;
}