// eslint-disable-next-line import/no-cycle
import { IFabricator } from '@server/Fabricators/types/IFabricator';
// eslint-disable-next-line import/no-cycle
import { IProduct } from '@server/Products/types/IProduct';

export interface ICategory {
  id: number;
  name: string;
  link: string;
  fabricators: IFabricator[];
  products: IProduct[];
}
