const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(webpackConfig) {
      webpackConfig.resolve.fallback = {
            "fs": false,
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "stream": require.resolve('stream-browserify'),
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer"),
            "process": require.resolve("process/browser"),
            "util": require.resolve("util/"),
            "assert": require.resolve("assert/"),
            "events": require.resolve("events/"),
            "url": require.resolve("url/"),
            "querystring": require.resolve("querystring-es3")
      };
     webpackConfig.module.rules.push({
       test: /\.mjs$/,
       include: /node_modules/,
       type: "javascript/auto",  
    }); 
    webpackConfig.optimization = 
      {
        minimize: true,
        minimizer: [new TerserPlugin({ exclude: /\/node_modules\/react-image-gallery/ })],
      }
    return webpackConfig;
  }

