// eslint-disable-next-line import/no-cycle
import { ICategory } from '@server/Categories/types/ICategory';
// eslint-disable-next-line import/no-cycle
import { IFabricator } from '@server/Fabricators/types/IFabricator';

export interface IProduct {
  id: number;
  vendor: string;
  alternativeVendor: string;
  imageUrl: string;
  description: string;
  price: number;
  category: ICategory;
  fabricator: IFabricator;
}
