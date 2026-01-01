import { IsEmail, IsNumber, IsString } from 'class-validator';
import { CreateSettingInput } from './create-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSettingInput extends PartialType(CreateSettingInput) {
  @Field(() => String)
  @IsString()
  companyName?: string

  @Field(() => String)
  @IsEmail()
  email?: string

  @Field(() => String)
  @IsString()
  phone?: string

  @Field(() => String)
  @IsString()
  address?: string

  @Field(() => Int)
  @IsNumber()
  taxRate?: number

  @Field(() => String)
  @IsString()
  paymentTerms?: string
}
