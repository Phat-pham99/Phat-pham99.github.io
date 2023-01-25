var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'build'),
        filename: 'index_after.js',
        publicPath: "/"
    },
    module : {
        rules : [
            {test: /\.jsx?$/, use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/env','@babel/preset-react']}}},
            {test : /\.css$/, use:['style-loader', 'css-loader', 'postcss-loader']} //postcss-loader bruh. This shit is importtant

        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : './src/index.html'
        })
    ]

};