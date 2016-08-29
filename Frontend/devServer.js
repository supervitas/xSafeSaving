/**
 * Created by nikolaev on 03.08.16.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    quiet: false,
    historyApiFallback: true,
    proxy: {
        '/api/*': {
            target: 'http://localhost:8081',
            secure: false,
        }
    }
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:3000/');
});