// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract } from 'ethers';
import { run, config, ethers, network } from 'hardhat';
import fs from 'fs';
import mkdirp from 'mkdirp';

const nftSmartContractName = 'Toys by 0xTechno';
const nftSmartContractSymbol = 'TOY';
const nftSmartContractFilename = 'Toy';

async function main() {
  let proxyRegistryAddress;

  if (network.name !== 'mainnet') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log(`Deploying ${nftSmartContractFilename}.sol NFT to ${network.name}...`);
  const Nft = await ethers.getContractFactory(nftSmartContractFilename);
  /*
  const overrides = {
    gasPrice: 150000000000
  };
  */
  const nftArguments = [nftSmartContractName, nftSmartContractSymbol, proxyRegistryAddress];
  const nft = await Nft.deploy(...nftArguments);
  console.log('NFT deployed to:', nft.address);
  // saveFrontendFiles(nft, "nftContract");
  await new Promise(resolve => setTimeout(resolve, 5000));

  /*
  * ETHERSCAN VERIFICATION
  */

  console.log('VERIFYING CONTRACTS ON ETHERSCAN');
  console.log('Waiting a bit to ensure that contracts are fully deployed...');
  await new Promise(resolve => setTimeout(resolve, 100000));
  console.log('Verifying NFT contract:', nft.address);
  const verifyNft = await run("verify:verify", { address: nft.address, constructorArguments: nftArguments });
  console.log(verifyNft);

  /**
    * If above does not work..., Verify using CLI for reference:
    * NODE_ENV=goerli npx hardhat verify --network goerli 0x5602a187742a492061674f95F6841D1E351277A0 "Toys by 0xTechno" "TOY" "0xf57b2c51ded3a29e6891aba85459d600256cf317" 
    * NODE_ENV=mainnet npx hardhat verify --network mainnet 0x5a817e0db5712ababd75c6037bf5c83d87c79d19 "Radioactive Ape" "rxAPE" "0xa5409ec958c83c3f309868babaca7c86dcb077c1" 
    *   
  */

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
