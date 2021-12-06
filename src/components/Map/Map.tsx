import { FC } from 'react';
import { YMaps, Map as YandexMap } from 'react-yandex-maps';

export const Map: FC = () => (
  <YMaps>
    <div>
      <YandexMap
        width={860}
        height={500}
        defaultState={{ center: [55.75, 37.57], zoom: 9 }}
      />
    </div>
  </YMaps>
);
