import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { InputType, Field,  PartialType, Float, registerEnumType } from '@nestjs/graphql';
import { statusType } from '../../guards/roles/roles.enum';

registerEnumType(statusType, {
  name: 'statusType'
})

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

  @Field(() => String, { nullable: true })
  @IsString()
  issueDate?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  dueDate?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  total?: number;

  @Field(() => statusType, { nullable: true })
  @IsOptional()
  @IsEnum(statusType)
  status?: statusType

  @Field(() => [InvoiceItems], { nullable: 'itemsAndList' })
  @IsArray()
  items?: InvoiceItems[];
}

  // @Field(() => String, { nullable: true })
  // @IsString()
  // clientId?: string;