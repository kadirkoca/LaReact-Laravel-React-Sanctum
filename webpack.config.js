const path = require("path")
const webpack = require("webpack")
const dotenv = require("dotenv")

const mode = 'production'//process.env.MODE

const environments = new webpack.DefinePlugin({
    "process.env": JSON.stringify(dotenv.config({ path: './react.env' }).parsed),
})

module.exports = {
    mode,
    entry: ["regenerator-runtime/runtime.js", "/resources/react/index.tsx"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public/assets/"),
    },
    plugins: [
        environments,
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader:  'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader:  'ts-loader',
                },
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpe?g|svg|png|gif|ico|ttf|otf?)(\?v=\d+\.\d+\.\d+)?$/i,
                type: "asset/resource",
            },
        ],
    },
    devtool: mode === "development" ? "eval-cheap-module-source-map" : false,
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: process.env.PORT,
        historyApiFallback: true,
        compress: true,
        hot: false,
        liveReload: false,
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    optimization: {
        minimize: true,
    },
    performance: {
        hints: mode !== "development" ? "error" : false,
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
    },
    cache: false,
}
