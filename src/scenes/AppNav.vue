<template>
  <div>
    <div data-collapse="medium" data-animation="default" data-duration="400" class="navbar-4 dark w-nav">
      <div class="container-27 w-container">
        <div class="w-nav-overlay" :class="{'open': openNav,'close': !openNav}" v-on:click="toggleNav">
          <nav role="navigation" class="nav-menu-3 w-nav-menu w-open-vue" :class="{'hidden': $route.name=='getphone'}">
            <router-link to="/" class="nav-link-3 top w-nav-link" v-bind:class="{'w--current':$route.name=='home'}">{{$t('首页')}}</router-link>
            <router-link :to="{path:'/invest',query: {source: 'n'}}" class="nav-link-3 top w-nav-link" v-bind:class="{'w--current':$route.name=='invest'}">{{$t('投资项目')}}</router-link>
            <router-link :to="{path:'/personaltailor',query: {source: 'n'}}" class="nav-link-3 top w-nav-link"
              v-bind:class="{'w--current':$route.name=='personaltailor'}">{{$t('高额定投')}}</router-link>
            <router-link :to="{path:'/information',query: {source: 'n'}}" class="nav-link-3 top w-nav-link"
              v-bind:class="{'w--current':$route.name=='information'}" v-if="$i18n.locale == GLOBAL.ZH_CN">{{$t('市场洞察')}}</router-link>
            <router-link :to="{path:'/datalab',query: {source: 'n'}}" class="nav-link-3 top w-nav-link" v-bind:class="{'w--current':$route.name=='datalab'}">{{$t('数据中心')}}</router-link>
            <notice-icon v-if="auth.isLoggedIn" />
            <router-link :to="{path:'/mine',query: {active:0, source: 'n'}}" class="nav-link-3 top w-nav-link mine-onle-mobille"
              v-bind:class="{'w--current':$route.name=='mine'}" v-if="auth.isLoggedIn">{{$t('我的WeHome')}}</router-link>
            <a @click="loginOut" v-if="auth.isLoggedIn" class="nav-link-3 top w-nav-link mine-onle-mobille">{{$t('退出')}}</a>
            <router-link :to="{path:'/login',query: {source: 'n'}}" v-if="!auth.isLoggedIn" class="nav-link-3 top w-nav-link"
              v-bind:class="{'w--current':$route.name=='signup' || $route.name=='login'}">{{$t('登录注册')}}</router-link>
          </nav>
        </div>

        <router-link to="/" class="brand-2 w-nav-brand"><img src="@/assets/images/nav-logo.png" width="110"></router-link>
        <div class="div-block-44">
          <nav role="navigation" class="nav-menu-3 w-nav-menu" :class="{'hidden': $route.name=='getphone'}">
            <router-link to="/" class="nav-link-3 top w-nav-link" v-bind:class="{'w--current':$route.name=='home'}">{{$t('首页')}}</router-link>
            <router-link :to="{path:'/invest',query: {source: 'n'}}" class="nav-link-3 top w-nav-link" v-bind:class="{'w--current':$route.name=='invest'}">{{$t('投资项目')}}</router-link>
            <router-link :to="{path:'/personaltailor',query: {source: 'n'}}" class="nav-link-3 top w-nav-link"
              v-bind:class="{'w--current':$route.name=='personaltailor'}">{{$t('高额定投')}}</router-link>
            <router-link :to="{path:'/information',query: {source: 'n'}}" class="nav-link-3 top w-nav-link"
              v-bind:class="{'w--current':$route.name=='information'}" v-if="$i18n.locale == GLOBAL.ZH_CN">{{$t('市场洞察')}}</router-link>
            <router-link :to="{path:'/datalab',query: {source: 'n'}}" class="nav-link-3 top w-nav-link" v-bind:class="{'w--current':$route.name=='datalab'}">{{$t('数据中心')}}</router-link>

            <notice-icon v-if="auth.isLoggedIn" />

            <router-link :to="{path:'/mine',query: {active: 0, source: 'n'}}" class="nav-link-3 top w-nav-link mine-onle-mobille"
              v-bind:class="{'w--current':$route.name=='mine'}" v-if="auth.isLoggedIn">{{$t('我的WeHome')}}</router-link>
            <a @click="loginOut" v-if="auth.isLoggedIn" class="nav-link-3 top w-nav-link mine-onle-mobille">{{$t('退出')}}</a>
            <router-link :to="{path:'/login',query: {source: 'n'}}" v-if="!auth.isLoggedIn" class="nav-link-3 top w-nav-link"
              v-bind:class="{'w--current':$route.name=='signup' || $route.name=='login'}">{{$t('登录注册')}}</router-link>
            <div class="avatar-wrapper" v-if="auth.isLoggedIn" @mouseenter="dropdown" @mouseleave="dropback">
              <div class="dropdown w-dropdown">
                <div class="dropdown-toggle-3 navlist-onle-pc w-dropdown-toggle">
                  <div class="icon-2 w-icon-dropdown-toggle"></div>
                  <div class="text-block-22">{{user.name}}</div>
                </div>
                <nav class="w-dropdown-list nav-dropdown-list" v-if="navOpen" :class="{'w--open':navOpen}">
                  <router-link :to="{path:'/mine',query: {active: 0, source: 'n'}}" class="login-item w-dropdown-link">{{$t('我的资产')}}</router-link>
                  <router-link :to="{path:'/mine',query: {active: 1, source: 'n'}}" class="login-item w-dropdown-link">{{$t('我的余额')}}</router-link>
                  <router-link :to="{path:'/mine',query: {active: 2, source: 'n'}}" class="login-item w-dropdown-link">
                    <span>{{$t('我的消息')}}</span>
                    <span class="note-inner-notice" v-if="notice && notice.count">{{notice.count}}</span>
                  </router-link>
                  <router-link :to="{path:'/mine',query: {active: 3, source: 'n'}}" class="login-item w-dropdown-link">{{$t('我的福利')}}</router-link>
                  <router-link :to="{path:'/mine',query: {active: 4, source: 'n'}}" v-if="isMobile" class="login-item w-dropdown-link">{{$t('我的任务')}}</router-link>
                  <a @click="loginOut" class="login-item w-dropdown-link">{{$t('退出')}}</a>
                </nav>
              </div>
              <div class="div-block-51" v-lazy:background-image="user.avatar">
              </div>
            </div>
          </nav>
        </div>
        <div class="menu-button w-nav-button" :class="{'w--open': openNav ,'hidden': $route.name=='getphone'}" v-on:click="toggleNav">
          <div class="icon w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {LOGIN_OUT_ACTION} from '@/scenes/login/modules'

  export default {
    data() {
      return {
        tabName: "",
        navOpen: false,
        openNav: false
      };
    },
    methods: {
      loginOut: function () {
        this.$store.dispatch(LOGIN_OUT_ACTION)
      },
      dropdown: function () {
        this.navOpen = true
      },
      dropback: function () {
        this.navOpen = false
      },
      toggleNav: function () {
        this.openNav = !this.openNav
      }
    },
    computed: {
      notice: function () {
        return this.$store.state.user.notes
      },
      isMobile () {
        return this.$store.state.base.isMobile
      },
      auth () {
        return this.$store.state.auth.auth
      },
      user() {
        return this.$store.state.auth.user
      }
    },
    watch: {
      '$route'(to, from) {
        this.navOpen = false
      }
    }
  };

</script>

<style lang="scss" scoped>
  .w-nav {
    z-index: 9999999;
  }

  .nav-link-3.top {
    display: block;
  }

  .nav-link-2.top {
    display: block;
  }

  .login-item {
    text-align: center;
  }

  .login-item:hover {
    background: #d5a478;
    cursor: pointer;
  }

  .avatar-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 991px) {
    .mine-onle-mobille {
      display: none !important;
    }
  }

  .w-open-vue {
    display: block !important;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    overflow: visible;
    min-width: 200px;
  }

  .w-nav-overlay {
    display: block;
    height: 100vh;
  }

  .w-nav-overlay.close {
    top: -100vh;
    transition: top 400ms;
  }

  .w-nav-overlay.open {
    top: 100%;
    transition: top 400ms;
  }

  .nav-menu-3.hidden {
    visibility: hidden;
  }

  .menu-button.hidden {
    visibility: hidden;
  }

  .note-inner-notice {
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    background: red;
    color: #fff;
    top: 50%;
    transform: translateY(-50%) scale(0.8);
    right: 3px;
  }

</style>
