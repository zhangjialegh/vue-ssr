<template>
  <div>
    <div class="mine-title">{{$t('我的交易')}}</div>
    <div class="row-73 mobile-row w-row" v-if="orderList.length > 0">
      <!-- 订单项目列 -->
      <a class="column-1 w-col w-col-4" v-for="(dealItem,index) in orderList.slice(0, loadingNum)" :key="dealItem.title + index">
        <div class="card-wrapper-property-2">
          <div class="card property-2 over-hidden">
            <div class="card-operation-more" @click="dropdown(dealItem.id)" @mouseenter="dropdown(dealItem.id)"
              @mouseleave="dropback" v-if="dealItem.order_status<2">
              <div class="dropdown w-dropdown">
                <i class="market-operation-more"></i>
                <nav class="w-dropdown-list nav-dropdown-list" :class="{'w--open': dealItem.id == openNavId}">
                  <a class="login-item w-dropdown-link" @click.stop.prevent="popTip(dealItem.id)">{{$t('取消订单')}}</a>
                </nav>
              </div>
            </div>
            <div class="card-img-wrapper property-2" v-lazy:background-image="dealItem.image_url">
              <div class="project-brand bids" v-if="dealItem.order_type==0">{{$t('股份买入')}}</div>
              <div class="project-brand offers" v-else>{{$t('股份卖出')}}</div>
            </div>
            <div class="card-info-wrapper property-2">
              <div class="card-title property-2 flex">
                <span class="son-title">{{dealItem.title}}</span>
                <span class="left-label" :class="{'hidden': dealItem.left_day<=0}">{{$t('剩余天',{msg: dealItem.left_day >
                  9 ? dealItem.left_day : '0'+dealItem.left_day})}}</span>
              </div>
              <ul class="unordered-list-6">
                <li class="property-2-card-list">
                  <div>{{$t('价格')}}</div>
                  <div>${{toThousandFix(dealItem.price*GLOBAL.minShares)}}</div>
                </li>
                <li class="property-2-card-list">
                  <div>{{$t('数量')}}</div>
                  <div>{{toThousandFix(dealItem.share_num/GLOBAL.minShares, 0)}}{{$t('手')}}</div>
                </li>
                <li class="property-2-card-list">
                  <div>{{$t('已成交数量')}}</div>
                  <div>{{toThousandFix(dealItem.traded_num/GLOBAL.minShares, 0)}}{{$t('手')}}</div>
                </li>
                <!-- <li class="property-2-card-list">
                    <div>挂单时间</div>
                    <div>TODO</div>
                  </li> -->
                <router-link :to="{path:'/marketDetail',query:{id:dealItem.project_id}}" class="property-2-card-list">
                  <a class="div-block-124">
                    <div>{{$t('市场详情')}}</div>
                  </a>
                  <div>{{$t('查看')}}<img src="@/assets/images/shi-arrow-right.svg" width="12" height="12"></div>
                </router-link>
              </ul>
              <div class="property-2-multi-btn markert" :class="{pending:dealItem.order_status,}">
                <a class="text-block-50 offers" :class="{active:dealItem.order_status<=2,end:dealItem.order_status>2}"
                  @click="showDealQrCode(dealItem.order_status)">
                  {{
                  dealItem.order_status == 0
                  ? $t('挂单中')
                  : dealItem.order_status == 1
                  ? $t('已成交')+toThousandFix(dealItem.traded_num/GLOBAL.minShares, 0) +
                  $t('手剩余')+toThousandFix(dealItem.share_num-dealItem.traded_num/GLOBAL.minShares, 0)+$t('手关注公众号')
                  : dealItem.order_status == 2
                  ? $t('完成成交')+toThousandFix(dealItem.traded_num/GLOBAL.minShares, 0)+$t('手关注公众号')
                  : dealItem.order_status == 3
                  ? $t('订单超时已取消')+toThousandFix(dealItem.traded_num/GLOBAL.minShares, 0)+$t('手')
                  : dealItem.order_status == 4
                  ? $t('订单取消最终成交')+toThousandFix(dealItem.traded_num/GLOBAL.minShares, 0)+$t('手')
                  : $t('订单错误请联系客服')
                  }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </a>

    </div>
    <div class="asset-1 border" v-else>
      <div class="row-63 w-row border-bottom">{{$t('暂无详情')}}</div>
    </div>
    <loading-more v-if="orderList.length > 0" :list-arr="orderList" :loading-num="loadingNum" @loading="loadingMore"></loading-more>
    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6">
          <a href="javascript:;" class="button-13 w-button" @click="closePopTip">{{$t('暂不取消')}}</a>
        </div>
        <div class="column-55 w-col w-col-6">
          <a href="javascript:;" class="button-14 w-button" @click="cancelMarketOrder">{{$t('确定取消')}}</a>
        </div>
      </div>
    </pop-box>

    <div class="tiyanjin-service-wrapper" v-if="showDealQr">
      <div class="tiyanjin-wrapper">
        <div class="tiyanjin-service-head">
          <div class="text-block-60">{{$t('长按或扫码关注')}}，<br></div>
          <div class="text-block-60">{{$t('及时查收交易通知')}}<br></div>
        </div><img src="https://wechat-pics.fangpinduo.com/wehome/website/dealist-qrcode.png" class="tiyanjin-service-img">
        <div class="tiyanjin-service-foot">
        </div>
        <div class="tiyanjin-wrapper-close" @click="closeDealQrCode"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    GET_USER_RESALE_MYORDER_ACTION,
    GET_USER_RESALE_CANCEL_ACTION
  } from '@/scenes/mine/modules'
  import {
    formatHouseDate,
    toThousandFix,
    toThousandPrt
  } from '@/utils/utils'
  import {
    track,
    after
  } from 'trackpoint-tools'
  import Track from '@/track'

  export default {
    name: 'dealList',
    data() {
      return {
        orderList: [],
        showTip: false,
        orderId: null,
        tip: '',
        openNavId: -1,
        showDealQr: false,
        loadingNum: 6
      }
    },
    methods: {
      toThousandFix: toThousandFix,
      toThousandPrt: toThousandPrt,
      loadingMore(msg) {
        this.loadingNum = msg
      },
      navigateToMarket(id) {
        this.$router.push({
          path: '/marketDetail',
          query: {
            id
          }
        })
      },
      @track(after(function () {
        Track.eventTrack(this.$store,{
          category: 'dealist-open-dealqr-button',
          action: 'click',
          optLabel: 'button',
          page: this.$route.name,
          optValue: {
            showDealQr: this.showDealQr
          }
        })
      }))
      showDealQrCode: function (status) {
        if (status > 2) return;
        this.showDealQr = true;
      },
      @track(after(function () {
        Track.eventTrack(this.$store,{
          category: 'dealist-close-dealqr-button',
          action: 'click',
          optLabel: 'button',
          page: this.$route.name,
          optValue: {}
        })
      }))
      closeDealQrCode: function () {
        this.showDealQr = false;
      },
      dropdown: function (id) {
        this.openNavId = id
      },
      dropback: function () {
        this.openNavId = -1
      },
      getOrderList: function () {
        const that = this
        this.$store.dispatch(GET_USER_RESALE_MYORDER_ACTION)
        .then((res)=>{
          that.orderList = res.orders.map((item) => {
            let leftDay;
            const end = item.end_time
            const delta = end - Date.now() / 1000
            if (delta > 0) {
              leftDay = Math.ceil(delta / 60 / 60 / 24)
            } else {
              leftDay = 0
            }
            switch (item.order_status) {
              case 0:
                item.order_desc = that.$t('取消订单')
                break;
              case 1:
                item.order_desc = that.$t('部分成交取消订单')
                break;
              case 2:
                item.order_desc = that.$t('订单全部成交')
                break;
              case 3:
                item.order_desc = that.$t('订单超时取消')
                break;
              case 4:
                item.order_desc = that.$t('订单已取消')
                break;
              default:
                item.order_desc = that.$t('取消订单')
                break;
            }
            item.left_day = leftDay
            return item
          })
          that.showTip = false
        })
      },
      @track(after(function () {
        Track.eventTrack(this.$store,{
          category: 'deallist-cancel-tip-sure',
          action: 'click',
          optLabel: 'popup',
          page: this.$route.name,
          optValue: {
            tip: this.tip
          }
        })
      }))
      cancelMarketOrder() {
        const that = this
        this.$store.dispatch(GET_USER_RESALE_CANCEL_ACTION,{
          order_id: this.orderId
        }).then(()=>{
          that.$options.methods.getOrderList.call(that)
        })
      },
      @track(after(function () {
        Track.eventTrack(this.$store,{
          category: 'deallist-cancel-order-tip-popup',
          action: 'click',
          optLabel: 'popup',
          page: this.$route.name,
          optValue: {
            tip: this.tip
          }
        })
      }))
      popTip(id) {
        this.showTip = true
        this.orderId = id
        this.tip = this.$t('确定要取消交易订单')
      },
      @track(after(function () {
        Track.eventTrack(this.$store,{
          category: 'deallist-cancel-tip-close',
          action: 'click',
          optLabel: 'popup',
          page: this.$route.name,
          optValue: {
            tip: this.tip
          }
        })
      }))
      closePopTip() {
        this.showTip = false
        this.orderId = null
        this.tip = ''
      },
    },
    created: function () {
      this.getOrderList()
    }
  }

</script>

<style lang="scss" scoped>
  .w-col .w-col {
    padding-right: 0;
    padding-left: 10px;
  }

  @media (max-width: 479px) {
    .card-info-wrapper {
      width: auto;
    }

    .w-col .w-col {
      padding-right: 0;
      padding-left: 0;
    }
  }

  .card-title.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    padding-right: 0;

    .son-title {
      display: block;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .left-label {
    display: block;
    border-radius: 3px 0 0 3px;
    padding: 1px 10px;
    background: #D64834;
    color: #fff;
    font-weight: normal;
    transform: scale(0.8) translateX(10px);
  }

  .left-label.hidden {
    visibility: hidden;
  }

  .column-92.w-col.w-col-10 {
    width: 100%;
  }

  .card-wrapper-property-2 {
    margin-bottom: 10px;
  }

  .card-title.property-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    padding-left: 10px;
  }

  .property-2-multi-btn.block {
    display: block;
    text-align: center;
  }

  .div-block-124 {
    cursor: pointer;
  }

  .heading-38 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .w-col .w-col-3-5 {
    width: 35%;
  }

  .project-brand {
    position: absolute;
    top: 17px;
    left: -120px;
    height: 26px;
    width: 300px;
    transform: rotate(-45deg);
    color: white;
    font-size: 12px;
    text-align: center;
    line-height: 26px;
  }

  .project-brand.bids {
    background-color: #48d875;
  }

  .project-brand.offers {
    background-color: #338ce0;
  }

  .card.property-2.over-hidden {
    overflow: hidden;
  }

  .text-block-50.offers.active {
    color: #d5a478;
  }

  .text-block-50.offers.end {
    color: #999999;
  }

  .card-operation-more {
    position: absolute;
    right: 8px;
    top: 0;
    z-index: 9;
  }

  .market-operation-more {
    margin: 5px;
    display: block;
    width: 22px;
    height: 22px;
    background: url('https://wechat-pics.fangpinduo.com/wehome/website/market-operation-more-whss.svg') no-repeat center center;
    background-size: contain;
  }

  .row-63.w-row.border-bottom {
    border-bottom: none;
  }

  @media (max-width: 991px) {
    .dropdown {
      display: inline-block;
    }

    .login-item {
      display: inline-block;
    }
  }

  .w-dropdown-list {
    right: 0;

    &:hover {
      cursor: pointer;
    }
  }

  .w-dropdown-link:hover {
    background: #d5a478;
    color: #fff;
  }

</style>
