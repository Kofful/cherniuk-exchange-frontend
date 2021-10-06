const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new Dotenv()
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm-browser.js'
        }
    }
};