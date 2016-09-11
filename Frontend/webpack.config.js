var webpack = require('webpack');
var path = require('path');

module.exports = {
    cache: true,
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
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, 'assets/semantic.min.js'),
                ],
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
                loader: 'url-loader?limit=100000'
            }


        ],

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        })
    ],

};

