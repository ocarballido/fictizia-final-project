const config = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

config.plugins.push(new CleanWebpackPlugin());
config.module.rules.push(
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
        ]
    },
    {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    }
);

module.exports = {
    mode: 'production',
    ...config
};