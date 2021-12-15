import { Controller } from '@nestjs/common';
import { EmptyObject } from 'redux';

import { PageName } from '@common/enums/PageName';
import { Page } from '@server/Common/decorators/Page';

@Controller()
export class AuthPageController {
  @Page(PageName.AUTH, false, ['login'])
  public authPage(): EmptyObject {
    return {};
  }

  @Page(PageName.ADMIN, true)
  public adminPage(): EmptyObject {
    return {};
  }
}
