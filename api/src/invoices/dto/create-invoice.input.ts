import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsDate, IsInt, IsNumber, IsString, Min, ValidateNested } from 'class-validator';

@InputType()
class InvoiceItemInput {
  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  quantity: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  rate: number;
}



@InputType()
export class CreateInvoiceInput {
  @Field(() => String)
  @IsString()
  client: string;

  @Field(() => String)
  @IsDate()
  issueDate: string;

  @Field(() => String)
  @IsDate()
  dueDate: string;

  @Field()
  total: number;

  @Field(() => [InvoiceItemInput])
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemInput)
  @ArrayMinSize(1)
  items: InvoiceItemInput[];
}