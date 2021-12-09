import NightElfCheckTemp from './NightElfCheck';
// import AelfBridgeCheck from '../aelfBridge/AelfBridgeCheck';
// import isMobile from 'ismobilejs';

// const isPhone = isMobile(window.navigator).phone;

// export const NightElfCheck = isPhone ? AelfBridgeCheck : NightElfCheckTemp;
export const NightElfCheck = NightElfCheckTemp;
export const getViewResult = (key, result) => {
  if (!result) {
    return undefined;
  }
  return result[key] || (result.result && result.result[key]);
};
