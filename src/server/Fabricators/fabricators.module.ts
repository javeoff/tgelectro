import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fabricator])],
  providers: [FabricatorsFetcher],
  exports: [TypeOrmModule, FabricatorsFetcher],
})
export class FabricatorsModule {}
