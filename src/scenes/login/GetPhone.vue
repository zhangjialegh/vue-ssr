<template>
<div class="login-section">
  <div class="login-wrapper phone-login">
    <h2 class="login-headline">{{$t('欢迎你')}}</h2>
    <div class="login-form w-form no-border">
      <verification-code 
        @select="selectOption"
        @phoneChange="phoneChange"
        @codeChange="codeChange"
        :phone="phone"
        ></verification-code>
      <div class="error-text">{{error}}</div>
      <button
        class="button login-button w-button"
        @click="phoneLogin"
      >
        {{$t('登录')}}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { WECHAT_REGISTER_ACTION } from './modules'
import { track, after } from "trackpoint-tools";
import Track from "@/track";
import {getSearchCode} from '@/utils/utils'

export default {
  name: 'getphone',
  data () {
    return {
      phone: '',
      phoneType: '86',
      phoneCode: '',
      redirect: '/invest',
      error: '',
      sendSMSCountDown: 0,
      review_status: 3,
      has_permission: false
    }
  },

  mounted () {
    const queryRedirect = this.$route.query.redirect
    if (queryRedirect) {
      this.redirect = queryRedirect
    }
  },

  methods: {
    selectOption(msg) {
      this.phoneType = msg
    },
    phoneChange(msg) {
      this.phone = msg
    },
    codeChange(msg) {
      this.phoneCode = msg
    },
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "getphone-login-submit",
          action: "click",
          optLabel: "submit",
          page: this.$route.name,
          optValue: {
            phone: this.phone,
            phoneCode: this.phoneCode
          }
        });
      })
    )
    phoneLogin: function () {
      const { phone,phoneCode,phoneType } = this
      if(!phone) {
        this.error = this.$t('请输入您的手机号码')
      } else if (!phoneCode) {
        this.error = this.$t('请输入验证码')
      } else {
        var that = this
        this.$store.dispatch(WECHAT_REGISTER_ACTION, {
          phone: phone,
          sms_code: phoneCode,
          country: phoneType,
          code: null //TODO getSearchCode()
        }).then((res) => {
          if(res.success) {
              const status = res.review_status
              const permission = res.has_permission
              if(!permission && status!=that.GLOBAL.qesProcess) {
                that.$router.push({
                  name: 'questionNaire',
                  query: {
                    slink: that.redirect,
                    qesSource: that.GLOBAL.QES_SOURCE_LOGIN
                  }
                })
              } else {
                that.$router.push(that.redirect)
              }
            } else if(that.GLOBAL.USER_NOT_FOUND.errorCode == res.errorCode) {
              that.error = that.$t('用户不存在请退出')
            } else if(that.GLOBAL.SMS_CODE_INVALID.errorCode == res.errorCode) {
              that.error = that.$t('验证码错误')
            } else if(that.GLOBAL.USER_PHONE_EXISTS.errorCode == res.errorCode) {
              that.error = that.$t('验证码错误')
            } else {
              that.error = that.$t('该手机号已被绑定')
            }
        })
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
