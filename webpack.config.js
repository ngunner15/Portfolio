const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')
//const webpack = require('webpack')
const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('autoprefixer')
]

class RunAfterCompile { // copies files from app folder to dist folder
	apply(compiler) {
		compiler.hooks.done.tap('Copy images and libraries', function() {
			fse.copySync('./app/img', './docs/img'),
			fse.copySync('./app/js/libraries', './docs/js/libraries'),
			fse.copySync('./app/css/superslides', './docs/css/superslides')
		})
	}
}

let cssConfig = {
				test: /\.css$/i,
				use: ['css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
			}

let pages = fse.readdirSync('./app').filter(function(file) {
	return file.endsWith('.html')
}).map(function (page) {
	return new HtmlWebpackPlugin({
		filename: page,
		template: `./app/${page}`
	})
})

let config = {

	entry: './app/js/script.js', // first file to run
	plugins: pages,
	module: {
		rules: [
			cssConfig
			/*{
		        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
		        use: [
		          	{
			            loader: 'file-loader',
			            options: {
				            name: 'fonts/[name].[ext]',
				            mimetype: 'application/font-woff',
				            publicPath: '../'
				            //outputPath: 'fonts/'
		            	}
		          	}
		        ]
	        },*/
			/*{
                test: /\.js$/i,
                use: "imports-loader?$=jquery"
            }*/
		]
		/*plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
	]*/
	}
}

if (currentTask == 'dev') {

	cssConfig.use.unshift('style-loader')

	config.output = {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'app/js')
	}

	//watch: true, //node always remains ON, so we dont have to run dev manually.

	config.devServer = {
				before: function (app, server) {
					server._watch('./app/**/*.html')
				},
		contentBase: path.join(__dirname, 'app'),
		hot: true, //inject css and js code without refresh
		port: 4000,
		host: '0.0.0.0'
	}

	config.mode = 'development'

}

if (currentTask == 'build') {
	config.module.rules.push({
		test: /\.js$/,
		exclude: /(node_module)/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	})

	cssConfig.use.unshift(MiniCssExtractPlugin.loader)
	postCSSPlugins.push(require('cssnano'))

	config.output = {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'docs')
	}

	config.mode = 'production'
	config.optimization = { //creates a new bundle for imported libraries like lodash, so a user does not have to download extra files when they visit the website again in future
		splitChunks: {chunks: 'all'}
	}

	config.plugins.push(
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
		new RunAfterCompile()
		)

}

module.exports = config