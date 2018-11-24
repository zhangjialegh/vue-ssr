export const INITIAL_BASE_ACTION = 'INITIAL_BASE_ACTION'
export const INITIAL_BASE = 'INITIAL_BASE'
export const CLEAR_COOKIES = 'CLEAR_COOKIES'
import {is_weixin,detectmob,h5_weixin,checkLocale} from '@/utils/utils'


const base = {
  state: {
    isWeixin: false,
    isMobile: false,
    h5Weixin: false,
    cookies: '',
    locale: 'zh_CN'
  },
  actions: {
    [INITIAL_BASE_ACTION]({commit}, payload) {
      commit(INITIAL_BASE, payload)
    }
  },
  mutations: {
    [INITIAL_BASE](state, payload) {
      const { ua, cookies, hostname, locale } = payload
      state.isMobile = detectmob(ua)
      state.isWeixin = is_weixin(ua)
      state.cookies = cookies
      state.locale = checkLocale(cookies, locale)
      state.h5Weixin = h5_weixin(hostname, ua)
    },
    [CLEAR_COOKIES](state) {
      state.cookies = ''
    }
  }
}
export default base
