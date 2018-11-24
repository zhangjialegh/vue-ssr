import { CHECK_QUALIFICATION_API,GET_RCMD_PROJECT_API,GET_COUNTRIES_API } from '@/constants/API'
import {getAuthorization} from '@/utils/utils'

export const CHECK_QUALIFICATION_ACTION = 'CHECK_QUALIFICATION_ACTION'
export const CHECK_QUALIFICATION = 'CHECK_QUALIFICATION'
export const GET_RCMD_PROJECT_ACTION = 'GET_RCMD_PROJECT_ACTION'
export const GET_RCMD_PROJECT = 'GET_RCMD_PROJECT'
export const GET_COUNTRIES_ACTION  = 'GET_COUNTRIES_ACTION'
export const GET_COUNTRIES  = 'GET_COUNTRIES'

const home = {
  state: {
    showGold: false,
    rcmd_project_id: 1,
    countries: []
  },
  getters: {
    
  },
  actions: {
    [CHECK_QUALIFICATION_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: CHECK_QUALIFICATION_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(result) {
            commit(CHECK_QUALIFICATION, result)
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
    [GET_RCMD_PROJECT_ACTION]({ commit }, payload={}) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_RCMD_PROJECT_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(result) {
            commit(GET_RCMD_PROJECT, result)
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
    [GET_COUNTRIES_ACTION]({ commit }, payload={}) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_COUNTRIES_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_COUNTRIES,res)
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
    [CHECK_QUALIFICATION](state, payload) {
      state.showGold = payload.success
    },
    [GET_RCMD_PROJECT](state, payload) {
      state.rcmd_project_id = payload.project_id
    },
    [GET_COUNTRIES](state, payload) {
      state.countries = payload.data
    }
  }
}
export default home
