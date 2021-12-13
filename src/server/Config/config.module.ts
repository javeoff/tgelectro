import { Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getOrmService } from '@server/Config/utils/getOrmService';
import { ConfigService } from '@server/Config/services/config.service';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production' }),
      { viewsDir: null },
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getOrmService,
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
