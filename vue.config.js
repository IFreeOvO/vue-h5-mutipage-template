const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: IS_PROD ? './' : '/',
  pages: {
    HomeView: {
      entry: 'src/views/HomeView/main.js',
      template: 'public/index.html', // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
      title: '登录'
      // filename: 'HomeView.html' // 在 dist/HomeView.html 的输出
    },
    EnrollView: {
      entry: 'src/views/EnrollView/main.js',
      template: 'public/index.html',
      title: '测试'
    }
  },
  devServer: {
    proxy: '' // 代理的是本地同域名地址
  }
}
