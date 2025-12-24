import { Field, InputType,  registerEnumType } from '@nestjs/graphql';
import {IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/guards/roles/roles.enum';


registerEnumType(Role, {
  name: 'Role', // name of the enum in GraphQL schema
});

@InputType()
export class SignupUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @Field({ nullable: true })
  @IsOptional()
  secretToken?: string;

  @Field({ nullable: true })
  @IsOptional()
  isVerified?: boolean;
}


@InputType()
export class UpdatePasswordInput {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}