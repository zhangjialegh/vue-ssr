<template>
  <div>
  <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/information-banner.jpeg'">
    <h2 class="banner-title-global">{{$t('我们相信')}}<span class="banner-pc-only"></span><div class="banner-mob-only"></div>{{$t('每个人都应该享受到房产投资的红利')}}</h2>
  </banner-model>
  <div class="data-section">
    <div class="container-31 w-container">
      <div data-duration-in="300" data-duration-out="100" class="w-tabs">
        <div class="tabs-menu-wrapper">
          <div class="tabs-menu-4 w-tab-menu w-tab-mobile">
            <a class="tab-link-9 w-inline-block w-tab-link" v-for="(item,index) in tabArray" :class="{'w--current':tabIndex==index}" @click="switchTab(index)" :key="tabArray[index].name+index">
              <div>{{tabArray[index].name}}</div>
            </a>
          </div>
        </div>
        <div class="w-tab-content">
          <div class="w-tab-pane" v-for="(item,index) in catDetailArr" :class="{'w--tab-active':tabIndex==index}" :key="item+index">
            <div class="div-block-84" v-if="item" v-lazy:background-image="item.bannnerPicUriWeb"></div>
          </div>
        </div>
      </div>
      <h4 class="heading-36">{{$t("知识点")}}</h4>
      <p class="paragraph-59" v-for="(item,index) in catDetailArr" v-if="tabIndex==index" :key="item.summary+index">{{item.summary}}</p>
      <h4 class="heading-36">{{$t('知识清单')}}</h4>
    </div>
    <div v-for="(item,index) in catDetailArr" v-if="tabIndex==index" :key="item.summary+index" class="kownledge-container-wrapper">
      <toggle-bar :title="kown.title" :content="kown.content" v-for="(kown, idx) in item.knowledge" :key="kown.id+idx"></toggle-bar>
    </div>
  </div>
  </div>
</template>

<script>
import {GET_KNOWLEDGE_CATEGORIES_ACTION,GET_KNOWLEDGE_DETAIL_ACTION} from '../modules.js'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'
export default {
  name: 'investmentTool',
  data () { return {
    catDetailArr: [],
    tabArray:[],
    tabIndex: -1,
    openId: null
  } },
  methods: {
    @track(after(function () {
    Track.eventTrack(this.$store,{
        category: 'investment-tool-tab',
        action: 'click',
        optLabel: 'tab',
        page: this.$route.name,
        optValue: {
          tab: this.tabArray[this.tabIndex]['name']
        }
      })
    }))
    switchTab: function (index) {
      this.tabIndex = index
    },
    loadKownledge: function () {
      // load navigation bar data (knowledge categories)
      const that = this
      this.$store.dispatch(GET_KNOWLEDGE_CATEGORIES_ACTION)
      .then((res)=>{
        const cats = res.data.categories
        that.tabArray = cats
        for (var i = 0; i < cats.length; i++) {
          var id = cats[i].id
          that.$options.methods.loadCatDetail.call(that,id, i)
        }
      })
    },

    loadCatDetail: function (id, navIndex) {
      var that = this
      this.$store.dispatch(GET_KNOWLEDGE_DETAIL_ACTION,{id})
      .then((res)=>{
        let catDetailArr = that.catDetailArr
        catDetailArr[navIndex] = res
        that.catDetailArr = catDetailArr
        const idx = that.$route.query.id ? that.$route.query.id : 0
        if(idx==navIndex) {
          that.$options.methods.switchTab.call(that,idx)
        }
      })
    },
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    isWeixin () {
      return this.$store.state.base.isWeixin
    }
  },
  created () {
    this.loadKownledge()
  }
}
</script>

<style lang="scss" scoped>
.tabs-menu-wrapper {
  width: 100%;
  overflow: scroll;
}
.kownledge-container-wrapper {
  margin-top: -25px;
}
.div-block-84 {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

@media (max-width: 479px) {
.paragraph-50 {
  border-bottom: none;
}
.container-31 {
  padding-top: 0;
}
.div-block-36 {
  padding-top: 10px;
}
.div-block-36.last {
  border-bottom: none;
}
.div-block-84 {
  height: 170px;
}
.tabs-menu-wrapper {
  width: calc(100vw - 40px)
}
.w-tab-mobile {
  position: static;
  left: 0px;
  top: 0px;
  right: 0px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  padding: 10px 5px;
  clear: both;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
 .tab-link-9 {
  width: 20vw;
  display: block;
  height: 100%;
  margin-top: 0px;
  margin-bottom: 0px;
  float: none;
  clear: none;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
 }
 .div-block-24.is-weixin {
    top: 140px;
  }
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
.container-23 {
  padding-bottom: 0;
}
</style>