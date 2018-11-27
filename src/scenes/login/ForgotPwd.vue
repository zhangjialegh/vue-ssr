<template>
<div class="login-section">
  <div class="login-wrapper forgot-pwd">
    <h2 class="login-headline">{{$t('先他人一步开启全新的投资方式')}}</h2>
    <div class="text-medium">{{$t('忘记密码')}}</div>
    <div class="login-form w-form">
      <verification-code 
        @select="selectOption"
        @phoneChange="phoneChange"
        @codeChange="codeChange"
        :phone="phone"
        ></verification-code>
      <input
        type="password"
        class="input w-input"
        :placeholder="$t('请输入新密码')"
        required
        v-model="password"
      >
      <div class="error-text">{{error}}</div>
      <button
        class="button login-button w-button"
        @click="resetPwd()"
      >
        {{$t('重置密码并登录')}}
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
import { track, after } from "trackpoint-tools";
import Track from "@/track";
import { RESETPWD_ACTION,SEND_SMS_ACTION } from './modules'

export default {
  name: "forgotpwd",
  data() {
    return {
      phone: "",
      phoneType: "86",
      phoneCode: "",
      password: "",
      redirect: "/invest",
      error: "",
      sendSMSCountDown: 0
    };
  },

  mounted() {
    const queryRedirect = this.$route.query.redirect;
    if (queryRedirect) {
      this.redirect = queryRedirect;
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
    startSMSCountDown() {
      const that = this;
      // start count down
      this.sendSMSCountDown = 60;
      window.setInterval(function() {
        that.sendSMSCountDown = that.sendSMSCountDown - 1;
        // clear count down
        if (that.sendSMSCountDown < 0) {
          window.clearInterval();
        }
      }, 1000);
    },
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "forgot-pwd-sms-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            phone: this.phone,
            phoneType: this.phoneType
          }
        });
      })
    )
    sendSMS() {
      const that = this;
      this.$store.dispatch( SEND_SMS_ACTION, {phone:this.phone, countryCode:this.phoneType}).then((res) => {
        that.startSMSCountDown()
      });
    },
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "forgot-pwd-submit",
          action: "click",
          optLabel: "submit",
          page: this.$route.name,
          optValue: {
            phone: this.phone,
            phoneType: this.phoneType,
            phoneCode: this.phoneCode
          }
        });
      })
    )
    resetPwd() {
      const that = this;
      if (!this.phone.trim()) {
        this.error = this.$t('请输入您的手机号码')
      } else if (!this.phoneCode.trim()) {
        this.error = this.$t('请输入验证码')
      } else if (!this.password.trim()) {
        this.error = this.$t('请输入密码')
      } else {
        this.$store.dispatch(
          RESETPWD_ACTION,
          {phone:this.phone,
          country:this.phoneType,
          code:this.phoneCode,
          password:this.password}
        ).then((res) => {
          that.$router.push({ path: that.redirect });
        });
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
.login-wrapper.forgot-pwd {
  min-height: 0;
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
