import { 
  GET_CITY_DETAIL_API,
  GET_CITY_COMPARE_API,
  GET_CITY_CATEGORY_API,
  GET_PROJECT_DETAIL_API,
  CREATE_CROWDFUNDING_ORDER_API,
  GET_PAYMENT_STATUS_API,
  GET_REFER_TUAN_API ,
  SET_USER_COLOSE_API,
  GET_COUPON_LIST_API,
  GET_QUESTION_STATUS_API,
  GET_ORDER_FILES_API,
  GET_PROPERTY_DETAIL_API,
  GET_OPEN_TUAN_LIST_API,
  SET_COLLECTION_ADD_API,
  SET_COLLECTION_DEL_API,
  SET_COLLECTION_CHECK_API,
  POST_REFER_INVITED_API,
  GET_REFER_INVITED_SHOW_API,
  POST_WECHAT_JSSDK_API,
  PLACE_CROWDFUNDING_ORDER_API,
  CREATE_SUBSCRIPTION_ORDER_API,
  GET_PROJECT_ONSALE_API,
  GET_CITY_LIST_API,
  GET_RESALE_LIST_API,
  GET_QUESTION_INVESTIGATION_API,
  GET_LANDING_INFO_API,
  GET_RESALE_HISTORIES_API,
  GET_RESALE_ORDERS_API,
  GET_BROADCAST_API,
  CREATE_EXP_GOLD_ORDER_API,
  GET_RESALE_CALC_API,
  POST_RESALE_COMMIT_ORDER_API,
  POST_BALANCE_PAY_API,
  POST_WECHET_PAY_API,
  POST_CARD_PAY_API,
  GET_WECHEATPAY_STATUS_API,
  GET_WEHOME_ORDER_API,
  GET_PROPERTY_BY_TYPE_API
} from '@/constants/API'
import {getAuthorization} from '@/utils/utils'
import {UPDATE_QUESTION_STATUS} from '@/scenes/login/modules'

// actions
export const PLACE_CROWDFUNDING_ORDER_ACTION = 'PLACE_CROWDFUNDING_ORDER_ACTION'
export const GET_PROJECT_DETAIL_ACTION = 'GET_PROJECT_DETAIL_ACTION'
export const GET_PROPERTY_DETAIL_ACTION = 'GET_PROPERTY_DETAIL_ACTION'
export const GET_CITY_DETAIL_ACTION = 'GET_CITY_DETAIL_ACTION'
export const GET_CITY_LIST_ACTION = 'GET_CITY_LIST_ACTION'
export const GET_CITY_COMPARE_ACTION = 'GET_CITY_COMPARE_ACTION'
export const GET_CITY_CATEGORY_ACTION = 'GET_CITY_CATEGORY_ACTION'
export const CREATE_CROWDFUNDING_ORDER_ACTION = 'CREATE_CROWDFUNDING_ORDER_ACTION'
export const GET_PAYMENT_STATUS_ACTION = 'GET_PAYMENT_STATUS_ACTION'
export const GET_REFER_TUAN_ACTION = 'GET_REFER_TUAN_ACTION'
export const SET_USER_COLOSE_ACTION = 'SET_USER_COLOSE_ACTION'
export const GET_COUPON_LIST_ACTION = 'GET_COUPON_LIST_ACTION'
export const GET_QUESTION_STATUS_ACTION = 'GET_QUESTION_STATUS_ACTION'
export const GET_ORDER_FILES_ACTION = 'GET_ORDER_FILES_ACTION'
export const GET_OPEN_TUAN_LIST_ACTION = 'GET_OPEN_TUAN_LIST_ACTION'
export const SET_COLLECTION_ADD_ACTION = 'SET_COLLECTION_ADD_ACTION'
export const SET_COLLECTION_DEL_ACTION = 'SET_COLLECTION_DEL_ACTION'
export const SET_COLLECTION_CHECK_ACTION = 'SET_COLLECTION_CHECK_ACTION'
export const POST_REFER_INVITED_ACTION = 'POST_REFER_INVITED_ACTION'
export const POST_WECHAT_JSSDK_ACTION = 'POST_WECHAT_JSSDK_ACTION'
export const GET_REFER_INVITED_SHOW_ACTION = 'GET_REFER_INVITED_SHOW_ACTION'
export const CREATE_SUBSCRIPTION_ORDER_ACTION = 'CREATE_SUBSCRIPTION_ORDER_ACTION'
export const GET_PROJECT_ONSALE_ACTION = 'GET_PROJECT_ONSALE_ACTION'
export const GET_RESALE_LIST_ACTION = 'GET_RESALE_LIST_ACTION'
export const GET_QUESTION_INVESTIGATION_ACTION = 'GET_QUESTION_INVESTIGATION_ACTION'
export const GET_LANDING_INFO_ACTION = 'GET_LANDING_INFO_ACTION'
export const GET_RESALE_HISTORIES_ACTION = 'GET_RESALE_HISTORIES_ACTION'
export const GET_RESALE_ORDRES_ACTION = 'GET_RESALE_ORDRES_ACTION'
export const GET_BROADCAST_ACTION = 'GET_BROADCAST_ACTION'
export const CREATE_EXP_GOLD_ORDER_ACTION = 'CREATE_EXP_GOLD_ORDER_ACTION'
export const GET_RESALE_CALC_ACTION = 'GET_RESALE_CALC_ACTION'
export const POST_RESALE_COMMIT_ORDER_ACTION = 'POST_RESALE_COMMIT_ORDER_ACTION'
export const POST_BALANCE_PAY_ACTION = 'POST_BALANCE_PAY_ACTION'
export const POST_WECHET_PAY_ACTION = 'POST_WECHET_PAY_ACTION'
export const POST_CARD_PAY_ACTION = 'POST_CARD_PAY_ACTION'
export const GET_WECHEATPAY_STATUS_ACTION = 'GET_WECHEATPAY_STATUS_ACTION'
export const GET_WEHOME_ORDER_ACTION = 'GET_WEHOME_ORDER_ACTION'
export const GET_PROPERTY_BY_TYPE_ACTION = 'GET_PROPERTY_BY_TYPE_ACTION'

// plugins
export const GET_PROJECT_ONSALE = 'GET_PROJECT_ONSALE'
export const GET_CITY_CATEGORY = 'GET_CITY_CATEGORY'
export const GET_BROADCAST = 'GET_BROADCAST'
export const GET_RESALE_LIST = 'GET_RESALE_LIST'
export const GET_CITY_LIST = 'GET_CITY_LIST'
export const GET_PROJECT_DETAIL = 'GET_PROJECT_DETAIL'
export const GET_CITY_DETAIL = 'GET_CITY_DETAIL'
export const GET_RESALE_CALC = 'GET_RESALE_CALC'


const invest = {
  state:{
    reviewStatus: 3,
    permission: false,
    resaleList: [],
    optionList: {},
    onsaleList: [],
    categoryList: [],
    cityList: [],
    cityDetail: {},
    houseDetail: {}
  },
  getters: {

  },
  actions: {
    /* 获取当前用户信息 */
    [PLACE_CROWDFUNDING_ORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: PLACE_CROWDFUNDING_ORDER_API,
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
    [GET_PROJECT_DETAIL_ACTION]({ commit }, payload) {
      console.log(payload,'project payload');
      
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_PROJECT_DETAIL_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_PROJECT_DETAIL, res)
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
    [GET_PROPERTY_DETAIL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_PROPERTY_DETAIL_API,
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
    [GET_CITY_DETAIL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_CITY_DETAIL_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_CITY_DETAIL, res)
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
    [GET_CITY_COMPARE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_CITY_COMPARE_API,
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
    [GET_CITY_CATEGORY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_CITY_CATEGORY_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_CITY_CATEGORY, res)
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
    [CREATE_CROWDFUNDING_ORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: CREATE_CROWDFUNDING_ORDER_API,
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
    [GET_PAYMENT_STATUS_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_PAYMENT_STATUS_API,
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
    [GET_REFER_TUAN_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_REFER_TUAN_API,
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
    [SET_USER_COLOSE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SET_USER_COLOSE_API,
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
    [GET_COUPON_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_COUPON_LIST_API,
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
    [GET_QUESTION_STATUS_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_QUESTION_STATUS_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            // 向前端通知操作成功
            resolve(res)
            commit(UPDATE_QUESTION_STATUS, res)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [GET_ORDER_FILES_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_ORDER_FILES_API,
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
    [GET_OPEN_TUAN_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_OPEN_TUAN_LIST_API,
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
    [SET_COLLECTION_ADD_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SET_COLLECTION_ADD_API,
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
    [SET_COLLECTION_DEL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SET_COLLECTION_DEL_API,
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
    [SET_COLLECTION_CHECK_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: SET_COLLECTION_CHECK_API,
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
    [POST_REFER_INVITED_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_REFER_INVITED_API,
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
    [POST_WECHAT_JSSDK_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_WECHAT_JSSDK_API,
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
    [GET_REFER_INVITED_SHOW_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_REFER_INVITED_SHOW_API,
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
    [CREATE_SUBSCRIPTION_ORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: CREATE_SUBSCRIPTION_ORDER_API,
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
    [GET_PROJECT_ONSALE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_PROJECT_ONSALE_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_PROJECT_ONSALE, res)
            // 向前端通知操作成功
            resolve()
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [GET_CITY_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_CITY_LIST_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_CITY_LIST, res)
            // 向前端通知操作成功
            resolve()
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [GET_RESALE_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_RESALE_LIST_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_RESALE_LIST,res)
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
    [GET_QUESTION_INVESTIGATION_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_QUESTION_INVESTIGATION_API,
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
    [GET_LANDING_INFO_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_LANDING_INFO_API,
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
    [GET_RESALE_HISTORIES_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_RESALE_HISTORIES_API,
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
    [GET_RESALE_ORDRES_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_RESALE_ORDERS_API,
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
    [GET_BROADCAST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_BROADCAST_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_BROADCAST,res)
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
    [CREATE_EXP_GOLD_ORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: CREATE_EXP_GOLD_ORDER_API,
          method: 'post',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_BROADCAST,res)
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
    [GET_RESALE_CALC_ACTION]({commit}, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_RESALE_CALC_API,
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
    [POST_RESALE_COMMIT_ORDER_ACTION]({commit}, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_RESALE_COMMIT_ORDER_API,
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
    [POST_BALANCE_PAY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_BALANCE_PAY_API,
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
    [POST_WECHET_PAY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_WECHET_PAY_API,
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
    [POST_CARD_PAY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_CARD_PAY_API,
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
    [GET_WECHEATPAY_STATUS_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_WECHEATPAY_STATUS_API,
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
    [GET_WEHOME_ORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_WEHOME_ORDER_API,
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
    [GET_PROPERTY_BY_TYPE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_PROPERTY_BY_TYPE_API,
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
    [GET_PROJECT_ONSALE](state, payload) {
      state.onsaleList = payload.onsale
    },
    [GET_CITY_CATEGORY](state, payload) {
      state.categoryList = payload
    },
    [GET_BROADCAST](state, payload) {
      state.optionList = payload
    },
    [GET_RESALE_LIST](state, payload) {
      state.resaleList = payload.resale_list
    },
    [GET_CITY_LIST](state, payload) {
      state.cityList = payload
    },
    [GET_PROJECT_DETAIL](state, payload) {
      state.houseDetail = payload
    },
    [GET_CITY_DETAIL](state, payload) {
      state.cityDetail = payload
    },
  }
}
export default invest
