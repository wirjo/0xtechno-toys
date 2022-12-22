import { Request, Response } from 'express';
import { WEBSITE_HOST_URL } from '../../../../components/layout/Head';
import puppeteer from 'puppeteer-core';
import AWS from 'aws-sdk';
import { validTokenIdNumber, tokenContract } from '../meta/[tokenId]';

export const renderedStorageBucket = 'toys-by-0xtechno.grailers.io';

export default async function handler(req: Request, res: Response) : Promise<any> {
  const {
    query: { tokenId }
  } = req

    // Connect to blockchain
    const contract = tokenContract();

    // Validate token
    const tokenIdNumber = await validTokenIdNumber(tokenId, contract);
    if (tokenIdNumber === false) return res.status(404).send('Invalid token ID');

    // Check if token has already been rendered
    const rendered = await tokenRendered(tokenIdNumber);
    if ( rendered ) return res.redirect(rendered as string);

    // Render the token
    const artUrl = `${WEBSITE_HOST_URL}/api/toys/live/${tokenIdNumber}`;
    const attUrl = `${WEBSITE_HOST_URL}/api/toys/live-attributes/${tokenIdNumber}`;
    const browserParams = { executablePath: '/opt/homebrew/bin/chromium' };

    const browser = await puppeteer.launch(browserParams);

    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 1280,
    });
    await page.goto(artUrl, { waitUntil: 'networkidle2' });
    const screenshot = await page.screenshot({ encoding: 'base64' });
    
    await page.goto(attUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector("#attributes");
    const element = await page.$('#attributes');
    const attributes = await page.evaluate((el) => el!.textContent, element);
    await browser.close();

    /*
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', String(screenshot).length);
    res.setHeader('Content-Disposition', `inline; filename="${tokenIdNumber}.png"`);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    */

    const img = Buffer.from(screenshot as string, 'base64');
    
    const s3 = new AWS.S3();
    // Upload image to S3 bucket
    await s3.putObject({
        Bucket: renderedStorageBucket,
        Key: `${tokenIdNumber}.png`,
        Body: img,
        ContentType: 'image/png'
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });

        
    // Upload attributes to S3 bucket
    await s3.putObject({
        Bucket: renderedStorageBucket,
        Key: `attributes/${tokenIdNumber}.json`,
        Body: attributes as string,
        ContentType: 'application/json'
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });

    // Check if rendered
    const checkIfRenderedOnCdn = await tokenRendered(tokenIdNumber);

    if ( checkIfRenderedOnCdn ) 
        return res.redirect(checkIfRenderedOnCdn as string);
    else 
        return res.redirect(`https://${renderedStorageBucket}.us-east-1.amazonaws.com/${tokenIdNumber}.png`);

}

async function tokenRendered(tokenIdNumber : number) {
    const renderedUrl = `https://${renderedStorageBucket}/${tokenIdNumber}.png`;

    try {
        const nftImageFetch = await fetch(renderedUrl);
        const nftImageStatus = await nftImageFetch.status;
        if ( nftImageStatus == 200 )
            return renderedUrl; 
        else 
            return false;

    } catch (e) {  
        console.error(e);
    }
}