import {  Int, Field, Float, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsInt, IsNumber, IsString, Min, ValidateNested } from 'class-validator';

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
  clientId: string;

  @Field(() => String)
  issueDate: string;

  @Field(() => String)
  dueDate: string;

  @Field(() => [InvoiceItem])
  items: InvoiceItem[];

  @Field()
  total: number
}