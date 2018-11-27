<template>
<div class="login-section">
  <div class="login-wrapper" :class="{'minHeight-0': !isWeiXin}">
    <h2 class="login-headline">{{$t('先他人一步开启全新的投资方式')}}</h2>
    <div class="text-medium flex-box" v-show="!isWeiXin">
      <div>{{$t('账号密码登入')}}</div>
      <router-link to="/phonelogin" class="login-swtich-link" v-show="!isWeiXin">{{$t('手机号快速登入')}}</router-link>
    </div>
    <div class="login-form w-form" v-show="!isWeiXin">
      <input
        type="text"
        class="input w-input"
        maxlength="100"
        autofocus="true"
        :placeholder="$t('请输入邮箱或手机号码')"
        v-model="username"
      >
      <input
        type="password"
        class="input w-input"
        maxlength="100"
        :placeholder="$t('请输入密码')"
        v-model="password"
      >
      <div class="error-text">{{error}}</div>
      <button
        class="button login-button w-button"
        @click="login()"
      >
        {{$t('登录')}}
      </button>
    </div>
    <third-parties-login :is-wei-xin="isWeiXin"/>

    <div class="login-meta-wrapper" v-if="isWeiXin">
      <div class="w-row">
        <div class="no-margin w-col w-col-6 w-col-small-6 text-align">
          <span class="login-forgot text-black">
            {{$t('长按太阳码')}}
          </span>
        </div>
        <div class="login-meta-right-column no-margin w-col w-col-6 w-col-small-6">
          <span>
            {{$t('开始投房之旅')}}
          </span>
        </div>
      </div>
    </div>

    <div class="login-meta-wrapper" v-else>
      <div class="w-row">
        <div class="no-margin w-col w-col-6 w-col-small-6 text-align">
          <router-link to="/forgotpwd" class="login-forgot text-medium">
            {{$t("忘记登录密码")}}
          </router-link>
        </div>
        <div class="login-meta-right-column no-margin w-col w-col-6 w-col-small-6">
          <div class="login-switch-label">{{$t('还没有账号')}}</div>
          <router-link to="/signup" class="login-swtich-link">
            {{$t('点击注册')}}
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div class="phone-notice" v-if="!isWeiXin">提示：通过<span>「WeHome房产合投」</span>小程序授权过手机号的用户，可以选择<router-link to="/phonelogin" class="phone-login">手机号快速登入</router-link>，同步小程序账户投资信息！</div> -->
  </div>
</div></template>

<script>
import { LOGIN_ACTION } from './modules'
import ThirdPartiesLogin from "./components/ThirdPartiesLogin.vue";
import { track, after } from "trackpoint-tools";
import Track from "@/track";

export default {
  name: "login",
  components: { ThirdPartiesLogin },

  data() {
    return {
      username: "",
      password: "",
      redirect: "/invest",
      error: ""
    };
  },

  mounted() {
    // this.$auth.logout()
    // set redirect url if there is any
    // mostly for beforeEnter: guardRoute

    const queryRedirect = this.$route.query.redirect || localStorage.getItem('redirect')
    if (queryRedirect) {
      this.redirect = queryRedirect;
      localStorage.setItem("redirect", queryRedirect);
    }
  },
  computed: {
    isWeiXin() {
      return this.$store.state.base.isWeixin
    }
  },

  methods: {
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "login-submit",
          action: "click",
          optLabel: "submit",
          page: this.$route.name,
          optValue: {
            username: this.username
          }
        });
      })
    )
    login() {
      const that = this;
      if (!this.username.trim()) {
        this.error = this.$t("账号不能为空");
      } else if (!this.password.trim()) {
        this.error = this.$t("请输入密码");
      } else {
        this.$store.dispatch(LOGIN_ACTION,{name:this.username, password:this.password})
        .then((result) => {
          if(result.success) {
              that.$router.push({ path: that.redirect });
            } else {
              that.error = result.message
            }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 479px) {
  .text-align {
    text-align: center;
  }
}
@media (min-width: 479px) {
  .text-align {
    text-align: left;
  }
}

.login-wrapper.minHeight-0 {
  min-height: 0;
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
.login-forgot.text-black {
  color: #666;
}
.phone-notice {
  color: #FF5000;
  font-size: 12px;
  padding: 10px 0;
}
.phone-login, .mini-procedure {
  color: #d5a478;
  font-size: 14px;
}
</style>
