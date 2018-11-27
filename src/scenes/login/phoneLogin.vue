<template>
<div class="login-section">
  <div class="login-wrapper phone-login">
    <h2 class="login-headline">{{$t('先他人一步开启全新的投资方式')}}</h2>
    <div class="text-medium flex-box">
      <div>{{$t('手机号快速登入')}}</div>
      <router-link to="/login" class="login-swtich-link">{{isWeiXin?$t('查看小程序'):$t('账号密码登入')}}</router-link>
    </div>
    <div class="login-form w-form">
      <verification-code 
        @select="selectOption"
        @phoneChange="phoneChange"
        @codeChange="codeChange"
        :phone="phone"
        ></verification-code>
      <div class="error-text">{{error}}</div>
      <button
        class="button login-button w-button"
        @click="phoneLogin()"
      >
        {{$t('登录')}}
      </button>
    </div>
    <div class="login-meta-wrapper signup">
      <div class="login-switch-label">{{$t('还没有账号')}}</div>
      <router-link to="/signup" class="login-swtich-link">{{$t('点击注册')}}</router-link>
    </div>
  </div>
</div>
</template>

<script>

import { PHONE_LOGIN_ACTION } from './modules'
import { track, after } from "trackpoint-tools";
import Track from "@/track";
import { is_weixin } from '@/utils/utils.js'

export default {
  name: 'phonelogin',
  data () {
    return {
      phone: '',
      phoneType: '86',
      phoneCode: '',
      redirect: '/invest',
      error: '',
      sendSMSCountDown: 0
    }
  },

  mounted () {
    const queryRedirect = this.$route.query.redirect || localStorage.getItem('redirect')
    if (queryRedirect) {
      this.redirect = queryRedirect
    }
  },
  computed:{
    isWeiXin() {
      return this.$store.state.base.isWeixin
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
    phoneLogin: function () {
      const that = this
      this.$store.dispatch(PHONE_LOGIN_ACTION,{phone:this.phone, code:this.phoneCode, country:this.phoneType})
      .then((params) => {
        that.$router.push({ path: that.redirect })
      })
    }
  }
}

</script>

<style lang="scss">
.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 479px){
  .login-wrapper.signup {
      margin-top: 200px !important;
  }
  .login-section {
    position: fixed;
    z-index: 999;
  }
}
.text-medium.flex-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: between;
    -ms-flex-pack: between;
    justify-content: space-between;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.login-wrapper.phone-login {
  min-height: 0;
}
</style>
