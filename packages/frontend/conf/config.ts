import { ChainId, Config } from '@usedapp/core';

export const APP_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'local';
export const isProduction = APP_ENV == 'production';
export const isLocal = APP_ENV == 'local';

export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const chains: ChainId[] = [ChainId.Mainnet, ChainId.Rinkeby];

export const allowedChains: ChainId[] = chains;

export const rpcUrls = {
    [ChainId.Mainnet]: 'https://eth-mainnet.alchemyapi.io/v2/' + ALCHEMY_KEY,
    [ChainId.Goerli]: 'https://eth-goerli.g.alchemy.com/v2/' + ALCHEMY_KEY,
    [ChainId.Localhost]: 'http://localhost:8545',
};

export const getDappConfig = (chainId: number): Config => ({
  readOnlyChainId: chainId,
  readOnlyUrls: rpcUrls,
  supportedChains: [ChainId.Mainnet, ChainId.Goerli, ChainId.Localhost],
});

const contractConfig: Record<number, { nft?: string }> = {
  [ChainId.Goerli]: {
    nft: '0x601bf5FE11F566aAA7C8750eA29695e6eF3C63F4',
  },
  [ChainId.Mainnet]: {
    nft: '',
  },
};

export default contractConfig;