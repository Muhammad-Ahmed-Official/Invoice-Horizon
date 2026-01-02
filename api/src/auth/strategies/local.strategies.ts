import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { PrismaService } from "../../prisma/prisma.service";
import bcrypt from 'bcrypt'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private prisma: PrismaService) {
        super({ usernameField: 'email' });
    }
    async validate(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials');

        if (!user.isVerified) {
            throw new UnauthorizedException('Please verify your email');
        }

        const { password: _, ...result } = user;
        return result;
    }
}