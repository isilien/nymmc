//eslint-disable-next-line no-unused-vars
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');

var APP_DIR = path.resolve(__dirname, 'src/');
var THIRDPARTY_DIR = path.resolve(__dirname, 'node_modules/');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ExtractTextPluginConfig = new ExtractTextPlugin({
    // define where to save the file
    filename: 'build.css',
});

var config = {
    entry: ['react-hot-loader/patch', APP_DIR + '/index.js',
    APP_DIR + '/core/styles/index.css'],
    output: {
        path: BUILD_DIR,
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
                },{
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader','style-loader')
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=/&outputPath=assets/'
            }
        ]
    },
    performance: {
        hints: 'warning'
    },
    plugins: [
        ExtractTextPluginConfig,
        new CopyWebpackPlugin([{
            from: path.join(APP_DIR, '/index.html'),
            to: path.join(BUILD_DIR, '/index.html')
        }]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: BUILD_DIR,
        compress: true,
        port: 5678,
        hot: true,
        proxy: { '**': 'http://localhost:1234/' }
    }
};

module.exports = config;