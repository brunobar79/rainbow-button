import { isMobile } from '@walletconnect/browser-utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import rainbow_icon from '../../../assets/images/rainbow-icon.png';
import { RAINBOW_BUTTON_ID } from '../../constants';
import { constructDeeplink } from '../../helpers/deeplink';
import ButtonLabel from '../../icons/ButtonLabel';
import { Button, ButtonInner, Content, Logo } from '../../styled';
import Fountain from '../EmojiPop';
import QRExpandedState from '../QRExpandedState';

function ConnectButton({
  uri,
  customButton,
  animate = true,
}: {
  uri: string;
  customButton?: any;
  animate?: boolean;
}) {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  const deeplink = useMemo(() => uri && constructDeeplink(uri), [uri]);

  const connectToRainbow = useCallback(() => {
    if (!deeplink) return;
    if (isMobile()) {
      window.location.href = deeplink;
    } else {
      setShowQRCode(true);
    }
  }, [deeplink]);

  useEffect(() => {
    animate && new Fountain();
  }, [animate]);

  return (
    <div>
      <QRExpandedState
        enabled={showQRCode}
        setIsQRCodeOpen={setShowQRCode}
        value={deeplink}
      />
      {customButton ? (
        <div id={RAINBOW_BUTTON_ID} onClick={connectToRainbow}>
          {customButton}
        </div>
      ) : (
        <Content>
          <Button id={RAINBOW_BUTTON_ID} onClick={connectToRainbow}>
            <ButtonInner>
              <Logo src={rainbow_icon} width="34" />
              <ButtonLabel />
            </ButtonInner>
          </Button>
        </Content>
      )}
    </div>
  );
}

export default React.memo(ConnectButton);
