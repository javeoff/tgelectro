import { Injectable } from '@nestjs/common';

import { ConfigName } from '@server/Config/enums/ConfigName';
import { TConfigItem } from '@server/Config/types/TConfigItem';

@Injectable()
export class ConfigService {
  public get<ConfigItem extends TConfigItem>(
    name: ConfigItem,
  ): NodeJS.ProcessEnv[ConfigItem] {
    return process.env[name];
  }

  public get IsDev(): boolean {
    return this.get(ConfigName.NODE_ENV) === 'development';
  }
}
