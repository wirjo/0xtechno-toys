import {
  discordUrl,
  siteUrl,
  twitterUsername,
  royaltiesAddress,
  openseaCollectionSlug,
  openseaCollectionDescription,
  openseaCollectionLogo,
  openseaCollectionLargeImage,
  openseaCollectionBannerImage,
  openseaRoyaltyFees,
  openseaTitle,
} from '../../../../conf/content';
import { Request, Response } from 'express';

export default function handler(req: Request, res: Response): any {
  const data = {
    name: openseaTitle,
    slug: openseaCollectionSlug,
    description: openseaCollectionDescription,
    image: openseaCollectionLogo,
    large_image_url: openseaCollectionLargeImage,
    banner_image_url: openseaCollectionBannerImage,
    external_link: siteUrl,
    twitter_username: twitterUsername,
    discord_url: discordUrl,
    display_data: {
      card_display_style: 'cover',
    },
    fee_recipient: royaltiesAddress,
    seller_fee_basis_points: openseaRoyaltyFees * 100,
  };

  // Get data from your database
  res.status(200).json(data);
}
