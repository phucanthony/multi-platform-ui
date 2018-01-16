const path = require('path');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const env = process.env.ENV || 'development';
const port = process.env.PORT || 3000;
const prod = env === 'production';
const publicPath = prod ? '' : 'http://localhost:3000/';
const entry = './index.web.js';

const hot = [
	'react-hot-loader/patch',
	`webpack-dev-server/client?${publicPath}`,
	'webpack/hot/only-dev-server',
];

const plugins = [
	new DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(env),
	}),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new HtmlWebpackPlugin({
		isProduction: prod,
		template: 'index.ejs',
		filename: 'index.html',
	}),
	new ProgressBarPlugin({
		width: 39, complete: '█', incomplete: '¦', summary: false,
	}),
];

if (prod) {
	plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
	plugins.push(new webpack.HotModuleReplacementPlugin());
	plugins.push(new webpack.NamedModulesPlugin());
	plugins.push(new webpack.NoEmitOnErrorsPlugin());
	plugins.push(new webpack.DllReferencePlugin({
		context: '.',
		manifest: require('./web/vendor-manifest.json'),
	}));
	plugins.push(new webpack.ContextReplacementPlugin(
		/graphql-language-service-interface[\\/]dist$/,
		new RegExp('^\\./.*\\.js$')
	));
}

const getRevisionPromise = new Promise((resolve, reject) => {
	require('child_process').exec('git rev-parse HEAD', function(err, stdout) {
		if (err) reject(err);
		else resolve(stdout.toString().trim());
	});
});

module.exports = getRevisionPromise.then(gitHash => {
	return {
		cache: true,
		devtool: prod ? false : 'eval-source-map',
		entry: {
			app: prod ? [entry] : [...hot, entry]
		},
		output: {
			publicPath,
			path: path.join(__dirname, 'web'),
			filename: prod ? `[name]-${gitHash}.js` : 'app.js',
			chunkFilename: '[name].js',
		},
		resolve: {
			alias: {
				'react-native': 'react-native-web',
			},
			modules: ['node_modules'],
			extensions: ['.js']
		},
		plugins,
		module: {
			rules: [
				{
					test: /\.js?$/,
					loaders: prod ? ['babel-loader'] : ['react-hot-loader/webpack', 'babel-loader'],
					exclude: /node_modules\/idtoken-verifier/,
				},
				{ test: /\.css$/, loader: 'style-loader!css-loader' },
				{
					test: /\.(png|jpg|svg|ttf)$/,
					loader: 'file-loader?name=[name].[ext]'
				},
				{
					test: /\.json/,
					loader: 'json-loader'
				},
				{
					test: /\.md/,
					loader: 'raw-loader',
				}
			],
		},
	};
});