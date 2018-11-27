import {POST_USER_TRACK_ACTION} from '@/store/modules'
import {
  platForm,
  uuid,
  is_weixin
} from './utils/utils'

// global interceptor for the response

export default {
  eventTrack: function (store,data) {
    if(typeof window!== 'undefined') {
      data.ua = platForm()
      data.time_stamp = Date.now()
      data.id = uuid()
      data.type='event'
      data.client= is_weixin()? "h5service" : "website"
      // 本地开发是防止数据上传
      if(window.location.hostname=='localhost') return;
      store.dispatch(POST_USER_TRACK_ACTION, data)
    }
  },
  routeTrack: function (store,data) {
    const isWeixin = is_weixin(navigator.userAgent)
    data.ua = platForm()
    data.id = uuid()
    data.time_stamp = Date.now()
    data.type = 'path'
    if(isWeixin) {
      wx.miniProgram.getEnv(function(res) {
        if(res.miniprogram) {
          data.client = "miniApp"
        } else {
          data.client = 'h5service'
        }
        if(location.hostname=='localhost') return;
        store.dispatch(POST_USER_TRACK_ACTION, data)

      })
    } else {
      data.client = 'website'
      if(window.location.hostname=='localhost') return;
      store.dispatch(POST_USER_TRACK_ACTION, data)
    }
  }
}
