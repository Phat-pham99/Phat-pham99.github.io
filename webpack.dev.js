const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const fs = require('fs');
module.exports = merge(common, {
    mode : "development",
    output: {
        path: path.resolve(__dirname,'build'),
        filename: "app.bundle.dev.js",
        publicPath: "/"
    },
    module: {
        rules: [
            //js
            {
                test: /\.m?j(s|sx)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ]
            },
            //styles
            {
                test: /\.s[ca]ss$/i,
                use: [
                    "style-loader", // Inject CSS into the DOM.
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },  // The css-loader interprets @import and url() like import/require() and will resolve them.
                    "sass-loader", // Loads a Sass/SCSS file and compiles it to CSS.
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                ]
            },
            //html
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            // sources: {},
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(pdf)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'documents/[name][ext][query]',
                  }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Phat's portfolio",
            filename: "index.html",
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            minify: true,
            showErrors: true,
            template: path.resolve(__dirname, 'src/index.html'),
            favicon: "./Assets/kaneki.png"
        }),
    ],
    devtool: "cheap-module-source-map",
    devServer: {
        watchFiles: ['src/**/*'],
        liveReload: true,
        allowedHosts: 'all',
        static: {
            directory: path.resolve(__dirname, "build"),
            publicPath: "/"
        },
        historyApiFallback: true,
        host: "127.0.0.1",
        port: 8080,
    }
})

