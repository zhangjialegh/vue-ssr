import {POST_USER_TRACK_API} from '@/constants/API'
export const INITIAL_BASE_ACTION = 'INITIAL_BASE_ACTION'
export const INITIAL_BASE = 'INITIAL_BASE'
export const CLEAR_COOKIES = 'CLEAR_COOKIES'
export const POST_USER_TRACK_ACTION = 'POST_USER_TRACK_ACTION'
import {
  is_weixin,
  detectmob,
  h5_weixin,
  checkLocale,
  getAuthorization
} from '@/utils/utils'


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
    },
    [POST_USER_TRACK_ACTION]({commit}, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_USER_TRACK_API,
          method: 'post',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            // 向前端通知操作成功
            resolve(res)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
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
