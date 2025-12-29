import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateClientInput {
  @Field(() => String)
  @IsString()
  name: string

  @Field(() => String)
  @IsString()
  company: string

  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @IsString()
  phone: string
}