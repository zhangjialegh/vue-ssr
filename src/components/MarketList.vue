<template>
  <div>
    <div class="card-scroll-container-wrapper" v-if="model">
      <swiper class="card-scroll-container" :options="swiperOption" ref="mySwiper">
        <swiper-slide class="card-scroll-wrapper" v-for="(item, index) in marketList" :key="item.title+item.zipcode+index">
          <market-card 
          v-if="marketList.length > 0" 
          :market-item="item" 
          :idx="index" 
          :len="marketList.length"
          />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="market-data-view-container" v-else>
      <div class="market-data-view-container-left">
        <div class="market-data-view-title">{{$t('房源')}}</div>
        <div class="market-data-view-left-title" v-for="(item, index) in marketList" :key="item.project_id+item.title+index" v-if="index!=marketList.length-1">{{item.title}}<br/>  <router-link :to="{path:'/marketDetail',query: {id: item.project_id}}" class="to-property">{{$t('查看项目')}} ></router-link></div>
      </div>
      <div class="market-data-view-container-right">
        <div class="market-data-view-box-right">
          <ul class="market-data-view-right-title-ul">
            <li class="market-data-view-right-title" v-tooltip.top="{ content: $t('历史平均分红收益率'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('股息率')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50">
            </li>
            <li class="market-data-view-right-title mix" v-tooltip.top="{ content: $t('高于发行价'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('溢价率')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></li>
            <li class="market-data-view-right-title mix max" v-tooltip.top="{ content: $t('高于最新估值'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('估值溢价率')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></li>
            <li class="market-data-view-right-title mix" v-tooltip.top="{ content: $t('卖出价与买入价差价率'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('买卖差价率')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></li>
            <li class="market-data-view-right-title mix">{{$t('发行价格')}}</li>
            <li class="market-data-view-right-title mix">{{$t('最低成交价')}}</li>
            <li class="market-data-view-right-title mix">{{$t('最新估值')}}</li>
          </ul>
          <ul class="market-data-view-right-body-ul" v-for="(item, index) in marketList" :key="item.project_id+item.title+index" v-if="index!=marketList.length-1">
            <li class="market-data-view-right-body-li">
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
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              ${{toThousandFix(item.initial_share_price, 2)}}
            </li>
            <li class="market-data-view-right-body-li mix">
              <i class="market-data-view-table-line"></i>
              ${{toThousandFix(item.min_offer_price, 2)}}
            </li>
            <li class="market-data-view-right-body-li">
              <i class="market-data-view-table-line"></i>
              ${{toThousandFix(item.wehome_estimate, 2)}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GET_RESALE_LIST_ACTION} from '@/scenes/investing/modules'
import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils.js'

export default {
  name: 'MarketList',
  props: {
    model: {
      type: Boolean,
      default: true
    }
  },
  data () { 
    return {
    marketList: [],
      showTip: false,
      tip: '',
      popTitle: '',
      swiperOption: {
        effect: this.effect,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      }
  } },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt,
    getMarketList: function () {
      const that = this
      this.$store.dispatch(GET_RESALE_LIST_ACTION,{}).then((result)=>{
        let list = result.resale_list
          const len = result.resale_list?result.resale_list.length:0
          list.push(list[0])
          list.forEach((item)=>{
              item.investor_avatar = item.members.map((avatar)=>{
                return avatar.wechat_avatar_uri
              }).slice(0,4)
              item.investor_count = item.members.length
          })
          that.$emit('getmarket', len)
          that.marketList = list
      })
    },
  },
  computed: {
    swiper() {
        return this.$refs.mySwiper.swiper
      }
  },
  mounted () {
    this.getMarketList() 
  }
}
</script>

<style lang="scss" scoped>
.card-scroll-wrapper {
  width: 310px;
}
.card-scroll-container {
  padding: 5px 0;
}
.image-50 {
  margin-top: -2px;
}
.to-property {
  color: #C89669;
  padding-left: 8px;
}
</style>
