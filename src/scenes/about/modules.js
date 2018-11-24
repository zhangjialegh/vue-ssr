import { 
  GET_BLOG_LIST_API,
  GET_COMPANY_INTRO_API,
  GET_FAQ_LIST_API,
  GET_KNOWLEDGE_CATEGORIES_API,
  GET_KNOWLEDGE_DETAIL_API,
  GET_NEWS_FEATURED_API,
  GET_NEWS_DETAIL_API
} from '@/constants/API'

import {getAuthorization} from '@/utils/utils'

// actions
export const GET_BLOG_LIST_ACTION = 'GET_BLOG_LIST_ACTION'
export const GET_COMPANY_INTRO_ACTION = 'GET_COMPANY_INTRO_ACTION'
export const GET_FAQ_LIST_ACTION = 'GET_FAQ_LIST_API'
export const GET_KNOWLEDGE_CATEGORIES_ACTION = 'GET_KNOWLEDGE_CATEGORIES_ACTION'
export const GET_KNOWLEDGE_DETAIL_ACTION = 'GET_KNOWLEDGE_DETAIL_ACTION'
export const GET_NEWS_FEATURED_ACTION = 'GET_NEWS_FEATURED_ACTION'
export const GET_NEWS_DETAIL_ACTION = 'GET_NEWS_DETAIL_ACTION'

// mutations
export const GET_BLOG_LIST = 'GET_BLOG_LIST'
export const GET_COMPANY_INTRO = 'GET_COMPANY_INTRO'

const about = {
  state: {
    blogList: [],
    hotBlogList: [],
    companyInfo: {}
  },
  getters: {
    // auth: state => state.auth,
    // user: state => state.user
  },
  actions: {
    /* 获取当前用户信息 */
    [GET_BLOG_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_BLOG_LIST_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_BLOG_LIST,res)
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
    [GET_COMPANY_INTRO_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_COMPANY_INTRO_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_COMPANY_INTRO, res)
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
    [GET_FAQ_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_FAQ_LIST_API,
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
    [GET_KNOWLEDGE_CATEGORIES_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_KNOWLEDGE_CATEGORIES_API,
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
    [GET_KNOWLEDGE_DETAIL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_KNOWLEDGE_DETAIL_API,
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
    [GET_NEWS_FEATURED_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_NEWS_FEATURED_API,
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
    [GET_NEWS_DETAIL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_NEWS_DETAIL_API,
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
  },
  mutations: {
    [GET_BLOG_LIST](state, payload) {
      state.blogList = payload.res.blogs
      state.hotBlogList = payload.res.hot_blogs
    },
    [GET_COMPANY_INTRO](state, payload) {
      state.companyInfo = payload
    },
  }
}
export default about
