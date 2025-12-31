import { InputType, Field, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, ValidateNested, IsString, IsNumber, IsDate } from 'class-validator';

@InputType()
class InvoiceItemInput {
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
export class CreateInvoiceInput {
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  issueDate: Date;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @Field(() => Float)
  @IsNumber()
  total: number;

  @Field(() => [InvoiceItemInput])
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemInput)
  @ArrayMinSize(1)
  items: InvoiceItemInput[];
} 