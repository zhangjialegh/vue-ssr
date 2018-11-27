<template>
<div style="paddingBottom:60px;">
  <div class="detail-gallery-full-wrapper" v-show="fullScreen">
    <div class="detail-gallery-full-screen">
      <div class="w-container full-screen">
        <div class="quit-full-screen" @click="closeFullScreen"></div>
        <swiper :options="swiperOption3" ref="mySwiper3" class="detail-highlight-img w-inline-block w-lightbox full-screen">
          <swiper-slide v-for="(item, index) in houseDetail.cover_pic_uris" :key="item+index" v-if="houseDetail.cover_pic_uris">
            <img :src="item" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" class="detail-highlight-img full-screen">
          </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>

        <swiper :options="swiperOption4" ref="mySwiper4" class="row-19 w-row w-row-nopadding">
          <swiper-slide class="column-21 w-col w-col-2" v-if="houseDetail.cover_pic_uris" v-for="(item, index) in houseDetail.cover_pic_uris" :key="item+index" >
            <img :src="item" class="detail-highlight-img full-screen full-screen-item">
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
        <swiper-slide v-for="(item,index) in houseDetail.cover_pic_uris" :key="item+index" v-if="houseDetail.cover_pic_uris">
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
        <div class="detail-column-right w-col w-col-4 w-col-medium-4 mobile-only">
          <div class="info-card detail-relevant mobile">
            <div class="w-row">
              <a v-bind:href="zheng.url" @click="downloadFile(zheng.url)" target="_blank" class="project-docs" v-for="(zheng, idx) in houseDetail.legal_file" :key="zheng.title+idx" v-if="houseDetail.legal_file">
                <span class="text-block-10">{{$t(zheng.title)}}</span>
                <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/download1.svg" width="20" height="20" class="image-18">
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
          <property-invest-card :id="id" :house-detail="houseDetail" :day="dayArr" :tuan-code="tuanCode" :h="groupH" :m="groupM" :s="groupS" :group-detail="groupDetail"/>
          <group-hall :id="id"></group-hall>
        </div>
        <div class="detail-column-left w-col w-col-8 w-col-medium-8">
          <div class="detail-column-right pc-only">
            <div class="detail-title no-underline first">{{$t('相关文件')}}</div>
            <div class="info-card detail-relevant">
              <div class="w-row">
                <a v-bind:href="zheng.url" @click="downloadFile(zheng.url)" target="_blank" class="project-docs" v-for="(zheng, idx) in houseDetail.legal_file" :key="zheng.title+idx" v-if="houseDetail.legal_file">
                  <span class="text-block-10">{{$t(zheng.title)}}</span>
                  <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/download1.svg" width="20" height="20" class="image-18">
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
          </div>
          <template v-if="houseDetail.investing">
            <div class="detail-title">{{$t('区域分析')}}</div>
            <div v-for="(item, index) in houseDetail.neighborghood_description" :key="id+'区域分析'+item.type+index" v-if="houseDetail.neighborghood_description">
              <p class="detail-paragraph" v-if="item.type=='text'">{{item.content}}</p>
              <div v-if="item.type=='image'" class="detail-image-box">
                <img v-lazy="item.content" sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 478.65625px, 589.984375px" class="detail-image">
              </div>
            </div>
            <div class="detail-title">{{$t('房产概括')}}</div>
            <div v-for="(item, index) in houseDetail.property_description" :key="id+'房产概括'+item.type+index" v-if="houseDetail.property_description">
              <p class="detail-paragraph" v-if="item.type=='text'">{{item.content}}</p>
              <div v-if="item.type=='image'" class="detail-image-box">
                <img v-lazy="item.content" sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 478.65625px, 589.984375px" class="detail-image">
              </div>
            </div>
          </template>
          <div class="detail-title no-underline" :class="{'first': !houseDetail.investing}">{{$t('投资概要')}}</div>
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
              <a data-w-tab="Tab 9" class="tab-link one-third w-inline-block w-tab-link w--current">
                <div class="tab-link-text" v-bind:class="{current: tabIndexB==9}" @click="switchTabB(9)">{{$t('收益计算器')}}</div>
              </a>
              <a data-w-tab="Tab 10" class="tab-link one-third w-inline-block w-tab-link" v-if="houseDetail.investing">
                <div class="tab-link-text" v-bind:class="{current: tabIndexB==10}" @click="switchTabB(10)">{{$t('项目明细')}}</div>
              </a>
              <a data-w-tab="Tab 11" class="tab-link one-third w-inline-block w-tab-link" v-if="houseDetail.investing">
                <div class="tab-link-text" v-bind:class="{current: tabIndexB==11}" @click="switchTabB(11)">{{$t('收益详情')}}</div>
              </a>
            </div>
            <div class="w-tab-content">
              <property-return-calculator-tab :house-detail="houseDetail" v-if="tabIndexB==9"/>
              <property-cost-tab :house-detail="houseDetail" v-if="tabIndexB==10"/>
              <property-return-tab :house-detail="houseDetail" v-if="tabIndexB==11"/>
            </div>
          </div>
          <template v-if="houseDetail.investing">
            <template v-if="!$route.query.exporder && !$route.query.experience">
              <div class="detail-title no-underline">{{$t('投资步骤')}}</div>
              <div class="info-card detail-steps">
                <div class="detail-step-row" v-bind:class="{inactive: step.status != 2,last: index==houseDetail.timeline.length - 1}" v-for="(step,index) in houseDetail.timeline" :key="step.title+index" v-if="houseDetail.timeline">
                  <div class="detail-step-title" v-bind:class="{inactive: step.status != 2 && step.status != 1}">{{step.title}}</div>
                  <div>{{step.tip}}</div>
                  <div class="detail-step-number" v-bind:class="{current:step.status == 1,inactive:step.status !=2 && step.status !=1}">{{index + 1}}</div>
                </div>
              </div>
            </template>
          </template>
          <!-- <div class="detail-title no-underline">地图</div> -->
        </div>
        <div class="detail-column-right w-col w-col-4 w-col-medium-4 pc-only">
          <property-invest-card :id="id" :house-detail="houseDetail" :day="dayArr" :tuan-code="tuanCode" :h="groupH" :m="groupM" :s="groupS" :group-detail="groupDetail"/>
          <group-hall :id="id"></group-hall>
        </div>
      </div>
    </div>
  </div>
  <group-card v-if="showGroupPop" :group-detail="groupDetail" :hide-close="true">
    <template slot="groupbutton">
      <a class="group-invest-card-btn share w-button" @click="closeGroup">{{groupH+$t('小时')+groupM+$t('分')+groupS+$t('秒')}}<span class="group-invest-card-btn-slide"></span>{{$t('了解项目')}}</a>
    </template>
  </group-card>

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
  
  <group-intro :show="showGroupIntro">
    <a class="group-invest-btn group-invest-btn-continue w-button" @click="closeGroupIntro(false)">{{$t('继续提醒')}}</a>
    <a class="group-invest-btn group-invest-btn-close w-button" @click="closeGroupIntro(true)">{{$t('知道了')}}</a>
  </group-intro>
</div>
</template>

<script>
import {
  GET_PROJECT_DETAIL_ACTION,
  GET_PROPERTY_DETAIL_ACTION,
  GET_CITY_DETAIL_ACTION, 
  SET_USER_COLOSE_ACTION, 
  GET_QUESTION_STATUS_ACTION,
  GET_REFER_TUAN_ACTION,
  GET_OPEN_TUAN_LIST_ACTION
} from '../modules'

import { track, after } from "trackpoint-tools";
import Track from "@/track"
import PropertyInvestCard from './components/PropertyInvestCard'
import GroupHall from './components/groupHall'
import { create } from 'qrcode/lib/server';
let swiper1, swiper2, swiper3, swiper4;

export default {
  name: "property",
  components: { PropertyInvestCard, GroupHall },
  data() {
    return {
      houseDetail: {},
      groupDetail: {},
      isLoading: true,
      fullScreen: false,
      showGroupPop: false,
      showGroupIntro: false,
      showReportList: false,
      reportType: 'operation',
      dayArr: 0,
      hArr: 0,
      minArr: 0,
      secArr: 0,
      showTip: false,
      tip: '',
      groupH: 0,
      groupM: 0,
      groupS: 0,
      tabIndexA: 1,
      tabIndexB: 9,
      needReview: false,
      zhengUrl: "",
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
      Track.eventTrack(this.$store,{
        category: 'property-operationReport-href',
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
    previewImage: function (idx) {
      const that = this
      wx.previewImage({
          current: that.houseDetail.cover_pic_uris[idx], // 当前显示图片的http链接
          urls: that.houseDetail.cover_pic_uris // 需要预览的图片http链接列表
      });
    },
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "project-certificate-download",
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
        Track.eventTrack(this.$store,{
          category: "project-invest-tab",
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
        Track.eventTrack(this.$store,{
          category: "project-costing-tab",
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
    getHouserDetail: function(data) {
      const url = this.projectId
        ? GET_PROJECT_DETAIL_ACTION
        : GET_PROPERTY_DETAIL_ACTION
      const that = this;
      this.$store.dispatch(url,data).then((result) => {
        result.investing = that.projectId ? true : false;
        result.experience = that.$route.query.experience
        result.exporder = that.$route.query.exporder
        that.houseDetail = result
        that.showGroupIntro = that.$route.query.experience || that.$route.query.exporder ? false : that.tuanCode ? false : result.show_tuan_intro&&result.project_status<=that.GLOBAL.PROJECT_STATUS_OPEN_SALE ? true : false
        that.isLoading = false;
        that.$options.methods.getCityDetail.bind(that)(result.city_id);
        that.$options.methods.investCountDown.call(that,result.phase_end);
      })
    },
    getCityDetail: function(id) {
      this.$store.dispatch(GET_CITY_DETAIL_ACTION,{id})
    },
    investCountDown: function(time) {
      let that = this;
      console.log(time,'gggggg');
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
          clearInterval(that.timer);
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
        Track.eventTrack(this.$store,{
          category: "property-preview-fullscreen-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name
        });
      })
    )
    bulletFullScreen: function(idx) {
      if(this.isWeixin) {
        this.$options.methods.previewImage.call(this, idx)
      } else {
        this.fullScreen = true;
      }
    },
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "property-preview-close-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name
        });
      })
    )
    closeFullScreen: function() {
      this.fullScreen = false;
    },
    // 获取多人投信息
    loadGroupInfo: function (code) {
      const that = this;
      this.$store.dispatch(GET_REFER_TUAN_ACTION,{invite_code: code}).then((data)=>{
        that.groupDetail = data
        if(data.tuan_status == 0) {
          that.showGroupPop = true
        } else if (data.tuan_status > 0) {
          const tips = that.$t('该团已经结束了')
            that.$options.methods.popTip.call(that,tips)
        }
        that.$options.methods.groupCountDown.call(that,data.end_time)
      })
   },
   groupCountDown: function(time) {
      let that = this;
      clearInterval(this.countdown);
      this.countdown = setInterval(function() {
        let day = 0;
        let h = 0;
        let min = 0;
        let sec = 0;
        const currentTime = new Date().getTime();
        const timeLeft = time - currentTime / 1000;
        if (timeLeft <= 0) {
          day = h = min = sec = 0;
          clearInterval(that.countdown);
        } else {
          day = Math.floor(timeLeft / 60 / 60 / 24);
          h = Math.floor(timeLeft / 60 / 60 - day * 24);
          min = Math.floor((timeLeft - day * 24 * 60 * 60 - h * 60 * 60) / 60);
          sec = Math.floor(timeLeft % 60);
        }
        that.groupH = h+day*24 > 9 ? ''+(h+day*24) : ('0' + h)
        that.groupM = min > 9 ? ''+min : '0'+min
        that.groupS = sec > 9 ? ''+sec : '0'+sec
      }, 1000);
    },
   closeGroup: function () {
    this.showGroupPop = false
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
  closeGroupIntro: function (params) {
     const that = this
     if(params) {
       this.$store.dispatch(SET_USER_COLOSE_ACTION,{mask:16})
     }
     this.showGroupIntro = false
   },
   checkReviewStatus: function () {
      const that = this
      const state = that.$route.query.status
      const {permission,reviewStatus} = this
      if(state > that.GLOBAL.PROJECT_STATUS_OPEN_SALE || that.$route.query.experience) return;
      if(!permission && reviewStatus!=that.GLOBAL.qesProcess) {
        that.$router.push({
          path: '/questionnaire',
          query: {
            slink: that.$route.fullPath,
            qesSource: that.GLOBAL.QES_SOURCE_PROJECT
          }
        })
      } else if(reviewStatus == that.GLOBAL.qesProcess) {
        const tip = that.$t('GLOBAL.NEED_REVIEW_TIP')
        that.needReview = true
        that.$options.methods.popTip.call(that, tip)
      }
   }
  },
  updated() {
    if(this.projectId && !this.tuanCode) { //邀请参团不需要填写问卷
      this.checkReviewStatus()
    }
  },
  mounted() {
    let options = {}
    options['id'] = this.propertyId || this.projectId
    if(this.tuanCode) {
      options['tuan_invite_code'] = this.tuanCode
      this.$options.methods.loadGroupInfo.call(this,this.tuanCode)
    } 
    this.getHouserDetail(options);
    const investCard = document.getElementById("#invest");
    swiper1 = this.$refs.mySwiper1.swiper;
    swiper2 = this.$refs.mySwiper2.swiper;
    swiper3 = this.$refs.mySwiper3.swiper;
    swiper4 = this.$refs.mySwiper4.swiper;
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.countdown)
    this.tabIndexA = 1;
    this.tabIndexB = 9;
  },
  computed: {
    propertyId() {
      return Number.parseInt(this.$route.query.property_id)
    },
    projectId() {
      return Number.parseInt(this.$route.query.project_id)
    },
    id() {
      return this.propertyId || this.projectId
    },
    tuanCode() {
      return this.$route.query.tuanCode
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
    isWeixin() {
      return this.$store.state.base.isWeixin
    },
    cityDetail() {
      return this.$store.state.invest.cityDetail
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
.w-col-tiny-3 {
  cursor: pointer;
}
.group-invest-card-btn-slide {
  display: inline-block;
  width: 10px;
}
.assetdetail-report-wrapper {
  position: relative;
  width: 90%;
  max-width: 420px;
  background-color: #fff;
  padding: 20px 20px 20px;
}
.report-list-title {
  @media (max-width: 479px) {
    font-size: 12px
  }
}
.property-2-flex-detail-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border-bottom: 1px solid #dadada;
  color: #D5A478;
  font-size: 12px;
  cursor: pointer;
  .image-20 {
    transform: rotate(90deg);
    width: 10px;
    padding-right: 0;
  }
  &.first {
    border-top: 1px solid #dadada;
  }
}
.report-list-close {
  cursor: pointer;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 14px;
  right: 14px;
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/usual/close.svg') no-repeat center center;
  background-size: 80% 80%;
}
.assetdetail-list {
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
}
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
.detail-column-right.mobile-only {
  display: none;
}
.detail-column-right.pc-only {
  display: block;
}
.detail-title.no-underline.first {
  margin: 0
}
@media (max-width: 479px) {
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
  .swiper-pagination.row-21 {
    padding: 10px 0;
  }
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
  .detail-gallery-full-wrapper {
    display: none !important;
  }
  .detail-column-right.mobile-only {
    display: block;
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .detail-column-right.pc-only {
    display: none;
  }
  .info-card.detail-relevant.mobile {
    margin-bottom: 10px;
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
  min-width: 135px;
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
  background: url("https://wechat-pics.fangpinduo.com/close.svg") no-repeat center center;
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
.full-screen.full-screen-item {
  height: 150px;
}
.project-docs{
  display: inline-block;
  margin-right: 16px;
  &:hover{
    color:#d5a478;
  }
}
</style>
