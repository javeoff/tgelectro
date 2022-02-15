import { Injectable } from '@nestjs/common/decorators';

import { SendEmailRequest } from '@server/Email/dto/SendEmailRequest';

@Injectable()
export class EmailMessageFactory {
  private readonly translation: Record<string, string> = {
    description: 'Описание',
    name: 'Название',
    phone: 'Телефон',
    email: 'Почта',
  };

  public getEmailMessage(dto: SendEmailRequest): string {
    const lines: string[] = [];

    Object.keys(dto).forEach((key) => {
      const value = dto[key] as string;

      lines.push(`${this.translation[key]}: ${value}`);
    });

    return lines.join('\n');
  }
}
