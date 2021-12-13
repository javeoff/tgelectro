// eslint-disable-next-line import/no-cycle
import { ICategory } from '@server/Categories/types/ICategory';

export interface IFabricator {
  id: number;
  name: string;
  imageUrl: string;
  link: string;
  categories: ICategory[];
}
