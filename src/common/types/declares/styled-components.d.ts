// eslint-disable-next-line unicorn/filename-case
import { ITheme } from '@components/app/Layout/Layout';

// eslint-disable-next-line unicorn/filename-case
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-empty-interface
  interface DefaultTheme extends ITheme {}
}
