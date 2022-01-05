
export const {CURRENT_CHAIN_ID} = window.defaultConfig.ADDRESS_INFO;
export const LOGIN_INFO = {
  APP_NAME: 'Web Wallet',
  chainId: CURRENT_CHAIN_ID,
  payload: {
    method: 'LOGIN'
  }
};
export const LOADING_TIME_LONG = 8;
export const EXTENSION_WALLET_LOCALSTORAGE = 'walletInfoList-extension';
