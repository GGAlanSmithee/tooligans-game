/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true, // optional, with some bundlers/frameworks it doesn't work without
    }

    return config
  },
  // NOTE: Avoid CORS problems with IPFS
  rewrites: async () => [
    {
      source: "/tooligan-image/:path*",
      destination: "https://ipfs.blockfrost.dev/ipfs/:path*",
    },
  ],
}

module.exports = nextConfig
