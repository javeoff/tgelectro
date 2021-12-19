import { Module } from '@nestjs/common';

import { UsersService } from '@server/Users/services/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
