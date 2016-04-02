// require('es6-promise').polyfill();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var BrowserSyncPluginConfig = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    server: { baseDir: ['dist'] }
});

module.exports = {
    entry: "./app/js/app.js",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        BrowserSyncPluginConfig
    ]
};