<template>
  <div id="app" class="body-grey">
    <template v-if="h5Weixin">
      <app-mob-nav v-if="isWeixin"></app-mob-nav>
      <app-nav v-else></app-nav>
      <!-- indexOf中为顶部有banner，需要在web和微信做适配的block -->
      <div class="website-container" :class="{'is-weixin': !isWeixin && ['home', 'marketplace', 'invest', 'information', 'datalab', 'investmentTool', 'faq', 'mediareport', 'privacystate', 'wehome', 'newsDetail', 'bloglist', 'newslist', 'howitwork', 'personaltailor', 'outward', 'serviceprotocol'].indexOf($route.name) == -1}">
        <transition>
          <router-view></router-view>
        </transition>
      </div>
      <!-- indexOf中为在页面顶部显示返回首页的导航栏 -->
      <router-link to="/" class="back-home" v-if="isWeixin && ['property', 'projectsucess', 'experiencegold', 'mine'].indexOf($route.name) > -1">
        <img src="@/assets/images/nav-logo.png" alt="logo" height="15">
        <img src="@/assets/images/home.svg" alt="home" height="20">
      </router-link>
      <the-back-to-top></the-back-to-top>
      <div class="footer-block" v-if="isWeixin && ['invest', 'mobmine'].indexOf($route.name) > -1"></div>
      <!-- indexOf 中为不显示footer组件的页面name -->
      <app-footer v-if="!isWeixin && ['login','signup','phonelogin','forgotpwd','register','getphone','questionNaire','experiencegold','wechatlogin', 'invest_rank', 'order', 'bankAccountApply', 'bankaddinfo', 'marketorder', 'bankinfo', 'banklist', 'withdraw', 'wiretransfer', 'pay', 'deposit', 'payForm'].indexOf($route.name) == -1"></app-footer>
    </template>
    <template v-else>
      <div class="wechat-open-wrapper">
        <img src="https://wechat-pics.fangpinduo.com/website/wechat/wechat-notice.svg" alt="wechat">
        <p>请在微信客户端打开链接</p>
      </div>
    </template>
  </div>
</template>

<script>
  import AppNav from './AppNav.vue'
  import AppFooter from './AppFooter.vue'
  import AppMobNav from './AppMobNav.vue'
  import { GET_COUNTRIES_ACTION } from '@/scenes/home/modules'
  import { GET_USER_NOTICE_UNREAD_ACTION } from '@/scenes/mine/modules'
  import { STORAGE_KEY,GET_USER_LOGIN_INFO_ACTION } from '@/scenes/login/modules'
  import { GET_BLOG_LIST_ACTION,GET_COMPANY_INTRO_ACTION } from '@/scenes/about/modules.js'

  export default {
    name: 'app',
    components: {
      AppNav,
      AppFooter,
      AppMobNav
    },
    methods:{
      initialI18n() {
        console.log(this.locale,'this.locale kdj');
        
        if(process.env.VUE_ENV !== 'server') {
          this.$i18n.locale = this.locale
        }
      },
      autoLogin() {
        const key = this.$store.state.base.cookies[STORAGE_KEY]
         if(key) {
            this.$store.dispatch(GET_USER_LOGIN_INFO_ACTION, {Authorization:key})
          }
      },
      getCountries() {
        this.$store.dispatch(GET_COUNTRIES_ACTION)
      },
      getBlogList() {
        this.$store.dispatch(GET_BLOG_LIST_ACTION)
      },
      getCompanyInfo() {
        this.$store.dispatch(GET_COMPANY_INTRO_ACTION)
      },
      getUnreadNotes() {
        this.$store.dispatch(GET_USER_NOTICE_UNREAD_ACTION)
      },
      loadIntercom() {
        var APP_ID = "lh3s8zdb";
        (function() {
          var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', intercomSettings); } else {
            var d = document; var i = function () { i.c(arguments) }; i.q = []; i.c = function (args) { i.q.push(args) }; w.Intercom = i; function l() {
              var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true;
              s.src = 'https://widget.intercom.io/widget/' + APP_ID;
              var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
            } if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); }
          }
        })()
        window.Intercom('boot', {
          app_id: APP_ID,
        });
      }
    },
    created() {
      
      // 自动登录
      this.autoLogin()
      // 初始化页面语言
      this.initialI18n()
      // 获取区号列表

      this.getCountries()
      this.getBlogList()
      this.getCompanyInfo()
    },
    mounted() {
      
      // 加载Intercom
      const {isWeixin,auth} = this
      if(!isWeixin) {
        this.loadIntercom()
      }
      if(auth.isLoggedIn) {
        this.getUnreadNotes()
      }
      // 
    },
    computed: {
      h5Weixin() {
        return true
        // this.$store.state.base.h5Weixin
      },
      isWeixin() {
        return this.$store.state.base.isWeixin
      },
      auth () {
        return this.$store.state.auth.auth
      },
      locale() {
        return this.$store.state.base.locale
      }
    }
  }

</script>

<style lang="scss" src="@/assets/style/app.scss"></style>
<style lang="css" src="swiper/dist/css/swiper.css"></style>
<style lang="css" src="vue-directive-tooltip/css/index.css"></style>
<style lang="scss" src="@/assets/style/global.scss"></style>

<style lang="scss" scoped>
  .website-container {
    min-height: calc(100vh - 361px);
  }

  .website-container.is-weixin {
    margin-top: 60px;
  }

  @media (max-width: 479px) {
    .website-container {
      min-height: calc(100vh - 615px);
    }

    .footer-block {
      height: 55px;
    }

    .back-home {
      display: block;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      height: 36px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 20px;
      background: rgba(23, 23, 23, 0.8);
    }
  }

  .wechat-open-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
  }

  .wechat-open-wrapper>img {
    width: 25vw;
    height: 25vw;
    max-width: 200px;
    max-height: 200px;
  }

  .wechat-open-wrapper>p {
    font-size: 18px;
    margin-top: 30px;
    font-weight: 500;
  }

</style>
