import { Body, Controller, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

@Controller()
export class AdminController {
  public constructor(
    private readonly tableListFactory: TableListFactory,
    private readonly adminEditFormFactory: AdminEditFormFactory,
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
    @Query() query: { type: ListName; id: string },
  ): Promise<unknown> {
    const subjectService = this.adminService.getService(query.type);

    return {
      type: query.type,
      id: query.id,
      item: this.adminEditFormFactory.getForm(
        await subjectService.getItem(Number(query.id)),
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
