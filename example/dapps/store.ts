import WalletConnectClient from '@walletconnectv2/client';
import WalletConnect from '@walletconnect/client';
import { SessionTypes } from '@walletconnectv2/types';
import { createStore } from 'redux'

const SET_SESSION = 'SET_SESSION';
const SET_CLIENT = 'SET_CLIENT';
const SET_CONNECTOR = 'SET_CONNECTOR';
const SET_ACCOUNTS = 'SET_ACCOUNTS';
const SET_CHAIN_ID = 'SET_CHAIN_ID';


export const setConnector = (connector: WalletConnect | null) => ({
    type: SET_CONNECTOR,
    payload: connector
  })

export const setAccounts = (accounts: string[] | null) => ({
    type: SET_ACCOUNTS,
    payload: accounts
  })

export const setChainId = (chainId: string | null) => ({
    type: SET_CHAIN_ID,
    payload: chainId


export const setConnector = (connector: WalletConnect | null) => ({
    type: SET_CONNECTOR,
    payload: connector
  })

export const setClient = (client: WalletConnectClient) => ({
    type: SET_CLIENT,
    payload: client
  })

export const setSession = (sessions: SessionTypes.Settled | null) => ({
    type: SET_SESSION,
    payload: sessions
  })

export const setPairings = (pairings: string[]) => ({
    type: SET_SESSION,
    payload: pairings
  })

const INITIAL_STATE = {
  session: undefined,
  client: undefined,
  connector: undefined,
  accounts: undefined,
  chainId: undefined,
};
  
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, session: action.payload };
    case SET_CLIENT:
      return { ...state, client: action.payload };
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

export const store = createStore(reducer) 

  