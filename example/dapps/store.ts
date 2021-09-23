import WalletConnect from '@walletconnect/client';
import { createStore } from 'redux';

const SET_CONNECTOR = 'SET_CONNECTOR';
const SET_ACCOUNTS = 'SET_ACCOUNTS';
const SET_CHAIN_ID = 'SET_CHAIN_ID';

export const setConnector = (connector: WalletConnect | null) => ({
  payload: connector,
  type: SET_CONNECTOR,
});

export const setAccounts = (accounts: string[] | null) => ({
  payload: accounts,
  type: SET_ACCOUNTS,
});

export const setChainId = (chainId: string | null) => ({
  payload: chainId,
  type: SET_CHAIN_ID,
});

const INITIAL_STATE = {
  accounts: undefined,
  chainId: undefined,
  connector: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CONNECTOR:
      return { ...state, connector: action.payload };
    case SET_ACCOUNTS:
      return { ...state, accounts: action.payload };
    case SET_CHAIN_ID:
      return { ...state, chainId: action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer);
