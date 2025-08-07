// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    domains: ["localhost", "172.16.16.91", "apidev.renewedge-solutions.com", "api.renewedge-solutions.com"],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      // ...other rewrites if any...
    ];
  },
  webpack: (config, { isServer, webpack }) => {
    // No need to import 'webpack' via `import webpack from 'webpack'`
    if (!isServer) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery",
        })
      );
    }
    return config;
  },
};

export default nextConfig;
