import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

@Injectable()
export class FabricatorsFetcher {
  public constructor(
    @InjectRepository(Fabricator)
    private readonly fabricatorsRepository: Repository<Fabricator>,
  ) {}

  public getItem(id: number): Promise<IFabricator> {
    return this.fabricatorsRepository.findOneOrFail({ id });
  }

  public fetch(): Promise<IFabricator[]> {
    return this.fabricatorsRepository.find();
  }

  public getLength(): Promise<number> {
    return this.fabricatorsRepository.count();
  }

  public update(entity: Fabricator): Promise<Fabricator> {
    return this.fabricatorsRepository.save(entity);
  }
}
