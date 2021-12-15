import { Injectable } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@server/Auth/services/auth.service';
import { IUser } from '@server/Users/types/IUser';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  public validate(
    login: string,
    password: string,
  ): Omit<IUser, 'password'> | Error {
    const user = this.authService.validateUser(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
