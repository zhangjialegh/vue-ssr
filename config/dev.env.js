'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: process.env.API_ENV==="localhost"? "'http://192.168.50.40:6789'":"'https://wechat.fangpinduo.com'",
  STRIPE_PK : '"pk_test_EydiTaIiEpwbt0e9s6UpGxWE"'
})
