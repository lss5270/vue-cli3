const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://58.62.207.50:1756/', //H5代理地址
        changeOrigin: true,
        /*ws: true,
        pathRewrite: {
          '^/api': ''
        }*/
      }
    }
  },
  configureWebpack: {
    plugins: [
       new CopyWebpackPlugin([
          {
              from: path.resolve(__dirname, './static'),
              to: 'static',
              ignore: ['.*']
          }
      ]),
    ]
  }
}