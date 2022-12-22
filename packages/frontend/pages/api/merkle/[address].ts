import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import { whitelistedAddresses } from '../../../../hardhat/scripts/whitelist-addresses';
import { Request, Response } from 'express';

export default function handler(req: Request, res: Response): any {
  const {
    query: { address },
  } = req;

  const leafNodes = whitelistedAddresses.map((addr: string) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  if (address == 'merkle-root') {
    res.status(200).send(merkleTree.getRoot().toString('hex'));
  } else {
    const proof = merkleTree.getHexProof(keccak256(address as string));
    res.status(200).json(proof);
  }
}
