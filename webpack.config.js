const path = require('path')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
//const webpack = require('webpack')
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
	//devtool: 'none',
	//watch: true, //node always remains ON, so we dont have to run dev manually.
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
			},
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
	}
	/*plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
	]*/
}