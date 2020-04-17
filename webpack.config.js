const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'app': './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 3000,
        compress: true,
        open: true
    }
};