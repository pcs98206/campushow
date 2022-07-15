const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    plugins: [new MiniCssExtractPlugin(
        {filename: "css/styles.css"}
    )],
    entry: {
        main : './src/client/js/main.js',
        sell : './src/client/js/sell.js',
        see : './src/client/js/see.js',
        myinfo : './src/client/js/myinfo.js',
        comment : './src/client/js/comment.js',
        fileThumbnail : './src/client/js/fileThumbnail.js',
        edit : './src/client/js/edit.js'
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].js',
        clean: true
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                } 
            },
            { 
                test: /\.s[ac]ss$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ] 
            }
        ],
    },
};