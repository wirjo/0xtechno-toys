import { Request, Response } from 'express';
import ToyArtifact from '../../../../artifacts/contracts/Toy.sol/Toy.json';
import { isProduction, isLocal, rpcUrls } from '../../../../conf/config';
import contractConfig from '../../../../conf/config';
import { ethers, Contract } from 'ethers';
import { nftDescription, nftName } from '../../../../conf/content';
import { WEBSITE_HOST_URL } from '../../../../components/layout/Head';
import { renderedStorageBucket } from '../render/[tokenId]';

export default async function handler(req: Request, res: Response): Promise<any> {
  const {
    query: { tokenId },
  } = req;

  // Connect to blockchain
  const contract = tokenContract();

  // Validate token
  const tokenIdNumber = await validTokenIdNumber(tokenId, contract);
  if (tokenIdNumber === false) return res.status(404).send('Invalid token ID');

  // Get the token hash
  // const hash = await contract.tokenIdToHash(tokenIdNumber).then();

  // Get token ID number
  let nftMetadataJson;
  try {
    const nftMetadataFetch = await fetch(
      `https://${renderedStorageBucket}/attributes/${tokenIdNumber}.json`,
    );

    nftMetadataJson = await nftMetadataFetch.json();

    for (const key in nftMetadataJson) {
      nftMetadataJson[key] = String(nftMetadataJson[key]);
    }
  } catch {
    nftMetadataJson = {};
  }

  const data = {
    name: `${nftName} #${tokenIdNumber}`,
    description: nftDescription,
    image: `https://${renderedStorageBucket}/${tokenIdNumber}.png`,
    animation_url: WEBSITE_HOST_URL + 'api/toys/live-v1/' + tokenIdNumber,
    external_url: WEBSITE_HOST_URL + 'api/toys/live-v1/' + tokenIdNumber,
    attributes: nftMetadataJson,
    library: 'p5js@1.0.0',
  };

  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).json(data);
}

export const tokenContract = (): Contract => {
  const chainId = isProduction ? 1 : 5;
  const address = contractConfig[chainId].nft;
  const rpc = rpcUrls[chainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc as string);
  const abi = ToyArtifact.abi;
  const contract = new ethers.Contract(address as string, abi, provider);
  return contract;
};

export const validTokenIdNumber = async (
  tokenId: any,
  contract: Contract,
): Promise<number | false> => {
  const tokenIdNumber = parseInt(tokenId as string);

  if (isLocal || !contract) return tokenIdNumber;

  // Get token
  let tokenIdHasOwner = false;
  try {
    tokenIdHasOwner = await contract.ownerOf(tokenIdNumber);
  } catch (error) {
    tokenIdHasOwner = false;
  }

  if (tokenId == 0 || tokenIdHasOwner) return tokenIdNumber;
  else return false;
};
