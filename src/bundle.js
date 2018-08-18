var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var path = require('path');
var fs = require('fs');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = function () {
    
    //start webpack
    var bundleStart = null;
    var compiler = Webpack(webpackConfig);
    
    //notify to console
    compiler.plugin('compile', function () {
        console.log('Bundling...');
        bundleStart = Date.now();
        debugger;
    });
    
    compiler.plugin('done', function (stats) {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms');
    });
    
    var bundler = new WebpackDevServer(compiler, {
        publicPath: '/build/',
        hot: true,
        
        //terminal configuration
        quiet: false,
        noInfo: false,
        stats: {
            colors: true,
        }
    });
    
    //start dev server
    bundler.listen(8061, 'localhost', function () {
        console.log('Bundling project, please wait...');
    });
}
