<template>
  <div>
    <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/information-banner.jpeg'">
      <h2 class="banner-title-global">{{$t('我们相信')}}<span class="banner-pc-only"></span><div class="banner-mob-only"></div>{{$t('每个人都应该享受到房产投资的红利')}}</h2>
    </banner-model>
    <div class="wire-transfer-section">
      <div class="w-container">
        <div class="wire-transfer-title">{{$t('常见问题')}}</div>
      </div>
      <toggle-bar :title="item.title" :content="item.content" v-for="(item, index) in faqList.slice(0, loadingNum)"  :key="item.id+index"></toggle-bar>
      <loading-more 
        v-if="faqList.length > 0"
        :list-arr="faqList" 
        :loading-num="loadingNum"
        @loading="loadingMore"></loading-more>
    </div>
  </div>
</template>

<script>
  import {GET_FAQ_LIST_ACTION} from '../modules.js'
  import { track, after } from 'trackpoint-tools'
  import Track from '@/track'

  export default {
    name: 'faq',
    data () {
      return {
        faqList:[],
        openId: null,
        loadingNum: 12
      }
    },
    methods: {
      loadingMore(msg) {
        this.loadingNum = msg
      },
      loadFaq: function () {
        const that = this
        this.$store.dispatch(GET_FAQ_LIST_ACTION)
        .then((res)=>{
          that.faqList = res
        })
      },
      @track(after(function () {
        this.openId && Track.eventTrack({
          category: 'faq-toggle',
          action: 'click',
          optLabel: 'toggle',
          page: this.$route.name,
          optValue: {
            faqId: this.openId
          }
        })
      }))
      toggleFaq: function (id) {
        const {
          openId
        } = this
        if (id == openId) {
          this.openId = null
        } else {
          this.openId = id
        }
      }
    },
    created () {
      this.loadFaq()
    }
  
  }
</script>

<style lang="scss" scoped>
  .wire-transfer-section {
    padding-top: 0;
    .wire-transfer-title {
      padding-top: 40px;
    }
  }
  .body {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .container-23 {
    padding-bottom: 0;
  }
  .paragraph-50 {
    border-bottom: none !important;
  }
  
  .image-20 {
    padding: 0 !important;
    height: 7px;
    width: 12px;
    margin: 0 15px !important;
  }
  
  .image-20.rotate-180 {
    transform: rotate(180deg);
    display: block;
    position: relative;
  }
  @media (max-width: 479px) {
    .div-block-36 {
      padding-top: 10px;
    }
    .div-block-36.last {
      border-bottom: none;
    }
  }
</style>