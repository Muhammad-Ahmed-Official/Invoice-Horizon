import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@ObjectType()
export class SettingResponse {
  @Field()
  id: string

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
