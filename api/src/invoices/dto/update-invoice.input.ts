import { IsArray, IsNumber, IsString } from 'class-validator';
import { CreateInvoiceInput } from './create-invoice.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
class InvoiceItems {
  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Float)
  @IsNumber()
  quantity: number;

  @Field(() => Float)
  @IsNumber()
  rate: number;
}

@InputType()
export class UpdateInvoiceInput {
  @Field(() => String)
  @IsString()
  id: string;

  // @Field(() => String, { nullable: true })
  // @IsString()
  // clientId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  issueDate?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  dueDate?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  total?: number;

  @Field(() => [InvoiceItems], { nullable: 'itemsAndList' })
  @IsArray()
  items?: InvoiceItems[];
}