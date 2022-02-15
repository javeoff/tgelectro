import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { filterFabricators } from '@components/Catalog/utils/filterFabricators';
import { range } from '@components/Catalog/components/AlphabetRange/utils/range';
import { IFabricator } from '@server/Fabricators/types/IFabricator';

interface IResponse {
  activeRangeIdx: number;
  setActiveRangeIdx: Dispatch<SetStateAction<number>>;
  catalogItems: IFabricator[];
  onLoadMoreItems(): void;
  canExpand: boolean;
}

const initialLimit = 25;

export const useCatalog = (fabricators: IFabricator[]): IResponse => {
  const [limit, setLimit] = useState<number>(initialLimit);
  const [activeRangeIdx, setActiveRangeIdx] = useState<number>(0);

  useEffect(() => {
    setLimit(initialLimit);
  }, [activeRangeIdx]);

  const onLoadMoreItems = (): void => {
    setLimit(limit * 2);
  };

  const catalogItems = filterFabricators(fabricators, range[activeRangeIdx]);

  const canExpand = catalogItems.length > limit;

  const filteredItems = catalogItems.filter((_, idx) => idx < limit);

  return {
    catalogItems: filteredItems,
    activeRangeIdx,
    setActiveRangeIdx,
    onLoadMoreItems,
    canExpand,
  };
};
