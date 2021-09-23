export const SUPPORTED_METHODS = [
  'eth_sendTransaction',
  'personal_sign',
  'eth_signTypedData',
];

export const supportedMainChainsInfoEip155 = {
  'eip155:1': { color: '#0E76FD', name: 'Ethereum Mainnet' },
  'eip155:10': { color: '#FF4040', name: 'Optimism' },
  'eip155:137': { color: '#8247E5', name: 'Polygon' },
  'eip155:42161': { color: '#2D374B', name: 'Arbitrum' },
};

export const supportedMainChainsInfo = {
  '1': {
    color: '#0E76FD',
    iconWidth: '20',
    name: 'Ethereum',
    value: 'ethereum',
  },
  '10': {
    color: '#FF4040',
    iconWidth: '42',
    name: 'Optimism',
    value: 'optimism',
  },
  '137': {
    color: '#8247E5',
    iconWidth: '42',
    name: 'Polygon',
    value: 'polygon',
  },
  // '42161': { name: "Arbitrum", color: '#2D374B', value: "arbitrum", iconWidth: "42"},
};
