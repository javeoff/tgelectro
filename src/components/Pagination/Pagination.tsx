import { FC } from 'react';
import range from 'lodash/range';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

interface IProps {
  pagesLength: number;
  currentPage: string;
}

export const Pagination: FC<IProps> = ({ pagesLength, currentPage }) => {
  const router = useRouter();
  const route = router.asPath.replace(/\?.*/, '');
  const pagesRange = range(pagesLength);
  const currentPageIdx = pagesRange.indexOf(Number(currentPage)) - 1;

  const getCurrentPageGroup = (): number[] => {
    if (currentPageIdx === pagesRange[0]) {
      return range(4).map((rangeItem) => rangeItem + currentPageIdx + 1);
    }

    if (currentPageIdx < pagesRange[0] + 2) {
      return range(4).map((rangeItem) => rangeItem + currentPageIdx);
    }

    if (currentPageIdx >= pagesLength - 4) {
      return range(4).map((rangeItem) => pagesLength + rangeItem - 6);
    }

    return range(5).map((rangeItem) => rangeItem + currentPageIdx - 1);
  };

  const pages =
    pagesLength > 6
      ? [pagesRange[0], ...getCurrentPageGroup(), pagesLength - 2]
      : range(pagesLength - 1);

  return (
    <div>
      {pages.map((pageId, idx) =>
        pageId === currentPageIdx ? (
          <SPaginationItem isActive={true} key={idx}>
            <Link href={`${route}?page=${pageId + 1}`}>{`${pageId + 1}`}</Link>
          </SPaginationItem>
        ) : (
          <SPaginationItem key={idx}>
            <Link href={`${route}?page=${pageId + 1}`}>{`${pageId + 1}`}</Link>
          </SPaginationItem>
        ),
      )}
    </div>
  );
};

const SPaginationItem = styled.div<{ isActive?: boolean }>`
  display: inline;
  margin-right: 10px;

  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: bold;
    `}
`;
