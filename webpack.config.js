const path = require('path')

const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('autoprefixer')
]

module.exports = {
	entry: './js/script.js', // first file to run
	output: {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'js')
	},
	mode: 'development',
	watch: true, //node always remains ON, so we dont have to run dev manually.
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
			}
		]
	}
}