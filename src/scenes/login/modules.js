import { 
  LOGIN_URL, 
  PHONE_LOGIN_URL, 
  SIGNUP_URL, 
  RESETPWD_URL, 
  WECHATLOGIN_URL,
  SEND_SMS_URL,
  WECHATOAUTH_LOGIN, 
  WECHATOAUTH_URL,
  MINIAPP_GET_USERINFO,
  WECHAT_REGISTER,
  GET_USER_LOGIN_INFO_API
} from '@/constants/API'

import {CLEAR_COOKIES} from '@/store/modules'


export const RESETPWD_ACTION = 'RESETPWD_ACTION'
export const SEND_SMS_ACTION = 'SEND_SMS_ACTION'
export const SIGNUP_ACTION = 'SIGNUP_ACTION'
export const LOGIN_ACTION = 'LOGIN_ACTION'
export const WECHAT_REGISTER_ACTION = 'WECHAT_REGISTER_ACTION'
export const PHONE_LOGIN_ACTION = 'PHONE_LOGIN_ACTION'
export const WECHATOAUTH_LOGIN_ACTION = 'WECHATOAUTH_LOGIN_ACTION'
export const WECHATLOGIN_URL_ACTION = 'WECHATLOGIN_URL_ACTION'
export const WECHATSCAN_LOGIN_ACTION = 'WECHATSCAN_LOGIN_ACTION'
export const MINIAPP_GET_USERINFO_ACTION = 'MINIAPP_GET_USERINFO_ACTION'
export const LOGIN_OUT_ACTION = 'LOGIN_OUT_ACTION'
export const CLEAR_ALL_DATA_ACTION = 'CLEAR_ALL_DATA_ACTION'
export const STORE_TOKEN = 'STORE_TOKEN'
export const STORE_TOKEN_NOT_COOKIES = 'STORE_TOKEN_NOT_COOKIES'
export const STORAGE_KEY = 'wehome-everest'
export const UPDATE_QUESTION_STATUS = 'UPDATE_QUESTION_STATUS'
export const UPDATE_USER_PHONE_BIND = 'UPDATE_USER_PHONE_BIND'

export const GET_USER_LOGIN_INFO_ACTION = 'GET_USER_LOGIN_INFO_ACTION'

const auth = {
  state: {
    auth: {
      isLoggedIn: false,
      acsToken: null
    },
    user: {
      name: null,
      avatar: '',
      permission: true,
      reviewStatus: 0,
      rf_code: '',
      partner: false,
      new: true,
      bindPhone: false,
      id: 0
    }
  },
  getters: {
    auth: state => state.auth.auth,
    user: state => state.auth.user
  },
  actions: {
    /* 获取当前用户信息 */
    [GET_USER_LOGIN_INFO_ACTION]({commit}, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_LOGIN_INFO_API,
          method: 'get',
          data: payload,
          headers: payload,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN_NOT_COOKIES, result)
            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [RESETPWD_ACTION]({ commit }, payload) {
      const params = {
        'phone': payload.phone,
        'country': payload.countryCode,
        'code': payload.verificationCode,
        'password': payload.password
      }
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: RESETPWD_URL,
          method: 'post',
          data: params,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN, result)
            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [WECHAT_REGISTER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: RESETPWD_URL,
          method: 'post',
          data: payload,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN, result)

            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [SEND_SMS_ACTION]({ commit }, payload) {
      const params = { 'phone': payload.phone, 'country': payload.countryCode }
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SEND_SMS_URL,
          method: 'post',
          data: params,
          doHideAlert: true,
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
    },
    [SIGNUP_ACTION]({ commit }, payload) {
      const params = {
        'name': payload.name,
        'phone': payload.phone,
        'country': payload.countryCode,
        'code': payload.verificationCode,
        'password': payload.password,
        'subscribe_news': enableNotif,
        'rf': this._vm.$cookies.get('ref_code') || null,
        'scene': this._vm.$cookies.get('source_scene')
      }
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SIGNUP_URL,
          method: 'post',
          data: params,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN, result)

            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [LOGIN_ACTION]({ commit }, payload) {
      const params = { 'username': payload.name, 'password': payload.password }
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: LOGIN_URL,
          method: 'post',
          data: params,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN, result)

            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [PHONE_LOGIN_ACTION]({ commit }, payload) {
      const params = {
        'phone': payload.phone,
        'code': payload.code,
        'country': payload.type
      }
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: PHONE_LOGIN_URL,
          method: 'post',
          data: params,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN, result)

            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [WECHATOAUTH_LOGIN_ACTION]({ commit }, payload) {
      const params = {
        'phone': payload.phone,
        'country': payload.countryCode,
        'code': payload.verificationCode,
        'token': payload.token 
      }
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: WECHATLOGIN_URL,
          method: 'post',
          data: params,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN, result)

            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [WECHATLOGIN_URL_ACTION]({ commit }, payload) {
      const params = payload ? {redirect_uri:payload} : {}
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: WECHATOAUTH_URL,
          method: 'get',
          data: params,
          doHideAlert: true,
          success(result) {
            // 向前端通知操作成功
            resolve()
            location.href = result.url
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [WECHATSCAN_LOGIN_ACTION]({ commit }, payload) {
      const params = payload || {}
      params['scene'] = this._vm.$cookies.get('source_scene')
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: WECHATOAUTH_LOGIN,
          method: 'post',
          data: params,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN, result)
            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [MINIAPP_GET_USERINFO_ACTION]({ commit }, payload) {
      const params = payload || {}
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: MINIAPP_GET_USERINFO,
          method: 'get',
          data: params,
          doHideAlert: true,
          success(result) {
            commit(STORE_TOKEN, result)
            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },

    [LOGIN_OUT_ACTION]({ commit }) {
      commit(CLEAR_ALL_DATA_ACTION)
      commit(CLEAR_COOKIES)
    },
  },
  mutations: {
    [CLEAR_ALL_DATA_ACTION](state) {
      const { $cookies } = this._vm
      state.auth.isLoggedIn = false
      state.auth.acsToken = null
      state.user.name = ''
      $cookies.remove(STORAGE_KEY)
      location.href="/login"
    },
    [UPDATE_QUESTION_STATUS](state, payload) {
      state.user.reviewStatus = payload.review_status
      state.user.permission = payload.has_permission
    },
    [UPDATE_USER_PHONE_BIND](state, payload) {
      state.user.bindPhone = payload.is_bind
    },
    [STORE_TOKEN_NOT_COOKIES](state, payload) {
      const auth = state.auth
      const user = state.user

      auth.isLoggedIn = true
      auth.acsToken = payload.token

      user.name = payload.name
      user.avatar = payload.avatar
      user.id = payload.user_id
      user.ref_code = payload.rf
      user.partner = payload.is_partner
      user.reviewStatus = payload.review_status
      user.permission = payload.has_permission
      user.new = payload.is_new
      user.bindPhone = payload.is_bind_phone
      state.user = user
      state.auth = auth
    },

    [STORE_TOKEN](state, payload) {
      const { $cookies } = this._vm
      $cookies.remove('redirect')
      const auth = state.auth
      const user = state.user
      auth.isLoggedIn = true
      auth.acsToken = payload.token
      user.name = payload.name
      user.avatar = payload.avatar
      user.id = payload.user_id
      user.ref_code = payload.rf
      user.partner = payload.is_partner
      user.reviewStatus = payload.review_status
      user.permission = payload.has_permission
      user.new = payload.is_new
      user.bindPhone = payload.is_bind_phone
      state.user = user
      state.auth = auth
      $cookies.set(STORAGE_KEY, payload.token)
    }
  }
}
export default auth
