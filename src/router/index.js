import Vue from 'vue'
import Router from 'vue-router'
import {
  uuid,
  getSearchCode,
  getQueryString,
  addRefCode,
  checkRefCode,
  getStore,
  is_weixin
} from '@/utils/utils'
import {
  WECHATSCAN_LOGIN_ACTION,
  GET_USER_LOGIN_INFO_ACTION
} from '@/scenes/login/modules'
import Track from '@/track'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    // Each of these routes are loaded asynchronously, when a user first navigates to each corresponding endpoint.
    // The route will load once into memory, the first time it's called, and no more on future calls.
    // This behavior can be observed on the network tab of your browser dev tools.
    {
      path: '/',
      name: 'home',
      component: function (resolve) {
        require(['@/scenes/home/Home.vue'], resolve)
      }
    },
     {
      path: '/datalab',
      name: 'datalab',
      component: function (resolve) {
        require(['@/scenes/dataLab/DataLab.vue'], resolve)
      }
    }, {
      path: '/wehome',
      name: 'wehome',
      component: function (resolve) {
        require(['@/scenes/about/wehome/WeHome.vue'], resolve)
      }
    }, {
      path: '/howitwork',
      name: 'howitwork',
      component: function (resolve) {
        require(['@/scenes/about/howitWork/HowItWork.vue'], resolve)
      }
    }, {
      path: '/outward',
      name: 'outward',
      component: function (resolve) {
        require(['@/scenes/about/outWard/OutWard.vue'], resolve)
      }
    }, {
      path: '/personaltailor',
      name: 'personaltailor',
      component: function (resolve) {
        require(['@/scenes/about/personalTailor/PersonalTailor.vue'], resolve)
      }
    }, {
      path: '/mediareport',
      name: 'mediareport',
      component: function (resolve) {
        require(['@/scenes/about/mediaReport/MediaReport.vue'], resolve)
      }
    }, {
      path: '/privacystate',
      name: 'privacystate',
      component: function (resolve) {
        require(['@/scenes/about/privacyState/PrivacyState.vue'], resolve)
      }
    }, 
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['@/scenes/login/Login.vue'], resolve)
      }
   }
    , {
      path: '/phonelogin',
      name: 'phonelogin',
      component: function (resolve) {
        require(['@/scenes/login/phoneLogin.vue'], resolve)
      }
    }, {
      path: '/wechatlogin',
      name: 'wechatlogin',
      component: function (resolve) {
        require(['@/scenes/login/WechatLogin.vue'], resolve)
      }
    }, {
      path: '/signup',
      name: 'signup',
      component: function (resolve) {
        require(['@/scenes/login/Signup.vue'], resolve)
      }
    }, {
      path: '/forgotpwd',
      name: 'forgotpwd',
      component: function (resolve) {
        require(['@/scenes/login/ForgotPwd.vue'], resolve)
      }
    }
    ,
     {
      path: '/invest',
      name: 'invest',
      component: function (resolve) {
        require(['@/scenes/tradingMarket/marketPlace/MarketPlace.vue'], resolve)
      }
    },
    {
      path: '/serviceprotocol',
      name: 'serviceprotocol',
      component: function (resolve) {
        require(['@/scenes/about/serviceProtocol/ServiceProtocol.vue'], resolve)
      }
    },
    {
      path: '/marketDetail',
      name: 'marketDetail',
      component: function (resolve) {
        require(['@/scenes/tradingMarket/marketDetail/MarketDetail.vue'], resolve)
      },
      beforeEnter: guardRoute
    }
    , {
      path: '/city',
      name: 'city',
      component: function (resolve) {
        require(['@/scenes/investing/city/City.vue'], resolve)
      }
    }
    , {
      path: '/property',
      name: 'property',
      component: function (resolve) {
        require(['@/scenes/investing/property/Property.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
     {
      path: '/information',
      name: 'information',
      component: function (resolve) {
        require(['@/scenes/about/information/Information.vue'], resolve)
      }
    }, {
      path: '/bloglist',
      name: 'bloglist',
      component: function (resolve) {
        require(['@/scenes/about/blogList/BlogList.vue'], resolve)
      }
    }, {
      path: '/newslist',
      name: 'newslist',
      component: function (resolve) {
        require(['@/scenes/about/newsList/NewsList.vue'], resolve)
      }
    }, {
      path: '/newsDetail',
      name: 'newsDetail',
      component: function (resolve) {
        require(['@/scenes/about/newsDetail/NewsDetail.vue'], resolve)
      }
    }
    , {
      path: '/investmentTool',
      name: 'investmentTool',
      component: function (resolve) {
        require(['@/scenes/about/investmentTool/InvestmentTool.vue'], resolve)
      }
    },
     {
      path: '/mine',
      name: 'mine',
      component: function (resolve) {
        require(['@/scenes/mine/Mine.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, {
      path: '/sharelist',
      name: 'sharelist',
      component: function (resolve) {
        require(['@/scenes/mine/shareList/ShareList.vue'], resolve)
      },
      beforeEnter: guardRoute
    }
    , {
      path: '/order',
      name: 'order',
      component: function (resolve) {
        require(['@/scenes/investing/order/Order.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, 
    {
      path: '/marketorder',
      name: 'marketorder',
      component: function (resolve) {
        require(['@/scenes/tradingMarket/marketOrder/MarketOrder.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, 
    {
      path: '/assetDetail',
      name: 'assetDetail',
      component: function (resolve) {
        require(['@/scenes/mine/assetDetail/AssetDetail.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, {
      path: '/revenueDetail',
      name: 'revenueDetail',
      component: function (resolve) {
        require(['@/scenes/mine/revenueDetail/RevenueDetail.vue'], resolve)
      },
      beforeEnter: guardRoute
    }
    , {
      path: '/questionNaire',
      name: 'questionNaire',
      component: function (resolve) {
        require(['@/scenes/questionNaire/Questionnaire.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
     {
      path: '/proofPreview',
      name: 'proofPreview',
      component: function (resolve) {
        require(['@/scenes/investing/proofPreview/ProofPreview.vue'], resolve)
      },
      beforeEnter: guardRoute
    }
    , {
      path: '/faq',
      name: 'faq',
      component: function (resolve) {
        require(['@/scenes/about/faq/Faq.vue'], resolve)
      }
    },
     {
      path: '/experiencegold',
      name: 'experiencegold',
      component: function (resolve) {
        require(['@/scenes/activityPage/experience/gold.vue'], resolve)
      }
    }, {
      path: '/experienceinvest',
      name: 'experienceinvest',
      component: function (resolve) {
        require(['@/scenes/activityPage/experience/invest.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, { // 用户投资榜单 五维图打分
      path: '/invest_rank',
      name: 'invest_rank',
      component: function (resolve) {
        require(['@/scenes/mine/investRank/rank.vue'], resolve)
      },
      beforeEnter: guardRoute
    }
    , {
      path: '/wiretransfer',
      name: 'wiretransfer',
      component: function (resolve) {
        require(['@/scenes/mine/wireTransfer/WireTransfer.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, {
      path: '/withdraw/bankinfo',
      name: 'bankinfo',
      component: function (resolve) {
        require(['@/scenes/mine/withDraw/BankInfo.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, {
      path: '/withdraw/banklist',
      name: 'banklist',
      component: function (resolve) {
        require(['@/scenes/mine/withDraw/BankList.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, {
      path: '/withdraw/withdraw',
      name: 'withdraw',
      component: function (resolve) {
        require(['@/scenes/mine/withDraw/WithDraw.vue'], resolve)
      },
      beforeEnter: guardRoute
    }, {
      path: '/withdraw/withdrawdetail',
      name: 'withdrawdetail',
      component: function (resolve) {
        require(['@/scenes/mine/withDraw/WithdrawDetail.vue'], resolve)
      },
      beforeEnter: guardRoute
    }
    , {
      path: '/getphone',
      name: 'getphone',
      component: function (resolve) {
        require(['@/scenes/login/GetPhone.vue'], resolve)
      }
    },
    {
      path: '/bank',
      name: 'bank',
      component: function (resolve) {
        require(['@/scenes/bank/Introduction.vue'], resolve)
      }
    },
    {
      path: '/bank/apply',
      name: 'bankAccountApply',
      component: function (resolve) {
        require(['@/scenes/bank/Apply.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/bank/addinfo',
      name: 'bankaddinfo',
      component: function (resolve) {
        require(['@/scenes/bank/AddInfo.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/bank/submitsuccess',
      name: 'banksuccess',
      component: function (resolve) {
        require(['@/scenes/bank/SubmitSuccess.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/pay',
      name: 'pay',
      component: function (resolve) {
        require(['@/scenes/pay/Pay.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/pay/payform',
      name: 'payForm',
      component: function (resolve) {
        require(['@/scenes/pay/PayForm.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/pay/paysuccess',
      name: 'paysuccess',
      component: function (resolve) {
        require(['@/scenes/pay/PaySuccess.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: function (resolve) {
        require(['@/scenes/deposit/Deposit.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/citypartner',
      name: 'citypartner',
      component: function (resolve) {
        require(['@/scenes/activityPage/cityPartner/cityPartner.vue'], resolve)
      }
    },
    {
      path: '/citypartnerform',
      name: 'citypartnerform',
      component: function (resolve) {
        require(['@/scenes/activityPage/cityPartner/cityPartnerForm.vue'], resolve)
      },
      beforeEnter: guardRoute
    },

    /***** 公众号特有页面 *****/
    {
      path: '/wxmine',
      name: 'wxmine',
      component: function (resolve) {
        require(['@/scenes/officialAccount/WxMine.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/projectsucess',
      name: 'projectsucess',
      component: function (resolve) {
        require(['@/scenes/officialAccount/ProjectSuccess.vue'], resolve)
      }
    },
    {
      path: '/citybook',
      name: 'citybook',
      component: function (resolve) {
        require(['@/scenes/officialAccount/CityBook.vue'], resolve)
      }
    },
    {
      path: '/guidedream',
      name: 'guidedream',
      component: function (resolve) {
        require(['@/scenes/officialAccount/GuideDream.vue'], resolve)
      }
    },
    {
      path: '/gift',
      name: 'newusergift',
      component: function (resolve) {
        require(['@/scenes/officialAccount/NewUserGift.vue'], resolve)
      }
    },
    {
      path: '/shequnlead',
      name: 'shequnlead',
      component: function (resolve) {
        require(['@/scenes/officialAccount/ShequnLead.vue'], resolve)
      }
    },
    {
      path: '/incomepage',
      name: 'incomepage',
      component: function (resolve) {
        require(['@/scenes/officialAccount/IncomePage.vue'], resolve)
      }
    },
    {
      path: '/invitation',
      name: 'invitation',
      component: function (resolve) {
        require(['@/scenes/mine/invitationCard/InvitationCard.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/invited',
      name: 'invited',
      component: function (resolve) {
        require(['@/scenes/mine/invitedCard/InvitedCard.vue'], resolve)
      }
    },

    /** 404页面处理 **/
    {
      path: '*',
      redirect: '/'
    }
  ]
})

/** web需要登录的页面路由拦截监控 **/
function guardRoute(to, from, next) {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const $store = getStore(router)
  const auth = $store.state.auth.auth
  if (!auth.isLoggedIn) { // 如果没有登录
    /** 通过微信授权回调或者query传参完成的自动登录 **/
    const wechatAuthRedirect = getSearchCode() //如果为微信授权登录，获取地址中的code
    const miniAppToken = getQueryString(to.fullPath, 'accesstoken') // 若为小程序内webview登录，获取地址中的token
    const params = {
      Authorization: miniAppToken
    }
    if (miniAppToken) { //小程序内webview通过query传递的token完成登录
      $store.dispatch(GET_USER_LOGIN_INFO_ACTION, params).then(()=>{
        next()
      })
    } else if (wechatAuthRedirect) { // 微信授权回调后通过code登录
      $store.dispatch(WECHATSCAN_LOGIN_ACTION).then((res)=>{
        if (!res.need_reg) { //如果没有绑定手机，需要跳转到绑定手机页面
          next()
        } else {
          next({
            path: '/getphone',
            query: {
              redirect: to.fullPath
            }
          })
        }
      })
    }
    else {
      next()
    }
  } else {
    next()
  }
}


// /** 特殊处理：小程序webview所有页面都需要用户先登录再进入 **/
router.beforeEach((to, from, next) => {
  if(process.env.VUE_ENV !== 'server') {
      const isWeixin = is_weixin(navigator.userAgent)
      if (isWeixin) {
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            guardRoute(to, from, next)
          } else {
            if(checkRefCode(to)) {
              next()
            } else {
              next({path: addRefCode(to)})
            }
          }
        })
      } else {
        if(checkRefCode(to)) {
          next()
        } else {
          next({path: addRefCode(to)})
        }
      }
  } else {
    next()
  }
})

// /** 对用户行为路径的Track **/
router.afterEach((to, from) => {
  if(process.env.VUE_ENV !== 'server') {
    const $store = getStore(router)
    const fromPath = from.fullPath
    const toPath = to.fullPath
    const obj = {
      from: fromPath,
      to: toPath
    }
    if (from.query.scene && !localStorage.getItem('source_scene')) {
      localStorage.setItem('source_scene', from.query.scene)
    }
    Track.routeTrack($store,obj)
  }  
})

export default function createRouter() {
  return router
}
