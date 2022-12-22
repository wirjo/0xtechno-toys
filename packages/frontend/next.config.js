require('dotenv').config({ path: `../../.env.${process.env.NODE_ENV}` });

module.exports = {
  reactStrictMode: true,
  assetPrefix: './',
};
