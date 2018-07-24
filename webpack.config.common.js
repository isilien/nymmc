//eslint-disable-next-line no-unused-vars
var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/');
var IMAGES_DIR = path.resolve(__dirname, 'src/assets/images');
var THIRDPARTY_DIR = path.resolve(__dirname, 'node_modules/');

module.exports = {
    output: {
        filename: 'build.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: THIRDPARTY_DIR,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        cache: true
                    }
                }, {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                        plugins: ["transform-class-properties"]
                    }
                }]
            },
            {
                test: /\.css$/,
                exclude: THIRDPARTY_DIR,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // This matches the babel plugin's setting
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]', 
                        }
                    }],
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=/&outputPath=assets/'
            }
        ]
    },
    performance: {
        hints: 'warning'
    }
};
