import { IFabricator } from '@common/types/IFabricator';

export const filterFabricators = (
  fabricators: IFabricator[],
  activeRange: string,
): IFabricator[] => {
  if (activeRange === 'ВСЕ') {
    return fabricators;
  }

  return fabricators.filter(
    ({ name }) => name[0].toLowerCase() === activeRange.toLowerCase(),
  );
};
