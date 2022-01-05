import { Toast } from 'antd-mobile';
import {NightElfCheck} from "../NightElf/NightElf";
import {
  LOGIN_INFO,
  EXTENSION_WALLET_LOCALSTORAGE, CURRENT_CHAIN_ID,
} from '../../constant/config';

export default class WalletUtil {
  constructor(options) {
    this.type = (options && options.type) || this.getWalletType() || 'local'; // local, extension, app
  }
  // Demo
  // {
  //   "gfo7u3XLrSbQt6rpjkcGHDUH7YP6udkTVfbTGY4uQCuiUGtg2": {
  //     "walletId": "gfo7u3XLrSbQt6rpjkcGHDUH7YP6udkTVfbTGY4uQCuiUGtg2",
  //     "assets": [
  //       {
  //         "contractAddress": "",
  //         "tokenName": ""
  //       }
  //     ],
  //     "BIP44Path": "m/44'/1616'/0'/0/0",
  //     "childWallet": "",
  //     "address": "gfo7u3XLrSbQt6rpjkcGHDUH7YP6udkTVfbTGY4uQCuiUGtg2",
  //     "walletName": "find01",
  //     "AESEncryptoPrivateKey": "U2FsdGVkX19e8nZ6aqmDSk6qFQn4OnQudyMEZBDOkw98o8WS+Y/zusHvRLQjhcja1In/gfN3U3rd6ACKT+Ax20NQl0Jds/437jU4v+RsZwyIA1NifszAbFtGwkdQYQvt",
  //     "AESEncryptoMnemonic": null,
  //     "publicKey": {
  //       "x": "5ea879312c82db561757c1409243f60bf328982d5f960d98334f82249909b2c4",
  //       "y": "19d760b6481bb5d9d494871c014204c195c8e151b0238a3274e73d6d23e331a3"
  //     },
  //     "signedAddress": {
  //       "r": "5d9262354f9e4c38bd3541fb69469adcb4b032d426f53f067756e613843ecfdf",
  //       "s": "b60d5a1633971167152b56ab4a5a78970066195f80abfd4471fd313024990d5f",
  //       "recoveryParam": 1
  //     }
  //   }
  // }
  getWalletInfoListSync (storageType = '') {
    if (this.type === 'local' || storageType === 'local') {
      return this.getWalletInfoListFromLocal();
    }
    if (this.type === 'extension' || storageType === 'extension-local') {
      return this.getWalletInfoListFromLocal(EXTENSION_WALLET_LOCALSTORAGE);
    }
  }

  async getWalletInfoList (storageType = '') {
    if (this.type === 'local') {
      return this.getWalletInfoListFromLocal();
    }
    if (storageType === 'extension-local') {
      return this.getWalletInfoListFromLocal(EXTENSION_WALLET_LOCALSTORAGE);
    }
    return this.getWalletInfoListFromExtension();
  }

  getWalletInfoListFromLocal(key = 'walletInfoList') {
    return JSON.parse(localStorage.getItem(key));
  }

  // 获取用户地址 和 签名数据
  async getWalletInfoListFromExtension() {
    try {
      const checkResult = await NightElfCheck.getInstance().check;
      console.log('checkResult: ', checkResult);
    } catch (error) {
      Toast.info(error.message || error.errorMessage, 3);
      return;
    }


    const aelf = NightElfCheck.initAelfInstanceByExtension();
    const accountInfo = await aelf.login(LOGIN_INFO);
    console.log('accountInfo: ', accountInfo);
    if (accountInfo.error) {
      Toast.info(result.errorMessage.message || result.errorMessage, 1);
      return;
    }
    const detail = JSON.parse(accountInfo.detail);

    const localWallet = await this.getWalletInfoListFromLocal(EXTENSION_WALLET_LOCALSTORAGE);
    let signedAddress = localWallet && localWallet[detail.address] && localWallet[detail.address].signedAddress;
    if (!signedAddress) {
      const result = await aelf.getSignature({
        appName: 'Web Wallet',
        address: detail.address,
        hexToBeSign: detail.address
      });

      console.log('getSignatureResult: ', result);
      if (result.error) {
        Toast.info(result.errorMessage.message || result.errorMessage, 1);
        return;
      }

      const { signature } = result;
      signedAddress = {
        r: signature.slice(0, 64), // getSignatureResult.signature
        s: signature.slice(64, 128),
        recoveryParam: Number.parseInt(signature.slice(129, 130), 10),
      };
    }

    const walletInfoList = {
      [detail.address]: {
        "walletId": detail.address,
        "assets": [
          {
            "contractAddress": "",
            "tokenName": ""
          }
        ],
        "BIP44Path": "m/44'/1616'/0'/0/0",
        "childWallet": "",
        "address": detail.address,
        "walletName": detail.name,
        "AESEncryptoPrivateKey": null, // extension save only
        "AESEncryptoMnemonic": null,
        "publicKey": detail.publicKey,
        "signedAddress": signedAddress
      }
    };

    localStorage.setItem(EXTENSION_WALLET_LOCALSTORAGE, JSON.stringify(walletInfoList));
    this.setWalletType('extension');
    this.setLastUse(detail.address, detail.name, 'extension');

    return walletInfoList;
  }

  /*
  * {
  *   "address": "rzkFus4yjkv9w5ppHNAnvLjkEZiAK7yiQ1rkfU9QBQuPtFtGy",
  *   "walletName":"find00"
  * }
  * */
  getLastUse() {
    return JSON.parse(localStorage.getItem(this.type === 'local' ? 'lastuse' : 'lastUseExtension')) || {};
  }
  setLastUse(address, walletName) {
    localStorage.setItem(
      // this.type === 'local' ? 'lastuse' : 'lastUseExtension',
      this.type === 'local' ? 'lastuse' : 'lastUseExtension',
      JSON.stringify({
        address,
        walletName
      })
    );
  }

  setWalletType(type = 'local') {
    this.type = type;
    localStorage.setItem('walletType', type);
  }
  getWalletType() {
    return localStorage.getItem('walletType');
  }

  async clearWallet() {
    await NightElfCheck.getInstance().check;
    const aelf = NightElfCheck.initAelfInstanceByExtension();
    await aelf.logout({
      chainId: CURRENT_CHAIN_ID,
      address: this.getLastUse().address
    });

    localStorage.removeItem('walletType');
    localStorage.removeItem('lastUseExtension');
    localStorage.removeItem('walletInfoList-extension');
  }
}
