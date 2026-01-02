import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { clientType } from '../../guards/roles/roles.enum';

registerEnumType(clientType, { name: 'clientType' });

@ObjectType()
export class ClientResponse {
  @Field()
  id: string;

  @Field(() => String)
  @IsString()
  name: string
  
  @Field(() => String)
  @IsEmail()
  email: string
  
  @Field(() => String)
  @IsString()
  phone: string
  
  @Field(() => clientType)
  role: clientType;
}