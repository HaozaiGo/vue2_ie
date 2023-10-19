
/*
 * @Description: 
 * @Author: xiaoHao
 */
const path = require("path");
const { defineConfig } = require('@vue/cli-service')
process.env.VUE_APP_TITLE = "AKE_读卡系统";
process.env.VUE_APP_AUTHOR = "xiaohao";
process.env.VUE_APP_VERSION = '1.0.0';
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  assetsDir: 'static',
  lintOnSave: true,
  transpileDependencies: true,
  productionSourceMap: false,
  // transpileDependencies:['element-ui'],
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    // client: {
    //   overlay: false
    // },
    proxy: {
      "/wmmsservice": {
          target: `http://172.18.3.219`, //开发
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/": "", //需要rewrite重写的,
        },
      },
    }
  },
  configureWebpack() {
    return {
    
      resolve: {
        alias: {
          "@": resolve("src"),
        },
      },
      // devtool: process.env.NODE_ENV === "dev" ? "source-map" : "source-map",
      plugins: [],
    };
  },
  chainWebpack(config) {
    config.entry.app = ['babel-polyfill', './src/main.js'];
    config.when(process.env.NODE_ENV === "development", (config) => {
      // config.devtool("cheap-source-map");
      config.devtool("source-map");
    });
  

  },
});