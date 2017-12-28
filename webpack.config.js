module.exports = {
    entry: ["babel-polyfill", "./renderer.js"],
    output: {
        path: __dirname,
        filename: "./renderer.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devtool: "#source-maps"
};
