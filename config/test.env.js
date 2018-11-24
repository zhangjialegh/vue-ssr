'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_URL: "'https://wechat.fangpinduo.com'",
  STRIPE_PK : '"pk_test_EydiTaIiEpwbt0e9s6UpGxWE"'
})
