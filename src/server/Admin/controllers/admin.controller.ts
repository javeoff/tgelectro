import { Body, Controller, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Page } from '@server/Common/decorators/Page';
import { PageName } from '@common/enums/PageName';
import { ListName } from '@pages/admin/enums/ListName';
import { TableListFactory } from '@server/Admin/factories/TableListFactory';
import { Feature } from '@common/enums/Feature';
import { AdminService } from '@server/Admin/services/admin.service';
import { TItemType } from '@server/Admin/types/TItemType';
import { ApiPost } from '@server/Common/decorators/ApiPost';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';

@Controller()
export class AdminController {
  public constructor(
    private readonly tableListFactory: TableListFactory,
    private readonly adminService: AdminService,
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
            ),
            [ListName.PRODUCTS]: this.tableListFactory.getProductsList(
              lists[ListName.PRODUCTS],
            ),
            [ListName.FABRICATORS]: this.tableListFactory.getFabricatorsList(
              lists[ListName.FABRICATORS],
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
    @Query() query: { type: TItemType; id: string },
  ): Promise<unknown> {
    const subjectService = this.adminService.getService(query.type);

    return {
      activeList: this.adminService.getListNameByListType(query.type),
      type: query.type,
      id: query.id,
      item: await subjectService.getItem(Number(query.id)),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiPost(AdminRoute.SAVE)
  public async saveItem(@Body() dto: SaveItemRequest): Promise<void> {
    await this.adminService.update(dto);
  }
}
