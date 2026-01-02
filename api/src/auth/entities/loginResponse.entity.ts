import { ObjectType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { SignupResponse } from './signUpResponse.entity';

@ObjectType()
export class LoginResponse {
  // @IsNotEmpty()
  // @IsString()
  // @Field()
  // accessToken: string;

  //   @IsNotEmpty()
  //   @IsString()
  //   @Field()
  //   refreshToken: string;

  @IsNotEmpty()
  @Field(() => SignupResponse)
  user: SignupResponse
}
