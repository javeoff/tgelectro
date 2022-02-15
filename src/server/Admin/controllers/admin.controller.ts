import {
  Body,
  Controller,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Like } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

import { Page } from '@server/Common/decorators/Page';
import { PageName } from '@common/enums/PageName';
import { ListName } from '@pages/admin/enums/ListName';
import { TableListFactory } from '@server/Admin/factories/TableListFactory';
import { Feature } from '@common/enums/Feature';
import { AdminService } from '@server/Admin/services/admin.service';
import { ApiPost } from '@server/Common/decorators/ApiPost';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { DeleteItemRequest } from '@server/Admin/dto/DeleteItemRequest';
import { CreateItemRequest } from '@server/Admin/dto/CreateItemRequest';
import { AdminEditFormFactory } from '@server/Admin/factories/AdminEditFormFactory';
import { ApiGet } from '@server/Common/decorators/ApiGet';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { IRow } from '@pages/admin/components/Table/types/IRow';
import { UploadImageRequest } from '@server/Admin/dto/UploadImageRequest';
import { IUploadImageResponse } from '@pages/admin/types/IUploadImageResponse';
import { AdminFieldDataFactory } from '@server/Admin/factories/AdminFieldDataFactory';

@Controller()
export class AdminController {
  public constructor(
    private readonly tableListFactory: TableListFactory,
    private readonly adminEditFormFactory: AdminEditFormFactory,
    private readonly adminFieldDataFactory: AdminFieldDataFactory,
    private readonly adminService: AdminService,
    private readonly categoriesFetcher: CategoriesFetcher,
    private readonly productsFetcher: ProductsFetcher,
    private readonly fabricatorsFetcher: FabricatorsFetcher,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Page(PageName.ADMIN)
  public async adminPage(
    @Query() query: { activeItem: string },
  ): Promise<unknown> {
    const [lists, listLengths] = await Promise.all([
      await this.adminService.getLists(),
      await this.adminService.getListLengths(),
    ]);

    return {
      features: {
        [Feature.ADMIN]: {
          lists: {
            [ListName.CATEGORIES]: this.tableListFactory.getCategoriesList(
              lists[ListName.CATEGORIES],
              true,
            ),
            [ListName.PRODUCTS]: this.tableListFactory.getProductsList(
              lists[ListName.PRODUCTS],
              true,
            ),
            [ListName.FABRICATORS]: this.tableListFactory.getFabricatorsList(
              lists[ListName.FABRICATORS],
              true,
            ),
          },
          activeList: query.activeItem || ListName.PRODUCTS,
          listLengths,
        },
      },
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Page(PageName.ADMIN_EDIT)
  public async adminEditPage(
    @Query() query: { type: ListName; id: string },
  ): Promise<unknown> {
    const subjectService = this.adminService.getService(query.type);

    return {
      type: query.type,
      id: query.id,
      item: this.adminEditFormFactory.getForm(
        await subjectService.getItem(Number(query.id)),
        query.type,
      ),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Page(PageName.ADMIN_CREATE)
  public adminCreatePage(@Query() query: { type: ListName }): unknown {
    return {
      type: query.type,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiGet(AdminRoute.SEARCH)
  public async searchLists(
    @Query() query: { listName: ListName; value: string },
  ): Promise<IRow[]> {
    const limit = 25;

    switch (query.listName) {
      case ListName.PRODUCTS:
      default: {
        const products = await this.productsFetcher.fetch({
          take: limit,
          where: {
            vendor: Like(`%${query.value}`),
          },
        });

        return this.tableListFactory.getProductsList(products, true);
      }
      case ListName.CATEGORIES: {
        const categories = await this.categoriesFetcher.fetch({
          take: limit,
          where: {
            name: Like(`%${query.value}`),
          },
        });

        return this.tableListFactory.getCategoriesList(categories, true);
      }
      case ListName.FABRICATORS: {
        const fabricators = await this.fabricatorsFetcher.fetch({
          take: limit,
          where: {
            name: Like(`%${query.value}`),
          },
        });

        return this.tableListFactory.getFabricatorsList(fabricators, true);
      }
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiGet(AdminRoute.LIST)
  public async getList(
    @Query() query: { listName: ListName; offset: string },
  ): Promise<IRow[]> {
    const limit = 25;

    const options = {
      skip: Number(query.offset) * limit + limit,
      take: limit,
    };

    switch (query.listName) {
      case ListName.CATEGORIES:
        return this.tableListFactory.getCategoriesList(
          await this.categoriesFetcher.fetch(options),
        );
      case ListName.PRODUCTS:
        return this.tableListFactory.getProductsList(
          await this.productsFetcher.fetch(options),
        );
      case ListName.FABRICATORS:
        return this.tableListFactory.getFabricatorsList(
          await this.fabricatorsFetcher.fetch(options),
        );
      default:
        return [];
    }
  }

  @ApiGet(AdminRoute.FIELD_DATA)
  public async getFieldData(
    @Query()
    query: {
      listName: ListName;
      fieldName: string;
      searchValue?: string;
      offset?: string;
    },
  ): Promise<unknown> {
    const { searchValue, offset, fieldName, listName } = query;

    const targetListName = this.adminFieldDataFactory.getListNameByFieldName(
      fieldName,
      listName,
    );
    const service = this.adminService.getService(targetListName);

    const limit = 10;

    if (!searchValue) {
      return service.fetch({
        skip: offset ? limit * Number(offset) : 0,
        take: limit,
      });
    }

    return service.fetch({
      skip: offset ? limit * Number(offset) : 0,
      take: limit,
      where: {
        name: Like(`%${searchValue}%`),
      },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiPost(AdminRoute.UPLOAD)
  @UseInterceptors(FileInterceptor('image'))
  public uploadImage(
    @UploadedFile() file: { buffer: Buffer },
    @Body() dto: UploadImageRequest,
  ): IUploadImageResponse {
    const fileName = `${dto.fileName}.jpg`;
    const staticPath = `${dto.itemType}/img/${fileName}`;

    const filePath = path.resolve(__dirname, '../..', staticPath);

    fs.writeFileSync(filePath, file.buffer);

    return { filePath: `/api/${dto.itemType}/image/${fileName}` };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiPost(AdminRoute.SAVE)
  public async saveItem(@Body() dto: SaveItemRequest): Promise<void> {
    await this.adminService.update(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiPost(AdminRoute.DELETE)
  public async deleteItem(@Body() dto: DeleteItemRequest): Promise<void> {
    await this.adminService.delete(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiPost(AdminRoute.CREATE)
  public async createItem(@Body() dto: CreateItemRequest): Promise<void> {
    await this.adminService.create(dto);
  }
}
