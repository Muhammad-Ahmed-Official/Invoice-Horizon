import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ObjectType()
export class ClientResponse {
  @Field()
  id: string;

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