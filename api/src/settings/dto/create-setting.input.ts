import { InputType,  Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateSettingInput {
  @Field()
  @IsString()
  companyName: string

  @Field(() => String)
  @IsEmail()
  email: string

  @Field()
  @IsString()
  phone: string

  @Field()
  @IsString()
  address: string

  @Field(() => Int)
  @IsNumber()
  taxRate: number

  @Field()
  @IsString()
  paymentTerms: string
}