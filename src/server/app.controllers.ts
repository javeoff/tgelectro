import { Controller } from '@nestjs/common';

import { Page } from '@server/Common/decorators/Page';

@Controller()
export class AppController {
  @Page()
  public index(): unknown {
    return {
      title: 'Index Page',
    };
  }

  @Page('contacts')
  public contacts(): unknown {
    return {
      title: 'Contacts Page',
    };
  }
}
