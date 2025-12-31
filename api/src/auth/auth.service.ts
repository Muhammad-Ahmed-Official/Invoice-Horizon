import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/generated/prisma/client';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput } from './dto/signUp-user';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/guards/roles/roles.enum';
import bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'email/emailService';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ){}

    
    async signUp(input: SignupUserInput) {
        try {
            const isExistUser = await this.prisma.user.findUnique({ where: { email: input.email }});
            if(isExistUser) throw new ConflictException('User already exists');
            
            if (input.role === Role.ADMIN && input.secretToken !== this.configService.get('SECRET_TOKEN')) {
                throw new ForbiddenException('Admin creation not allowed');
            }
            
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const otp = Math.floor(100000 + Math.random() * 900000);
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
            
            const user = await this.prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: hashedPassword,
                    role: input.role as Role,
                    otp,
                    otpExpiry,
                    isVerified: false,
                }
            });
            
            if (input.role !== Role.ADMIN) {
                const emailService = new EmailService(this.configService); 
                await emailService.sendEmail(input.email, otp); 
            };
    
            return user;
        } catch (error) {
            throw error;
        }
    };


    async verifyEmail(email: string, otp: number) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if(!user) throw new NotFoundException('Invalid credentials')
        if (user.otp !== otp) {
        throw new BadRequestException('Invalid OTP');
        }

        if (user.otpExpiry! < new Date()) {
        throw new BadRequestException('OTP expired');
        }

        await this.prisma.user.update({
        where: { email },
        data: {
            isVerified: true,
            otp: null,
            // otpExpiry: null,
        },
        });

        return user;
    }



    
    async login(user:User){
        return {
            access_token: this.jwtService.sign({ userName: user.email, sub: user.id }),
            user,
        }
    };


    async resendOtp(email:string){
        const user = await this.prisma.user.findUnique({ where: { email } });
        if(!user) throw new NotFoundException('User not found');
        if(user.isVerified) throw new ConflictException('User already verified');
        
        if(user.otpExpiry! < new Date()) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
            const emailService = new EmailService(this.configService); 
            await emailService.resendOtpEmail(email, otp); 
            await this.prisma.user.update({ where: { email }, data: { otp, otpExpiry } });
            return { success: true, message: "OTP resend successfully" };
        }
        return { success: false, message: "Cannot resend OTP before 10 minutes" }
    };



    async forgotPassword( email: string, userId: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('User not found');

        const token = this.jwtService.sign({ sub: userId }, { expiresIn: '15m' });

        const resetLink = `${process.env.RESET_LINK}/reset-password?token=${token}`;
        // console.log(resetLink);

        const emailService = new EmailService(this.configService);
        await emailService.forgotPasswordEmail(email, resetLink) 
        return { success: true, message: 'Password reset link sent to email' };
    }


    async updatePassword( userId: string, oldPassword:string, newPassword:string, token:string ) {
        let payload: any;
        try {
            payload = this.jwtService.verify(token);
        } catch (err: any) {
            if (err.name === 'TokenExpiredError') {
                throw new BadRequestException('Reset link has expired');
            }
            throw new BadRequestException('Invalid reset token');
        }
    
        const tokenUserId = payload.sub;
        if (userId !== tokenUserId) throw new UnauthorizedException('You are not authorized to reset this password');
    
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Old password is incorrect');
        }

        const newHashed = await bcrypt.hash(newPassword, 10);

        await this.prisma.user.update({
            where: { id: userId },
            data: { password: newHashed },
        });

        return {
            success: true,
            message: 'Password updated successfully',
        };
    }

}