export interface IRowLink {
  url: string;
  text: string;
}

export type IValue = string | IRowLink[];

export interface IRow {
  values: IValue[];
}
