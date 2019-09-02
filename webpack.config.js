var path = require('path');
module.exports = {
    mode: process.env.NODE_ENV == 'test' ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: process.env.NODE_ENV == 'test' ? path.resolve(__dirname, 'test') : path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        // library: 'ur',
        libraryTarget: 'umd',
        libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
        globalObject: 'this' // 兼容node和浏览器运行，避免window is not undefined情况
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    externals: {
        axios: {
            commonjs: 'axios',
            commonjs2: 'axios',
            amd: 'axios'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')],
            },
        ]
    }
};
