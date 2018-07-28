//eslint-disable-next-line no-unused-vars
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/');
var IMAGES_DIR = path.resolve(__dirname, 'src/assets/images');

var CopyWebpackPlugin = require('copy-webpack-plugin');

//Webpack merge
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = env => {
    const config = {
        entry: [APP_DIR + '/index.js',
        APP_DIR + '/core/styles/index.css'],
        output: {
            path: BUILD_DIR,
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: path.join(APP_DIR, '/index.html'),
                to: path.join(BUILD_DIR, '/index.html')
            }]),
            new CopyWebpackPlugin([{
                from: IMAGES_DIR,
                to: BUILD_DIR
            }]),
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
        ]
    }
    return merge(common, config)
};

