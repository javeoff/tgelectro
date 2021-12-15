import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@server/Users/services/users.service';
import { IUser } from '@server/Users/types/IUser';
import { AuthLoginRequest } from '@server/Auth/dto/AuthLoginRequest';
import { IAuthLoginResponse } from '@server/Auth/types/IAuthLoginResponse';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public validateUser(
    username: string,
    pass: string,
  ): Omit<IUser, 'password'> | undefined {
    const user = this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return undefined;
  }

  public login(dto: AuthLoginRequest): IAuthLoginResponse {
    const payload = { username: dto.login, sub: dto.password };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
