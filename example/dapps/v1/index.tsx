/* eslint-disable no-console */
import 'react-app-polyfill/ie11';
import { constants, RainbowButton, utils } from '@rainbow-me/rainbow-button';
import { isMobile } from '@walletconnect/browser-utils';
import * as encUtils from 'enc-utils';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActionButton, Button, Wrapper } from '../../styled';
import { supportedMainChainsInfo } from '../constants';
import { formatTestTransaction, renderAddress } from '../helpers/accounts';
import { eip712 } from '../helpers/eip712';
import useWalletConnectState from '../v1/hooks';

const { goToRainbow } = utils;
const { SUPPORTED_MAIN_CHAIN_IDS } = constants;

const images = {
  /* eslint-disable import/no-commonjs */
  arbitrum: require('../../assets/images/arbitrum.png'),
  ethereum: require('../../assets/images/ethereum.png'),
  optimism: require('../../assets/images/optimism.png'),
  polygon: require('../../assets/images/polygon.png'),
  /* eslint-enable import/no-commonjs */
};

const Dapp = () => {
  const {
    connector,
    accounts,
    chainId,
    setConnector,
    setAccounts,
    setChainId,
  } = useWalletConnectState();
  const [selectedChain, setSelectedChain] = useState<string | null>(null);

  const selectChain = useCallback((chain) => setSelectedChain(chain), []);

  const onConnectorInitialized = useCallback(
    (connector) => setConnector(connector),
    [] /* eslint-disable-line react-hooks/exhaustive-deps */
  );

  useEffect(() => {
    if (!connector) return;

    // Capture initial connector state
    setAccounts(connector.accounts);
    setChainId(connector.chainId);

    // Subscribe to connection events
    connector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setAccounts(accounts);
      setChainId(chainId);
    });

    connector.on('session_update', (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setAccounts(accounts);
      setChainId(chainId);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connector.on('disconnect', (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete connector
      // IMPORTANT if users reject the session request you have to
      // create a new session from scratch. `disconnect` will trigger
      // in that case
      setConnector(null);
      setAccounts(null);
      setChainId(null);
      setSelectedChain(null);
    });
  }, [connector]); /* eslint-disable-line react-hooks/exhaustive-deps */

  const sendTransaction = useCallback(async () => {
    if (!connector) return;
    try {
      const tx = await formatTestTransaction(accounts?.[0]);

      isMobile() && goToRainbow();
      const result = await connector.sendTransaction(tx);
      console.log('RESULT', result);
    } catch (error) {
      console.error(error);
    }
  }, [connector, accounts]);

  const disconnect = useCallback(
    async () => connector?.killSession(),
    [connector]
  );

  const signPersonalMessage = useCallback(async () => {
    if (!connector) return;
    try {
      const message = `Hello from Rainbow! `;
      const hexMsg = encUtils.utf8ToHex(message, true);
      const address = accounts?.[0];
      const params = [hexMsg, address];

      // send message
      isMobile() && goToRainbow();
      const result = await connector.signPersonalMessage(params);

      console.log('RESULT', result);
    } catch (error) {
      console.error(error);
    }
  }, [connector, accounts]);

  const signTypedData = useCallback(async () => {
    if (!connector) return;
    try {
      const message = JSON.stringify(eip712.example);
      const address = accounts?.[0];
      const params = [address, message];

      // send message
      isMobile() && goToRainbow();
      const result = await connector.signTypedData(params);
      console.log('RESULT', result);
    } catch (error) {
      console.error(error);
    }
  }, [connector, accounts]);

  const renderNotConnected = useMemo(() => {
    return (
      <div>
        <p className="text-center">
          {selectedChain
            ? `Selected chain id: ${selectedChain}`
            : `Select chain to use with the button`}
        </p>
        {!selectedChain && (
          <Wrapper>
            {Object.values(SUPPORTED_MAIN_CHAIN_IDS).map(
              (chain) =>
                supportedMainChainsInfo[chain]?.name && (
                  <Button key={chain} onClick={() => selectChain(chain)}>
                    <img
                      alt="network-icon"
                      className={`network-icon ${supportedMainChainsInfo[chain]?.value}`}
                      src={images[supportedMainChainsInfo[chain]?.value]}
                    />
                    {supportedMainChainsInfo[chain]?.name}
                  </Button>
                )
            )}
          </Wrapper>
        )}
        <Wrapper>
          {selectedChain && (
            <RainbowButton
              chainId={Number(selectedChain)}
              connectorOptions={{
                bridge: 'https://bridge.walletconnect.org',
              }}
              onConnectorInitialized={onConnectorInitialized}
              // customButton={<Button>Custom</Button>}
            />
          )}
        </Wrapper>
      </div>
    );
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [selectedChain, onConnectorInitialized]);

  const renderConnected = useMemo(() => {
    return (
      <div>
        <Wrapper>
          <p className="text-center">
            Connected to {supportedMainChainsInfo[chainId]?.name}
          </p>
          <p className="text-center">Account: {renderAddress(accounts?.[0])}</p>
        </Wrapper>
        <Wrapper>
          <ActionButton key="sendTransaction" onClick={sendTransaction}>
            sendTransaction
          </ActionButton>
          <ActionButton key="signPersonalMessage" onClick={signPersonalMessage}>
            signPersonalMessage
          </ActionButton>
          <ActionButton key="signTypedData" onClick={signTypedData}>
            signTypedData
          </ActionButton>
        </Wrapper>
        <Wrapper>
          <ActionButton key="disconnect" onClick={disconnect}>
            Disconnect
          </ActionButton>
        </Wrapper>
      </div>
    );
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [chainId, accounts]);

  return (
    <div>
      {connector?.connected && accounts?.length
        ? renderConnected
        : renderNotConnected}
    </div>
  );
};

export default Dapp;
