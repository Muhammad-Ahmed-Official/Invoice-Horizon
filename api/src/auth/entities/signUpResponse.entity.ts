import { ObjectType, Field, Int, registerEnumType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../guards/roles/roles.enum';

registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class SignupResponse {
  @Field(() =>  ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  @Field()
  isVerified: boolean;

  @Field(() => Int)
  otp: number;

  @Field()
  @IsOptional()
  succes: boolean;

  @Field()
  @IsOptional()
  message: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  accessToken: string;
}