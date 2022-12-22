import NextHead from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import {
  siteTitle,
  siteDescription,
  siteTagline,
  siteUrl,
  twitterUsername,
} from '../../conf/content';

/**
 * Constants & Helpers
 */
const HOST_URL = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL
  : 'http://localhost:3000';
export const WEBSITE_HOST_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? siteUrl : HOST_URL;

/**
 * Prop Types
 */
export interface MetaProps {
  description?: string;
  tagline?: string;
  image?: string;
  title: string;
  type?: string;
}

/**
 * Component
 */
const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();
  const meta: MetaProps = {
    title: siteTitle,
    tagline: siteTagline,
    description: siteDescription,
    image: `${WEBSITE_HOST_URL}/images/social.jpeg`,
    type: 'website',
    ...customMeta,
  };

  return (
    <NextHead>
      <title>
        {meta.title} | {meta.tagline}
      </title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title + ' | ' + meta.tagline} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={'@' + twitterUsername} />
      <meta name="twitter:title" content={meta.title + ' | ' + meta.tagline} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </NextHead>
  );
};

export default Head;
