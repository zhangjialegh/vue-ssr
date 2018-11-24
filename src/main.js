/* Vue */
import Vue from 'vue'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

import createRouter from './router'
import createStore from './store'
import createI18n from './i18n'
import async from './async'
Vue.use(async)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// import scroll from 'vue-seamless-scroll'
// Vue.use(scroll)
  // import vueSeamlessScroll from 'vue-seamless-scroll'


if(process.env.VUE_ENV !== 'server') {
  const VueAwesomeSwiper= require('vue-awesome-swiper')
  Vue.use(VueAwesomeSwiper)
  const vueSlider = require('vue-slider-component')
  Vue.component('vue-slider', vueSlider)
  const vueSeamlessScroll = require('vue-seamless-scroll')
  Vue.component('vue-seamless-scroll', vueSeamlessScroll)
}

/* App component */
import App from './scenes/App'

/* tooltip plugin */
import Tooltip from 'vue-directive-tooltip'
Vue.use(Tooltip)


// 引入全局组件
const requireComponent = require.context("./components", false)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    fileName
    .replace(/^.+\//, '')
    .replace(/\.\w+$/, '')
  )
  Vue.component(baseComponentName, baseComponentConfig)
})

/* global constant*/
import * as global_ from './global'
Vue.prototype.GLOBAL = global_

/**懒加载 */
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: 'https://wechat-pics.fangpinduo.com/wehome/border/wehome_loading.gif',
  error: 'https://wechat-pics.fangpinduo.com/wehome/border/wehome_error.png'
})

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, {
  i18nRootKey: 'validations',
  aria: true,
  inject: true,
  locale: 'zh_CN'
})

export default function createApp() {
  const router = createRouter()
  const store = createStore()
  const i18n = createI18n()
  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  })
  return { app, router, store }
}
