import { Request, Response } from 'express';
import { nftDescription, nftName } from '../../../../conf/content';
import { WEBSITE_HOST_URL } from '../../../../components/layout/Head';
import { renderedStorageBucket } from '../render/[tokenId]';

export default async function handler(req: Request, res: Response): Promise<any> {
  const {
    query: { tokenId },
  } = req;

  // Validate token
  const tokenIdNumber = parseInt(tokenId as string);
  const validTokenIdNumber = tokenIdNumber >= 0 && tokenIdNumber <= 10;
  if (!validTokenIdNumber) return res.status(404).send('Invalid token ID');

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
    name: `${nftName} #${tokenIdNumber} (Legacy)`,
    description: nftDescription,
    image: `https://${renderedStorageBucket}/${tokenIdNumber}.png`,
    animation_url: WEBSITE_HOST_URL + 'api/toys/live/' + tokenIdNumber,
    external_url: WEBSITE_HOST_URL + 'api/toys/live/' + tokenIdNumber,
    attributes: nftMetadataJson,
    library: 'p5js@1.0.0',
  };

  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).json(data);
}
