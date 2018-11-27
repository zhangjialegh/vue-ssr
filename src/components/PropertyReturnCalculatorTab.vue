<template>
  <div data-w-tab="Tab 9" class="tab-pane detail-invest-score w-tab-pane w--tab-active">
    <div class="detail-tab-row">
      <div class="text-center">{{$t('我要投入')}}</div>
      <div class="w-form invest-amount-wrapper">
        <input type="text" class="input invest-amount w-input" maxlength="256" name="amount" data-name="Amount" placeholder="$5,000" id="amount" v-model="amount">
        <a class="detail-amount-minus-button w-button" v-on:click="subAmount">-</a>
        <a class="detail-amount-plus-button w-button" v-on:click="plusAmount">+</a>
      </div>
    </div>
    <div class="card-return-row detail w-row">
      <div class="text-left mobile-right-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number large">{{(amount / (houseDetail.raise_value ? houseDetail.raise_value : houseDetail.price) * 100).toFixed(2)}}%</div>
        <div class="card-label text-center">{{$t('房屋股权占比')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('GLOBAL.equityRatio'), class: 'tooltip-custom tooltip-other-custom'}"></div>
      </div>
      <div class="text-center mobile-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number large">${{Number.parseInt(amount / 1.02 * (houseDetail.appreciation_rate_one_year_forecast + houseDetail.rental_return_rate_net)).toLocaleString('en-US')}}</div>
        <div class="card-label">1{{$t('年税前总收益')}}</div>
      </div>
      <div class="text-right mobile-left-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number large">${{Number.parseInt(amount / 1.02 * (houseDetail.appreciation_rate_one_year_forecast + houseDetail.rental_return_rate_net) * 3).toLocaleString('en-US')}}</div>
        <div class="card-label">3{{$t('年税前总收益')}}</div>
      </div>
    </div>
    <div class="detail-tab-row last">
      <div class="w-row">
        <div class="invest-calculate-total-left w-col w-col-6 w-col-small-6">
          <div>1{{$t('年现金年化收益')}} <span class="card-number large">${{Number.parseInt(amount / 1.02 * (houseDetail.rental_return_rate_net)).toLocaleString('en-US')}}</span></div>
        </div>
        <div class="invest-calculate-total-right w-col w-col-6 w-col-small-6">
          <div>1{{$t('年资产增值收益')}}<span class="card-number large" style="whiteSpace: nowrap">${{Number.parseInt(amount / 1.02 * (houseDetail.appreciation_rate_one_year_forecast)).toLocaleString('en-US')}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { track, after } from "trackpoint-tools";
import Track from "@/track";

export default {
  name: "PropertyReturnCalculatorTab",
  props: {
    houseDetail: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      amount: 5000,
      investIntial: 5000
    };
  },
  methods: {
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "property-calc-sub-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            amount: this.amount
          }
        });
      })
    )
    subAmount: function() {
      if (this.amount > this.investIntial) {
        this.amount = Number.parseInt(Number(this.amount)) - 1000;
      } else {
        this.amount = this.investIntial;
      }
    },
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "property-calc-plus-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            amount: this.amount
          }
        });
      })
    )
    plusAmount: function() {
      const maxPrice = this.houseDetail.raise_value
        ? this.houseDetail.raise_value
        : this.houseDetail.price;
      if (this.amount <= maxPrice - 1000) {
        this.amount = Number.parseInt(Number(this.amount)) + 1000;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.image-50 {
  margin-top: -2px;
  margin-left: 2px;
}
</style>
