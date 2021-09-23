export async function formatTestTransactionExperimental(account: string) {
  const [, , /*chainId*/ address] = account.split(':');

  // gasLimit
  const gasLimit = '0x5208';

  // value
  const value = '0x0';

  const tx = { data: '0x', from: address, gasLimit, to: address, value };

  return tx;
}

export async function formatTestTransaction(address: string) {
  // gasLimit
  const gasLimit = '0x5208';

  // value
  const value = '0x0';

  const tx = { data: '0x', from: address, gasLimit, to: address, value };

  return tx;
}

export const renderAddress = (address = '') => {
  return [address.substring(0, 4), address.substring(address.length - 4)].join(
    '...'
  );
};
