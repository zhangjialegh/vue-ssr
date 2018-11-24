<template>
<div style="paddingBottom:50px;">
  <div class="detail-gallery-full-wrapper" v-show="fullScreen">
    <div class="detail-gallery-full-screen">
      <div class="w-container full-screen">
        <div class="quit-full-screen" @click="closeFullScreen"></div>
        <swiper :options="swiperOption3" ref="mySwiper3" class="detail-highlight-img w-inline-block w-lightbox full-screen">
          <swiper-slide v-for="(item, index) in houseDetail.cover_pic_uris" :key="item+index">
            <img :src="item" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" class="detail-highlight-img full-screen">
          </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>

        <swiper :options="swiperOption4" ref="mySwiper4" class="row-19 w-row w-row-nopadding">
          <swiper-slide class="column-21 w-col w-col-2" v-if="houseDetail.cover_pic_uris" v-for="(item, index) in houseDetail.cover_pic_uris" :key="item+index">
            <a class="w-inline-block w-lightbox swiper-slide-a" :style="{ backgroundImage: `url(${item})`}">
            </a>
          </swiper-slide>
          
        </swiper>
        <div class="swiper-pagination row-21"></div>
        <a class="w-inline-block w-lightbox"></a>
      </div>
    </div>
  </div>
  <div class="detail-gallery-section">
    <div class="w-container">
      <swiper :options="swiperOption1" ref="mySwiper1" class="detail-highlight-img w-inline-block w-lightbox">
        <swiper-slide v-for="(item,index) in houseDetail.cover_pic_uris" :key="item+index">
          <img :src="item" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" class="detail-highlight-img"  @click="bulletFullScreen(index)">
        </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <swiper :options="swiperOption2" ref="mySwiper2" class="row-19 w-row w-row-nopadding">
        <swiper-slide class="column-21 w-col w-col-2" v-if="houseDetail.cover_pic_uris" v-for="(item, index) in houseDetail.cover_pic_uris" :key="item+index">
          <a class="w-inline-block w-lightbox swiper-slide-a" :style="{ backgroundImage: `url(${item})`}">
          </a>
        </swiper-slide>
        
      </swiper>
      <div class="swiper-pagination row-21"></div>
      <a class="w-inline-block w-lightbox"></a>
    </div>
  </div>

  <div class="detail-content-section">
    <div class="w-container">
      <div class="w-row">
        <div class="detail-column-right w-col w-col-4 w-col-medium-4 mob-only">
          <market-price :house-detail="houseDetail" :histories="histories" :orders="orders"/>
        </div>
        <div class="detail-column-left w-col w-col-8 w-col-medium-8">
          <div class="detail-title no-underline">{{$t('相关文件')}}</div>
          <div class="info-card detail-relevant">
            <div class="w-row">
              <a v-bind:href="zheng.url" @click="downloadFile(zheng.url)" target="_blank" class="column-35 w-col w-col-3 w-col-small-3 w-col-tiny-3" v-for="(zheng, idx) in houseDetail.legal_file" :key="zheng.title+idx">
                <div class="text-block-10">{{zheng.title}}</div><img src="@/assets/images/icon-download.png" width="20" height="20" class="image-18">
              </a>
              <template v-if="reportList.length">
                <a @click="openReport('operation')" class="column-35 w-col w-col-3 w-col-small-3 w-col-tiny-3">
                  <div class="text-block-10">{{$t('项目财务报告')}}</div><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/report_more1.svg" width="20" height="20" class="image-18">
                </a>

                <a @click="openReport('estimate')" class="column-35 w-col w-col-3 w-col-small-3 w-col-tiny-3">
                  <div class="text-block-10">{{$t('项目估值报告')}}</div><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/report_more1.svg" width="20" height="20" class="image-18">
                </a>
              </template>
            </div>
          </div>

          <div class="detail-title">{{$t('区域分析')}}</div>
          <div v-for="(content, index) in houseDetail.neighborghood_description" :key="'区域分析'+content.type+index">
            <p class="detail-paragraph" v-if="content.type=='text'">{{content.content}}</p>
            <div v-if="content.type=='image'" class="detail-image-box">
              <img v-lazy="content.content" sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 478.65625px, 589.984375px" class="detail-image">
            </div>
          </div>
          <div class="detail-title">{{$t('房产概括')}}</div>
          <div v-for="(content, index) in houseDetail.property_description" :key="'房产概括'+content.type+index">
            <p class="detail-paragraph" v-if="content.type=='text'">{{content.content}}</p>
            <div v-if="content.type=='image'" class="detail-image-box">
              <img v-lazy="content.content" sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 478.65625px, 589.984375px" class="detail-image">
            </div>
          </div>
          <div class="detail-title no-underline">{{$t('投资概要')}}</div>
          <div data-duration-in="300" data-duration-out="100" class="info-card no-margin w-tabs">
            <div class="tabs-menu w-tab-menu">
              <a data-w-tab="Tab 1" class="tab-link w-inline-block w-tab-link">
                <div class="tab-link-text" v-bind:class="{current: tabIndexA==1}" @click="switchTabA(1)">{{$t('WeHome评分')}}</div>
              </a>
              <a data-w-tab="Tab 2" class="tab-link w-inline-block w-tab-link">
                <div class="tab-link-text" v-bind:class="{current: tabIndexA==2}" @click="switchTabA(2)">{{$t('对比分析')}}</div>
              </a>
            </div>
            <div class="w-tab-content">
              <property-score-tab :house-detail="houseDetail" v-if="tabIndexA==1 && houseDetail.title"/>
              <property-compare-tab :house-detail="houseDetail" :city-detail="cityDetail" v-if="tabIndexA==2 && houseDetail.title"/>
            </div>
          </div>
          <div class="detail-title no-underline">{{$t('成本收益分析')}}</div>
          <div data-duration-in="300" data-duration-out="100" class="info-card no-margin w-tabs">
            <div class="tabs-menu w-tab-menu">
              <!-- <a data-w-tab="Tab 9" class="tab-link one-third w-inline-block w-tab-link w--current">
                <div class="tab-link-text" v-bind:class="{current: tabIndexB==9}" @click="switchTabB(9)">收益计算器</div>
              </a> -->
              <a data-w-tab="Tab 10" class="tab-link w-inline-block w-tab-link" v-if="houseDetail.investing">
                <div class="tab-link-text" v-bind:class="{current: tabIndexB==10}" @click="switchTabB(10)">{{$t('项目详情')}}</div>
              </a>
              <a data-w-tab="Tab 11" class="tab-link w-inline-block w-tab-link" v-if="houseDetail.investing">
                <div class="tab-link-text" v-bind:class="{current: tabIndexB==11}" @click="switchTabB(11)">{{$t('收益详情')}}</div>
              </a>
            </div>
            <div class="w-tab-content">
              <!-- <property-return-calculator-tab :house-detail="houseDetail" v-if="tabIndexB==9"/> -->
              <property-cost-tab :house-detail="houseDetail" :resale="resale" v-if="tabIndexB==10"/>
              <property-return-tab :house-detail="houseDetail" :resale="resale" v-if="tabIndexB==11"/>
            </div>
          </div>
          
          
          <!-- <div class="detail-title no-underline">地图</div> -->
        </div>
        <div class="detail-column-right w-col w-col-4 w-col-medium-4 pc-only">
          <market-price :house-detail="houseDetail" :histories="histories" :orders="orders" :id="id"/>
        </div>
        <!-- 里程碑 -->
        <div class="detail-column-right w-col w-col-4 w-col-medium-4 mob-only">
          <div class="detail-title no-underline">{{$t('项目里程碑')}}</div>
          <mile-stones :orderBool="false" :houseDetail="houseDetail"></mile-stones>
        </div>
      </div>
    </div>
  </div>

  <pop-box :show-tip="showTip" :tip="tip">
    <div class="w-row">
      <div class="column-55 w-col w-col-6 single-btn"><a href="javascript:;" class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
    </div>
  </pop-box>

  <transition-box :show="showReportList">
    <div class="assetdetail-report-wrapper" v-show="showReportList">
      <div class="report-list-close" @click="closeReportList"></div>
      <p class="report-list-title">{{houseDetail.project_title}}</p>
      <div class="assetdetail-list">
        <a @click="reportHref(item[reportType+'_report'])" class="property-2-flex-detail-wrapper" :class="{'first': index==0}" v-for="(item, index) in reportList" :key="item.estimate_report+item.operation_report+index">
          <div>{{item[reportType+'_name']}}</div>
          <img src="@/assets/images/Chevron.png" width="36" class="image-20">
        </a>
      </div>
    </div>
  </transition-box>
</div>
</template>

<script>
import MarketPrice from "./components/MarketPrice.vue";
import MileStones from "./components/MileStones.vue";
import { 
  GET_PROJECT_DETAIL_ACTION,
  GET_CITY_DETAIL_ACTION,
  GET_QUESTION_STATUS_ACTION,
  GET_RESALE_HISTORIES_ACTION,
  GET_RESALE_ORDRES_ACTION
} from '@/scenes/investing/modules'
import {GET_USER_ASSET_ACTION} from '@/scenes/mine/modules'
import VueSticky from "vue-sticky";
import { track, after } from "trackpoint-tools";
import Track from "@/track";
let swiper1, swiper2, swiper3, swiper4;

export default {
  name: "marketDetail",
  components: {
    MarketPrice,
    MileStones
  },
  data() {
    return {
      houseDetail: {},
      histories:[],
      orders: {},
      resale: true,
      cityDetail: {},
      isLoading: true,
      fullScreen: false,
      needReview: false,
      showTip: false,
      showReportList: false,
      reportType: 'operation',
      tip: '',
      dayArr: 0,
      hArr: 0,
      minArr: 0,
      secArr: 0,
      tabIndexA: 1,
      tabIndexB: 10,
      zhengUrl: "",
      showTip: false,
      tip: '',
      swiperOption2: {
        slidesPerView: 5,
        allowTouchMove: true,
        spaceBetween: 5,
        on: {
          click: function() {
            swiper1.slideTo(this.clickedIndex, 1000, false);
            swiper3.slideTo(this.clickedIndex, 1000, false);
            swiper2.slideTo(this.clickedIndex - 2, 1000, false);
            swiper4.slideTo(this.clickedIndex - 2, 1000, false);
          }
        }
      },
      swiperOption4: {
        slidesPerView: 5,
        allowTouchMove: true,
        spaceBetween: 5,
        on: {
          click: function() {
            swiper3.slideTo(this.clickedIndex, 1000, false);
            swiper1.slideTo(this.clickedIndex, 1000, false);
            swiper2.slideTo(this.clickedIndex - 2, 1000, false);
            swiper4.slideTo(this.clickedIndex - 2, 1000, false);
          }
        }
      },
      swiperOption1: {
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange: function() {
            swiper2.slideTo(this.realIndex - 2, 1000, false);
            swiper4.slideTo(this.realIndex - 2, 1000, false);
            swiper3.slideTo(this.realIndex, 1000, false);
          }
        }
      },
      swiperOption3: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange: function() {
            swiper4.slideTo(this.realIndex - 2, 1000, false);
            swiper2.slideTo(this.realIndex - 2, 1000, false);
            swiper1.slideTo(this.realIndex, 1000, false);
          }
        }
      }
    };
  },
  methods: {
    closeReportList: function () {
      this.showReportList = false
    },
    @track(after(function () {
      Track.eventTrack({
        category: 'market-operationReport-href',
        action: 'click',
        optLabel: 'href',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    reportHref(href) {
      window.open(href)
    },
    openReport: function (type) {
      this.reportType = type
      this.showReportList = true
    },
    popTip: function (tips) {
        if (tips) {
          this.showTip = true
          this.tip = tips
        }
      },
    closePopTip : function () {
        if(this.needReview) {
          this.$router.push({
            path: '/invest'
          })
        }
        this.showTip = false
    },
    getUserBalance: function() {
      const that = this;
      this.$store.dispatch(GET_USER_ASSET_ACTION,{}).then((res)=>{
        const balance = res.current_balance
        const tip = that.$t('您目前账户余额为',{msg:balance})
      })
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-detial-certificate-download",
          action: "click",
          optLabel: "download",
          page: this.$route.name,
          optValue: {
            url: this.zhengUrl
          }
        });
      })
    )
    downloadFile: function(url) {
      this.zhengUrl = url;
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-detial-invest-tab",
          action: "click",
          optLabel: "tab",
          page: this.$route.name,
          optValue: {
            tab: this.tabIndexA
          }
        });
      })
    )
    switchTabA: function(index) {
      this.tabIndexA = index;
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-detial-costing-tab",
          action: "click",
          optLabel: "tab",
          page: this.$route.name,
          optValue: {
            tab: this.tabIndexB
          }
        });
      })
    )
    switchTabB: function(index) {
      this.tabIndexB = index;
    },
    getMarketDetail: function(id) {
      const that = this;
      this.$store.dispatch(GET_PROJECT_DETAIL_ACTION,{id}).then((result)=>{
        result.investing = true;
        that.houseDetail = result;
        that.$options.methods.getCityDetail.bind(that)(result.city_id);
        // that.$options.methods.investCountDown.bind(that)(result.phase_end);
      })
    },
    getCityDetail: function(id) {
      const that = this;
      this.$store.dispatch(GET_CITY_DETAIL_ACTION,{id}).then((result)=>{
        that.cityDetail = result
      })
    },
    getResaleHistory: function (id) {
      const that = this
      this.$store.dispatch(GET_RESALE_HISTORIES_ACTION,{project_id: id})
      .then((data)=>{
        that.histories = data.histories
      })
    },
    getResaleOrders: function (id) {
      const that = this
      this.$store.dispatch(GET_RESALE_ORDRES_ACTION,{project_id: id})
      .then((data)=>{
        that.orders = data
      })
    },
    investCountDown: function(time) {
      let that = this;
      clearInterval(this.timer);
      this.timer = setInterval(function() {
        let day = 0;
        let h = 0;
        let min = 0;
        let sec = 0;
        const currentTime = new Date().getTime();
        const timeLeft = time - currentTime / 1000;
        if (timeLeft <= 0) {
          day = h = min = sec = 0;
          clearInterval(that);
        } else {
          day = Math.floor(timeLeft / 60 / 60 / 24);
          h = Math.floor(timeLeft / 60 / 60 - day * 24);
          min = Math.floor((timeLeft - day * 24 * 60 * 60 - h * 60 * 60) / 60);
          sec = Math.floor(timeLeft % 60);
        }
        that.dayArr = day;
        that.hArr = h;
        that.minArr = min;
        that.secArr = sec;
      }, 1000);
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-detail-preview-fullscreen-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            pid: this.id
          }
        });
      })
    )
    bulletFullScreen: function(e) {
      this.fullScreen = true;
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-detail-preview-close-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            pid: this.id
          }
        });
      })
    )
    closeFullScreen: function() {
      this.fullScreen = false;
    },
    checkReviewStatus: function () {
     const that = this
     const {permission,reviewStatus} = this
     if(!permission && reviewStatus!=that.GLOBAL.qesProcess) {
        this.$router.push({
          path: '/questionnaire',
          query: {
            slink: that.$route.fullPath,
            qesSource: that.GLOBAL.QES_SOURCE_MARKET
          }
        })
      } else if(reviewStatus == that.GLOBAL.qesProcess) {
        const tip = that.$t('GLOBAL.NEED_REVIEW_TIP')
        that.needReview = true
        that.$options.methods.popTip.call(that, tip)
      }
   }
  },
  created() {
    this.getMarketDetail(this.id);
    this.getResaleHistory(this.id);
    this.getResaleOrders(this.id)
    this.checkReviewStatus()
  },
  mounted() {
    swiper1 = this.$refs.mySwiper1.swiper;
    swiper2 = this.$refs.mySwiper2.swiper;
    swiper3 = this.$refs.mySwiper3.swiper;
    swiper4 = this.$refs.mySwiper4.swiper;
  },
  destroyed(){
    clearInterval(this.timer);
    this.tabIndexA = 1;
    this.tabIndexB = 10;
  },
  directives: {
    sticky: VueSticky
  },
  computed: {
    id() {
      return (
        Number.parseInt(this.$route.query.id)
      );
    },
    reportList() {
      let list = []
      if(this.houseDetail.report_list) {
        list = this.houseDetail.report_list.filter((item) => {
              return item.estimate_report && item.operation_report
            })
      }
      return list
    },
    permission() {
      return this.$store.state.auth.user.permission
    },
    reviewStatus() {
      return this.$store.state.auth.user.reviewStatus
    }
  }
};
</script>

<style lang="scss">
.tab-link {
  width: 49% !important;
}
.tab-link.one-third {
  width: 32% !important;
}
.swiper-pagination {
  position: relative;
}
:global(.swiper-pagination-bullet) {
  margin: 0 3px !important;
}
.info-card.detail-relevant {
  padding: 15px 20px;
}
  .mob-only {
    display: none;
  }
@media (max-width: 479px) {
  .mob-only {
    display: block;
    padding-top: 0;
  }
  .pc-only {
    display: none;
  }
  .row-19 {
    display: none;
  }
  .row-21 {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
  .detail-gallery-full-wrapper {
    display: none !important;
  }
}
.swiper-slide-a {
  width: 100%;
  height: 0;
  padding-bottom: 70%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.column-35 {
  min-width: 125px;
  display: inline-flex;
  height: 40px;
  line-height: 40px;
}
.column-35 > img {
  margin-top: 10px;
}
.no-margin {
  text-align: center !important;
}
.w-container .w-row.w-row-nopadding {
  margin-left: 0;
  margin-right: 0;
}

.detail-gallery-full-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999999999999;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.w-container.full-screen {
  position: relative;
  max-width: 1060px;
}

.detail-highlight-img.full-screen {
  height: 600px;
}

.quit-full-screen {
  position: absolute;
  right: 15px;
  top: 25px;
  width: 20px;
  height: 20px;
  background: url("https://wechat-pics.fangpinduo.com/close.svg") no-repeat
    center center;
  background-size: contain;
  cursor: pointer;
  z-index: 9;
}
.detail-image-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
