import { PageName } from '@common/enums/PageName';

export interface IMenuItem {
  name: PageName;
  title: string;
  link: string;
}
