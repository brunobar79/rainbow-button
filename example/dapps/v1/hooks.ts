import WalletConnect from '@walletconnect/client';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  setAccounts as rawSetAccounts,
  setChainId as rawSetChainId,
  setConnector as rawSetConnector,
} from '../store';

const selector = createSelector(
  ({ connector, accounts, chainId }) => ({ accounts, chainId, connector }),
  ({ connector, accounts, chainId }) => {
    return {
      accounts,
      chainId,
      connector,
    };
  }
);

export default function useWalletConnectState() {
  const { connector, accounts, chainId } = useSelector(selector);

  const dispatch = useDispatch();

  const setConnector = (connector: WalletConnect | null) =>
    dispatch(rawSetConnector(connector));
  const setAccounts = (accounts: string[] | null) =>
    dispatch(rawSetAccounts(accounts));
  const setChainId = (chainId: string | null) =>
    dispatch(rawSetChainId(chainId));

  return {
    accounts,
    chainId,
    connector,
    setAccounts,
    setChainId,
    setConnector,
  };
}
