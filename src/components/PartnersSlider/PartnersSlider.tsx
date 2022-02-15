import { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import styled from 'styled-components';

export const PartnersSlider: FC = () => {
  const [partners, setPartners] = useState<Array<typeof import('*.png')>>([]);

  useEffect(() => {
    const loadIcons = async (): Promise<void> => {
      const partnerList = [
        await import('@assets/img/partner1.jpg'),
        await import('@assets/img/partner2.jpg'),
        await import('@assets/img/partner3.jpg'),
        await import('@assets/img/partner4.jpg'),
        await import('@assets/img/partner5.jpg'),
        await import('@assets/img/partner6.jpg'),
      ];

      setPartners(partnerList);
    };

    void loadIcons();
  }, []);

  if (partners.length === 0) {
    return <></>;
  }

  const settings = {
    autoplaySpeed: 2_000,
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <SWrapper>
      <Slider {...settings}>
        {partners.map((partnerImage, idx) => (
          <div key={idx}>
            <Image src={partnerImage} />
          </div>
        ))}
      </Slider>
    </SWrapper>
  );
};

const SWrapper = styled.div`
  overflow: hidden;
`;
