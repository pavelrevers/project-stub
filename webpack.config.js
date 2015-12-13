var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: './desktop.bundles/index/index.js',
        common: ['./desktop.blocks/button/button.css']
    },
    output: {
        path: './build',
        filename: '[name].js'
    },
    devServer: {
        contentBase: "./build",
        hot: true,
        lazy: false,
        inline: true
    },
    resolve: {
        extensions: ['', '.js', '.css', '.bemdecl.js', '.yate'],
        modulesDirectories: ['node_modules', 'app']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.bemdecl\.js$/,
                loader: 'convergence-loader',
                query: {
                    levels:[
                        'libs/bem-components/common.blocks',
                        'desktop.blocks'
                    ],
                    techs: [
                        'js',
                        'css',
                        'yate'
                    ]
                }
            },
            {
                test: /\.yate$/,
                loader: 'yate-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
            filename: '[name].css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
            filename: '[name].js'
        }),
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css')
    ]
}
