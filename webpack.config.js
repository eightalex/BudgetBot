require('dotenv').config();

const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        library: 'budgetBot',
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new DotenvPlugin(),
    ]
};