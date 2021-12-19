import { Injectable } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { IUser } from '@server/Users/types/IUser';
import { AuthValidateService } from '@server/Auth/services/auth.validate.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private authValidateService: AuthValidateService) {
    super({
      usernameField: 'login',
    });
  }

  public validate(
    login: string,
    password: string,
  ): Omit<IUser, 'password'> | Error {
    const user = this.authValidateService.validateUser(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
