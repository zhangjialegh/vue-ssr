<template>
<div class="mine-section">
    <div class="w-container">
      <h4 class="heading-59">{{$t('租金收益明细')}}</h4>
      <div class="asset-3">
      <div class="asset-1 w-row no-margin">
        <div class="w-col w-col-4">
          <h6 class="top-3-title _2">{{$t('本月收益')}}<span v-if="rentDetail.date_num">({{rentDetail.date_num}}{{$t('天')}})</span></h6>
          <h3 class="top-3-amount" v-if="rentDetail.amount">${{toThousandFix(rentDetail.amount)}}</h3>
          <h3 class="top-3-amount" v-else>{{$t('暂无收益')}}</h3>
        </div>
        <div class="w-col w-col-4" v-if="rentDetail.net_income">
          <h6 class="top-3-title _2">{{$t('房屋本月净收益*认购份额')}}</h6>
          <h3 class="top-3-amount"> {{rentDetail.net_income.value}}*{{toThousandPrt(rentDetail.share_percent)}}%</h3>
        </div>
        <div class="w-col w-col-4">
          <h6 class="top-3-title _2">{{$t('预计首年租金收益')}}</h6>
          <h3 class="top-3-amount" v-if="rentDetail.amount">${{toThousandFix(rentDetail.amount)*12}}</h3>
          <h3 class="top-3-amount" v-else>$0</h3>
        </div>
      </div>
    </div>
      <div class="asset-3 extra">
        <div class="div-block-97">
          <div class="row-50 w-row" v-if="rentDetail.rent_income">
            <div class="w-col w-col-4">
              <h6 class="heading-47 bolder">{{rentDetail.rent_income.name}}</h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">${{toThousandFix(rentDetail.rent_income.value)}}</h6>
            </div>
          </div>
          <div class="row-50 w-row" v-if="rentDetail.fee_outcome" @click="toggleFee">
            <div class="w-col w-col-4">
              <h6 class="heading-47 bolder">{{rentDetail.fee_outcome.name}}</h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49"><img src="https://wechat-pics.fangpinduo.com/website/asset/arrow.svg" width="18" height="14" class="image-50" :class="{'rotate-180': showFee}"> {{rentDetail.fee_outcome.value>0?'':'-'}}${{toThousandFix(rentDetail.fee_outcome.value>0?rentDetail.fee_outcome.value:-rentDetail.fee_outcome.value)}}</h6>
            </div>
          </div>
           <template v-if="rentDetail.fee_outcome">
             <div class="row-50 w-row" v-for="(item,index) in rentDetail.fee_outcome.fee_detail" v-if="showFee" :key="item.name+index">
              <div class="w-col w-col-4">
                <h6 class="heading-47" v-tooltip.top="{ content: item.tip, class: 'tooltip-custom tooltip-other-custom',visible: item.tip?true:false }">{{item.name}}<img v-if="item.tip" src="@/assets/images/info.png" width="12" height="12" class="image-50"></h6>
              </div>
              <div class="w-col w-col-8">
                <h6 class="heading-49">{{item.value>=0?'':'-'}}${{toThousandFix(item.value>0?item.value:-item.value)}}</h6>
              </div>
            </div>
           </template>
          <div class="row-50 w-row" v-if="rentDetail.net_income">
            <div class="w-col w-col-4">
              <h6 class="heading-47 bolder">{{rentDetail.net_income.name}}</h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">{{rentDetail.net_income.value>0?'':'-'}}${{toThousandFix(rentDetail.net_income.value>0?rentDetail.net_income.value:-rentDetail.net_income.value)}}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'revenueDetail',
  data () { return {
    revenueDetail: {},
    rentDetail: {},
    showFee: false
  } },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt,
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'revenue-detail-showfee-toggle',
        action: 'click',
        optLabel: 'toggle',
        page: this.$route.name,
        optValue: {
          showFee: this.showFee
        }
      })
    }))
    toggleFee: function () {
      this.showFee = !this.showFee
    }
  },
  created: function () {
    this.revenueDetail = JSON.parse(this.$route.query.data)
    this.rentDetail = JSON.parse(this.$route.query.data)['rent_detail']
  }
}
</script>

<style lang="scss" scoped>
.list-element-small {
  transform: scale(0.9)
}
.float-right {
  float: right;
}
.w-row.no-margin {
  margin: 0;
}
.image-50.rotate-180 {
  transform: rotate(180deg)
}
.heading-47.bolder {
  font-weight: 500;
  color: #000;
}
.mine-section {
  min-height: calc(100vh - 350px);
}
</style>
