<template>
  <div class="info-card detail">
    <div class="card-title highlight">{{houseDetail.title}}</div>
    <div class="card-progress-wrapper with-underline" v-if="houseDetail.investing">
      <div class="w-row">
        <!-- <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6">
          <div>{{(houseDetail.amount_count/houseDetail.raise_value*100)>95 ? (houseDetail.amount_count/houseDetail.raise_value*100).toFixed(0) : (houseDetail.amount_count/houseDetail.raise_value*100).toFixed(1)}}%</div>
        </div> -->
        <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6">
          <div v-tooltip.bottom="{ content: houseDetail.ultra_raised_tip, class: 'tooltip-custom tooltip-other-custom', visible: houseDetail.ultra_raised_tip?true:false }">{{(houseDetail.amount_count/houseDetail.raise_value*100)>95 ? (houseDetail.amount_count/houseDetail.raise_value*100).toFixed(0) : (houseDetail.amount_count/houseDetail.raise_value*100).toFixed(1)}}%<img v-if="houseDetail.ultra_raised_tip" src="@/assets/images/info.png" width="15" height="15" class="image-50" style="marginTop:-4px"></div>
        </div>
        <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
          <avatars-list :house-detail="houseDetail"/>
          <!-- <div>{{(1-houseDetail.amount_count/houseDetail.raise_value)>0?((1-houseDetail.amount_count/houseDetail.raise_value)*100).toFixed(1):0}}%</div> -->
        </div>
      </div>
      <!-- 暂时去掉进度条 -->
      <div class="card-progress-bar-base">
        <div class="card-progress-bar-done" v-bind:style="{width:houseDetail.amount_count/houseDetail.raise_value*100+'%'}"></div>
      </div>
      <!-- <div class="card-progress-bar-desc">
        <span>已认购股份</span>
        <span>WeHome自持股份</span>
      </div> -->
      <div class="w-row">
        <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6" v-if="houseDetail.raise_value - houseDetail.amount_count > 0">
          <div class="card-number">${{Number.parseInt(houseDetail.raise_value - houseDetail.amount_count).toLocaleString('en-US')}}</div>
          <div class="card-label text-left">{{$t('可认购额')}}</div>
        </div>
        <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6" v-else>
          <div class="card-number">${{Number.parseInt(houseDetail.amount_count - houseDetail.raise_value).toLocaleString('en-US')}}</div>
          <div class="card-label text-left">{{$t('超募金额')}}</div>
        </div>
        <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6" :class="{'hidden': day <= 0}">
          <div class="card-number text-right">{{day}}{{$t('天')}}</div>
          <div class="card-label text-right">{{$t('距离结束')}}</div>
        </div>
      </div>
    </div>
    <div class="detail-right-info-card-row">
      <div class="detail-info-card-data-row w-row">
        <div class="w-col w-col-8 w-col-small-6 w-col-medium-6 w-col-tiny-6">
          <div class="card-label text-left">{{$t('一年期税前净回报率')}}</div>
        </div>
        <div class="w-col w-col-4 w-col-small-6 w-col-medium-6 w-col-tiny-6 text-right">
          <div class="card-number medium text-right">{{((houseDetail.appreciation_rate_one_year_forecast + houseDetail.rental_return_rate_net)*100).toFixed(2)}}%</div>
        </div>
      </div>
      <div class="detail-info-card-data-row w-row">
        <div class="w-col w-col-8 w-col-medium-6 w-col-small-6 w-col-tiny-6">
          <div class="card-label text-left">{{$t('WeHome评分')}}</div>
          
        </div>
        <div class="w-col w-col-4 w-col-medium-6 w-col-small-6 w-col-tiny-6">
          <div class="div-block-47">
            <div class="card-number medium">{{houseDetail.score}}</div>
            <div class="text-block-20" :class="{'diamond':houseDetail.score>=90,'gold':houseDetail.score>=80 && houseDetail.score<90,'silver':houseDetail.score>=70 && houseDetail.score<80,'bronze':houseDetail.score<70}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-right-info-card-row">
      <div class="card-label text-left">{{houseDetail.bed}}{{$t('室')}}{{houseDetail.bath}}{{$t('卫')}}  {{Number.parseInt(houseDetail.size).toLocaleString('en-US')}}sqft({{$t('约平米',{msg:Number.parseInt(houseDetail.size*0.0929).toLocaleString('en-US')})}}) <br>{{$t('建于',{msg:houseDetail.built_year})}}</div>
    </div>
    <div class="detail-right-info-card-row last" v-on:click="mapuri">
      <div class="card-label text-left">{{houseDetail.complete_address}}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'InvestCard',
  props: {
    houseDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    day: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showTip: false,
      tip: ''
    }
  },
  methods: {
    @track(after(function () {
      Track.eventTrack({
        category: 'invest-card-over-invest-tip-popup',
        action: 'click',
        optLabel: 'popup',
        page: this.$route.name,
        optValue: {
          tip: this.tip
        }
      })
    }))
    mapuri: function () {
      const href = this.houseDetail.map_url +'?lng='+ this.houseDetail.longitude +'&lat='+this.houseDetail.latitude+'&addr='+this.houseDetail.complete_address;
      window.open(href)
    }
  }
}
</script>

<style lang="scss" scoped>
.w-col-small-6.w-col-tiny-6.hidden {
  visibility: hidden;
}
.card-number.medium {
  line-height: 18px;
}
</style>
