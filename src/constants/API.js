let API_HOSTNAME
// if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = 'https://wechat.fangpinduo.com'
// } else {
//   API_HOSTNAME = '/api'
// }

// about
export const GET_BLOG_LIST_API = API_HOSTNAME + '/api/blog/list'
export const GET_COMPANY_INTRO_API = API_HOSTNAME + '/api/company/intro'
export const GET_FAQ_LIST_API = API_HOSTNAME + '/api/company/faq/all'
export const GET_KNOWLEDGE_CATEGORIES_API = API_HOSTNAME + '/api/knowledge/categories'
export const GET_KNOWLEDGE_DETAIL_API = API_HOSTNAME + '/api/knowledge/categorieDetail'
export const GET_NEWS_FEATURED_API = API_HOSTNAME + '/api/news/featured'
export const GET_NEWS_DETAIL_API = API_HOSTNAME + '/api/news/detail'


/* auth */
export const LOGIN_URL = API_HOSTNAME + '/api/login'
export const PHONE_LOGIN_URL = API_HOSTNAME + '/api/login_by_code'
export const SIGNUP_URL = API_HOSTNAME + '/api/create_user'
export const RESETPWD_URL = API_HOSTNAME + '/api/reset_password'
export const WECHATLOGIN_URL = API_HOSTNAME + '/api/web/update_info'
export const SEND_SMS_URL = API_HOSTNAME + '/api/send_mobile_code'
export const VERIFY_SMS_URL = API_HOSTNAME + '/api/is_phone_verification_code_valid'
export const WECHATOAUTH_LOGIN = API_HOSTNAME + '/api/web/login'
export const WECHATOAUTH_URL = API_HOSTNAME + '/api/web/wx_auth'
export const MINIAPP_GET_USERINFO = API_HOSTNAME + '/api/user/get_login_info' //TODO 小程序获取用户信息
export const WECHAT_REGISTER = API_HOSTNAME + '/api/web/wechat_register'
export const GET_USER_LOGIN_INFO_API = API_HOSTNAME + '/api/user/get_login_info'

// home
export const CHECK_QUALIFICATION_API = API_HOSTNAME + '/api/activity/checkQualification'
export const GET_RCMD_PROJECT_API = API_HOSTNAME + '/api/refer/rcmd_project'
export const GET_COUNTRIES_API = API_HOSTNAME + '/api/get_countries'
// invest
export const PLACE_CROWDFUNDING_ORDER_API = API_HOSTNAME + '/api/pay/placeCrowdfundingOrder'
export const GET_CITY_DETAIL_API = API_HOSTNAME + '/api/city/detail'
export const GET_CITY_LIST_API = API_HOSTNAME + '/api/city/list'
export const GET_CITY_COMPARE_API = API_HOSTNAME + '/api/city/compare'
export const GET_CITY_CATEGORY_API = API_HOSTNAME + '/api/property/getSuggestProperty'
export const GET_PROJECT_DETAIL_API = API_HOSTNAME + '/api/project/project'
export const CREATE_CROWDFUNDING_ORDER_API = API_HOSTNAME + '/api/order/createCrowdfundingOrder'
export const GET_PAYMENT_STATUS_API = API_HOSTNAME + '/api/order/payment_status'
export const GET_REFER_TUAN_API = API_HOSTNAME + '/api/refer/tuan'
export const SET_USER_COLOSE_API = API_HOSTNAME + '/api/user/close'
export const GET_COUPON_LIST_API = API_HOSTNAME + '/api/coupon/list'
export const GET_QUESTION_STATUS_API = API_HOSTNAME + '/api/question/check_review_status'
export const GET_ORDER_FILES_API = API_HOSTNAME + '/api/order/file'
export const GET_PROPERTY_DETAIL_API = API_HOSTNAME + '/api/property/property'
export const GET_OPEN_TUAN_LIST_API = API_HOSTNAME + '/api/tuan/get_open_tuan_list'
export const SET_COLLECTION_ADD_API = API_HOSTNAME + '/api/collection/add'
export const SET_COLLECTION_DEL_API = API_HOSTNAME + '/api/collection/delete'
export const SET_COLLECTION_CHECK_API = API_HOSTNAME + '/api/collection/check'
export const POST_REFER_INVITED_API = API_HOSTNAME + '/api/refer/invited'
export const GET_REFER_INVITED_SHOW_API = API_HOSTNAME + '/api/refer/invited_show'
export const POST_WECHAT_JSSDK_API = API_HOSTNAME + '/api/web/jssdkconfig'
export const CREATE_SUBSCRIPTION_ORDER_API = API_HOSTNAME + '/api/order/createSubscriptionOrder'
export const GET_PROJECT_ONSALE_API = API_HOSTNAME + '/api/project/onsale_v2'
export const GET_RESALE_LIST_API = API_HOSTNAME + '/api/resale/list'
export const GET_QUESTION_INVESTIGATION_API = API_HOSTNAME + '/api/question/investigation'
export const GET_LANDING_INFO_API = API_HOSTNAME + '/api/landing/info'
export const GET_RESALE_HISTORIES_API = API_HOSTNAME + '/api/resale/histories'
export const GET_RESALE_ORDERS_API = API_HOSTNAME + '/api/resale/orders'
export const GET_BROADCAST_API = API_HOSTNAME + '/api/tuan/get_broadcast'
export const CREATE_EXP_GOLD_ORDER_API = API_HOSTNAME + '/api/activity/createExpProjectOrder'
export const GET_RESALE_CALC_API = API_HOSTNAME + '/api/resale/calc'
export const POST_RESALE_COMMIT_ORDER_API = API_HOSTNAME + '/api/resale/commit_order'
export const POST_BALANCE_PAY_API = API_HOSTNAME + '/api/pay/balance_pay'
export const POST_WECHET_PAY_API = API_HOSTNAME + '/api/pay/wechat_pay'
export const POST_CARD_PAY_API = API_HOSTNAME + '/api/pay/card_pay'
export const GET_WECHEATPAY_STATUS_API = API_HOSTNAME + '/api/pay/wechatpay_status'
export const GET_WEHOME_ORDER_API = API_HOSTNAME + '/api/order/get_wehome_order'
export const GET_PROPERTY_BY_TYPE_API = API_HOSTNAME + '/api/property/getByType'

// user
export const GET_USER_ASSET_API = API_HOSTNAME + '/api/user/asset'
export const CHECK_USER_PHONE_BIND_API = API_HOSTNAME + '/api/user/is_phone_bind'
export const POST_QUESTION_COMMIT_API = API_HOSTNAME + '/api/question/investigation/commit_web'
export const GET_USER_NOTICE_UNREAD_API = API_HOSTNAME + '/api/notice/unread_count'
export const GET_USER_PROJECT_VALUE_API = API_HOSTNAME + '/api/user/project_value'
export const GET_USER_PROJECT_ASSET_API = API_HOSTNAME + '/api/project/get_asset'
export const GET_USER_SHARE_API = API_HOSTNAME + '/api/user/share'
export const GET_USER_PROJECT_HISTORY_API = API_HOSTNAME + '/api/user/get_project_history'
export const GET_USER_PROJECT_RENTS_API = API_HOSTNAME + '/api/user/get_user_rents'
export const GET_USER_ORDER_FILES_API = API_HOSTNAME + '/api/order/file'
export const GET_USER_ORDER_LIST_API = API_HOSTNAME + '/api/order/list'
export const GET_ACTIVITY_EXP_BALANCE_API = API_HOSTNAME + '/api/activity/get_exp_project_balance'
export const GET_USER_BILL_LIST_API = API_HOSTNAME + '/api/user/bill_list'
export const GET_ACTIVITY_ORDER_API = API_HOSTNAME + '/api/activity/getExpProjectOrder'
export const GET_USER_PAYMENT_CANCEL_API = API_HOSTNAME + '/api/user/payment/cancel'
export const GET_USER_PAYMENT_LIST_API = API_HOSTNAME + '/api/user/payment/list'
export const GET_USER_WITHDRAW_HISTORY_API = API_HOSTNAME + '/api/user/withdraw/history'
export const GET_USER_HUAMEI_ORDER_API = API_HOSTNAME + '/api/huamei/order'
export const GET_USER_PARTNER_INCOME_API = API_HOSTNAME + '/api/partner/income'
export const GET_USER_PARTNER_DOCUMENT_API = API_HOSTNAME + '/api/partner/document'
export const GET_USER_PARTNER_INVITED_API = API_HOSTNAME + '/api/partner/invited_user'
export const GET_USER_PARTNER_INVITEE_API = API_HOSTNAME + '/api/partner/invitee_invest'
export const GET_USER_RESALE_MYORDER_API = API_HOSTNAME + '/api/resale/myorders'
export const GET_USER_RESALE_CANCEL_API = API_HOSTNAME + '/api/resale/cancel'

export const GET_USER_REFER_LIST_API = API_HOSTNAME + '/api/refer/list'
export const GET_USER_NOTICE_LIST_API = API_HOSTNAME + '/api/notice/list'
export const GET_USER_NOTICE_MARKALL_API = API_HOSTNAME + '/api/notice/mark_all'
export const GET_USER_TASK_DRAW_ALL_API = API_HOSTNAME + '/api/task/draw_all_prize'
export const GET_USER_COUPON_LIST_API = API_HOSTNAME + '/api/coupon/list'
export const GET_USER_TASK_STARTER_API = API_HOSTNAME + '/api/task/starter'
export const GET_USER_TASK_GET_GROUP_PRIZE_API = API_HOSTNAME + '/api/task/get_group_prize'
export const GET_USER_TASK_GET_PRIZE_API = API_HOSTNAME + '/api/task/get_prize'
export const GET_USER_TASK_DO_API = API_HOSTNAME + '/api/task/do'
export const GET_USER_TASK_QRCODE_API = API_HOSTNAME + '/api/task/qrcode'
export const GET_USER_TASK_FOLLOW_WECHAT_API = API_HOSTNAME + '/api/task/follow_wechat_loop'
export const GET_USER_INVEST_SCORE_API = API_HOSTNAME + '/api/user/invest_score'
export const GET_ACTIVITY_GETCODE_API = API_HOSTNAME + '/api/activity/getInviteCode'
export const GET_ACTIVITY_BY_RFCODE_API = API_HOSTNAME + '/api/activity/get_invite_by_rf_code'
export const GET_ACTIVITY_BY_CODE_API = API_HOSTNAME + '/api/activity/get_invite_by_code'
export const GET_USER_PAYMENT_INFO_API = API_HOSTNAME + '/api/user/payment/info'
export const GET_USER_ORDER_TRANSFERINFO_API = API_HOSTNAME + '/api/order/transferInfo'
export const GET_USER_PAYMENT_NOTIFY_API = API_HOSTNAME + '/api/user/payment/notify'
export const GET_USER_ORDER_TRANSFER_NOTIFY_API = API_HOSTNAME + '/api/order/transferNotify'
export const GET_UPLOAD_KEY_API = API_HOSTNAME + '/api/upload_key'
export const GET_USER_ACCOUNT_EDIT_API = API_HOSTNAME + '/api/user/withdraw/account/edit'
export const GET_USER_ACCOUNT_GET_API = API_HOSTNAME + '/api/user/withdraw/account/get'
export const GET_USER_ACCOUNT_DEL_API = API_HOSTNAME + '/api/user/withdraw/account/del'
export const GET_USER_ACCOUNT_LIST_API = API_HOSTNAME + '/api/user/withdraw/account/list'
export const GET_USER_WITHDRAW_APPLY_API = API_HOSTNAME + '/api/user/withdraw/apply'
export const GET_USER_PARTNER_STATUS_API = API_HOSTNAME + '/api/partner/status'
export const CREATE_DEPOAIT_ORDER_API = API_HOSTNAME + '/api/order/createDepositOrder'

// bank
export const GET_HUAMEI_FILL_INFO_2_API = API_HOSTNAME + '/api/huamei/fill_info_v2'
export const GET_HUAMEI_PAY_API = API_HOSTNAME + '/api/pay/placeHuameiOrder'

// activity
export const POST_PARTNER_APPLY_API = API_HOSTNAME + '/api/partner/apply'
export const GET_ACTIVITY_EXT_PROJECT_LIST_API = API_HOSTNAME + '/api/activity/getExpProjectList'
export const POST_ACTIVITY_ACCEPTINVITE_API = API_HOSTNAME + '/api/activity/acceptInvite'


// epart
export const GET_USER_SHOW_WELCOME_API = API_HOSTNAME + '/api/user/show_welcome'
export const GET_CONTENT_FOLLOW_API = API_HOSTNAME + '/api/content/follow_us'