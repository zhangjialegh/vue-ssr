<template>
  <div class="card-wrapper-property-2">
    <div class="card property-2">
      <div class="card-img-wrapper property-2" v-lazy:background-image="marketItem.cover_pic_uri">
      </div>
      <div class="card-info-wrapper property-2">
        <div class="card-title property-2 property-2">
          <span class="son-title" :title="marketItem.title">{{marketItem.title}}</span>
        </div>
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
            <div class="card-label text-left">{{$t('人参与投资',{msg:marketItem.investor_count})}}</div>
          </div>
          <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right" :class="{'hidden': marketItem.remain_investment_month <= 0}">
            <div class="card-number text-right">{{$t('个月',{msg:marketItem.remain_investment_month})}}</div>
            <div class="card-label text-right">{{$t('剩余持有时间')}}</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarketCardMarketPlace",
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
     
    };
  },
  methods: {
    showInfo: function (ep) {
      const abs = Math.abs(ep)
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
    }
  }
};
</script>

<style lang="scss" scoped>
.card-wrapper-property-2 {
  margin-bottom: 10px;
}
.image-50 {
  margin-top: -2px;
}
.w-col-tiny-6.text-right.hidden {
  visibility: hidden;
}
.avatar-wrapper {
  text-align: left;
} 
.card {
  overflow: hidden;
}
.card-title{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  display: block;
}
.avatar-last {
  margin-right: 0;
}
.no-margin.text-right {
  text-align: right !important;
}
.card-mata-wrapper-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-meta-wrapper.text-bold.low {
  color: #29A520;
}
.card-meta-wrapper.text-bold.large {
  color: #FF5C00;
}
@media (max-width: 767px) {
  .card-return-row.w-row {
    padding-left: 10px;
    padding-right: 10px;
  }
  .card-info-wrapper.property-2 {
    width: 100%;
  }
}
</style>
