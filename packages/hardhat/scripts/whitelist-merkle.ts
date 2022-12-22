import keccak256 from 'keccak256';
import { whitelistedAddresses } from './whitelist-addresses';
import { MerkleTree } from 'merkletreejs';
import { ethers } from 'hardhat';

// Format to checksummed address
whitelistedAddresses.forEach((v, k) => {
    whitelistedAddresses[k] = ethers.utils.getAddress(v as string);
});

const leafNodes = whitelistedAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const rootHash = merkleTree.getRoot().toString('hex');

console.log('Whitelist Merkle Tree\n', merkleTree.toString());

console.log('Root hash: ' + rootHash);