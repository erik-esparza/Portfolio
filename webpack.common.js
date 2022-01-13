const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        },
plugins: [
    new HtmlWebpackPlugin({      
        title: 'Portfolio',
        template: path.resolve(__dirname, './src/template.html'),
        filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    ],
module: {
    rules: [
        {
        test: /\.(?:ico|gif|png|jpe?g)$/i,
        type: "asset/resource",
        },
        {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
        type: 'asset/inline',
        },
        {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
        test: /\.html$/,
        loader: "html-loader",
        },
    ],
}
}