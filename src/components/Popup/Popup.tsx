import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import styled from 'styled-components';

import { IWithPopupState, withPopupState } from '@components/Popup/hocs/withPopupState';
import { usePortal } from '@common/hooks/usePortal';

const PopupComponent: FC<IWithPopupState> = ({ popups }) => {
  const portalElement = usePortal(true);

  useEffect(() => {
  }, [popups]);

  if (popups.length === 0) {
    return <></>;
  }

  const viewContent = (
    <SWrapper>
      {popups.map(
        ({ title, description }, idx) =>
          popups.length - 1 === idx && (
            <SToast key={idx}>
              <Toast>
                <ToastHeader>{title}</ToastHeader>
                <ToastBody>{description}</ToastBody>
              </Toast>
            </SToast>
          ),
      )}
    </SWrapper>
  );

  return portalElement ? createPortal(viewContent, portalElement) : viewContent;
};

export const Popup = withPopupState(PopupComponent);

const SWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
`;
const SToast = styled.div`
  margin-top: 5px;
  opacity: 1;
  animation: 1s ease 2s normal forwards 1 fadein;
  -webkit-animation: 1s ease 2s normal forwards 1 fadein;

  @keyframes fadein {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @-webkit-keyframes fadein {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
