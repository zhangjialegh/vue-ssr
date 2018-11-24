import {
  GET_HUAMEI_FILL_INFO_2_API,
  GET_HUAMEI_PAY_API
} from '@/constants/API'


export const GET_HUAMEI_FILL_INFO_2_ACTION = 'GET_HUAMEI_FILL_INFO_2_ACTION'
export const POST_HUAMEI_PAY_ACTION = 'POST_HUAMEI_PAY_ACTION'


const bank = {
  state: {
    
  },
  actions: {
    [GET_HUAMEI_FILL_INFO_2_ACTION]({commit}, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_HUAMEI_FILL_INFO_2_API,
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
    [POST_HUAMEI_PAY_ACTION]({commit}, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_HUAMEI_PAY_API,
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
    
  }
}
export default bank
