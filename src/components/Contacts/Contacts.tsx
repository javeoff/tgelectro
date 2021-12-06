import { FC } from 'react';
import styled from 'styled-components';

export const Contacts: FC = () => (
  <div>
    <SPhoneText>+7 (999) 99 99</SPhoneText>
    <SPhoneText>+7 (999) 99 99</SPhoneText>
    <SEmailText>info@website.com</SEmailText>
  </div>
);

const SPhoneText = styled.div`
  margin-top: -10px;
  font-size: 1.6em;
  font-weight: bold;
`;
const SEmailText = styled.div`
  margin-top: -5px;
  font-size: 1.1em;
  font-weight: 400;
`;
