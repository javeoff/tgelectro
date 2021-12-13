import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

@Injectable()
export class FabricatorsFetcher {
  public constructor(
    @InjectRepository(Fabricator)
    private fabricatorsRepository: Repository<Fabricator>,
  ) {}

  public fetch(): Promise<IFabricator[]> {
    return this.fabricatorsRepository.find();
  }
}
