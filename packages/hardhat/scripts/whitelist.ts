import { ethers } from 'hardhat';
import { whitelistedAddresses2 as whitelistedAddresses } from './whitelist-addresses-initial';
import fs from 'fs';

// Format to checksummed address
whitelistedAddresses.forEach((v, k) => {
  whitelistedAddresses[k] = '"' + ethers.utils.getAddress(v as string) + '",';
});

fs.writeFile("whitelist.txt", whitelistedAddresses.join("\n"), (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
  }
});