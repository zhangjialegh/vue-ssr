<template>
  <div class="container w-container">
    <pop-box :show-tip="showTip" :tip="tip">
        <div class="w-row">
          <div class="column-55 w-col w-col-6 single-btn"><a href="javascript:;" class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
        </div>
      </pop-box>

    <div class="home-section-title" v-if="displayTitle">{{$t('投资项目')}}</div>
    <invest-slot v-if="model">
      <swiper class="card-scroll-container" :options="swiperOption" ref="investSwiper" v-if="onsaleList.length > 0">
        <swiper-slide v-for="(item, index) in onsaleList" :key="item.title+index">
          <!-- 未解锁房源遮罩 -->
          <div class="card-filter" v-if="item.project_status<=3 && (!permission || (reviewStatus==GLOBAL.qesProcess&&permission))" @click="qesNeedReview(item)">
            <p class="filter-title">{{$t('完成投资评估问卷')}}</p>
            <p class="filter-p">{{$t('参与合投用户专享优质收益')}}</p>
            <a class="filter-btn">{{reviewStatus==GLOBAL.qesProcess?$t('评估问卷审核中'):$t('立即解锁最新项目')}}</a>
          </div>
          <!-- 即将上线房源遮罩 -->
          <div style="display:none;" class="card-filter coming-soon" v-if="item.project_status==GLOBAL.PROJECT_STATUS_PREPARE && model">
            <p class="filter-title soon">{{$t('即将上线敬请期待')}}</p>
            <p class="filter-p soon">{{$t('项目名称标题')}}</p>
            <p class="filter-title soon">{{$t('收益区间')}}：<span>8%-12%</span></p>
            <ul class="coming-soon-list">
              <li>{{$t('人口净流入租金较高')}}</li>
              <li>{{$t('休斯顿火箭队主场')}}</li>
              <li>{{$t('美国第七大都会区')}}</li>
            </ul>

            <a class="buttons step w-button" style="margin-top: 30px;" @click="createSubscriptionOrder">{{$t('支付定金锁定份额')}}</a>
          </div>
          <a class="card highlight-card" :class="{hidden: item.project_status<=GLOBAL.PROJECT_STATUS_OPEN_SALE && (!permission || (reviewStatus==GLOBAL.qesProcess&&permission))}" @click="qesNeedReview(item)">
            
            <div class="home-highlight-img" v-lazy:background-image="item.cover_pic_uris[0]+'?imageView2/1/w/620/h/390/interlace/1'">
            
            <div class="project-brand" v-if="item.project_status!=GLOBAL.PROJECT_STATUS_SUCCESS">{{item.phase_name}}</div>
            </div>
            <div class="w-row">
              <div class="w-col w-col-8"></div>
              <div class="highlight-info-wrapper w-col w-col-4">
                <div class="card-title highlight white-space">{{item.title}}</div>
                <div class="card-return-row highlight w-row">
                  <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
                    <div class="card-number red">{{((item.appreciation_rate_one_year_forecast + item.rental_return_rate_net) * 100).toFixed(2)}}%</div>
                    <div class="card-label text-left">{{$t('预期年化收益')}}</div>

                    <i class="activity-plus" v-if="item.activity">+</i>
                    <i class="activity-container" v-if="item.activity">{{item.activity.act_display_name}}</i>
                  </div>
                  <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
                    <div class="card-number text-center">{{item.investment_year}}{{$t('年')}}</div>
                    <div class="card-label">{{$t('收益周期')}}</div>
                  </div>
                  <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
                    <div class="card-number text-right">${{Number.parseInt(item.initial_value-item.loan_value).toLocaleString('en-US')}}</div>
                    <div class="card-label text-right">{{$t('项目总价')}}</div>
                  </div>
                </div>
                <div class="card-return-row highlight w-row">
                  <i class="cube-arrow-top"></i>
                  <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
                    <div class="card-number">{{(( item.rental_return_rate_net) * 100).toFixed(2)}}%</div>
                    <div class="card-label text-left">{{$t('租金收益率')}}</div>
                  </div>

                  <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4" :class="{'ratio-plus-center-wrapper': !item.activity || !item.activity.add_percent}">
                    <template v-if="item.activity">
                      <i class="ratio-plus-singel prev">+</i>
                      <div class="card-number text-center" v-if="item.activity && item.activity.add_percent">{{(item.activity.add_percent).toFixed(2)}}%</div>
                      <div class="card-label" v-if="item.activity && item.activity.act_desc">{{item.activity.act_desc}}</div>
                      <i class="ratio-plus-singel next">+</i>
                    </template>
                    <i class="ratio-plus-center" v-else>+</i>
                  </div>

                  <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
                    <div class="card-number text-right">{{((item.appreciation_rate_one_year_forecast) * 100).toFixed(2)}}%</div>
                    <div class="card-label text-right">{{$t('增值收益率')}}</div>
                  </div>
                </div>
                <div class="card-progress-wrapper">
                  <template v-if="item.project_status !=GLOBAL.PROJECT_STATUS_SUCCESS">
                    <div class="w-row">
                      <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6">
                        <div v-tooltip.top="{ content: item.ultra_raised_tip, class: 'tooltip-custom tooltip-other-custom', visible: item.ultra_raised_tip?true:false}">{{(item.amount_count/item.raise_value*100)>95 ? (item.amount_count/item.raise_value*100).toFixed(0) : (item.amount_count/item.raise_value*100).toFixed(1)}}%<img v-if="item.ultra_raised_tip" src="@/assets/images/info.png" width="15" height="15" class="image-50" style="marginTop:-4px"></div>
                      </div>
                      <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
                        <avatars-list :house-detail="item"></avatars-list>
                        <!-- <div>{{(1-item.amount_count/item.raise_value)>0?((1-item.amount_count/item.raise_value)*100).toFixed(1):0}}%</div> -->
                      </div>
                    </div>
                    <!-- 暂时隐藏进度条 -->
                    <div class="card-progress-bar-base">
                      <div class="card-progress-bar-done" v-bind:style="{width:item.amount_count/item.raise_value*100+'%'}"></div>
                    </div>
                    <!-- <div class="card-progress-bar-desc">
                      <span>已认购股份</span>
                      <span>WeHome自持股份</span>
                    </div> -->
                    <div class="w-row">
                      <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6" v-if="item.raise_value - item.amount_count >= 0">
                        <div class="card-number">${{Number.parseInt(item.raise_value - item.amount_count).toLocaleString('en-US')}}</div>
                        <div class="card-label text-left">{{$t('可认购额')}}</div>
                      </div>

                      <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6" v-else>
                        <div class="card-number">${{Number.parseInt(item.amount_count - item.raise_value).toLocaleString('en-US')}}</div>
                        <div class="card-label text-left">{{$t('超募金额')}}</div>
                      </div>

                      <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6" :class="{'hidden': dayArr[index] <= 0}">
                        <div class="card-number text-right">{{dayArr[index]}}{{$t('天')}}</div>
                        <div class="card-label text-right">{{$t('距离结束')}}</div>
                      </div>
                    </div>
                  </template>
                  

                  <!-- 项目完成展示状态 -->
                  <div v-if="item.project_status==GLOBAL.PROJECT_STATUS_SUCCESS" class="invest-finish-icon" :style="{'background-image':`url(${$i18n.locale==GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/image/project/project_finished.png':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/success.png'})`}">
                    <div class="w-row invest-finish-extra">
                      <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6">
                        <div class="card-number font14">{{item.fundraising_duration?item.fundraising_duration:'7'+$t('天')}}</div>
                        <div class="card-label text-left">{{$t('募集周期')}}</div>
                      </div>
                    </div>
                    <div class="w-row">
                      <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-left">
                        <avatars-list :house-detail="item" class="avatar-wrapper text-left"></avatars-list>
                        <div class="card-label text-left">{{$t('人参与合投',{msg: item.investor_count})}}</div>
                      </div>
                      <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right">
                        <div class="card-number text-right">${{Number.parseInt(item.amount_count).toLocaleString('en-US')}}</div>
                        <div class="card-label text-right">{{$t('募集金额')}}</div>
                      </div>
                    </div>
                  </div>
                  
                  <a class="button card-button w-button">
                    {{item.project_status > 3 ? $t('查看合投房源'):$t('立即参与合投')}}
                  </a>
                </div>
              </div>
            </div>
          </a>
        </swiper-slide>
        <div class="swiper-pagination-invest"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> 
      </swiper>
    </invest-slot>
    <div class="market-data-view-container" v-else>
      <div class="market-data-view-container-left">
        <div class="market-data-view-title">{{$t('房源')}}</div>
        <div class="market-data-view-left-title" v-for="(item, index) in onsaleList" :key="item.id+item.title+index" v-if="item.project_status>GLOBAL.PROJECT_STATUS_PREPARE">{{item.title}}<br/>  <router-link :to="{path:'/property',query: {project_id: item.id}}" class="to-property">{{$t('查看项目')}} ></router-link></div>
      </div>
      <div class="market-data-view-container-right">
        <div class="market-data-view-box-right">
          <ul class="market-data-view-right-title-ul">
            <li class="market-data-view-right-title mix max">{{$t('预期年化收益')}}</li>
            <li class="market-data-view-right-title">{{$t('收益周期')}}</li>
            <li class="market-data-view-right-title mix">{{$t('项目总价')}}</li>
            <li class="market-data-view-right-title">{{$t('租金收益率')}}</li>
            <li class="market-data-view-right-title mix max">{{$t('首年租金加息收益率')}}</li>
            <li class="market-data-view-right-title mix max">{{$t('首年租金收益翻倍')}}</li>
            <li class="market-data-view-right-title mix">{{$t('增值收益率')}}</li>
            <li class="market-data-view-right-title mix">{{$t('可认购额')}}</li>
          </ul>
          <ul class="market-data-view-right-body-ul" v-for="(item, index) in onsaleList" :key="item.id+item.title+index" v-if="item.project_status>GLOBAL.PROJECT_STATUS_PREPARE">
            <li class="market-data-view-right-body-li mix max">
              <i class="market-data-view-table-line"></i>
              {{toThousandPrt(item.appreciation_rate_one_year_forecast + item.rental_return_rate_net)}}%({{item.project_status>GLOBAL.PROJECT_STATUS_OPEN_SALE?$t('已完成'):$t('进行中')}})
            </li>
            <li class="market-data-view-right-body-li">
              <i class="market-data-view-table-line"></i>
              {{item.investment_year}}{{$t('年')}}
            </li>
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              ${{toThousandFix((item.initial_value-item.loan_value), 0)}}
            </li>
            <li class="market-data-view-right-body-li">
              <i class="market-data-view-table-line"></i>
              {{toThousandPrt((item.rental_return_rate_net))}}%
            </li>
            <li class="market-data-view-right-body-li mix max">
              <i class="market-data-view-table-line"></i>
              {{item.activity && item.activity.add_percent?toThousandPrt(item.activity.add_percent/100)+'%':$t('无')}}
            </li>
            <li class="market-data-view-right-body-li mix max">
              <i class="market-data-view-table-line"></i>
              {{item.activity && !item.activity.add_percent?$t('是'):$t('否')}}
            </li>
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              {{toThousandPrt((item.appreciation_rate_one_year_forecast))}}%
            </li>
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              {{item.project_status>GLOBAL.PROJECT_STATUS_OPEN_SALE?$t('已完成'):'$'+toThousandFix((item.raise_value - item.amount_count), 0)}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { track, after } from 'trackpoint-tools'
  import Track from '@/track'
  import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils.js'
  import {CREATE_SUBSCRIPTION_ORDER_ACTION} from '@/scenes/investing/modules'
  export default {
    name: 'InvestComponent',
    props: {
      model: {
        type: Boolean,
        default: true
      },
      displayTitle: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dayArr: [],
        hArr: [],
        minArr: [],
        secArr: [],
        showTip: false,
        tip: '',
        swiperOption: {
            slidesPerView: 1,
            pagination: {
              el: '.swiper-pagination-invest'
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          },
          show: false,
      }
    },
    methods: {
      toThousandPrt,
      toThousandFix,
      createSubscriptionOrder: function () {
        const that = this
        this.$store.dispatch(CREATE_SUBSCRIPTION_ORDER_ACTION,{}).then((res)=>{
          that.$router.push({
              path: '/pay',
              query: {
                order_id: res.order_id
              }
            })
        })
      },
      qesNeedReview: function (item) {
        if(item.project_status > 3) {
          this.$router.push({
            path: '/property',
            query: {
              project_id: item.id,
              status: item.project_status
            }
          })
        } else if(this.reviewStatus==this.GLOBAL.qesProcess) {
          const tip = this.$t('GLOBAL.NEED_REVIEW_TIP')
          this.$options.methods.popTip.call(this, tip)
        } else if(this.permission) {
          this.$router.push({
            path: '/property',
            query: {
              project_id: item.id,
              status: item.project_status
            }
          })
        } else {
          this.$router.push({
            path: '/questionnaire',
            query: {
              project_id: item.id
            }
          })
        }
      },
      popTip: function (tips) {
          if (tips) {
            this.showTip = true
            this.tip = tips
          }
        },
      closePopTip : function () {
          this.showTip = false
      },
      investCountDown: function () {
      const endTimeArr = this.endTimeArr
      const that = this
      clearInterval(this.timer)
      this.timer = setInterval(function () {
        const day = []
        const h = []
        const min = []
        const sec = []
        for (let i = 0; i < endTimeArr.length; i++) {
          const currentTime = new Date().getTime()
          const timeLeft = (endTimeArr[i] - currentTime / 1000)
          if (timeLeft <= 0) {
            day[i] = h[i] = min[i] = sec[i] = 0
          } else {
            day[i] = Math.floor(timeLeft / 60 / 60 / 24)
            h[i] = Math.floor(timeLeft / 60 / 60 - day[i] * 24)
            min[i] = Math.floor((timeLeft - day[i] * 24 * 60 * 60 - h[i] * 60 * 60) / 60)
            sec[i] = Math.floor(timeLeft % 60)
          }
        }
        that.dayArr = day
        that.hArr = h
        that.minArr = min
        that.secArr = sec
      }, 1000)
    },
    },
    mounted () {
      this.investCountDown()
    },
    computed: {
      swiper() {
        return this.$refs.investSwiper.swiper
      },
      onsaleList() {
        const {onsaleList} = this.$store.state.invest
        return onsaleList
      },
      endTimeArr() {
        const {onsaleList} = this.$store.state.invest
        let timer = []
        if (onsaleList.length) {
          for (let i = 0; i < onsaleList.length; i++) {
            const item = onsaleList[i]
            var deltaTime = item.phase_end - new Date().getTime() / 1000
            timer[i] = item.phase_end
          }
        }
        return timer
      },
      reviewStatus() {
        return this.$store.state.auth.user.reviewStatus
      },
      permission() {
        return this.$store.state.auth.user.permission
      },
      auth() {
        return this.$store.state.auth.auth
      }
    },
    destroyed () {
      clearInterval(this.timer)
    },
  }
</script>
<style lang="scss">
.home-highlight-img {
  overflow: hidden;
}
 .blur {
   position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
    width: 100%;
    height: 100%;
    overflow: hidden;
    filter: url(https://wechat-pics.fangpinduo.com/wehome/website/static/image/blur.png); /* FireFox, Chrome, Opera */
    -webkit-filter: blur(10px); /* Chrome, Opera */
       -moz-filter: blur(10px);
        -ms-filter: blur(10px);    
            filter: blur(10px);
    
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
  }
.card-filter {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/jiesuo.png') no-repeat center center;
  background-size: cover;
  &.coming-soon {
    background: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/coming-soon.png') no-repeat center center;
    background-size: cover;
  }
  .filter-title {
    font-size: 16px;
    color: #fff;
    line-height: 22px;
    text-align: center;
    &.soon {
      color: #000;
    }
    span {
      color: #FF5000;
    }
  }
  .filter-p {
    font-size: 16px;
    color: #fff;
    line-height: 50px;
    text-align: center;
    font-weight: 500;
    &.soon {
      color: #000;
      line-height: 25px;
    }
  }
  .filter-btn {
    display: block;
    background: #C89669;
    height: 35px;
    border-radius: 16px;
    line-height: 35px;
    color: #fff;
    text-align: center;
    padding: 0 20px;
    cursor: pointer;
  }
}
.coming-soon-list {
  margin-top: 30px;
  padding-left: 0;
  font-size: 13px;
  line-height: 20px;
  color: #000;
  li {
    padding-left: 10px;
  }
}
.image-50 {
  margin-top: -2px;
}
.to-property {
  color: #C89669;
  padding-left: 8px;
}
.project-brand {
  position:absolute;
  top:17px;
  left:-120px;
  height:26px;
  width:300px;
  transform:rotate(-45deg);
  background-color:#D64834;
  color:white;
  font-size:12px;
  text-align:center;
  line-height:26px;
}
.card.highlight-card.hidden {
  visibility: hidden;
}

@media (max-width: 767px) {
  .home-highlight-img {
    position: relative;
  }
}
.highlight-card {
  display: block;
  overflow: hidden;
}
.card-title.white-space {
  white-space: pre-wrap;
}
.swiper-pagination-invest {
  margin-top: 10px;
  text-align: center;
  display: none;
}
.invest-finish-icon {
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}
.w-row.invest-finish-extra {
  padding-bottom: 10px;
}
.card-number.font14 {
  font-size: 14px;
}
.w-col-small-6.w-col-tiny-6.hidden {
  visibility: hidden;
}
@media (max-width: 479px) {
  .swiper-pagination-invest {
    display: block;
  }
}
.card-progress-bar-base.spec {
  border-radius: 0;
}
.card-progress-bar-done.spec {
  border-radius: 0;
  background: #d5a478;
}
.avatar-wrapper.text-left {
  text-align: left;
}
.activity-plus {
  position: absolute;
  top: 0;
  right: 30px;
}
.activity-container {
  position: absolute;
  display: block;
  width: 60px;
  height: 20px;
  background: url('https://wechat-pics.fangpinduo.com/invest/xianshijiaxi.png') no-repeat center center;
  background-size: contain;
  line-height: 20px;
  text-align: center;
  top: 0;
  right: -27px;
  color: #fff;
  font-size: 12px;
  transform: scale(0.8)
}
.no-margin.text-right {
  text-align: right !important;
}
</style>
