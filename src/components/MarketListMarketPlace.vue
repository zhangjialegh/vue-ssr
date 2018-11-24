<template>
  <div>
   <div class="row-73 mobile-row w-row" v-if="model">
      <!-- 订单项目列 -->
      <router-link :to="{path:'/marketDetail',query: {id: item.project_id}}" class="column-1 w-col w-col-4"  v-for="(item,index) in marketList" :key="item.title + index" 
      >
        <market-card-market-place
        v-if="marketList.length > 0" 
        :market-item="item" 
        :idx="index" 
        :len="marketList.length"
        />
      </router-link>
    </div>
    <div class="market-data-view-container" v-else>
      <div class="market-data-view-container-left">
        <div class="market-data-view-title">{{$t('房源')}}</div>
        <div class="market-data-view-left-title" v-for="(item, index) in marketList" :key="item.project_id+item.title+index">{{item.title}}<br/>  <router-link :to="{path:'/marketDetail',query: {id: item.project_id}}" class="to-property">{{$t('查看项目')}} ></router-link></div>
      </div>
      <div class="market-data-view-container-right">
        <div class="market-data-view-box-right">
          <ul class="market-data-view-right-title-ul">
            <li class="market-data-view-right-title mix" v-tooltip.top="{ content: $t('历史平均分红收益率'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('股息率')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50">
            </li>
            <li class="market-data-view-right-title mix" v-tooltip.top="{ content: $t('高于发行价'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('溢价率')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></li>
            <li class="market-data-view-right-title mix max" v-tooltip.top="{ content: $t('高于最新估值'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('估值溢价率')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></li>
            <li class="market-data-view-right-title mix" v-tooltip.top="{ content: $t('卖出价与买入价差价率'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('买卖差价率')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></li>
            <li class="market-data-view-right-title">{{$t('发行价格')}}</li>
            <li class="market-data-view-right-title mix">{{$t('最低成交价')}}</li>
            <li class="market-data-view-right-title mix">{{$t('最新估值')}}</li>
          </ul>
          <ul class="market-data-view-right-body-ul" v-for="(item, index) in marketList" :key="item.project_id+item.title+index">
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              {{toThousandPrt(item.year_avg_rent_rate)}}%
            </li>
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              {{toThousandPrt((item.min_offer_price-item.initial_share_price)/item.initial_share_price)}}%
            </li>
            <li class="market-data-view-right-body-li mix max">
              <i class="market-data-view-table-line"></i>
              {{toThousandPrt((item.min_offer_price-item.wehome_estimate)/item.wehome_estimate)}}%
            </li>
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              {{toThousandPrt((item.min_offer_price-item.max_bid_price)/item.max_bid_price)}}%
            </li>
            <li class="market-data-view-right-body-li">
              <i class="market-data-view-table-line"></i>
              ${{toThousandFix(item.initial_share_price*GLOBAL.minShares, 2)}}
            </li>
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              ${{toThousandFix(item.min_offer_price*GLOBAL.minShares, 2)}}
            </li>
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              ${{toThousandFix(item.wehome_estimate*GLOBAL.minShares, 2)}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils.js'

export default {
  name: 'MarketListMarketPlace',
  props: {
    model: {
      type: Boolean,
      default: true
    },
    marketList: {
      type: Array,
      default: [],
      required: true
    }
  },
  data () { 
    return {
      showTip: false,
      tip: '',
      popTitle: ''
  } },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt
  },
  mounted() {
    const len = this.marketList.length
    this.$emit('getmarket', len)
  }
}
</script>

<style lang="scss" scoped>
.image-50 {
  margin-top: -2px;
}
.to-property {
  color: #C89669;
  padding-left: 8px;
}
@media (max-width: 479px) {
  .column-1.w-col.w-col-4 {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
