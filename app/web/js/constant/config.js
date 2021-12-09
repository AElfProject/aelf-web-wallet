
export const {CURRENT_CHAIN_ID} = window.defaultConfig.ADDRESS_INFO;
export const LOGIN_INFO = {
  chainId: CURRENT_CHAIN_ID,
  payload: {
    method: 'LOGIN'
  }
};
export const EXTENSION_WALLET_LOCALSTORAGE = 'walletInfoList-extension';
