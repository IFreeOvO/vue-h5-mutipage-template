const path = require('path')

module.exports = ({ file }) => {
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750

  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        viewportWidth: designWidth,
        mediaQuery: true // 是否在媒体查询的css代码中也进行转换，默认false
        // propList: ['*', '!font-size'] // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换,用！则排除属性
      }
    }
  }
}
