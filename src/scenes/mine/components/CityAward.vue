<template>
   <div>
    <div class="mine-title">累计收益</div>
    <!-- <div class="row-46 w-row padding" v-if="billList.length==0">{{$t('暂无详情')}}</div> -->

    <div class="asset-3 asset-mi" style="margin-bottom:10px">
      <div class="row-46 w-row" style="border-bottom:none">
        <div class="w-col w-col-10">
          <h5 class="heading-42">累计分佣</h5>
        </div>
        <div class="w-col w-col-2">
          <h5 class="heading-42 heading-42-add padding-right-20">${{toThousandSep(totalIncome)}}</h5>
        </div>
      </div>
    </div>
    <div class="asset-3 asset-mi">
      <div class="row-46 w-row">
        <div class="w-col w-col-10">
          <h5 class="heading-42">{{$t('交易详情')}}</h5>
        </div>
        <div class="w-col w-col-2">
          <h5 class="heading-42 heading-42-add padding-right-20">{{$t('金额')}}</h5>
        </div>
      </div>
      <div class="row-49 w-row no_info"  v-if="incomeList.length == 0">
        暂无详情
      </div>

      <div class="row-49 w-row" v-for="(item, index) in incomeList" :key="item.title + index" v-else>
        <div class="column-93 w-col w-col-10 w-10">
          <div class="balance-title"><strong class="bold-text-7">{{item.title}}</strong></div>
          <span class="balance-time">{{formatHouseDate(item.created_at)}}</span>
        </div>
        <div class="w-col w-col-2 w-2">
          <h6 class="heading-43 heading-43-add padding-right gain padding-top-18">${{toThousandSep(item.amount)}}</h6>
        </div>
      </div>
      
      <!-- <loading-more 
      v-if="billList.length > 0"
      :list-arr="billList" 
      :loading-num="loadingNum"
      @loading="loadingMore"></loading-more> -->
    </div>
  </div>
</template>

<script>
import {GET_USER_PARTNER_INCOME_ACTION} from '@/scenes/mine/modules'
import { formatHouseDate, toThousandSep } from '@/utils/utils'

export default {
  name: 'cityInvite',
  data () { return {
    incomeList: [],
    totalIncome: 0
  } },
  methods: {
    formatHouseDate:formatHouseDate,
    toThousandSep:toThousandSep,
    getCityPartnerIncome() {
      const that = this
      this.$store.dispatch(GET_USER_PARTNER_INCOME_ACTION)
      .then((res)=>{
        if(res.success) {
          that.incomeList = res.data
          that.totalIncome = res.total
        }
      })
    }
  },
  created: function () {
    this.getCityPartnerIncome()
  }
}
</script>

<style lang="scss" scoped>
.hide-arrow {
  visibility: hidden;
}
.row-46.w-row {
  border-top: none;
}
.balance-title {
  font-size: 12px;
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.balance-time {
  padding-left: 20px;
  font-size: 12px;
}
.row-49.w-row {
  padding: 5px 0;
}
.padding-right-20 {
  padding-left: 0;
  padding-right: 20px;
  text-align: right;
}
.padding-right {
  padding-left: 0;
  padding-right: 20px;
  text-align: right;
}
.no_info {
  padding: 10px !important;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
