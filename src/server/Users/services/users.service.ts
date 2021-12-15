import { Injectable } from '@nestjs/common';

import { IUser } from '@server/Users/types/IUser';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      login: 'admin',
      password: 'admin',
    },
  ];

  public findOne(login: string): IUser | undefined {
    return this.users.find((user) => user.login === login);
  }
}
