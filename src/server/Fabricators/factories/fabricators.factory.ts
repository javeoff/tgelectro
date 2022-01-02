import { Injectable } from '@nestjs/common/decorators';

import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

@Injectable()
export class FabricatorsFactory {
  public getFabricatorWithLink(fabricator: Fabricator): Fabricator {
    return {
      ...fabricator,
      link: `/fabricators/${fabricator.link}`,
    };
  }

  public getFabricatorsWithLinks(fabricators: Fabricator[]): Fabricator[] {
    return fabricators.map((fabricator) =>
      this.getFabricatorWithLink(fabricator),
    );
  }
}
