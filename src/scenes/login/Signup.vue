<template>
<div class="login-section">
  <div class="login-wrapper signup">
    <h2 class="login-headline">{{$t('先他人一步开启全新的投资方式')}}</h2>
    <div class="text-medium">{{$t('账号注册')}}</div>
    <div class="login-form w-form">
      <input
        type="text"
        class="input w-input"
        maxlength="20"
        autofocus="true"
        :placeholder="$t('请输入你的姓名')"
        v-model="name"
      >
      
      <verification-code 
        @select="selectOption"
        @phoneChange="phoneChange"
        @codeChange="codeChange"
        :phone="phone"
        ></verification-code>
      <input
      type="password"
      class="input w-input"
      :placeholder="$t('请输入密码')"
      v-model="password"
      >
      <div class="signup-notif-checkbox w-checkbox">
        <input type="checkbox" checked class="w-checkbox-input" id="notif" v-model="enabledNotif">
        <label for="notif" class="w-form-label">{{$t('接收关于房产合投项目的最新消息')}}</label>
      </div>
      <div class="error-text">{{error}}</div>
      <button
        class="button login-button w-button"
        @click="signup()"
      >
        {{$t('注册')}}
      </button>
    </div>
    <third-parties-login v-if="!isMobile"/>
    <div class="login-meta-wrapper signup">
      <div class="login-switch-label">{{$t('已有账号')}}</div>
      <router-link to="/login" class="login-swtich-link">{{$t('点击登录')}}</router-link>
    </div>
  </div>
</div>
</template>

<script>
import { SIGNUP_ACTION } from './modules'
import ThirdPartiesLogin from "./components/ThirdPartiesLogin.vue";
import { track, after } from "trackpoint-tools";
import Track from "@/track";

export default {
  name: "signup",
  components: { ThirdPartiesLogin },

  data() {
    return {
      name: "",
      email: "",
      phone: "",
      phoneType: "86",
      phoneCode: "",
      password: "",
      enabledNotif: true,
      redirect: "/invest",
      error: "",
      sendSMSCountDown: 0
    };
  },

  activated() {
    // set redirect url if there is any
    // mostly for beforeEnter: guardRoute
    const queryRedirect = this.$route.query.redirect || localStorage.getItem('redirect');
    if (queryRedirect) {
      this.redirect = queryRedirect;
    }
  },

  computed:{
    isMobile() {
      return this.$store.state.isMobile
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
        Track.eventTrack({
          category: "signup-submit",
          action: "click",
          optLabel: "submit",
          page: this.$route.name,
          optValue: {
            name: this.name,
            email: this.email,
            phone: this.phone,
            phoneType: this.phoneType,
            phoneCode: this.phoneCode,
            password: this.password,
            enabledNotif: this.enabledNotif
          }
        });
      })
    )
    signup() {
      const that = this;
      if (!this.name.trim()) {
        this.error = this.$t('账号不能为空')
      } else if (!this.phone.trim()) {
        this.error = this.$t('请输入手机号码')
      } else if (!this.phoneCode.trim()) {
        this.error = this.$t('请输入验证码')
      } else if (!this.password.trim()) {
        this.error = this.$t('请输入密码')
      } else {
        this.$store.dispatch(
          SIGNUP_ACTION,
          {name:this.name,
          phone:this.phone,
          country:this.phoneType,
          code:this.phoneCode,
          password:this.password,
          enabledNotif:this.enabledNotif}
        ).then((result) => {
          if(result.success) {
                that.$router.push({
                  path: '/questionnaire',
                  query: {
                    slink: that.redirect,
                    qesSource: that.GLOBAL.QES_SOURCE_LOGIN
                  }
                })
              } else {
                that.error = result.message
              }
        }).catch((error)=>{
              // TODO------报错信息细分
              if(error.errorMsg=="sms code is invalid") {
                that.error = that.$t('验证错误请确')
              } else if(error.errorMsg=="phone number was exists") {
                that.error = that.$t('该手机号已被绑定')
                setTimeout(()=>{
                  that.$router.push({
                  path: 'phonelogin'
                })
                }, 2000)
              } else if (error.errorMsg=="email was exists") {
                that.error = that.$t('该邮箱已注册')
                setTimeout(()=>{
                  that.$router.push({
                    path: 'login'
                  })
                }, 2000)
              } else {
                that.error = that.$t('系统错误')
              }
        })
      }
    }
  }
};
</script>

<style lang="scss">
.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 479px) {
  .login-wrapper.signup {
    margin-top: 200px !important;
  }
  .login-section {
    position: fixed;
    z-index: 999;
  }
}
</style>
