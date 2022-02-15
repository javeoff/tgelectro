import { FC, SVGAttributes } from 'react';

declare global {
  declare module '*.svg' {
    const value: FC<SVGAttributes<SVGElement>>;

    export const ReactComponent = value;

    const defaultValue: string;

    export default defaultValue;
  }
}
