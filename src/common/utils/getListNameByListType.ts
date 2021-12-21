import { TItemType } from '@server/Admin/types/TItemType';
import { ListName } from '@pages/admin/enums/ListName';

export const getListNameByListType = (listType: TItemType): ListName => {
  switch (listType) {
    default:
    case 'product':
      return ListName.PRODUCTS;
    case 'category':
      return ListName.CATEGORIES;
    case 'fabricator':
      return ListName.FABRICATORS;
  }
};
