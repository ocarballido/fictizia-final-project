const config = require('./webpack.base.config');
const webpack = require('webpack');

config.plugins.push(new webpack.SourceMapDevToolPlugin({}));
config.module.rules.push(
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
        ]
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    }
);

module.exports = {
    mode: 'development',
    ...config,
    devServer: {
        compress: true,
        port: 9000
    }
};