// import { is_weixin } from './utils/utils.js'

/****** 合投项目 ******/
export const H5_URL = 'http://h5.fangpinduo.com'
// 项目状态 后端match: https://github.com/hethune/apocalypseBackend/blob/938c0cbaf2ce766f99757f301b9dac58c76991ab/application/utils/constants.py#L63

//项目状态 0:未上架状态（不应展示）1:预热状态  2:优先认购  3:开放认购  4:募资完成  5:项目成功  6:项目失败 7:项目暂停（特殊状态，应急用）
export const PROJECT_STATUS_NOT_LISTED = 0
export const PROJECT_STATUS_PREPARE = 1
export const PROJECT_STATUS_PRIORITY_SALE = 2
export const PROJECT_STATUS_OPEN_SALE = 3
export const PROJECT_STATUS_MONEY_READY = 4
export const PROJECT_STATUS_SUCCESS = 5
export const PROJECT_STATUS_FAILURE = 6
export const PROJECT_STATUS_HALT = 7


// 订单状态 后端match  https://github.com/hethune/apocalypseBackend/blob/938c0cbaf2ce766f99757f301b9dac58c76991ab/application/utils/constants.py#L93
// 订单状态 0:订单创建，未确认定金 1:已付定金(或者无需定金) 2:已线下打款 3:已确认打款 4:客服确认打款失败 5:合投成功，份额确认 6:订单关闭 
export const ORDER_STATUS_INIT = 0
export const ORDER_STATUS_DOWN_PAY = 1
export const ORDER_STATUS_NOTIFY_ALL_PAY = 2
export const ORDER_STATUS_CONFIRM_ALL_PAY = 3
export const ORDER_STATUS_CONFIRM_NO_PAY = 4
export const ORDER_STATUS_SUCCESS = 5
export const ORDER_STATUS_FAILURE = 6

/***** 转售市场 ******/
export const tenThou = 10000;     // 1万股 = 10000股   /* 后端match地址:  https://github.com/hethune/apocalypseBackend/blob/938c0cbaf2ce766f99757f301b9dac58c76991ab/application/utils/constants.py#L263 */
export const minShares = 100;       //1手={minShares}万股
export const shareStep = 1;       //股数增减阶梯
export const maxHangDays = 30;    //最大挂牌时长



/***** loading more ******/

export const loadInitNum = 6  //初始加载个数
export const loadPerStep = 6  //每次加载增多个数


/***** 问卷资料审核状态 ******/
// 0:未审核,1:审核中,2:已通过审核,3:无需审核
export const qesNone = 0
export const qesProcess = 1
export const qesSuccess = 2
export const qesIgnore = 3

/***** 跳转问卷路径来源 *****/
export const QES_SOURCE_EXP = 1  //体验金
export const QES_SOURCE_INVEST = 2  //投资页面
export const QES_SOURCE_PROJECT = 3 //项目详情
export const QES_SOURCE_PJTORDER = 4 //项目订单
export const QES_SOURCE_MARKET = 5 //市场详情
export const QES_SOURCE_MKTORDER = 6  //市场订单
export const QES_SOURCE_LOGIN = 7  //登录

/***** 跳转邀请卡路径来源 *****/
export const INVITE_SOURCE_EXP = 1  //体验金
export const INVITE_SOURCE_PROJECT = 2 //项目详情
export const INVITE_SOURCE_MYINVITE = 3 //我的邀请
export const INVITE_SOURCE_CITYPARTNER = 4 //城市合伙人

/***** 邀请卡文案 *****/

/***** error code *****/
/* 1.资源相关 */
export const NOT_FOUND = { 'errorCode':10001,'message':'resourse not found' }
/* 2.用户相关 */
export const USER_NOT_FOUND = { 'errorCode':20001, 'message':'user not found' }
export const USER_PHONE_EXISTS = { 'errorCode':20002, 'message':'the phone is exists, please change phone number.' }
export const SMS_CODE_INVALID = { 'errorCode': 20003 , 'message':'sms code is invalid' }
export const BIND_PHONE_FAIL = { 'errorCode': 20100 , 'message':'bind user phone fail' }
export const WITHDRAW_REPEAT = {'errorCode': 20006, 'message':'your has a unfinished withdraw apply'}
/* 3.参数验证 */
export const PARAMS_REQUIRED = { 'errorCode':30001,'message':'params is required' }
/* 3.订单相关 */
export const ORDER_IS_EXISTS = { 'errorCode':40003,'message':'order is exists' }

/* notification */

export const badNotify = 1500
export const goodNotify = 3000
export const badNotifyStyle = true?{}:{'top':'65px'}//TODO is_weixin


/*组团状态： 0：进行中，1：成功，2：降级成功，3 组团失败*/
export const TUAN_STATUS_ING = 0
export const TUAN_STATUS_SUCCESS = 1
export const TUAN_STATUS_DEGRADE_SUCCESS = 2
export const TUAN_STATUS_FAIL = 3

/***** 提现状态 *****/
// 申请提现状态：（0:已申请,待审核，1:已通过,待打款，2:已打款,提现完成，3:审核失败，4：客户取消）
export const WITHDRAW_STATUS_APPLY = 0
export const WITHDRAW_STATUS_APPROVE = 1
export const WITHDRAW_STATUS_EXECUTE = 2
export const WITHDRAW_STATUS_REFUSED = 3
export const WITHDRAW_STATUS_CANCEL = 4

export const STRIPE_PK = process.env.STRIPE_PK

/***** WeHome订单支付方式 *****/ 
export const WEHOME_PAYMENT_METHOD_WECHAT = 1          // (CNY)微信支付(国内)
export const WEHOME_PAYMENT_METHOD_ALIPAY = 2          // (CNY)支付宝支付(国内)
export const WEHOME_PAYMENT_METHOD_BALANCE = 11        // (USD)余额支付
export const WEHOME_PAYMENT_METHOD_REMITTANCE = 12     // (USD)汇款
export const WEHOME_PAYMENT_METHOD_STRIPE = 13         // (USD)stripe,银行卡支付
export const WEHOME_PAYMENT_METHOD_ALIPAY_GLOBAL = 14  // (USD)支付宝支付(国际)
export const WEHOME_PAYMENT_METHOD_PAYPAL = 15         // (USD)PayPal
export const WEHOME_PAYMENT_METHOD_WECHAT_GLOBAL = 16  // (USD)微信支付(国际),maybe

// 语言版本

export const ZH_CN = 'zh_CN'
export const EN_US = 'en_US'
export const ZH_TW = 'zh_TW'