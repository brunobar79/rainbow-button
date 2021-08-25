import WalletConnectClient from '@walletconnectv2/client';
import { SessionTypes } from '@walletconnectv2/types';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
    setSession as rawSetSession,
    setClient as rawSetClient,
    setPairings as rawSetPairings,
} from '../store';

const selector = createSelector(
    ({session, client}) => ({session, client}),
    ({session, client}) => {
        return {
            client,
            session,
            pairings: session?.state?.pairings,
            accounts: session?.state?.accounts || [],
            chains: session?.permissions?.blockchain?.chains || []
        }
    }
  );

export default function useWalletConnectState() {
  const {
    client,
    session,
    pairings,
    accounts,
    chains
} = useSelector(selector);

const dispatch = useDispatch()

const setSession = (session: SessionTypes.Settled | null) => dispatch(rawSetSession(session))
const setClient = (client: WalletConnectClient) => dispatch(rawSetClient(client))
const setPairings = (pairings: string[]) => dispatch(rawSetPairings(pairings))
  return ({
    client,
    session,
    pairings,
    accounts,
    chains,
    setSession,
    setClient,
    setPairings
})
}
