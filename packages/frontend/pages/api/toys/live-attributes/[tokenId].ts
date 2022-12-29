import { Request, Response } from 'express';
import { tokenContract, validTokenIdNumber } from '../meta/[tokenId]';
import { nftDefaultHash } from '../live/[tokenId]';

export default async function handler(req: Request, res: Response): Promise<any> {
  const {
    query: { tokenId },
  } = req;

  // Connect to blockchain
  const contract = tokenContract();

  // Validate token
  const tokenIdNumber = await validTokenIdNumber(tokenId, contract);
  if (tokenIdNumber === false) return res.status(404).send('Invalid token ID');

  let hash: string = nftDefaultHash;
  if (tokenIdNumber > 0) hash = await contract.tokenIdToHash(tokenIdNumber).then();

  const artHashData = `const tokenData = { hash: "${hash}" };`;

  const artScriptWithHash = `<html>
        <body>
            <div id="attributes"></div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js" integrity="sha512-WJXVjqeINVpi5XXJ2jn0BSCfp0y80IKrYh731gLRnkAS9TKc5KNt/OfLtu+fCueqdWniouJ1ubM+VI/hbo7POQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            <script type="text/javascript" src="/assets/toys.attributes.min.js"></script>
            <script type="text/javascript">
                ${artHashData}
                const features = calculateFeatures(tokenData);
                document.getElementById("attributes").innerHTML = JSON.stringify(features);
            </script>
        </body>
        </html>`;

  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).send(artScriptWithHash);
}
