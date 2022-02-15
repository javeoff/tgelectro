import { FC } from 'react';
import styled from 'styled-components';

export const Contacts: FC = () => (
  <SWrapper>
    <SPhoneText>8 (800) 700-95-55</SPhoneText>
    <SPhoneText>+7 (4912) 307-300</SPhoneText>
    <SPhoneText>+7 (953) 749-19-19</SPhoneText>
    <SEmailText>aleks-k1984@ya.ru</SEmailText>
  </SWrapper>
);

const SPhoneText = styled.div``;
const SEmailText = styled.div``;
const SWrapper = styled.div`
  & ${SPhoneText} {
    margin-top: -10px;
    font-size: 1.6em;
    font-weight: bold;

    @media screen and (max-width: 992px) {
      font-size: 2.3em;
    }
  }

  & ${SEmailText} {
    margin-top: -5px;
    font-size: 1.1em;
    font-weight: 400;

    @media screen and (max-width: 992px) {
      font-size: 1.8em;
    }
  }

  @media screen and (max-width: 992px) {
    div {
      width: 100%;
      text-align: center;
    }
  }
`;
