import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@server/Config/services/config.service';
import { ConfigName } from '@server/Config/enums/ConfigName';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigName.SECRET_KEY),
    });
  }

  private static extractJWT(req: {
    cookies: {
      token?: string;
    };
  }): string | null {
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies.token as string;
    }

    return null;
  }

  public validate(payload: { sub: number; login: string }): unknown {
    return { userId: payload.sub, login: payload.login };
  }
}
