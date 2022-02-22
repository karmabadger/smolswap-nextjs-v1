
const withImages = require("next-images");

/** @type {import('next').NextConfig} */
module.exports = withImages({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/collection/smol-brains',
        permanent: true,
      }
    ]
  },
  webpack: (config, { isServer }) => {
    return config;
  },
  reactStrictMode: true,
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/collection/smol-brain',
//         permanent: true,
//       }
//     ]
//   },
//   webpack(config) {
//     // config.module.rules.push({
//     //   test: /\.svg$/,
//     //   issuer: {
//     //     // test: /\.(js|ts)x?$/,
//     //     // for webpack 5 use
//     //     and: [/\.(js|ts)x?$/]
//     //   },

//     //   use: ['@svgr/webpack'],
//     // });

//     return config;
//   },
//   reactStrictMode: true,
// }

// module.exports = nextConfig
