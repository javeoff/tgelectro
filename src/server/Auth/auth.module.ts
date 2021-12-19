import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthPageController } from '@server/Auth/controllers/authPage.controller';
import { LocalStrategy } from '@server/Auth/strategies/local.strategy';
import { AuthController } from '@server/Auth/controllers/auth.controller';
import { ConfigModule } from '@server/Config/config.module';
import { ConfigService } from '@server/Config/services/config.service';
import { JwtStrategy } from '@server/Auth/strategies/jwt.strategy';
import { ConfigName } from '@server/Config/enums/ConfigName';
import { AuthValidateService } from '@server/Auth/services/auth.validate.service';
import { FabricatorsModule } from '@server/Fabricators/fabricators.module';
import { UsersModule } from '@server/Users/users.module';
import { AuthService } from '@server/Auth/services/auth.service';

@Module({
  imports: [
    UsersModule,
    FabricatorsModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(ConfigName.SECRET_KEY),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthPageController, AuthController],
  providers: [AuthService, AuthValidateService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
