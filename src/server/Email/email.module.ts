import { Module } from '@nestjs/common';

import { EmailMessageFactory } from '@server/Email/factories/EmailMessageFactory';
import { EmailController } from '@server/Email/controllers/email.controller';

@Module({
  providers: [EmailMessageFactory],
  controllers: [EmailController],
})
export class EmailModule {}
