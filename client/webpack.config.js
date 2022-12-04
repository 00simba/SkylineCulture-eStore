const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    optimization : {
        minimize: true,
        minimizer: [new TerserPlugin({ exclude: /\/node_modules\/react-image-gallery/ })],
    }
}