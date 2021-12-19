import { TItemType } from '@server/Admin/types/TItemType';
import { IProduct } from '@server/Products/types/IProduct';
import { ICategory } from '@server/Categories/types/ICategory';
import { IFabricator } from '@server/Fabricators/types/IFabricator';

export const editItemTranslation: Record<TItemType, string> = {
  product: 'продукта',
  category: 'категории',
  fabricator: 'производителя',
};

type TUnionSubject = IProduct & ICategory & IFabricator;

export const fieldTypeTranslation: Record<keyof TUnionSubject, string> = {
  id: 'Идентификатор',
  vendor: 'Артикул',
  alternativeVendor: 'Альтернативный артикул',
  imageUrl: 'Изображение',
  description: 'Описание',
  price: 'Цена',
  category: 'Категория',
  fabricator: 'Производитель',
  name: 'Название',
  link: 'Ссылка',
  fabricators: 'Производители',
  products: 'Продукты',
  categories: 'Категории',
};
