require('dotenv').config();

const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '~': path.resolve(__dirname, './src/'),
        },
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new DotenvPlugin(),
        new GasPlugin(),
    ],
};
