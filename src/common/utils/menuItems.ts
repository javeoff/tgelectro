import { IMenuItem } from '@common/types/IMenuItem';
import { PageName } from '@common/enums/PageName';

export const menuItems: IMenuItem[] = [
  {
    name: PageName.FABRICATORS,
    title: 'Производители',
    link: '/fabricators',
  },
  {
    name: PageName.CATEGORIES,
    title: 'Категории товаров',
    link: '/categories',
  },
  {
    name: PageName.DELIVERY,
    title: 'Доставка',
    link: '/delivery',
  },
  {
    name: PageName.GUARANTEES,
    title: 'Гарантия',
    link: '/guarantees',
  },
  {
    name: PageName.FOR_SUPPLIERS,
    title: 'Поставщикам',
    link: '/for-suppliers',
  },
  {
    name: PageName.ABOUT,
    title: 'О Компании',
    link: '/about',
  },
  {
    name: PageName.CONTACTS,
    title: 'Контакты',
    link: '/contacts',
  },
];
