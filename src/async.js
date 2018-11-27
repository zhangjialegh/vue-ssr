import { SHOW_POP_BOX } from '@/common/Alert/modules'
import axios from 'axios'

const async = {
  install(Vue) {
    Vue.prototype.$axios = ({ commit, url, method, data, headers, success, fail, doHideAlert }) => {
      // 显示loading
      let config = {
        method,
        url,
        data,
        headers
      }
      if(method==='get') {
        config = {
          method,
          url,
          params: data,
          headers
        }
      }
      axios(config)
        .then(res => {
          // const { message } = res.data
          // const message = 'Success'
          // // 关闭loading,
          // commit(HIDE_LOADING)
          // // 显示成功提示
          // doHideAlert && commit(SHOW_ALERTTEXT, message)
          // // 1秒后自动关闭提示
          // setTimeout(() => { commit(HIDE_ALERTTEXT) }, 1000)
          // 成功后的回调函数
          success && success(res.data || res)
        })
        .catch(err => {
          console.log(err,err.response,err.errorCode,'404---404');
          
          if (err.response.status === 401) {
            commit(SHOW_POP_BOX,'请重新授权！')
          } else {
            // 显示错误提示
            commit(SHOW_POP_BOX, '服务器故障')
            // 失败后的回调函数
            fail && fail(err)
          }
        })
    }
  }
}

export default async
