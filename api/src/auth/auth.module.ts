import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategies';
import { JwtStrategy } from './strategies/jwt.strategies';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PassportModule,
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): JwtModuleOptions => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN')},
    }),
  })
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, GqlLocalAuthGuard, JwtAuthGuard],
  exports: [ AuthService, GqlLocalAuthGuard ],
})
export class AuthModule {}
