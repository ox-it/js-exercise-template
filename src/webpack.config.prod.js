var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, '../node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainAppPath = path.resolve(__dirname, 'app', 'mainApp.js');

console.log("MAIN PATH:", mainAppPath);
console.log("BUILD PATH:", buildPath);

var config = {
    devtool: '#source-map',
    entry: {
            app: [
                'babel-polyfill',
                mainAppPath
            ]
    },
    output: {
        path: buildPath,
        publicPath: '/build/',
        filename: "[name]_bundled.js",
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        loaders: [
            {
                //use the url loader for everything which isn't handled by its own loader
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/
                ],
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new Webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false,
            sourceMap: true
        })
    ]
}

module.exports = config;
