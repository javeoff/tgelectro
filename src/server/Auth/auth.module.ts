import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthPageController } from '@server/Auth/controllers/authPage.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from '@server/Auth/strategies/local.strategy';
import { UsersService } from '@server/Users/services/users.service';
import { AuthController } from '@server/Auth/controllers/auth.controller';
import { ConfigModule } from '@server/Config/config.module';
import { getJwtConfig } from '@server/Auth/utils/getJwtConfig';
import { ConfigService } from '@server/Config/services/config.service';
import { JwtStrategy } from '@server/Auth/strategies/jwt.strategy';
import { ClientRequestRef } from '@server/Common/services/clientRequestRef.service';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthPageController, AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    ClientRequestRef,
  ],
})
export class AuthModule {}
