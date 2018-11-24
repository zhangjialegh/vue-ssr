import {
  POST_PARTNER_APPLY_API,
  GET_ACTIVITY_EXT_PROJECT_LIST_API,
  POST_ACTIVITY_ACCEPTINVITE_API
} from '@/constants/API'
import {getAuthorization} from '@/utils/utils'

export const POST_PARTNER_APPLY_ACTION = 'POST_PARTNER_APPLY_ACTION'
export const GET_ACTIVITY_EXT_PROJECT_LIST_ACTION = 'GET_ACTIVITY_EXT_PROJECT_LIST_ACTION'
export const POST_ACTIVITY_ACCEPTINVITE_ACTION = 'POST_ACTIVITY_ACCEPTINVITE_ACTION'

const activity = {
  state: {
    
  },
  actions: {
    [POST_PARTNER_APPLY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_PARTNER_APPLY_API,
          method: 'post',
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
    [GET_ACTIVITY_EXT_PROJECT_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_ACTIVITY_EXT_PROJECT_LIST_API,
          method: 'get',
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
    },
    [POST_ACTIVITY_ACCEPTINVITE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_ACTIVITY_ACCEPTINVITE_API,
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
    },
  },
  mutations: {
  
  }
}
export default activity
