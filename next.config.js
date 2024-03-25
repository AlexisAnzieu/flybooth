const TerserPlugin = require("terser-webpack-plugin");
const nextTranslate = require("next-translate-plugin");

const config = nextTranslate({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return {
      ...config,
      optimization: {
        minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })], // mangle false else mysql blow ups with "PROTOCOL_INCORRECT_PACKET_SEQUENCE"
      },
    };
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 3, // 3 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dkbuiehgq/**",
      },
    ],
  },
});

config.i18n = undefined;

module.exports = config;
