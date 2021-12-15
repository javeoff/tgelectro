import { AnyObject } from 'immer/dist/types/types-internal';

import { ConfigName } from '@server/Config/enums/ConfigName';
import { IBaseConfigService } from '@server/Config/types/IBaseConfigService';

export const getJwtConfig = <Service extends IBaseConfigService>(
  configService: Service,
): AnyObject => ({
  secret: configService.get(ConfigName.SECRET_KEY),
  signOptions: { expiresIn: '60s' },
});
