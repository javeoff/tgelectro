import {
  Body,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import mailSender from 'sendmail';

import { EmailRoute } from '@server/Email/enums/EmailRoute';
import { SendEmailRequest } from '@server/Email/dto/SendEmailRequest';
import { EmailMessageFactory } from '@server/Email/factories/EmailMessageFactory';
import { ApiPost } from '@server/Common/decorators/ApiPost';

@Controller()
export class EmailController {
  public constructor(
    private readonly emailMessageFactory: EmailMessageFactory,
  ) {}

  private readonly sendEmail =
    process.env.NODE_ENV === 'production'
      ? mailSender({ silent: true })
      : mailSender({
          silent: true,
          devHost: 'localhost',
          devPort: Number(process.env.PORT) || 3_000,
        });

  @ApiPost(EmailRoute.SEND)
  @UseInterceptors(FileInterceptor('file'))
  public send(
    @Body() dto: SendEmailRequest,
    @UploadedFile() file: { buffer: Buffer; name: string },
  ): Promise<unknown> {
    return new Promise((resolve) => {
      const mailOptions: mailSender.MailInput = {
        from: 'website@tg-legard.ru',
        to: process.env.EMAIL_TO || 'empty@email.com',
        replyTo: process.env.EMAIL_TO || 'empty@email.com',
        subject: '',
        html: this.emailMessageFactory.getEmailMessage(dto),
        attachments: file
          ? [{ filename: file.name, content: file.buffer }]
          : undefined,
      };

      // eslint-disable-next-line no-console
      console.log(mailOptions);

      this.sendEmail(mailOptions, () => {
        resolve({ status: true });
      });
    });
  }
}
