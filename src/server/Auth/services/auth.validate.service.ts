import { Injectable } from '@nestjs/common/decorators';

import { IUser } from '@server/Users/types/IUser';
import { UsersService } from '@server/Users/services/users.service';

@Injectable()
export class AuthValidateService {
  public constructor(private readonly usersService: UsersService) {}

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
}
