import { createContext, FC } from 'react';

export const AdaptiveContext = createContext(global.isMobile);

export const AdaptiveContextProvider: FC = ({ children }) => (
  <AdaptiveContext.Provider value={global.isMobile}>
    {children}
  </AdaptiveContext.Provider>
);
