// eslint-disable-next-line import/no-cycle
import { IProduct } from '@server/Products/types/IProduct';

export interface ICategory {
  id: number;
  parentId: number;
  name: string;
  link: string;
  products: IProduct[];
}
