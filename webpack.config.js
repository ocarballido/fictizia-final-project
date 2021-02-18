const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    // entry: './src/js/index.js',
    // output: {
    //     filename: 'js/bundle.js',
    //     path: path.resolve(__dirname, 'dist'),
    // },
    entry: {
        index: './src/js/index.js',
        test: './src/js/test.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'test.html',
            template: 'src/html/test.html',
            chunks: ['test']
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new webpack.SourceMapDevToolPlugin({})
    ],
    module: {
        rules: [
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
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf|svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    mode: 'development',
    
    devtool: false,
};