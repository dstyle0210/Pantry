var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry:{
        app:"./src/app.js",
        scss:"./src/sass.js"
    },
    output: {
        // filename: "[name].[chunkhash].js",
        filename: "[name].bundle.js",
        path:__dirname + "/dist"
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Hello Webpack Project!',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.ejs'
        }),
        new MiniCssExtractPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"],
                exclude:/mode_modules/
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
            },
            /*
            // scss 파일을 css로 떨굴때
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
            },
            // scss 파일을 html 안에 style로 넣을때
            {
                test:/\.scss$/,
                use:["style-loader","css-loader","sass-loader"],
                exclude:/mode_modules/
            },
             */
            {
                test:/\.js?$/,
                use:{
                    loader:"babel-loader"
                },
                exclude:/mode_modules/
            }
        ]
    }
};