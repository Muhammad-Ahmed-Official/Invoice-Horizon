import {  Int, Field, Float, ObjectType, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { statusType } from '../../guards/roles/roles.enum';

registerEnumType(statusType, {
  name: 'statusType'
})

@ObjectType()
class ClientRes {
  @Field()
  name: string;
}

@ObjectType()
class InvoiceItem {
  @Field(() => String)
  description: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  rate: number;
}

@ObjectType()
export class InvoiceResponse {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => String)
  clientId: string;

  // @Field(() => String)
  // userId: string

  @Field(() => ClientRes)
  client: ClientRes; 

  @Field(() => GraphQLISODateTime)
  issueDate: Date;

  @Field(() => GraphQLISODateTime)
  dueDate: Date;

  @Field(() => [InvoiceItem])
  items: InvoiceItem[];

  @Field(() => statusType, { nullable: true })
  @IsOptional()
  @IsEnum(statusType)
  status?: statusType

  @Field()
  total: number
}