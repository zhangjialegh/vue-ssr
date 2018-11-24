<template>
  <div data-w-tab="Tab 11" class="tab-pane w-tab-pane w--tab-active">
    <div class="card-label dark text-center detail-return-title">{{$t('预期总收益')}}</div>
    <div class="text-center">{{$t('考虑到交易成本')}}</div>
    <div class="card-return-row detail-return-breakdown-row">
      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label text-center">1{{$t('年')}}</div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">3{{$t('年')}}</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label text-center">5{{$t('年')}}</div>
        </div>
      </div>
      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large">{{(houseDetail.one_year_return_rate*100).toFixed(2)}}%</div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large">{{(houseDetail.three_year_return_rate*100).toFixed(2)}}%</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large">{{(houseDetail.five_year_return_rate*100).toFixed(2)}}%</div>
        </div>
      </div>
      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4"></div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number medium text-blue small text-bold nian-hua">{{$t('年化')}} {{(houseDetail.three_year_return_annual_rate*100).toFixed(2)}}%</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number medium text-blue small text-bold nian-hua">{{$t('年化')}} {{(houseDetail.five_year_return_annual_rate*100).toFixed(2)}}%</div>
        </div>
      </div>
    </div>
    <div class="card-label dark text-center title">{{$t('租金回报收益')}}</div>
    <div class="card-return-row detail-return-breakdown-row _2 w-row">
      <div class="text-left mobile-right-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-label text-center">{{$t('租金收益')}}</div>
        <div class="card-number large">${{Number.parseInt(houseDetail.rental_return_annual).toLocaleString('en-US')}}</div>
      </div>
      <div class="text-center mobile-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-label">{{$t('年租金总额')}}</div>
        <div class="card-number large">${{Number.parseInt(houseDetail.rental_return_annual).toLocaleString('en-US')}}</div>
      </div>
      <div class="text-right mobile-left-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-label">{{$t('租金收益率')}}</div>
        <div class="card-number text-blue large">{{((houseDetail.rental_return_annual)/houseDetail.initial_issue_value*100).toFixed(2)}}%</div>
      </div>
    </div>
    <div class="detail-tab-row w-row toggle">
      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right pointer" @click="toggleExpenseDetail">{{$t('开支费用明细')}}<img src="@/assets/images/Chevron.png" width="36" class="image-cost" :class="{'rotate-180': showDetail}"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(houseDetail.annual_fee_detail.total_annual_fee.value).toLocaleString('en-US')}}</div>
        </div>
      </div>
      <div class="card-return-row detail-return-breakdown-row detail-return-personal" :class="{'height-auto': showDetail}">
        <p class="fee-detail-p">{{$t('开支费用明细')}}</p>
        <div class="detail-return-row w-row" v-for="(item, index) in houseDetail.annual_fee_detail.annual_fee_detail" :key="item.name+index" v-if="houseDetail.annual_fee_detail.annual_fee_detail.length>0">
          <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
            <div>{{$t(item.name)}}</div>
          </div>
          <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
            <div class="card-label">- - - - - -</div>
          </div>
          <div class="w-col w-col-4 w-col-small-4 w-col-tiny-4">
            <div class="card-number text-left"><i class="symbol-ng" v-if="item.value<0">-</i>${{Number.parseInt(Math.abs(item.value)).toLocaleString('en-US')}}</div>
          </div>
        </div>
        <p class="fee-detail-p"></p>
      </div>
    </div>
    
    <div class="w-row">
      <div class="w-col w-col-6 w-col-small-6 w-col-tiny-6">
        <div class="card-label">{{resale?$t('股息净租金收益'):$t('净租金收益率')}}</div>
        <div class="card-number large">${{Number.parseInt(houseDetail.rental_return_annual - houseDetail.annual_fee_detail.total_annual_fee.value).toLocaleString('en-US')}}</div>
      </div>
      <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
        <div class="card-label">{{resale?$t('股息净租金收益'):$t('净租金收益率')}}</div>
        <div class="card-number text-blue large">{{((houseDetail.rental_return_annual - houseDetail.annual_fee_detail.total_annual_fee.value)/houseDetail.initial_issue_value*100).toFixed(2)}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyReturnTab',
  props: {
    houseDetail: {
      type: Object
    },
    resale: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDetail: false
    }
  },
  methods: {
    toggleExpenseDetail() {
      this.showDetail = !this.showDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.text-left {
  text-align: left !important;
}
.card-label.title {
  margin-top: 30px;
}
.card-number.nian-hua {
  margin-top: -7px;
}
.image-cost {
  padding: 0 !important;
  height: 7px;
  width: 12px;
  margin: 0 5px !important;
  transition: all 0.5s;
  transform: rotate(180deg)
}
.detail-tab-row.toggle {
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.image-cost.rotate-180 {
  transform: rotate(0);
}
.card-label.pointer {
  cursor: pointer;
}
.fee-detail-p {
  margin: 10px 0;
}
.detail-return-breakdown-row.detail-return-personal {
  padding-bottom: 0;
  margin-bottom: 0;
  border-bottom: none;
  padding-top: 0;
  background: #fafafa;
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.5s;
  &.height-auto {
    max-height: 500px;
  }
  .text-right {
    font-size: 13px;
  }
}
@media (max-width: 479px) {
  .tab-pane {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
