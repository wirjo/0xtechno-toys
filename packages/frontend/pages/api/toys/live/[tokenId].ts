import { Request, Response } from 'express';
import { tokenContract, validTokenIdNumber } from '../meta/[tokenId]';
import { WEBSITE_HOST_URL } from '../../../../components/layout/Head';

export const nftDefaultHash = '0x34fe60ff13fe5585e3eb718e70b50b290a81c2d690adcb8c0a97b4d39ba909d9';

export default async function handler(req: Request, res: Response): Promise<any> {
    const {
        query: { tokenId },
    } = req;

    // Connect to blockchain
    const contract = tokenContract();

    // Validate token
    const tokenIdNumber = await validTokenIdNumber(tokenId, contract);
    if (tokenIdNumber === false) return res.status(404).send('Invalid token ID');

    // Get script from blockchain
    let artScript: string = await contract.generativeArtScript(0);

    // If not on-chain, pull it from JS
    if (artScript.length == 0) {
        const scriptUrl = `${WEBSITE_HOST_URL}/assets/toys.script.min.js`;
        const fetchScript = await fetch(scriptUrl);
        res.setHeader('X-Generative-Script', 'Failsafe');
        artScript = await fetchScript.text();
    }

    // Get minted NFT hash from blockchain
    let hash: string = nftDefaultHash;
    if (tokenIdNumber > 0) hash = await contract.tokenIdToHash(tokenIdNumber).then();

    const artHashData = `const tokenData = { hash: "${hash}" };`;

    const normalizeScript = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />\n`;

    const scriptLibrary = `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js" integrity="sha512-At/xiUTqCg8jxnCMRNDhDVDm4qxlyPt1K+GrDhUvRvR8MjlBq0RH65OVVaCXn3OuvyVWK8CdlQpxgrc/5YspHw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`;

    const artScriptWithHash = `<html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
            ${normalizeScript}
            <style type="text/css">
            html {
                height: 100%;
            }
            body {
                min-height: 100%;
                margin: 0;
                padding: 0;
            }
            canvas {
                padding: 0;
                margin: auto;
                display: block;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
            </style>
            ${scriptLibrary}
        </head>
        <body>
            <script type="text/javascript">
                ${artHashData}
                ${artScript}
            </script>
        </body>
        </html>`;

    // console.log(hash);
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    // res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(artScriptWithHash);
}