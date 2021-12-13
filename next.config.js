const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  pageExtensions: ['page.tsx'],
  webpack: (configRef) => {
      configRef.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });


      configRef.plugins.push(
          new Dotenv({
              defaults: path.resolve(process.cwd(), '.env'),
              path: path.resolve(process.cwd(), '.env.local'),
          }),
      );

      return configRef;
  }
}
