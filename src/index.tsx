import WalletConnect from '@walletconnect/client';

// eslint-disable-next-line import/no-unresolved
import { IWalletConnectOptions } from '@walletconnect/types';
import React from 'react';
import rainbow_icon from '../assets/images/rainbow-icon.png';
import rainbow from '../assets/images/rainbow.png';
import ConnectButtonV1 from './components/button/ConnectButtonV1';
import {
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_TEST_CHAIN_IDS,
} from './constants';
import { goToRainbow } from './utils';

export interface Props {
  chainId: number | undefined;
  connectorOptions: IWalletConnectOptions;
  onConnectorInitialized: (client: WalletConnect) => void;
  customButton?: any;
  animate?: boolean;
}

export const RainbowButton = ({
  chainId,
  connectorOptions,
  onConnectorInitialized,
  customButton,
  animate,
}: Props) => {
  return (
    <ConnectButtonV1
      animate={animate}
      chainId={chainId}
      connectorOptions={connectorOptions}
      customButton={customButton}
      onConnectorInitialized={onConnectorInitialized}
    />
  );
};

export const assets = {
  rainbow: rainbow,
  rainbow_icon: rainbow_icon,
};

export const utils = {
  goToRainbow,
};

export const constants = {
  SUPPORTED_MAIN_CHAIN_IDS,
  SUPPORTED_TEST_CHAIN_IDS,
};
