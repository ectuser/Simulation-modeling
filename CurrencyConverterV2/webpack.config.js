const path = require('path');

module.exports = {
    entry: ['./src/index.ts'],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                plugins: ["@babel/plugin-transform-typescript", "@babel/plugin-proposal-class-properties", "@babel/transform-runtime"],
                presets: ["@babel/preset-env", "@babel/preset-typescript"]
            }
            }
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    }
};