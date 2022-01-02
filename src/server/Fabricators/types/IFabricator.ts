// eslint-disable-next-line import/no-cycle
import { IProduct } from '@server/Products/types/IProduct';

export interface IFabricator {
  id: number;
  name: string;
  imageUrl: string;
  link: string;
  products: IProduct[];
}
