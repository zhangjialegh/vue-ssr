<template>
  <div class="order-section">
    <div class="order-contaiiner w-container">
      <div class="column-92 w-col w-col-12">
        <div class="detail-title">{{$t('提现记录')}}</div>
        <div class="div-block-127">
          <!-- <div class="mine-title property-2">交易记录</div> -->
        </div>
        <div class="row-46 w-row padding" v-if="withDrawList.length==0">{{$t('暂无详情')}}</div>
        <div class="asset-3 asset-mi" v-else>
          <div class="row-46 w-row">
            <div class="w-col w-col-10">
              <h5 class="heading-42 withdraw">{{$t('累计提现金额')}}</h5>
            </div>
            <div class="w-col w-col-2">
              <h5 class="heading-42 heading-42-add padding-right-20 withdraw total">${{toThousandFix(totalWithDraw)}}</h5>
            </div>
          </div>

          <div class="row-46 w-row no-border-top">
            <div class="w-col w-col-8 w-8">
              <h5 class="withdraw-list-title">{{$t('提现时间')}}</h5>
            </div>
            <div class="w-col w-col-2 w-2" v-tooltip.bottom="{ content: withdrawInfo, class: 'tooltip-custom tooltip-other-custom'}">
              <h5 class="withdraw-list-title">{{$t('状态')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></h5>
            </div>
            <div class="w-col w-col-2 w-2">
              <h5 class="withdraw-list-title align-right">{{$t('金额')}}</h5>
            </div>
          </div>

          <div class="row-49 w-row" v-for="(item) in withDrawList.slice(0, loadingNum)" :key="item.id">
            <div class="w-col w-col-8 w-8">
              <h5 class="withdraw-list-content">{{formatFullDate(item.apply_at)}}</h5>
            </div>
            <div class="w-col w-col-2 w-2">
              <h5 class="withdraw-list-content">{{withDrawStatus(item.withdraw_status)}}</h5>
            </div>
            <div class="w-col w-col-2 w-2">
              <h5 class="withdraw-list-content withdraw  align-right">${{toThousandFix(item.amount)}}</h5>
            </div>
          </div>

          <loading-more 
          v-if="withDrawList.length > 0"
          :list-arr="withDrawList" 
          :loading-num="loadingNum"
          @loading="loadingMore"></loading-more>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GET_USER_WITHDRAW_HISTORY_ACTION} from '@/scenes/mine/modules'
import {formatFullDate,toThousandFix,toThousandPrt} from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'withdrawdetail',
  data () { return {
    withDrawList: [],
    loadingNum: this.GLOBAL.loadInitNum,
    withdrawInfo: this.$t('提现提示语'),
    totalWithDraw: 0
  } },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt,
    formatFullDate: formatFullDate,
    withDrawStatus: function(status) {
      const {WITHDRAW_STATUS_APPLY,WITHDRAW_STATUS_APPROVE,WITHDRAW_STATUS_EXECUTE,WITHDRAW_STATUS_REFUSED,WITHDRAW_STATUS_CANCEL} = this.GLOBAL
      switch (status) {
        case WITHDRAW_STATUS_APPLY:
          return this.$t('已申请')
          break;
        case WITHDRAW_STATUS_APPROVE:
          return this.$t('通过待汇款')
          break;
        case WITHDRAW_STATUS_EXECUTE:
          return this.$t('提现成功')
          break;
        case WITHDRAW_STATUS_REFUSED:
          return this.$t('拒绝提现')
          break;
        case WITHDRAW_STATUS_CANCEL:
          return this.$t('客户取消')
          break;
        default:
          break;
      }
    },
    loadingMore(msg) {
      this.loadingNum = msg
    },
    loadWithDrawList: function () {
      var that = this
      this.$store.dispatch(GET_USER_WITHDRAW_HISTORY_ACTION)
      .then((res)=>{
        that.withDrawList = res.data
        that.totalWithDraw = res.total_withdraw ? res.total_withdraw : 0
      })
    }
  },
  created() {
    this.loadWithDrawList()
  }
}
</script>

<style lang="scss" scoped>
.w-container {
  .w-row {
    margin-left: 0;
    margin-right: 0;
  }
}
.order-section {
  min-height: calc(100vh - 361px);
}
.detail-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
}
.row-46.w-row {
  &.no-border-top {
    border-top: none;
    border-bottom: none;
  }
  &.padding {
    padding: 10px 0;
  }
}
.heading-42.withdraw {
  font-weight: 500;
  color: #333;
  font-size: 14px;
  padding-left: 15px;
  padding-right: 15px;
  &.total {
    color: #D5A478;
    text-align: right;
  }
}
.withdraw-list-title {
  font-size: 13px;
  color: #999;
  &.align-right {
    text-align: right;
    padding-right: 15px;
  }
}
.withdraw-list-content {
  font-size: 13px;
  color: #000;
  &.withdraw {
    color: #D5A478;
  }
  &.align-right {
    text-align: right;
    padding-right: 15px;
  }
}
.image-50 {
  margin-top: -2px;
}
.w-col.w-col-8 {
  padding-left: 15px;
}
.w-col.w-col-2 {
  text-align: center;
}
.padding-right-20 {
  padding-left: 0;
  padding-right: 20px;
  text-align: right;
}

@media (max-width: 479px) {
  .w-col.w-col-10.w-10 {
    width: 71.33333333%;
  }
  .w-col.w-col-8.w-8 {
    width: 66.66666667%;
    padding-left: 15px;
  }
  .w-col.w-col-2.w-2 {
    width: 28.66666667%;
    text-align: center;
  }
}
</style>
