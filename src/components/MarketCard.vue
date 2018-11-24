<template>
  <router-link :to="idx!=len-1?{path:'/marketDetail',query: {id: marketItem.project_id}}:{path:$route.fullPath}">
    <div class="card">
      <div class="card-child">
        <div v-if="idx==len-1" class="card-wrapper-shadow">
          <span class="card-shadow-soon">{{$t('更多项目')}}</span>
          <span class="card-shadow-soon">{{$t('即将到来')}}</span>
        </div>
        <div class="card-img-wrapper"><img v-lazy="marketItem.cover_pic_uri+'?imageView2/1/w/310/h/190/interlace/1'" sizes="(max-width: 767px) 300px, (max-width: 991px) 230.125px, 300.09375px"></div>
        <div class="card-info-wrapper">
          <div class="card-title" :title="marketItem.title">{{marketItem.title}}</div>
          <div class="card-return-row w-row">
            <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <div class="card-number">${{Number.parseInt((marketItem.current_property_value)).toLocaleString('en-US')}}</div>
              <div class="card-label text-left">{{$t('WeHome资产估值')}}</div>
            </div>
            <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right">
              <div class="card-number text-right">{{((marketItem.year_avg_rent_rate*100)).toFixed(2)}}%</div>
              <div class="card-label text-right">{{$t('分红收益率')}}</div>
            </div>
          </div>

          <div class="div-block-50" v-tooltip.top.prevent.stop="{ content: showInfo(marketItem.estimate_percent), class: 'tooltip-custom tooltip-other-custom', visible: showInfo(marketItem.estimate_percent)!=''}">
            <div class="card-mata-wrapper-center">
              <div class="card-meta-wrapper text-bold" :class="{'low':estimateStep(marketItem.estimate_percent)<0,'large':estimateStep(marketItem.estimate_percent)>0}">{{estimateValue(marketItem.estimate_percent,marketItem.wehome_estimate)}}</div>
            </div>
            <div class="card-mata-wrapper-center">
              <div class="card-label">{{estimateLabel(marketItem.estimate_percent)}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-if=" Math.abs(marketItem.estimate_percent) < 0.5"></div>
            </div>
          </div>

          <div class="card-return-row no-border w-row">
            <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <avatars-list :house-detail="marketItem" class="avatar-wrapper"></avatars-list>
              <div class="card-label text-left">{{$t('人参与投资',{msg: marketItem.investor_count})}}</div>
            </div>
            <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right" :class="{'hidden': marketItem.remain_investment_month <= 0}">
              <div class="card-number text-right">{{marketItem.remain_investment_month}}个月</div>
              <div class="card-label text-right">{{$t('剩余持有时间')}}</div>
            </div>
          </div>

          <!-- <div class="card-return-row no-border w-row">
            <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <div class="card-number">${{Number.parseInt((marketItem.five_year_total_return)).toLocaleString('en-US')}} / 5年</div>
              <div class="card-label text-left">剩余持有时间</div>
            </div>
            <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <div class="div-block-47">
                <div class="card-number">{{marketItem.score}}</div>
                <div class="text-block-20" :class="{'diamond':marketItem.score>=90,'gold':marketItem.score>=80 && marketItem.score<90,'silver':marketItem.score>=70 && marketItem.score<80,'bronze':marketItem.score<70}"></div>
              </div>
              <div class="card-label text-right">24人已参与</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    
  </router-link>
</template>

<script>
 import {GET_QUESTION_INVESTIGATION_ACTION} from '@/scenes/investing/modules'

export default {
  name: "MarketCard",
  props: {
    marketItem: {
      type: Object,
      default: function() {
        return {};
      }
    },
    idx: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    len: {
      type: Number,
      default: function() {
        return 0;
      }
    }
  },
  data() {
    return {
      turnQuenstionares: false
    };
  },
  methods: {
    showInfo: function (ep) {
      const abs = Math.abs(ep)
      console.log(abs,'abs  abs');
      
      if(abs >= 0.5) {
        return ''
      } else if (ep > 0) {
        return this.$t('GLOBAL.largeTag')
      } else if (ep == 0) {
        return this.$t('GLOBAL.sameTag')
      } else {
        return this.$t('GLOBAL.lowTag')
      }
    },
    estimateStep(ep) {
      const abs = Math.abs(ep)
      if(abs >= 0.5) {
        return 0
      } else if (ep >=0) {
        return 1
      } else {
        return -1
      }
    },
    estimateValue(ep, es) {
      const abs = Math.abs(ep)
      if(abs >= 0.5) {
        return '$'+(es*this.GLOBAL.minShares).toFixed(2)
      } else if (ep >=0) {
        return '+'+(ep*100).toFixed(2)+'%'
      } else {
        return (ep*100).toFixed(2)+'%'
      }
    },
    estimateLabel(ep) {
      const abs = Math.abs(ep)
      if(abs >= 0.5) {
        return this.$t('WeHome估价')
      } else if (ep >=0) {
        return this.$t('高于最新估价')
      } else {
        return this.$t('低于最新估价')
      }
    },
    getQuestionnaire() {
      const that = this
      this.$store.dispatch(GET_QUESTION_INVESTIGATION_ACTION,{}).then((res)=>{
        if (res.categories) {
            that.turnQuenstionares = true
          } else {
            that.turnQuenstionares = false
          }
      })
    },
  },
  computed:{
    auth() {
      return this.$store.state.auth.auth
    }
  },
  mounted() {
    if (this.auth.isLoggedIn) {
        this.getQuestionnaire()
      }
  }
};
</script>

<style lang="scss" scoped>
.card-img-wrapper {
  height: 170px;
}
.image-50 {
  margin-top: -2px;
}
.avatar-wrapper {
  text-align: left;
} 
.card-img-wrapper > img {
  height: 100%;
  width: 100%;
}
.card {
  overflow: hidden;
}
.avatar-last {
  margin-right: 0;
}
.no-margin.text-right {
  text-align: right !important;
}
.w-col-tiny-6.text-right.hidden {
  visibility: hidden;
}
.card-mata-wrapper-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-title{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    display: block;
}
.card-child {
  width: 100%;
  height: 100%;
  position: relative;
}
.card-wrapper-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/market-come-soon.png') no-repeat center center;
  background-size: 100% 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.card-shadow-soon {
  font-size: 15px;
  color: #fff;
}
.card-meta-wrapper.text-bold.low {
  color: #29A520;
}
.card-meta-wrapper.text-bold.large {
  color: #FF5C00;
}
</style>
