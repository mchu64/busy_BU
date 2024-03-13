const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Bu-busy/client/dist/' : '/',
  apiUrl: process.env.NODE_ENV === 'production' ? 'https://enigmatic-bastion-78775-506d46995f63.herokuapp.com' : 'http://localhost:3000',

};
