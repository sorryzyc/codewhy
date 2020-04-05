module.exports = {
    publicPath: '/', //hash值的根路径
    outputDir: 'dist2', //输出目录，不写默认dist
    assetsDir: 'assets', //打包后静态资源目录(js,css,img,fonts)
    lintOnSave: false, //是否开启eslint保存检查，一般不需要
    devServer: {
        open: true, //是否自动打开浏览器
        host: '192.168.2.106', //主机名字，一般不要修改
        port: 8080, //端口号的配置
    },
    configureWebpack: {
        resolve: {
            alias: { //路径别名配置
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views'

            }
        }
    }


}