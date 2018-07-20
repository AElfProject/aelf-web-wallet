/*
 * webpack 4.16.1
 * @auther huangzongzhe
 */

// const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

// 与webpack内置dev-server功能会有重复，所以不推荐混合在一起使用
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 不管用？沃日哦
// let LiveReloadPlugin = require('webpack-livereload-plugin');

// TODO: 热更新，浏览器同步组件
module.exports = {
	// When mode is production or not defined, minimize is enabled. This option automatically adds Uglify plugin.
	// production will remove the 'dead code'. Look at Tree Shaking
	// mode: 'production',
	// mode: 'development',
	mode: 'development',
	entry: './app/web/js/index.jsx',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'public/js/wallet.js'
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
			use: ['style-loader', 'css-loader', 'sass-loader']
		}, ]
	},
	node: {
		fs: 'empty',
		child_process: 'empty'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/web/page/index.tpl',
			filename: './view/index.tpl',
		}),
		// new LiveReloadPlugin(),
		// ,
		new BrowserSyncPlugin(
			// {
		 //      // browse to http://localhost:3000/ during development,
		 //      // ./public directory is being served
		 //      host: 'localhost',
		 //      port: 7001,
		 //      proxy: 'http://localhost:3100/'},
		 //      // plugin options
		 //      {
		 //        // prevent BrowserSync from reloading the page
		 //        // and let Webpack Dev Server take care of this
		 //        reload: false
		      
		 //    }
	    )
		// ,
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'server',
		// 	analyzerHost: '127.0.0.1',
		// 	analyzerPort: 8889,
		// 	reportFilename: 'report.html',
		// 	defaultSizes: 'parsed',
		// 	openAnalyzer: true,
		// 	generateStatsFile: false,
		// 	statsFilename: 'stats.json',
		// 	statsOptions: null,
		// 	logLevel: 'info'
		// })
	]
};