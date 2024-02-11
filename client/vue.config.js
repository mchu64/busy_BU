const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/BU-BUSY/client/dist/index.html' : '/',
};
