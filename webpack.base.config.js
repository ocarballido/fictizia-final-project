const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const glob = require('glob');
const fs = require('fs');

const entries = {};
const plugins = [];
const templateFolder = './src/templates';
const regName = /.*\/(.+?)\.js/;

const files = glob.sync('./src/js/*.js', {});

files.forEach((e) => {
    const name = e.replace(regName, '$1');
    entries[name] = e;
    plugins.push(
        new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: `${templateFolder}/base.ejs`,
            templateParameters: {
                title: `Title of ${name} page`,
                description: `Description of ${name} page`,
                content: fs.readFileSync(`${templateFolder}/${name}.ejs`)
            },
            chunks: [name]
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
            }
        ]
    },
};