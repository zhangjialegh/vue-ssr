import { 
  GET_USER_ASSET_API,
  CHECK_USER_PHONE_BIND_API,
  POST_QUESTION_COMMIT_API,
  GET_USER_NOTICE_UNREAD_API,
  GET_USER_PROJECT_VALUE_API,
  GET_USER_PROJECT_ASSET_API,
  GET_USER_SHARE_API,
  GET_USER_PROJECT_HISTORY_API,
  GET_USER_PROJECT_RENTS_API,
  GET_USER_ORDER_FILES_API,
  GET_USER_ORDER_LIST_API,
  GET_ACTIVITY_EXP_BALANCE_API,
  GET_USER_BILL_LIST_API,
  GET_ACTIVITY_ORDER_API,
  GET_USER_PAYMENT_CANCEL_API,
  GET_USER_PAYMENT_LIST_API,
  GET_USER_WITHDRAW_HISTORY_API,
  GET_USER_HUAMEI_ORDER_API,
  GET_USER_PARTNER_INCOME_API,
  GET_USER_PARTNER_DOCUMENT_API,
  GET_USER_PARTNER_INVITED_API,
  GET_USER_PARTNER_INVITEE_API,
  GET_USER_RESALE_MYORDER_API,
  GET_USER_RESALE_CANCEL_API,
  GET_USER_REFER_LIST_API,
  GET_USER_NOTICE_LIST_API,
  GET_USER_NOTICE_MARKALL_API,
  GET_USER_TASK_DRAW_ALL_API,
  GET_USER_COUPON_LIST_API,
  GET_USER_TASK_STARTER_API,
  GET_USER_TASK_GET_GROUP_PRIZE_API,
  GET_USER_TASK_GET_PRIZE_API,
  GET_USER_TASK_DO_API,
  GET_USER_TASK_QRCODE_API,
  GET_USER_TASK_FOLLOW_WECHAT_API,
  GET_USER_INVEST_SCORE_API,
  GET_ACTIVITY_GETCODE_API,
  GET_ACTIVITY_BY_RFCODE_API,
  GET_ACTIVITY_BY_CODE_API,
  GET_USER_PAYMENT_INFO_API,
  GET_USER_ORDER_TRANSFERINFO_API,
  GET_USER_PAYMENT_NOTIFY_API,
  GET_USER_ORDER_TRANSFER_NOTIFY_API,
  GET_UPLOAD_KEY_API,
  GET_USER_ACCOUNT_EDIT_API,
  GET_USER_ACCOUNT_GET_API,
  GET_USER_ACCOUNT_DEL_API,
  GET_USER_ACCOUNT_LIST_API,
  GET_USER_WITHDRAW_APPLY_API,
  GET_USER_PARTNER_STATUS_API,
  CREATE_DEPOAIT_ORDER_API
} from '@/constants/API'
import {getAuthorization} from '@/utils/utils'
import {UPDATE_USER_PHONE_BIND} from '@/scenes/login/modules'

// actions
export const GET_USER_ASSET_ACTION = 'GET_USER_ASSET_ACTION'
export const CHECK_USER_PHONE_BIND_ACTION = 'CHECK_USER_PHONE_BIND_ACTION'
export const POST_QUESTION_COMMIT_ACTION = 'POST_QUESTION_COMMIT_ACTION'
export const GET_USER_NOTICE_UNREAD_ACTION = 'GET_USER_NOTICE_UNREAD_ACTION'
export const GET_USER_PROJECT_ASSET_ACTION='GET_USER_PROJECT_ASSET_ACTION'
export const GET_USER_SHARE_ACTION='GET_USER_SHARE_ACTION'
export const GET_USER_PROJECT_VALUE_ACTION='GET_USER_PROJECT_VALUE_ACTION'
export const GET_USER_PROJECT_HISTORY_ACTION='GET_USER_PROJECT_HISTORY_ACTION'
export const GET_USER_PROJECT_RENTS_ACTION='GET_USER_PROJECT_RENTS_ACTION'
export const GET_USER_ORDER_FILES_ACTION='GET_USER_ORDER_FILES_ACTION'
export const GET_USER_ORDER_LIST_ACTION='GET_USER_ORDER_LIST_ACTION'
export const GET_ACTIVITY_EXP_BALANCE_ACTION='GET_ACTIVITY_EXP_BALANCE_ACTION'
export const GET_USER_BILL_LIST_ACTION='GET_USER_BILL_LIST_ACTION'
export const GET_ACTIVITY_ORDER_ACTION='GET_ACTIVITY_ORDER_ACTION'
export const GET_USER_PAYMENT_CANCEL_ACTION='GET_USER_PAYMENT_CANCEL_ACTION'
export const GET_USER_PAYMENT_LIST_ACTION='GET_USER_PAYMENT_LIST_ACTION'
export const GET_USER_WITHDRAW_HISTORY_ACTION='GET_USER_WITHDRAW_HISTORY_ACTION'
export const GET_USER_HUAMEI_ORDER_ACTION='GET_USER_HUAMEI_ORDER_ACTION'
export const GET_USER_PARTNER_INCOME_ACTION='GET_USER_PARTNER_INCOME_ACTION'
export const GET_USER_PARTNER_DOCUMENT_ACTION='GET_USER_PARTNER_DOCUMENT_ACTION'
export const GET_USER_PARTNER_INVITED_ACTION='GET_USER_PARTNER_INVITED_ACTION'
export const GET_USER_PARTNER_INVITEE_ACTION='GET_USER_PARTNER_INVITEE_ACTION'
export const GET_USER_RESALE_MYORDER_ACTION='GET_USER_RESALE_MYORDER_ACTION'
export const GET_USER_RESALE_CANCEL_ACTION='GET_USER_RESALE_CANCEL_ACTION'
export const GET_USER_REFER_LIST_ACTION='GET_USER_REFER_LIST_ACTION'
export const GET_USER_NOTICE_LIST_ACTION='GET_USER_NOTICE_LIST_ACTION'
export const GET_USER_NOTICE_MARKALL_ACTION='GET_USER_NOTICE_MARKALL_ACTION'
export const GET_USER_TASK_DRAW_ALL_ACTION='GET_USER_TASK_DRAW_ALL_ACTION'
export const GET_USER_COUPON_LIST_ACTION='GET_USER_COUPON_LIST_ACTION'
export const GET_USER_TASK_STARTER_ACTION='GET_USER_TASK_STARTER_ACTION'
export const GET_USER_TASK_GET_GROUP_PRIZE_ACTION='GET_USER_TASK_GET_GROUP_PRIZE_ACTION'
export const GET_USER_TASK_GET_PRIZE_ACTION='GET_USER_TASK_GET_PRIZE_ACTION'
export const GET_USER_TASK_DO_ACTION='GET_USER_TASK_DO_ACTION'
export const GET_USER_TASK_QRCODE_ACTION='GET_USER_TASK_QRCODE_ACTION'
export const GET_USER_TASK_FOLLOW_WECHAT_ACTION='GET_USER_TASK_FOLLOW_WECHAT_ACTION'
export const GET_USER_INVEST_SCORE_ACTION='GET_USER_INVEST_SCORE_ACTION'
export const GET_ACTIVITY_GETCODE_ACTION='GET_ACTIVITY_GETCODE_ACTION'
export const GET_ACTIVITY_BY_RFCODE_ACTION='GET_ACTIVITY_BY_RFCODE_ACTION'
export const GET_ACTIVITY_BY_CODE_ACTION='GET_ACTIVITY_BY_CODE_ACTION'
export const GET_USER_PAYMENT_INFO_ACTION='GET_USER_PAYMENT_INFO_ACTION'
export const GET_USER_ORDER_TRANSFERINFO_ACTION='GET_USER_ORDER_TRANSFERINFO_ACTION'
export const GET_USER_PAYMENT_NOTIFY_ACTION='GET_USER_PAYMENT_NOTIFY_ACTION'
export const GET_USER_ORDER_TRANSFER_NOTIFY_ACTION='GET_USER_ORDER_TRANSFER_NOTIFY_ACTION'
export const GET_UPLOAD_KEY_ACTION='GET_UPLOAD_KEY_ACTION'
export const GET_USER_ACCOUNT_EDIT_ACTION='GET_USER_ACCOUNT_EDIT_ACTION'
export const GET_USER_ACCOUNT_GET_ACTION='GET_USER_ACCOUNT_GET_ACTION'
export const GET_USER_ACCOUNT_DEL_ACTION='GET_USER_ACCOUNT_DEL_ACTION'
export const GET_USER_ACCOUNT_LIST_ACTION='GET_USER_ACCOUNT_LIST_ACTION'
export const GET_USER_WITHDRAW_APPLY_ACTION='GET_USER_WITHDRAW_APPLY_ACTION'
export const GET_USER_PARTNER_STATUS_ACTION='GET_USER_PARTNER_STATUS_ACTION'
export const CREATE_DEPOAIT_ORDER_ACTION = 'CREATE_DEPOAIT_ORDER_ACTION'

// mutations
export const GET_USER_NOTICE_UNREAD = 'GET_USER_NOTICE_UNREAD'
export const CLEAR_ALL_NOTE_COUNT = 'CLEAR_ALL_NOTE_COUNT'

const user = {
  state: {
    asset: 0,
    notes: {
      count: 0
    }
  },
  getters: {
    // auth: state => state.auth,
    // user: state => state.user
  },
  actions: {
    /* 获取当前用户信息 */
    [GET_USER_ASSET_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ASSET_API,
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
    [CHECK_USER_PHONE_BIND_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: CHECK_USER_PHONE_BIND_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            // 向前端通知操作成功
            commit(UPDATE_USER_PHONE_BIND,res)
            resolve(res)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    [POST_QUESTION_COMMIT_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: POST_QUESTION_COMMIT_API,
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
    [GET_USER_NOTICE_UNREAD_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_NOTICE_UNREAD_API,
          method: 'get',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(GET_USER_NOTICE_UNREAD, res)
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
    [GET_USER_PROJECT_VALUE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PROJECT_VALUE_API,
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
    [GET_USER_PROJECT_ASSET_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PROJECT_ASSET_API,
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
    [GET_USER_SHARE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_SHARE_API,
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
    [GET_USER_PROJECT_HISTORY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PROJECT_HISTORY_API,
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
    [GET_USER_PROJECT_RENTS_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PROJECT_RENTS_API,
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
    [GET_USER_ORDER_FILES_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ORDER_FILES_API,
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
    [GET_USER_ORDER_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ORDER_LIST_API,
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
    [GET_ACTIVITY_EXP_BALANCE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_ACTIVITY_EXP_BALANCE_API,
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
    [GET_USER_BILL_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_BILL_LIST_API,
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
    [GET_ACTIVITY_ORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_ACTIVITY_ORDER_API,
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
    [GET_USER_PAYMENT_CANCEL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PAYMENT_CANCEL_API,
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
    [GET_USER_PAYMENT_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PAYMENT_LIST_API,
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
    [GET_USER_WITHDRAW_HISTORY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_WITHDRAW_HISTORY_API,
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
    [GET_USER_HUAMEI_ORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_HUAMEI_ORDER_API,
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
    [GET_USER_PARTNER_INCOME_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PARTNER_INCOME_API,
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
    [GET_USER_PARTNER_DOCUMENT_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PARTNER_DOCUMENT_API,
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
    [GET_USER_PARTNER_INVITED_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PARTNER_INVITED_API,
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
    [GET_USER_PARTNER_INVITEE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PARTNER_INVITEE_API,
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
    [GET_USER_RESALE_MYORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_RESALE_MYORDER_API,
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
    [GET_USER_RESALE_CANCEL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_RESALE_CANCEL_API,
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
    [GET_USER_REFER_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_REFER_LIST_API,
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
    [GET_USER_NOTICE_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_NOTICE_LIST_API,
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
    [GET_USER_NOTICE_MARKALL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_NOTICE_MARKALL_API,
          method: 'post',
          data: payload,
          doHideAlert: true,
          headers: getAuthorization(this),
          success(res) {
            commit(CLEAR_ALL_NOTE_COUNT)
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
    [GET_USER_TASK_DRAW_ALL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_TASK_DRAW_ALL_API,
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
    [GET_USER_COUPON_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_COUPON_LIST_API,
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
    [GET_USER_TASK_STARTER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_TASK_STARTER_API,
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
    [GET_USER_TASK_GET_GROUP_PRIZE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_TASK_GET_GROUP_PRIZE_API,
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
    [GET_USER_TASK_GET_PRIZE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_TASK_GET_PRIZE_API,
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
    [GET_USER_TASK_DO_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_TASK_DO_API,
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
    [GET_USER_TASK_QRCODE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_TASK_QRCODE_API,
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
    [GET_USER_TASK_FOLLOW_WECHAT_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_TASK_FOLLOW_WECHAT_API,
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
    [GET_USER_INVEST_SCORE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_INVEST_SCORE_API,
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
    [GET_ACTIVITY_GETCODE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_ACTIVITY_GETCODE_API,
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
    [GET_ACTIVITY_BY_RFCODE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_ACTIVITY_BY_RFCODE_API,
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
    [GET_ACTIVITY_BY_CODE_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_ACTIVITY_BY_CODE_API,
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
    [GET_USER_PAYMENT_INFO_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PAYMENT_INFO_API,
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
    [GET_USER_ORDER_TRANSFERINFO_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ORDER_TRANSFERINFO_API,
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
    [GET_USER_PAYMENT_NOTIFY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PAYMENT_NOTIFY_API,
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
    [GET_USER_ORDER_TRANSFER_NOTIFY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ORDER_TRANSFER_NOTIFY_API,
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
    [GET_UPLOAD_KEY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_UPLOAD_KEY_API,
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
    [GET_USER_ACCOUNT_EDIT_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ACCOUNT_EDIT_API,
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
    [GET_USER_ACCOUNT_GET_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ACCOUNT_GET_API,
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
    [GET_USER_ACCOUNT_DEL_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ACCOUNT_DEL_API,
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
    [GET_USER_ACCOUNT_LIST_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_ACCOUNT_LIST_API,
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
    [GET_USER_WITHDRAW_APPLY_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_WITHDRAW_APPLY_API,
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
    [GET_USER_PARTNER_STATUS_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: GET_USER_PARTNER_STATUS_API,
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
    [CREATE_DEPOAIT_ORDER_ACTION]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: CREATE_DEPOAIT_ORDER_API,
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
    [GET_USER_NOTICE_UNREAD](state, payload) {
      state.notes.count = payload.count
    },
    [CLEAR_ALL_NOTE_COUNT](state) {
      state.notes.count = 0
    }
  }
}
export default user
