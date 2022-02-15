import { FC } from 'react';
import styled from 'styled-components';

import sliderBackground from '@assets/img/slider.jpg';
import { mainColor } from '@common/utils/colors';

export const Slider: FC = () => (
  <SSlider>
    <SContent>
      <SH1>
        <h1>Продажа электроники, компонентов и оборудования</h1>
      </SH1>
      <SDescription>С доставкой по всей россии</SDescription>
    </SContent>
    <SliderBackground />
  </SSlider>
);

const SH1 = styled.div``;
const SDescription = styled.div``;
const SContent = styled.div`
  padding: 60px 0;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  text-align: center;
  text-shadow: 0 1px 10px rgba(255, 255, 255, 0.9);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  & ${SH1} {
    width: 100%;

    h1 {
      margin: 0 auto;
      width: 50%;
      color: #000;
      text-align: center;
      font-size: 4em;
      font-weight: bold;

      @media screen and (max-width: 1080px) {
        width: auto;
      }
    }
  }

  & ${SDescription} {
    margin-top: 20px;
    color: ${mainColor};
    font-weight: 600;
    font-size: 1.2em;
    text-shadow: 0 1px 5px rgba(255, 255, 255, 0.8);
  }

  @media screen and (max-width: 1080px) {
    font-size: 2.5vw;
    margin: 60px 0;
    text-align: left;
  }
`;
const SSlider = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #eee;
  overflow: hidden;
  text-transform: uppercase;
  text-align: center;
`;
const SliderBackground = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  background-image: url('${sliderBackground.src}');
  background-size: ${sliderBackground.width / 2}px
    ${sliderBackground.height / 2}px;
  background-repeat: no-repeat;
  background-position: center;
  filter: hue-rotate(199deg);
  width: 100%;
  opacity: 0.3;
`;
