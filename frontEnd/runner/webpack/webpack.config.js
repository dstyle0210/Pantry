module.exports = {
    entry:{
        index:["./src/main.js","./src/common.js"],
        app:"./src/app.js"
    },
    output: {
        filename: "[name].[chunkhash].js",
        path:__dirname + "/dist"
    },
    module:{
        rules:[
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