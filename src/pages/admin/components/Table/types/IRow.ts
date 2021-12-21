import { ILink } from '@pages/admin/components/Table/types/ILink';

export type IValue = string | ILink[];

export interface IRow {
  values: IValue[];
}
