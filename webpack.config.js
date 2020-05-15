const path = require('path')
//const HtmlWebpackPlugin = require('html-webpack-plugin')

const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('autoprefixer')
]

module.exports = {
	entry: './app/js/script.js', // first file to run
	output: {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'app/js')
	},

	devServer: {
				before: function (app, server) {
					server._watch('./app/**/*.html')
				},
		contentBase: path.join(__dirname, 'app'),
		hot: true, //inject css and js code without refresh
		port: 4000,
		host: '0.0.0.0'
	},
	/*plugins: [new HtmlWebpackPlugin({
		template: 
	})],*/
	mode: 'development',
	devtool: 'none',
	//watch: true, //node always remains ON, so we dont have to run dev manually.
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
			}
		]
	}
}