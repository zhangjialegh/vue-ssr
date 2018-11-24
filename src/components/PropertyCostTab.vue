<template>
  <div data-w-tab="Tab 10" class="tab-pane w-tab-pane w--tab-active">
    <div class="detail-tab-row w-row ">
      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{resale?$t('房屋当前估值'):$t('房屋初始价值')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('GLOBAL.houseCurrentValue'), class: 'tooltip-custom tooltip-other-custom'}" v-if="resale"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(resale?houseDetail.current_property_value:houseDetail.initial_property_value).toLocaleString('en-US')}}</div>
        </div>
      </div>

      <div class="w-row" v-if="houseDetail.loan_value">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{$t('贷款金额')}}</div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(houseDetail.loan_value).toLocaleString('en-US')}}</div>
        </div>
      </div>

      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right pointer" @click="toggleExpenseDetail">{{$t('初始资本成本')}}<img src="@/assets/images/Chevron.png" width="36" class="image-cost" :class="{'rotate-180': showDetail}"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(houseDetail.initial_prepaid_expenses).toLocaleString('en-US')}}</div>
        </div>
      </div>
      <div class="card-return-row detail-return-breakdown-row detail-return-personal" :class="{'height-auto': showDetail}">
        <p class="initial-property-desc">{{$t('GLOBAL.initialExpense')}}</p>
        <p class="initial-title">{{$t('初始资本成本明细')}}</p>
        <div class="detail-return-row w-row" v-for="(item, index) in houseDetail.real_trade_fee_detail?houseDetail.real_trade_fee_detail:houseDetail.trade_fee_detail" :key="item.name+index" v-if="houseDetail.real_trade_fee_detail || houseDetail.trade_fee_detail">
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
        <p></p>
      </div>

      <div class="w-row" v-if="resale">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{$t('资本成本摊销')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('GLOBAL.prepaidExpense'), class: 'tooltip-custom tooltip-other-custom'}"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(houseDetail.initial_prepaid_expenses - houseDetail.current_prepaid_expenses).toLocaleString('en-US')}}</div>
        </div>
      </div>

      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{$t('储备金')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('GLOBAL.reserveValue'), class: 'tooltip-custom tooltip-other-custom'}"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(houseDetail.reserve_value).toLocaleString('en-US')}}</div>
        </div>
      </div>
    </div>
    <div class="detail-tab-row process" :class="{'last': resale}">
      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{resale?$t('项目最新估值'):$t('项目发行价值')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: resale?$t('GLOBAL.projectCurrentValue'):$t('GLOBAL.projectLanchValue'), class: 'tooltip-custom tooltip-other-custom'}"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(resale?houseDetail.current_project_value:houseDetail.initial_issue_value).toLocaleString('en-US')}}</div>
        </div>
      </div>
      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{$t('发行股数')}}({{resale?$t('手'):$t('万股')}})</div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left" v-if="resale">{{Number.parseFloat(houseDetail.total_share_num/GLOBAL.tenThou/GLOBAL.minShares).toLocaleString('en-US')}}</div>
          <div class="card-number large left" v-else>{{Number.parseFloat(houseDetail.total_share_num/GLOBAL.tenThou).toLocaleString('en-US')}}</div>
        </div>
      </div>

      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{$t('每')}}{{resale?$t('手'):$t('万股')}}{{$t('价值')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: resale?$t('每手价值'):$t('每万股价值'), class: 'tooltip-custom tooltip-other-custom'}"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left" v-if="resale">${{(houseDetail.current_share_price*GLOBAL.minShares).toFixed(2)}}</div>
          <div class="card-number large left" v-else>${{(houseDetail.initial_share_price).toFixed(2)}}</div>
        </div>
      </div>
    </div>
    <div class="detail-tab-row last" v-if="!resale">
      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{$t('平台费')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('GLOBAL.platFee'), class: 'tooltip-custom tooltip-other-custom'}"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(houseDetail.subscription_fee).toLocaleString('en-US')}}</div>
        </div>
      </div>

      <div class="w-row">
        <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label dark right">{{$t('募集金额')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('GLOBAL.raiseValue'), class: 'tooltip-custom tooltip-other-custom'}"></div>
        </div>
        <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-label">- - - - - -</div>
        </div>
        <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
          <div class="card-number large left">${{Number.parseInt(houseDetail.raise_value).toLocaleString('en-US')}}</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyCostTab',
  props: {
    houseDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    resale: {
      type: Boolean,
      default: function () {
        return false
      }
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
.image-50 {
  margin-top: -2px;
  margin-left: 2px;
}
.image-cost {
  padding: 0 !important;
  height: 7px;
  width: 12px;
  margin: 0 5px !important;
  transition: all 0.5s;
  transform: rotate(180deg)
}
.card-label.pointer {
  cursor: pointer;
}
.image-cost.rotate-180 {
  transform: rotate(0);
}
.card-number.large.text-left {
  position: relative;
}
.symbol-ng {
  position: absolute;
  width: 14px;
  height: 14px;
  left: -16px;
  top: 50%;
  line-height: 14px;
  text-align: center;
  transform: translateY(-50%);
}
.initial-property-desc {
  padding: 10px 20px 0;
  font-size: 13px;
  font-weight: 300;
  text-align: left;
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
.detail-cost-line {
  width: 100%;
  height: 1px ;
  background: rgba(0,0,0,0.1);
  margin: 5px 0;
}
.raise-amount-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .subtract {
    margin: 0 10px;
  }
}
.detail-tab-row.process {
  padding-top: 30px;
  padding-bottom: 10px;
}
.detail-tab-row.w-row.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
}
@media (max-width: 479px) {
  .tab-pane {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
