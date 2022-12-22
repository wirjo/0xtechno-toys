import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { siteTitle } from '../conf/content';
import { rpcUrls } from '../conf/config';

const POLLING_INTERVAL = 12000;

export const walletconnect = new WalletConnectConnector({
  rpc: rpcUrls,
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const walletlink = new WalletLinkConnector({
  url: rpcUrls[1],
  appName: siteTitle,
  darkMode: false,
});
