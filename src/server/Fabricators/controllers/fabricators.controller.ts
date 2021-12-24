import { Controller, Query } from '@nestjs/common';

import { ApiGet } from '@server/Common/decorators/ApiGet';
import { ApiRoute } from '@server/Common/enums/ApiRoute';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

@Controller()
export class FabricatorController {
  public constructor(private readonly fabricatorsFetcher: FabricatorsFetcher) {}

  @ApiGet(ApiRoute.FABRICATOR)
  public async getFabricator(
    @Query() query: { id: string },
  ): Promise<Fabricator> {
    return this.fabricatorsFetcher.getItem(Number(query.id));
  }
}
