import { ICategory } from '@server/Categories/types/ICategory';
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
