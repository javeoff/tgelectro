import { FC } from 'react';
import styled from 'styled-components';

export const Logo: FC = () => (
  <div>
    <SH2>TG-Legard</SH2>
    <SLabel>Продажа электроники, компонентов и оборудования</SLabel>
  </div>
);

const SH2 = styled.h2`
  margin: 0;
`;
const SLabel = styled.span`
  font-size: 12px;
`;
