var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, '../node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainAppPath = path.resolve(__dirname, 'app', 'mainApp.js');

console.log("MAIN PATH:", mainAppPath);
console.log("BUILD PATH:", buildPath);

var config = {
    mode: "development",
    entry: {
        app: [
                'babel-polyfill',
                'webpack-dev-server/client?http://localhost:8061',
                // For hot updates
                'webpack/hot/only-dev-server',
                mainAppPath
        ]
    },
    output: {
        path: buildPath,
        publicPath: '/build/',
        filename: "[name]_bundled.js"
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            'vue': 'vue/dist/vue.common.js',
        }
    },
    devServer: {
        inline: true
    },
    module: {
        rules: [
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
                // loader: 'babel-loader',
                loader: 'babel-loader?cacheDirectory=true',
                options: {
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                },
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    plugins: [new Webpack.HotModuleReplacementPlugin()]
}

module.exports = config;
