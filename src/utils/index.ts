import WalletConnectClient from '@walletconnectv2/client';

/**
 * Go to rainbow app via deeplink
 */
export const goToRainbow = (): void => {
  window.location.href = 'https://rnbwapp.com/wc';
};

/**
 * Returns an array containing session topics, if any
 *
 * @param client - WalletConnectClient
 * @returns - Session topics
 */
export const getClientPairings = (client: WalletConnectClient): string[] => {
  return client?.session?.topics || [];
};

const fromEIP55Format = (chain: string) => chain?.replace('eip155:', '');

/**
 *
 * @param account - Wallet Connect formatted account
 * @returns - Object containing address and chainId
 */
export const getAddressAndChainIdFromAccount = (
  account: string
): { address: string; chainId: number } => {
  const [address, eip155ChainId] = account.split('@');
  const chainId = fromEIP55Format(eip155ChainId);
  return { address, chainId: Number(chainId) };
};
