import { 
  GET_USER_SHOW_WELCOME_API,
  GET_CONTENT_FOLLOW_API
 } from '@/constants/API'
import {getAuthorization} from '@/utils/utils'

export const GET_USER_SHOW_WELCOME_ACTION = 'GET_USER_SHOW_WELCOME_ACTION'
export const GET_CONTENT_FOLLOW_ACTION = 'GET_CONTENT_FOLLOW_ACTION'

const epart = {
  state: {

  },
  getters: {
    
  },
  actions: {
    [GET_USER_SHOW_WELCOME_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_SHOW_WELCOME_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(result) {
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
    [GET_CONTENT_FOLLOW_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_CONTENT_FOLLOW_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(result) {
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
  },
  mutations: {
    
  }
}
export default epart
