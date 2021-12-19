import { useEffect, useState } from 'react';

export const usePortal = (hasPortal = true): Element | null => {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(
    null,
  );

  useEffect(() => {
    if (!hasPortal) {
      return;
    }

    const element = document.createElement('div');

    document.body.append(element);

    setPortalElement(element);

    return () => {
      setPortalElement(null);
      element.remove();
    };
  }, [hasPortal]);

  return portalElement;
};
