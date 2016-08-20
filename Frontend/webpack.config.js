var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ['./src/js/index.js',
        'webpack-dev-server/client?http://0.0.0.0:3000', 'webpack/hot/only-dev-server'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [

            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },

        ],

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],

    watch: true
};
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    )
}
