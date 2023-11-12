/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) return config
    config.externals = [
      ...config.externals,
      'canvas'
    ]
    return config
  }
}
