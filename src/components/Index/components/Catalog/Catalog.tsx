import { FC, useState } from 'react';
import styled from 'styled-components';

import { AlphabetRange } from '@components/Index/components/Catalog/components/AlphabetRange/AlphabetRange';
import {
  CatalogGallery,
  ICatalogGalleryProps,
} from '@components/Index/components/Catalog/components/CatalogGallery/CatalogGallery';
import { range } from '@components/Index/components/Catalog/components/AlphabetRange/utils/range';
import { filterFabricators } from '@components/Index/components/Catalog/utils/filterFabricators';

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
