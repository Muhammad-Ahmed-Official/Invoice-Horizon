import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { clientType } from '../../guards/roles/roles.enum';

registerEnumType(clientType, {
  name: 'ClientType', // name of the enum in GraphQL schema
});



@InputType()
export class CreateClientInput {
  @Field(() => String)
  @IsString()
  name: string

  @Field(() => clientType, { nullable: true })
  @IsOptional()
  @IsEnum(clientType)
  role?: clientType;


  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @IsString()
  phone: string
}