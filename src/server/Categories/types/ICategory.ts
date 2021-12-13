// eslint-disable-next-line import/no-cycle
import { IFabricator } from '@server/Fabricators/types/IFabricator';

export interface ICategory {
  id: number;
  name: string;
  link: string;
  fabricators: IFabricator[];
}
