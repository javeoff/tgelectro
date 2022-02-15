// eslint-disable-next-line import/no-cycle
import { IProduct } from '@server/Products/types/IProduct';
// eslint-disable-next-line import/no-cycle
import { Category } from '../entities/category.entity';

export interface ICategory {
  id: number;
  name: string;
  link: string;
  products: IProduct[];
  parent: Category;
  children: Category[];
}
