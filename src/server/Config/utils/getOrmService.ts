import { AnyObject } from 'immer/dist/types/types-internal';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DatabaseName } from '@server/Config/enums/DatabaseName';

interface IBaseOrmService {
  get(param: string): unknown;
}

export const getOrmService = <Service extends IBaseOrmService>(
  configService: Service,
): AnyObject => ({
  type: configService.get(DatabaseName.DB_TYPE),
  host: configService.get(DatabaseName.DB_HOST),
  port: Number(configService.get(DatabaseName.DB_PORT)),
  username: configService.get(DatabaseName.DB_USERNAME),
  password: configService.get(DatabaseName.DB_PASSWORD),
  database: configService.get(DatabaseName.DB_DATABASE),
  entities: ['src/server/**/*.entity.ts'],
  migrations: ['src/server/**/migrations/*.migration.ts'],
  synchronize: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  autoLoadEntities: false,
});
