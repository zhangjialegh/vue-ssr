<template>
  <div v-if="isWeiXin || !isMobile">
    <div class="social-login-wrapper w-row" v-if="!isWeiXin">
      <div class="no-margin w-col w-col-4">
        <div class="text-medium text-left">{{$t('其他方式登录')}}</div>
      </div>
      <div class="login-social-links no-margin w-col w-col-8">
        <!-- <a href="#" class="login-social-link w-inline-block">
          <img src="@/assets/images/login-fb.png">
        </a>
        <a href="#" class="login-social-link w-inline-block">
          <img src="@/assets/images/login-google.png">
        </a> -->
        <a href="#" class="login-social-link w-inline-block" v-on:click="wechatLoginType">
          <img src="@/assets/images/login-wechat.png">
        </a>
        <!-- <a href="#" class="login-social-link w-inline-block">
          <img src="@/assets/images/login-sina.png">
        </a> -->
      </div>
    </div>

    <div class="social-login-wrapper w-row" v-else>
      <img src="https://wechat-pics.fangpinduo.com/everest-qrcode-mobile" alt="">
    </div>
    <transition-box :show="showQr">
      <div class="login-wrapper qr-login" v-show="showQr">
        <div id="login_container" class="qr-wrappper">
          <div class="micro-program" @click="closeQr">
            <img src="https://wechat-pics.fangpinduo.com/everest-qrcode-mobile" alt="">
          </div>
        </div>
        <div class="close-qr-login" @click="closeQr"></div>
      </div>
    </transition-box>
  </div>
</template>

<script>
import { track, after } from "trackpoint-tools";
import Track from "@/track";
export default {
  name: 'third-parties-login',
  props: {
    isWeiXin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showQr: false
    }
  },
  methods: {
    fbLogin () {

    },
    googleLogin () {

    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "wechat-logo-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            isWeiXin: this.isWeiXin,
            isMobile: this.isMobile
          }
        });
      })
    )
    wechatLoginType () {
      const is_mob = this.isMobile
      const is_weixn = this.isWeiXin
      if (is_weixn) {
        this.$options.methods.showQrMini.call(this)
      } else if (is_mob) {
        this.$options.methods.showQrMini.call(this)
      } else {
        this.$options.methods.wechatLogin.call(this)
      }
    },
    wechatLogin () {
      this.showQr = true
      let obj = new WxLogin({
        id:"login_container", 
        appid: "wx81390e1f2bc13377", 
        scope: "snsapi_login", 
        redirect_uri: decodeURIComponent('http://next.wehome.io/wechatlogin'),
        state: Math.random()*100+15
        });
    },
    sinaLogin () {

    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "wechat-close-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            isWeiXin: this.isWeiXin,
            isMobile: this.isMobile
          }
        });
      })
    )
    closeQr () {
      this.showQr = false
    },
    showQrMini () {
      this.showQr = true
    }
  },
  computed:{
    isMobile() {
      return this.$store.state.base.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper.qr-login {
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-qr-login {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height:  20px;
  background: url('https://wechat-pics.fangpinduo.com/close.svg') no-repeat center center;
  background-size: contain;
  cursor: pointer;
}
.qr-wrappper {
  position: relative;
}
.micro-program {
  line-height: 1.6;
  position: relative;
  width: 100%;
  z-index: 1;
  text-align: center;
}
</style>
