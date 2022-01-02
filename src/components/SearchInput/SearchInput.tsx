import styled from 'styled-components';
import { Button, Input } from 'reactstrap';
import { FC, useState } from 'react';
import qs from 'qs';
import { useRouter } from 'next/router';

import { mainColor } from '@common/utils/colors';
import SearchIcon from '@components/Header/img/search.svg';

interface IProps {
  searchQuery?: string;
}

export const SearchInput: FC<IProps> = ({ searchQuery = '' }) => {
  const [value, setValue] = useState<string>(searchQuery);
  const router = useRouter();

  const onSearchStart = (): Promise<boolean> =>
    router.push(`/search?${qs.stringify({ text: value })}`);

  const onEnterPress = async (e: KeyboardEvent): Promise<void> => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await onSearchStart();
    }
  };

  return (
    <SInputWrapper>
      <SSearchInput
        placeholder='Поиск по артикулу или названию'
        defaultValue={searchQuery}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyPress={onEnterPress}
      />
      <SSearchButton onClick={onSearchStart}>
        <SearchIcon color='#fff' width='22px' height='22px' />
      </SSearchButton>
    </SInputWrapper>
  );
};

const SInputWrapper = styled.div`
  display: flex;
`;

const SSearchInput = styled(Input)`
  border-radius: 2px 0 0 2px;
`;

const SSearchButton = styled(Button)`
  display: inline;
  border-radius: 0 2px 2px 0;
  background: ${mainColor};
  border: 1px solid transparent;
`;
