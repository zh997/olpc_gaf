module.exports = {
    publicPath: '/',
    configureWebpack: {
        devtool: 'source-map'
    },
    //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
    chainWebpack: config =>{
        config.plugin('html')
        .tap(args => {
            args[0].title = "HQMC";
            return args;
        })
    },
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    lintOnSave: false,
}