import { AnyObject } from 'immer/dist/types/types-internal';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { SendEmailRequest } from '@server/Email/dto/SendEmailRequest';
import { EmailRoute } from '@server/Email/enums/EmailRoute';

class ApiForm extends ApiServiceBase {
  public emailSend(dto: SendEmailRequest, file?: File): Promise<AnyObject> {
    const formData = new FormData();
    const formValue = dto as unknown as Record<string, string>;

    Object.keys(formValue).forEach((key) => {
      formData.append(key, formValue[key]);
    });

    if (file) {
      formData.append('file', file);
    }

    return this.post(EmailRoute.SEND, formData);
  }
}

export const apiForm = new ApiForm();
