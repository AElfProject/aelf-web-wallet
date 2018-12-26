/**
 * @file
 * @author huangzongzhe
 * webpack 4.16.1
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let pathsToClean = [
    'app/public/js/*.js'
];
let cleanOptions = {
    watch: true
};

// TODO: 热更新，浏览器同步组件
module.exports = {
    // When mode is production or not defined, minimize is enabled. This option automatically adds Uglify plugin.
    // production will remove the 'dead code'. Look at Tree Shaking
    mode: 'production',
    entry: {
        wallet: './app/web/js/index.jsx',
        transactionDetail: './app/web/js/transactionDetail.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'app'), // equal to __diname + '/build'
        filename: 'public/js/[name].[hash:5].js'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: 'AELF-[path][name]_[local]-[hash:base64:5]',
                        // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        // getLocalIdent: (context, localIdentName, localName, options) => {
                        // 	console.log('localIdentName', localName);
                        // 	return 'whatever_random_class_name'
                        // }
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif|ico)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: './public/assets/output'
                }
            }, ]
        }]
    },
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['wallet'],
            template: './app/web/page/index.tpl',
            filename: './view/index.tpl'
        }),
        new HtmlWebpackPlugin({
            chunks: ['transactionDetail'],
            template: './app/web/page/transactionDetail.tpl',
            filename: './view/transactionDetail.tpl'
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ]
};