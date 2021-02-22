const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const glob = require('glob');

const entries = {};
const plugins = [];
const templateFolder = './src/templates';
const regName = /.*\/(.+?)\.js/;

const files = glob.sync('./src/js/*.js', {});

files.forEach((e) => {
    const page = e.replace(regName, '$1');
    entries[page] = e;
    plugins.push(
        new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: `${templateFolder}/base.hbs`,
            templateParameters: {
                title: `Title of ${page} page`,
                description: `Description of ${page} page`,
                [`is${page.slice(0, 1).toUpperCase()}${page.slice(1)}`]: true                
            },
            chunks: [page]
        }),
    );
});

module.exports = {
    entry: entries,
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        ...plugins,
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    module: {
        rules: [
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
            },
            {
                test: /\.hbs$/,
                use: {
                    loader: 'handlebars-loader',
                    options: {
                        partialDirs: [ path.join(__dirname, 'src/templates/partials') ]
                    }
                }
            }
        ]
    },
};