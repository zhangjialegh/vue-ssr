<template>
<div class="login-section" v-if="isNew">
  <div class="login-wrapper phone-login">
    <h2 class="login-headline">{{$t('欢迎你')}}{{nick_name}}</h2>
    <div class="login-form w-form no-border">
      <div class="signup-phone-wrapper">
          <verification-code 
          @select="selectOption"
          @phoneChange="phoneChange"
          @codeChange="codeChange"
          ></verification-code>
          <div class="signup-notif-checkbox w-checkbox">
            <input type="checkbox" checked class="w-checkbox-input" id="notif" v-model="enabledNotif">
            <label for="notif" class="w-form-label">{{$t('接收关于房产合投项目的最新消息')}}</label>
          </div>
          <div class="error-text">{{error}}</div>
          <button
            class="button login-button w-button"
            :disabled="loggingIn"
            @click="login"
          >
            {{$t('登录')}}
          </button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { WECHATOAUTH_LOGIN_ACTION,WECHATSCAN_LOGIN_ACTION } from './modules'

export default {
  name: 'wechatlogin',
  data () {
    return {
      nick_name: '',
      username: '',
      email:'',
      countryCode: '86',
      phone: '',
      verificationCode: '',
      redirect: '/',
      loggingIn: false,
      error: '',
      token: '',
      sendSMSCountDown: 0,
      enabledNotif: true,
      isNew: false
    }
  },
  mounted () {
    if(this.$route.query.code) {
     const code = this.$route.query.code;
      var that = this
      this.$store.dispatch(WECHATSCAN_LOGIN_ACTION,{code: code})
      .then((data) => {
        const redirect = localStorage.getItem('redirect')
            if(!data.need_reg) {
              that.username = data.name
              that.nick_name = data.name
              that.token = data.token
              that.isNew = !data.is_bind_phone
              that.$auth._storeToken(data)
              that.$router.push({ path: redirect?redirect:that.redirect })
            } else {
              that.$router.push({
                path: '/getphone',
                query: {
                  code,
                  redirect: redirect || that.redirect
                }
              })
            }
      })
    }
  },

  methods: {
    selectOption(msg) {
      this.countryCode = msg
    },
    phoneChange(msg) {
      this.phone = msg
    },
    codeChange(msg) {
      this.verificationCode = msg
    },
    login () {
      const { phone,verificationCode } = this
      if(!phone) {
        this.error =  this.$t('请输入手机号码')
      } else if (!verificationCode) {
        this.error = this.$t('请输入验证码')
      } else {
        const that = this
      if(this.enabledNotif) {
        this.loggingIn = true
        this.$store.dispatch(
          WECHATOAUTH_LOGIN_ACTION,
          {phone:this.countryCode, 
          country:this.phone, 
          code:this.verificationCode, 
          token:this.token}
        ).then((result) => {
          that.loggingIn = false
            const status = result.review_status
            const permission = result.has_permission
            if(!permission && status!=that.GLOBAL.qesProcess) {
              that.$router.push({
                path: '/questionnaire',
                query: {
                  slink: that.redirect,
                  qesSource: that.GLOBAL.QES_SOURCE_LOGIN
                }
              })
            } else {
              that.$router.push(that.redirect)
            }
        })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrapper.phone-login {
  position: static;
  min-height: 0;
  margin: 0;
}
.login-form.no-border {
  border: none;
}
@media (max-width: 479px) {
  .login-wrapper.phone-login {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
