import { Injectable } from '@nestjs/common/decorators';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

import { ConfigService } from '@server/Config/services/config.service';
import { ConfigName } from '@server/Config/enums/ConfigName';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigName.SECRET_KEY),
    });
  }

  public validate(payload: { sub: number; login: string }): unknown {
    return { userId: payload.sub, login: payload.login };
  }
}
