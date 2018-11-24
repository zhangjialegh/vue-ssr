<template>
  <div>
    <div class="investor-note" v-if="['order', 'wireTransfer', 'uploadProof'].indexOf($route.name) > 0">
      <div class="w-container">
        <h4 class="investor-note-title">{{$t('投资提醒')}}</h4>
        <div class="text-block-9">{{$t('投资有风险')}}</div>
        <div class="investor-note-icons-row w-row">
          <div class="w-col w-col-2 w-col-small-4 w-col-tiny-6">
            <div class="investor-note-icon"></div>
          </div>
          <div class="w-col w-col-2 w-col-small-4 w-col-tiny-6">
            <div class="investor-note-icon _2"></div>
          </div>
          <div class="w-col w-col-2 w-col-small-4 w-col-tiny-6">
            <div class="investor-note-icon _3"></div>
          </div>
          <div class="w-col w-col-2 w-col-small-4 w-col-tiny-6">
            <div class="investor-note-icon _4"></div>
          </div>
          <div class="w-col w-col-2 w-col-small-4 w-col-tiny-6">
            <div class="investor-note-icon _5"></div>
          </div>
          <div class="w-col w-col-2 w-col-small-4 w-col-tiny-6">
            <div class="investor-note-icon _6"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-2" :class="{'black-bg': $route.name == 'datalab'}" v-else-if="['home'].indexOf($route.name) == -1">
      <div class="container-3 w-container"><img src="../assets/images/icon6.png" width="100" class="image-2"><img src="../assets/images/icon5.png"
          width="100" class="image-2"><img src="../assets/images/icon4.png" width="100" class="image-2"><img src="../assets/images/icon3.png"
          width="100" class="image-2"><img src="../assets/images/icon2.png" width="50" class="image-2"><img src="../assets/images/icon1.png"
          width="100" class="image-2"><img src="../assets/images/icon7.png" width="50" class="image-2"></div>
    </div>
    <div class="footer">
      <div class="w-container">

        <!-- 1. pc端显示的footer样式 -->
        <div class="w-row pc-only">
          <div class="w-col w-col-3 w-col-small-6 w-col-tiny-6 first">
            <img src="@/assets/images/nav-logo.png" width="130" class="image-21">
            <!-- 语言切换 -->
            <div class="div-block-106">
              <div data-delay="0" class="dropdown-3 w-dropdown" @mouseleave="closeLanguageSwitch" @mouseenter="showLanguageSwitch">
                <div class="dropdown-toggle-5 w-dropdown-toggle">
                  <div class="icon-4 w-icon-dropdown-toggle"></div>
                  <div class="text-block-31">{{$i18n.locale==GLOBAL.ZH_CN?'中文':$i18n.locale==GLOBAL.EN_US?'English':'中文'}}</div>
                </div>
                <nav class="w-dropdown-list" :class="{'w--open': showLanguage}" @click="selectLanguage">
                  <a href="javascript:;" :data-id="GLOBAL.ZH_CN" class="w-dropdown-link">中文</a>
                  <a href="javascript:;" :data-id="GLOBAL.EN_US" class="w-dropdown-link">English</a>
                </nav>
              </div>
            </div>
          </div>
          <div class="text-right w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div class="footer-title"><span>{{$t('投资导航')}}</span></div>
            <router-link to="/" class="footer-link">{{$t('首页')}}</router-link>
            <router-link to="/invest" class="footer-link">{{$t('投资项目')}}</router-link>
            <router-link to="/datalab" class="footer-link">{{$t('数据中心')}}</router-link>
            <a class="footer-link" @click="surfHref('blog-href')" href="/blog" target="_blank">Blog</a>
            <router-link class="footer-link" to="/howitwork">How it Works</router-link>
            <router-link class="footer-link" to="/citypartner">合伙人</router-link>
          </div>
          <div class="text-right w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div class="footer-title"><span>WeHome</span></div>
            <router-link to="/wehome" class="footer-link">{{$t('公司介绍')}}</router-link>
            <router-link to="/faq" class="footer-link">{{$t('常见问题')}}</router-link>
            <router-link to="/mediaReport" class="footer-link">{{$t('媒体报道')}}</router-link>
            <router-link to="/privacystate" class="footer-link">{{$t('隐私声明')}}</router-link>
            <router-link to="/outward" class="footer-link">{{$t('运作模式')}}</router-link>
          </div>
          <div class="text-right w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div class="footer-title"><span>{{$t('联系我们')}}</span></div>
            <a href="#" class="footer-link">hi@wehome.io</a>
            <a href="#" class="footer-link">(+86) 400-681-3637</a>
          </div>
        </div>

        <!-- 2. mob端显示的footer样式 -->
        <div class="w-row mobile-only">
          <div class="w-col w-col-3 w-col-small-6 w-col-tiny-6 first">
            <img src="@/assets/images/nav-logo.png" width="130" class="image-21">
            <!-- 语言切换 -->
            <div class="div-block-106">
              <div data-delay="0" class="dropdown-3 w-dropdown" @mouseleave="closeLanguageSwitch" @mouseenter="showLanguageSwitch">
                <div class="dropdown-toggle-5 w-dropdown-toggle">
                  <div class="icon-4 w-icon-dropdown-toggle"></div>
                  <div class="text-block-31">{{$i18n.locale==GLOBAL.ZH_CN?'中文':$i18n.locale==GLOBAL.EN_US?'English':'中文'}}</div>
                </div>
                <nav class="w-dropdown-list" :class="{'w--open': showLanguage}" @click="selectLanguage">
                  <a href="javascript:;" :data-id="GLOBAL.ZH_CN" class="w-dropdown-link">中文</a>
                  <a href="javascript:;" :data-id="GLOBAL.EN_US" class="w-dropdown-link">English</a>
                </nav>
              </div>
            </div>
          </div>
          <div class="text-right w-col w-col-3 w-col-small-6 w-col-tiny-6 first">
            <div class="footer-title" @click="toggleGuide"><span>{{$t('投资导航')}}</span><img src="@/assets/images/Chevron.png"
                width="36" class="image-20" :class="{'rotate-180': showGuide}"></div>
            <div class="footer-page-entry" :class="{'height-auto': showGuide}">
              <router-link to="/" class="footer-link footer-left">{{$t('首页')}}</router-link>
              <router-link to="/invest" class="footer-link footer-left">{{$t('投资项目')}}</router-link>
              <router-link to="/datalab" class="footer-link footer-left">{{$t('数据中心')}}</router-link>
              <a class="footer-link footer-left" @click="surfHref('blog-href')" href="/blog" target="_blank">Blog</a>
              <router-link class="footer-link footer-left" to="/howitwork">How it Works</router-link>
              <router-link class="footer-link footer-left" to="/citypartner">合伙人</router-link>
            </div>
          </div>
          <div class="text-right w-col w-col-3 w-col-small-6 w-col-tiny-6 first">
            <div class="footer-title small-margin-top" @click="toggleWeHome"><span>WeHome</span><img src="@/assets/images/Chevron.png"
                width="36" class="image-20" :class="{'rotate-180': showWeHome}"></div>
            <div class="footer-page-entry" :class="{'height-auto': showWeHome}">
              <router-link to="/wehome" class="footer-link footer-left">{{$t('公司介绍')}}</router-link>
              <router-link to="/faq" class="footer-link footer-left">{{$t('常见问题')}}</router-link>
              <router-link to="/mediaReport" class="footer-link footer-left">{{$t('媒体报道')}}</router-link>
              <router-link to="/privacystate" class="footer-link footer-left">{{$t('隐私声明')}}</router-link>
              <router-link to="/outward" class="footer-link footer-left">{{$t('运作模式')}}</router-link>
            </div>
          </div>
          <div class="text-right w-col w-col-3 w-col-small-6 w-col-tiny-6 first">
            <div class="footer-title small-margin-top" @click="toggleContact"><span>{{$t('联系我们')}}</span><img src="@/assets/images/Chevron.png"
                width="36" class="image-20" :class="{'rotate-180': showContact}"></div>
            <div class="footer-page-entry" :class="{'height-auto': showContact}">
              <a href="#" class="footer-link footer-left">hi@wehome.io</a>
              <a href="#" class="footer-link footer-left">(+86) 400-681-3637</a>
            </div>
          </div>
        </div>


        <div class="footer-copyright">
          <div class="w-row">
            <div class="w-col w-col-6 w-col-small-6">
              <a href="#" class="footer-link">© WeHome, Inc.</a>
            </div>
            <div class="footer-copyright-links w-col w-col-6 w-col-small-6">
              <a href="https://www.facebook.com/Wehomeio-1811463875783319/?ref=bookmarks" class="footer-link inline w-inline-block"
                target="_blank" @click="surfHref('facebook-href')">
                <img src="../assets/images/fb.png" height="20" class="image-11">
              </a>
              <a href="https://twitter.com/WeHomeio" class="footer-link inline w-inline-block" target="_blank" @click="surfHref('twitter-href')">
                <img src="../assets/images/tw.png" height="20">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div-block-56" v-if="['home'].indexOf($route.name) >= 0 && showMiniCode && $i18n.locale == GLOBAL.ZH_CN" >
      
      <div class="container-28 w-container" :style="{'position':'relative'}">
        <div class="div-block-65" @click="closeMiniCode"></div>
        <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/miniapp.png?imageView2/2/w/300/h/300"
          width="230" height="170" sizes="(max-width: 479px) 100vw, 230px" class="image-28">
        <div class="text-block-23"><strong class="bold-text">{{$t('关注公众号')}}</strong></div>
        <div class="div-block-64"><img src="https://wechat-pics.fangpinduo.com/wehome/everest/wehome-service-qrcode.png"
            width="80" sizes="(max-width: 479px) 100vw, (max-width: 767px) 11vw, 80px" class="image-29"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    track,
    after
  } from "trackpoint-tools";
  import Track from "@/track";

  export default {
    data() {
      return {
        showMiniCode: true,
        showGuide: false,
        showWeHome: false,
        showContact: false,
        showLanguage: false,
        category: ""
      };
    },
    methods: {
      showLanguageSwitch: function () {
        this.showLanguage = true;
      },
      closeLanguageSwitch: function () {
        this.showLanguage = false;
      },
      selectLanguage: function (e) {
        if(typeof window !== 'undefined') {
          console.log(e.target.dataset.id);
          this.$cookies.set("lng", e.target.dataset.id);
          // this.$cookies.set('lng', e.target.dataset.id);
          if (this.$i18n.locale == e.target.dataset.id) {
            this.showLanguage = false;
          } else {
            window.location.reload(); //进行刷新改变cookie里的值
          }
        }
      },
      @track(
        after(function () {
          Track.eventTrack({
            category: this.category,
            action: "click",
            optLabel: "href",
            page: this.$route.name,
            optValue: {
              showMiniCode: this.showMiniCode
            }
          });
        })
      )
      surfHref: function (cat) {
        this.category = cat;
      },
      @track(
        after(function () {
          Track.eventTrack({
            category: "minicode-close-button",
            action: "click",
            optLabel: "button",
            page: this.$route.name,
            optValue: {
              showMiniCode: this.showMiniCode
            }
          });
        })
      )
      closeMiniCode: function () {
        if(typeof window !=='undefined') {
          this.showMiniCode = false;
          this.$cookies.set("sun_sky", new Date().getTime());
        }
      },
      toggleGuide: function () {
        this.showGuide = !this.showGuide;
      },
      toggleWeHome: function () {
        this.showWeHome = !this.showWeHome;
      },
      toggleContact: function () {
        this.showContact = !this.showContact;
      }
    },
    mounted() {
      const timeStamp = this.$cookies.get("sun_sky");
      if (timeStamp) {
        const deltaTime = (new Date().getTime() - timeStamp) / 1000 / 60 / 60;
        if (deltaTime >= 24) {
          this.showMiniCode = true;
        } else {
          this.showMiniCode = false;
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
  .div-block-34 {
    z-index: 9999999;
  }

  .div-block-35 {
    width: 140px !important;
    height: 150px !important;
  }

  .section-2.black-bg {
    background-color: #333333;
  }

  .w-row {
    &.mobile-only {
      display: none;
    }
  }

  .w-dropdown-link {
    background-color: rgba(51, 51, 51, 0.9);
    color: #fff;

    &:hover {
      background-color: #d5a478 !important;
    }
  }

  @media (max-width: 479px) {
    .footer-copyright {
      margin-top: 0;
    }

    .footer-copyright-links {
      justify-content: center;
      align-items: center;
    }

    .w-col-tiny-6.first {
      width: 100%;
    }

    .w-row {
      &.mobile-only {
        display: block;
      }

      &.pc-only {
        display: none;
      }
    }

    .wire-transfer-section {
      padding-top: 0;
    }

    .footer-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.small-margin-top {
        margin-top: 15px;
      }
    }

    .footer-link.footer-left {
      text-align: left;
    }

    .image-20 {
      padding: 0 !important;
      height: 7px;
      width: 12px;
      margin: 0 15px !important;
      transition: all 0.5s;
      transform: rotate(180deg);
    }

    .image-20.rotate-180 {
      transform: rotate(0);
      display: block;
      position: relative;
    }

    .footer-page-entry {
      max-height: 0px;
      overflow: hidden;
      transition: max-height 0.5s;

      &.height-auto {
        max-height: 200px;
      }
    }
  }

</style>
