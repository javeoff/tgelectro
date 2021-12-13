import { ICategory } from '@server/Categories/types/ICategory';

export const categories: ICategory[] = [
  {
    id: 0,
    name: 'Автоматизация',
    link: '/avtomatizacziya',
    fabricators: [
      {
        name: 'KeySight',
        imageUrl:
          'https://plc-electro.ru/upload/shop_3/1/7/8/group_17847/small_group_17847.jpg',
        link: '#',
        categories: ['0'],
      },
    ],
  },
  {
    id: 1,
    name: 'Блоки питания',
    link: '/bloki-pitaniya',
    fabricators: [
      {
        name: 'KeySight',
        imageUrl:
          'https://plc-electro.ru/upload/shop_3/1/7/8/group_17847/small_group_17847.jpg',
        link: '#',
        categories: ['0'],
      },
    ],
  },
];
