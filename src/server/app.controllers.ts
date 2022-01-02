import { Controller } from '@nestjs/common';

import { Page } from '@server/Common/decorators/Page';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { PageName } from '@common/enums/PageName';
import { Feature } from '@common/enums/Feature';
import { FabricatorsFactory } from '@server/Fabricators/factories/fabricators.factory';

@Controller()
export class AppController {
  public constructor(
    private readonly fabricatorsFetcher: FabricatorsFetcher,
    private readonly categoriesFetcher: CategoriesFetcher,
    private readonly fabricatorsFactory: FabricatorsFactory,
  ) {}

  @Page(PageName.INDEX)
  public async indexPage(): Promise<unknown> {
    const fabricators = await this.fabricatorsFetcher.fetch();

    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.INDEX,
          categories: await this.categoriesFetcher.fetchParent(),
        },
        [Feature.CATALOG]: {
          fabricators:
            this.fabricatorsFactory.getFabricatorsWithLinks(fabricators),
        },
      },
      title: 'Index Page',
    };
  }

  @Page(PageName.DELIVERY)
  public async deliveryPage(): Promise<unknown> {
    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.DELIVERY,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
      title: 'Delivery Page',
    };
  }

  @Page(PageName.GUARANTEES)
  public async guaranteesPage(): Promise<unknown> {
    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.GUARANTEES,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
      title: 'Guarantees Page',
    };
  }

  @Page(PageName.FOR_SUPPLIERS)
  public async forSuppliersPage(): Promise<unknown> {
    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.FOR_SUPPLIERS,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
      title: 'Suppliers Page',
    };
  }

  @Page(PageName.ABOUT)
  public async aboutPage(): Promise<unknown> {
    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.ABOUT,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
      title: 'About Page',
    };
  }

  @Page(PageName.CONTACTS)
  public async contactsPage(): Promise<unknown> {
    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.CONTACTS,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
      title: 'Contacts Page',
    };
  }
}
