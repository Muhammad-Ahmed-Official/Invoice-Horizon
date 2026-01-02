import { InputType, Field, Float, registerEnumType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, ValidateNested, IsString, IsNumber, IsDate,IsEnum } from 'class-validator';
import { statusType } from '../../guards/roles/roles.enum';

registerEnumType(statusType, {
  name: 'statusType'
})

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

  @Field(() => statusType, { nullable: true })
  @IsEnum(statusType)
  status: statusType

  @Field(() => [InvoiceItemInput])
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemInput)
  @ArrayMinSize(1)
  items: InvoiceItemInput[];
} 