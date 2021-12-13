import { FC, useState } from 'react';
import styled from 'styled-components';

import { filterFabricators } from '@pages/index/components/Catalog/utils/filterFabricators';
import {
  CatalogGallery,
  ICatalogGalleryProps,
} from '@pages/index/components/Catalog/components/CatalogGallery/CatalogGallery';
import { AlphabetRange } from '@pages/index/components/Catalog/components/AlphabetRange/AlphabetRange';
import { range } from '@pages/index/components/Catalog/components/AlphabetRange/utils/range';

export const Catalog: FC<ICatalogGalleryProps> = ({ fabricators }) => {
  const [activeRangeIdx, setActiveRangeIdx] = useState<number>(0);
  const filteredFabricators = filterFabricators(
    fabricators,
    range[activeRangeIdx],
  );

  return (
    <div>
      <SAlphabetRange>
        <AlphabetRange
          range={range}
          activeRangeIdx={activeRangeIdx}
          onRangeItemClick={setActiveRangeIdx}
        />
      </SAlphabetRange>
      <SWrapper>
        <CatalogGallery fabricators={filteredFabricators} />
      </SWrapper>
    </div>
  );
};

const SAlphabetRange = styled.div`
  margin-top: 20px;
`;
const SWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;
