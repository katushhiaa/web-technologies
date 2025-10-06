const path = require('path');

module.exports = {
    entry: './src/app.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        static: [
            { directory: path.join(__dirname, "src") },   // щоб віддати index.html
            { directory: path.join(__dirname, "libs") },  // щоб віддати bootstrap.css
            { directory: path.join(__dirname, "dist") }   // скрипт
        ],
        compress: true,
        port: 9000,
    },
};