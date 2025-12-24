import { Args, Context,  Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './entities/loginResponse.entity';
import { UseGuards } from '@nestjs/common';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { SignupUserInput, UpdatePasswordInput } from './dto/signUp-user';
import { SignupResponse } from './entities/signUpResponse.entity';
import { LoginUserInput } from './dto/login-user';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Response } from 'express';

@Resolver('auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService){}

    @Mutation(() => SignupResponse)
    signUp(@Args('SignupUserInput') signupUserInput: SignupUserInput){
        return this.authService.signUp(signupUserInput);
    }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlLocalAuthGuard)
    async login(@Args("loginUserInput") loginUserInput: LoginUserInput, @Context() ctx) {
        const { user } = ctx.req;
        const { access_token }= await this.authService.login(user);
        console.log(access_token)
        ctx.res.cookie('access_token', access_token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
            success: true,
            user,
        };
    }

    @Mutation(() => SignupResponse, { name: 'verifyEmail'})
    async verifyEmail(@Args('email') email:string, @Args('otp') otp:number){
        return await this.authService.verifyEmail(email, otp)
    }

    @Mutation(() => SignupResponse, { name: 'resendOtp'})
    async resendOtp(@Args('email') email:string){
        return await this.authService.resendOtp(email)
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => SignupResponse)
    async forgotPassword( @Args('email') email: string, @Context() ctx ) {
        return await this.authService.forgotPassword(email, ctx.req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => SignupResponse)
    async updatePassword( @Args('oldPassword') oldPassword:string,  @Args('newPassword') newPassword:string, @Args('token') token:string, @Context() ctx, ) {
        return await this.authService.updatePassword(ctx.req.user.id, oldPassword, newPassword, token);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async logout(@Context() context: any ){
        const res = context.res;  
        res.clearCookie('access_token', { path: '/' });
        return true;
    }

    @Query(() => String)
    healthCheck(): string {
      return 'API is running!';
    }
}