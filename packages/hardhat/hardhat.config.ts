import { task } from 'hardhat/config'
import dotenv from 'dotenv'
import "@typechain/hardhat"
import '@nomiclabs/hardhat-waffle'
import '@openzeppelin/hardhat-upgrades';
import { HardhatUserConfig } from 'hardhat/types';
import "@nomiclabs/hardhat-etherscan";

dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const MNEMONIC = process.env.MNEMONIC || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      },
    }
  },
  paths: {
    artifacts: '../frontend/artifacts',
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    polygon: { 
        url: 'https://polygon-mainnet.g.alchemy.com/v2/' + ALCHEMY_KEY,
        chainId: 137,
        accounts: { 
            mnemonic: MNEMONIC
        }
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/" + ALCHEMY_KEY,
      chainId: 5,
      accounts: { 
        mnemonic: MNEMONIC
      }
    },
    mainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/" + ALCHEMY_KEY,
      chainId: 1,
      accounts: { 
        mnemonic: MNEMONIC
      },
      gasPrice: 150000000000,
    },
  },
  typechain: {
    outDir: './types',
    target: "ethers-v5"
  },
};

export default config;
