const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const path = require("path");

module.exports = merge (common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
})