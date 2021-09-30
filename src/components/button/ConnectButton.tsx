import React, { useEffect, useState } from 'react';
import WalletConnectClient, { CLIENT_EVENTS } from '@walletconnect/client';
import {
  PairingTypes,
  SessionTypes,
  ClientOptions,
  ClientTypes,
} from '@walletconnect/types';
import { getClientPairings } from '../../utils';
import ConnectButtonMask from './ConnectButtonMask';

function ConnectButton({
  clientOptions,
  clientConnectParams,
  onSessionStarted,
  onClientInitialized,
  customButton,
  animate,
}: {
  clientOptions: ClientOptions;
  clientConnectParams: ClientTypes.ConnectParams;
  onSessionStarted: (client: SessionTypes.Settled) => void;
  onClientInitialized: (client: WalletConnectClient) => void;
  customButton?: any;
  animate?: boolean;
}) {
  const [uri, setUri] = useState<string>('');

  useEffect(() => {
    const walletConnectInit = async () => {
      const client = await WalletConnectClient.init(clientOptions);
      client.on(
        CLIENT_EVENTS.pairing.proposal,
        async (proposal: PairingTypes.Proposal) => {
          const { uri } = proposal.signal.params;
          setUri(uri);
        }
      );
      onClientInitialized(client);
      if (!getClientPairings(client).length) {
        const session = await client.connect(clientConnectParams);
        onSessionStarted(session);
      }
    };
    walletConnectInit();
  }, [
    clientConnectParams,
    clientOptions,
    onClientInitialized,
    onSessionStarted,
  ]);

  return (
    <ConnectButtonMask
      uri={uri}
      customButton={customButton}
      animate={animate}
    />
  );
}

export default React.memo(ConnectButton);
