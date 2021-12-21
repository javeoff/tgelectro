import { TActionType } from '@pages/admin/components/Table/types/TActionType';

export interface ILink {
  id: string;
  action?: TActionType;
  url?: string;
  text: string;
}
