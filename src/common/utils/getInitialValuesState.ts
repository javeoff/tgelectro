import { TValuesState } from '@pages/admin/types/TValuesState';
import { ListName } from '@pages/admin/enums/ListName';

export const getInitialValuesState = (itemType: ListName): TValuesState => {
  switch (itemType) {
    case ListName.PRODUCTS:
      return {
        vendor: '',
        alternativeVendor: '',
        category: null,
        fabricator: null,
        imageUrl: '',
        description: '',
        price: '0',
      };
    case ListName.CATEGORIES:
      return {
        parent: null,
        name: '',
        link: '/',
      };
    case ListName.FABRICATORS:
      return {
        name: '',
        imageUrl: '',
        link: '/',
      };
    default:
      throw new Error('Ошибка. Неизвестный тип сущности');
  }
};
