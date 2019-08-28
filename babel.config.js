module.exports = api => {
    api.cache(true);
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: { browsers: ['last 2 versions', 'safari >= 7'] },
                    modules: 'false', // 为了支持ssr统一使用commonjs规范
                    corejs: '3.0.0',
                    debug: false,
                    useBuiltIns: 'usage' // 是否开启自动支持 polyfill
                }
            ]
        ],
        plugins: []
    };
};
