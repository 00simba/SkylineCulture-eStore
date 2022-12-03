const applySplitChunks = (webpackConfig) => {
    webpackConfig.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      // https://stackoverflow.com/a/52961891
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react-image-gallery)[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    }
  
  }
  
  const applyOptimizationFilter = (webpackConfig) => {
    const skipMinimizationForChunk = [
      'npm.react-image-gallery'
    ]
    const terser = webpackConfig.optimization.minimizer.find(item => item.options.terserOptions);
    terser.options.chunkFilter = (chunk) => {
      return !skipMinimizationForChunk.includes(chunk.name);
    }
  }
  
  module.exports = {
    webpack: {
      configure(webpackConfig) {

        applySplitChunks(webpackConfig)
        applyOptimizationFilter(webpackConfig)
        return webpackConfig;
      }
    }
}