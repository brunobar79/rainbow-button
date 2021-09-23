import WalletConnect from '@walletconnect/client';
// eslint-disable-next-line import/no-unresolved
import { IWalletConnectOptions } from '@walletconnect/types';
import React, { useEffect, useState } from 'react';
import ConnectButton from './ConnectButton';

function ConnectButtonV1({
  chainId,
  connectorOptions,
  onConnectorInitialized,
  customButton,
  animate,
}: {
  chainId: number | undefined;
  connectorOptions: IWalletConnectOptions;
  onConnectorInitialized: (client: WalletConnect) => void;
  customButton?: any;
  animate?: boolean;
}) {
  const [uri, setUri] = useState<string>('');

  useEffect(() => {
    const connector = new WalletConnect(connectorOptions);
    onConnectorInitialized(connector);

    if (connector && !connector.connected) {
      connector.createSession({ chainId }).then(() => {
        setUri(connector.uri);
      });
    }
  }, [chainId, connectorOptions, onConnectorInitialized]);

  return (
    <ConnectButton animate={animate} customButton={customButton} uri={uri} />
  );
}

export default React.memo(ConnectButtonV1);
