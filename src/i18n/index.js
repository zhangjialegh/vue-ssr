import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN', // 语言标识
  messages: {
    'zh_CN': require('./lang/zh'),
    'en_US': require('./lang/en')
  }
})


export default function createI18n () {
  return i18n
}