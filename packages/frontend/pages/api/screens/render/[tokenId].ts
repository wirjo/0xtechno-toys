import { Request, Response } from 'express';
import { WEBSITE_HOST_URL } from '../../../../components/layout/Head';
import puppeteer from 'puppeteer-core';

export default async function handler(req: Request, res: Response): Promise<any> {
  const {
    query: { tokenId },
  } = req;

  // Render the token
  const artUrl = `${WEBSITE_HOST_URL}/api/screens/live/${tokenId}`;
  const browserParams = { executablePath: '/opt/homebrew/bin/chromium' };

  const browser = await puppeteer.launch(browserParams);

  const page = await browser.newPage();
  await page.setViewport({
    width: 3000,
    height: 3750,
  });
  await page.setDefaultNavigationTimeout(0);
  await page.goto(artUrl, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(30000);
  const screenshot = await page.screenshot({ encoding: 'base64' });
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Length', String(screenshot).length);
  res.setHeader('Content-Disposition', `inline; filename="${tokenId}.png"`);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  const img = Buffer.from(screenshot as string, 'base64');
  res.send(img);
}
