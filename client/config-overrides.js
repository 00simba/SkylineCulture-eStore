const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(webpackConfig) {
    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",  
    }); 
    webpackConfig.optimization.minimize = true
    webpackConfig.optimization.minimizer.push(new TerserPlugin({ exclude: /\/node_modules\/react-image-gallery/ }))
    return webpackConfig;
  }

