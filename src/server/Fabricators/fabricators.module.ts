import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { FabricatorController } from '@server/Fabricators/controllers/fabricators.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fabricator])],
  providers: [FabricatorsFetcher],
  controllers: [FabricatorController],
  exports: [TypeOrmModule, FabricatorsFetcher],
})
export class FabricatorsModule {}
