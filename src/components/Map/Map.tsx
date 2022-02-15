import { FC, useContext } from 'react';

import { AdaptiveContext } from '@common/contexts/adaptiveContext';

export const Map: FC = () => {
  const isMobile = useContext(AdaptiveContext);

  return (
    <div>
      <iframe
        title='map'
        src='https://yandex.ru/map-widget/v1/?um=constructor%3A7ad8ccaa975426dfe7600d3ec08eabf6fabf2117a26d02d90fc2989e9c623d44&amp;source=constructor'
        width={isMobile ? '100%' : '860'}
        height='500'
        frameBorder='0'
      />
    </div>
  );
};
