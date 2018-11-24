<template>
  <div class="order-section market-order">
    <div class="order-contaiiner w-container">
      <div class="detail-title">{{$t('确认订单')}}</div>
      <div class="order-section-top market-section">
        <div class="w-row">
          <!-- <div class="order-card-column w-col w-col-6 mob-only">
            <market-price :house-detail="houseDetail" :id="id" :order-bool="true" :min-num="minNum" ref="house" />
          </div> -->
          <div class="w-col w-col-6">
            <div class="order-row">
              <div class="info-card-title">{{!isOffer?$t('买入价格'):$t('卖出价格')}}</div>
              <div class="w-form">
                <div id="email-form" name="email-form" data-name="Email Form" class="invest-amount-wrapper left market-amount">
                  <input type="number" v-model="amount" class="input invest-amount market-input w-input" maxlength="256" @blur="amountBlur">
                  <a href="javascript:;" class="detail-amount-minus-button market-sub w-button" @click="subAmount">-</a>
                  <a href="javascript:;" class="detail-amount-plus-button market-plus w-button" @click="plusAmount">+</a>
                </div>
              </div>
              <div class="div-block-117">
                <div>
                  <div class="text-block-44">{{$t('最低价格')}}</div>
                  <div class="text-block-43">${{toThousandFix(minValue)}}</div>
                </div>
                <div class="div-block-118"></div>
                <div>
                  <div class="text-block-44">{{$t('最高价格')}}</div>
                  <div class="text-block-43">${{toThousandFix(maxValue)}}</div>
                </div>
              </div>
            </div>
            <div class="order-row">
              <div class="info-card-title">{{!isOffer?$t('买入数量'):$t('卖出数量')}}</div>
              <div class="w-form">
                <div id="email-form" name="email-form" data-name="Email Form" class="invest-amount-wrapper left market-amount">
                  <input type="number" class="input invest-amount market-input w-input" maxlength="256" v-model="num" @blur="numBlur">
                  <a href="javascript:;" class="detail-amount-minus-button market-sub w-button" @click="subNumber">-</a>
                  <a href="javascript:;" class="detail-amount-plus-button market-plus w-button" @click="plusNumber">+</a>
                </div>
              </div>
              <div class="div-block-117">
                <div v-if="isOffer">
                  <div class="text-block-44">{{$t('持有数量')}}</div>
                  <div class="text-block-43">{{toThousandFix(houseDetail.user_share_num/GLOBAL.tenThou/GLOBAL.minShares, 2)}}</div>
                </div>
                <div class="div-block-118" v-if="isOffer"></div>
                <div>
                  <div class="text-block-44">{{$t('单位')}}</div>
                  <div class="text-block-43">({{$t('手万股',{msg:minNumber*GLOBAL.minShares})}})</div>
                </div>
              </div>
                <!-- <div class="text-block-unit">*：</div> -->
            </div>
            <div class="order-row">
              <div class="info-card-title">{{isOffer?$t('预计收入'):$t('预计支付金额')}}</div>
              <div class="text-block-45">${{toThousandFix(assetsment)}}</div>
            </div>
            <div class="order-row">
              <div class="info-card-title inline-block no-margin market-text">{{$t('股权价值')}}</div>
              <div class="card-number medium float-right market-number">${{toThousandFix(shareCost)}}</div>
            </div>
            <div class="order-row" v-if="!isOffer">
              <div class="info-card-title inline-block no-margin market-text">{{$t('平台手续费')}}</div>
              <div class="card-number medium float-right market-number">${{toThousandFix(wehomeFee)}}</div>
            </div>
            <div class="order-row" v-if="isOffer">
              <div class="info-card-title inline-block no-margin market-text" v-tooltip.bottom.start="{ content: $t('GLOBAL.withHoldingTax'), class: 'tooltip-custom tooltip-other-custom' }">{{$t('资本利得税')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></div>
              <div class="card-number medium float-right market-number">${{toThousandFix(deductTax)}}</div>
            </div>
            <div class="order-row">
              <div class="info-card-title inline-block no-margin market-text">{{$t('储备金')}}{{isOffer ? $t('返还'):''}}</div>
              <div class="card-number medium float-right market-number">${{toThousandFix(reserveReturn)}}</div>
            </div>
            <div class="order-row" v-if="!isOffer">
              <div class="info-card-title inline-block no-margin market-text">{{$t('账户余')}}</div>
              <div class="card-number medium float-right market-number">${{toThousandFix(currentBalance)}}</div>
            </div>
            <div class="order-row">
              <div class="info-card-title">{{$t('挂牌时间')}}</div>
              <div class="info-card-title inline-block no-margin market-text"></div>
              <div class="info-card-title inline-block no-margin market-text float-right">{{sliderMax}}{{$t('天')}}</div>
              <vue-slider ref="slider" v-model="value" :max="sliderMax" :formatter="(value>9?value:'0'+value)+$t('天')" :tooltip-style="{'background-color':'#d5a478','border':'1px solid #d5a478'}" :process-style="{'background-color':'#d5a478'}"></vue-slider>
            </div>
            
            <div class="order-row">
              <div class="info-card-title">{{$t('电话')}}</div>
              <verification-code 
              @select="selectOption"
              @phoneChange="phoneChange"
              @codeChange="codeChange"
              :is-phone="isBindNumber"
              :phone="phone"
              ></verification-code>
            </div>
              <a href="javascript:;" :disabled="checkOk" class="link-3 w-button fixed" :class="{'offers-active':isOffer && checkOk,'bids-active':!isOffer && checkOk}" @click="showOrderConfirm">{{isOffer?$t('卖出股份'):$t('买入股份')}}</a>
              <div class="error-info-wrapper">{{errorTip}}</div>
            </div>
          <div class="order-card-column w-col w-col-6">
            <market-price :house-detail="houseDetail" :id="id" :order-bool="true" :min-num="minNum" ref="house"/>
          </div>
        </div>
      </div>
    </div>

    <!-- 判断余额不足时的弹窗 -->
    <pop-box :show-tip="showTip" :tip="tip" v-if="!isOffer">
      <div class="w-row">
        <div class="column-55 w-col w-col-6"><a class="button-13 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
        <div class="column-55 w-col w-col-6"><router-link to="/wiretransfer" class="button-14 w-button" >{{$t('存入资金')}}</router-link></div>
      </div>
    </pop-box>
    <!-- 信息错误的弹窗 -->
    <pop-box :show-tip="showErrorTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 single-btn"><a class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
      </div>
    </pop-box>

    <div class="div-block-59 div-block-61" v-if="showOrderSure">
      <div class="div-block-60 padding-sides">
        <h5 class="pop-box-title">{{$t('确认订单')}}</h5>
        <div class="w-col">
          <div class="order-row first">
            <div class="info-card-title inline-block no-margin market-text">{{!isOffer?$t('买入数量'):$t('卖出数量')}}</div>
            <div class="card-number medium float-right market-number">{{toThousandFix(num, 0)}}{{$t('手')}}</div>
          </div>

          <div class="order-row">
            <div class="info-card-title inline-block no-margin market-text">{{!isOffer?'买入价格':'卖出价格'}}</div>
            <div class="card-number medium float-right market-number">${{toThousandFix(amount, 2)}}</div>
          </div>

          <div class="order-row" v-if="!isOffer">
            <div class="info-card-title inline-block no-margin market-text">{{$t('平台手续费')}}</div>
            <div class="card-number medium float-right market-number">${{toThousandFix(wehomeFee)}}</div>
          </div>

          <div class="order-row">
            <div class="info-card-title inline-block no-margin market-text">{{$t('储备金')}}{{isOffer ? $t('返还'):''}}</div>
            <div class="card-number medium float-right market-number">${{toThousandFix(reserveReturn)}}</div>
          </div>

          <div class="order-row" v-if="!isOffer">
            <div class="info-card-title inline-block no-margin market-text">{{$t('预计支付金额')}}</div>
            <div class="card-number medium float-right market-number">${{toThousandFix(assetsment)}}</div>
          </div>

          <div class="order-row" v-if="isOffer">
            <div class="info-card-title inline-block no-margin market-text">{{$t('资本利得税')}}</div>
            <div class="card-number medium float-right market-number">${{toThousandFix(deductTax)}}</div>
          </div>
          
          <div class="order-row">
            <div class="info-card-title inline-block no-margin market-text">{{$t('挂牌时间')}}</div>
            <div class="card-number medium float-right market-number">{{value}}{{$t('天')}}</div>
          </div>
          <div class="order-row-tip">
            {{!isOffer?$t('GLOBAL.bidsNotice'):$t('GLOBAL.offersNotice')}}
          </div>
        </div>
        
        <div class="w-row">
          <div class="column-55 w-col w-col-6 margin-top first"><a class="button-13 w-button" @click="closeOrderConfirm">{{$t('取消')}}</a></div>
          <div class="column-55 w-col w-col-6 margin-top"><a class="button-14 w-button" @click="submitOrder">{{!isOffer?$t('买入挂单'):$t('卖出挂单')}}</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_RESALE_ORDRES_ACTION,
  GET_PROJECT_DETAIL_ACTION,
  GET_RESALE_CALC_ACTION,
  POST_RESALE_COMMIT_ORDER_ACTION
} from '@/scenes/investing/modules'
import {CHECK_USER_PHONE_BIND_ACTION} from '@/scenes/mine/modules'
import { track, after } from "trackpoint-tools";
import Track from "@/track";
import MarketPrice from "../marketDetail/components/MarketPrice"
import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils.js'


export default {
  name: "marketorder",
  components: {MarketPrice},
  data() {
    return {
      isOffer: true,
      needReview: false,
      value: 1,
      sliderMax: this.GLOBAL.maxHangDays,
      amount: 1,
      minNum: this.GLOBAL.minShares,//最小股数
      num: 1,  
      stepNumber: this.GLOBAL.shareStep,  //股数增减阶梯
      assetsment: 0,
      wehomeFee: 0,
      shareCost:0,
      deductTax:0,
      reserveReturn:0,
      amountEr: false,
      orders: {},
      phoneEr: false,
      phone: "",
      phoneCode: '',
      phoneType: '86',
      sendSMSCountDown: 0,
      errorTip: "",
      phoneArr: [
        {
          value: '86',
          title: "+86"
        },
        {
          value: '1',
          title: "+1"
        },
        {
          value: '852',
          title: "+852"
        }
      ],
      showTip: false,
      showErrorTip: false,
      showOrderSure: false,
      tip: ''
    };
  },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt,
    selectOption(msg) {
      this.phoneType = msg
    },
    phoneChange(msg) {
      this.phone = msg
    },
    codeChange(msg) {
      this.phoneCode = msg
    },
    popTip: function (tips) {
      if(tips) this.tip = tips
      this.showTip = true
    },
    popErrorTip: function (tips) {
      if(tips) this.tip = tips
      this.showErrorTip = true
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-order-close-pop",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            amount: this.amount
          }
        });
      })
    )
    closePopTip: function () {
      this.showTip = false
      this.showErrorTip = false
      if(this.needReview) {
        this.$router.push({
          path: '/invest'
        })
      }
    },
    getMarketOrders: function (id) {
      var that = this
      this.$store.dispatch(GET_RESALE_ORDRES_ACTION, {project_id: id})
      .then((data)=>{
        that.orders = data
        that.amount = toThousandFix(data.wehome_estimate*that.GLOBAL.minShares)*1
      })
    },
    getHouseDetail: function() {
      const that = this;
      this.$store.dispatch(GET_PROJECT_DETAIL_ACTION,{id: this.$route.query.id})
    },
    getResaleCalc: function(bool) {
      const that = this
      this.$store.dispatch(GET_RESALE_CALC_ACTION,{
        order_type: this.isOffer ? 1 : 0,
        project_id: this.id,
        list_price: this.amount/this.GLOBAL.minShares,
        list_num: this.num * this.GLOBAL.minShares
      }).then((result)=>{
        that.assetsment = result.estimate_cost
        that.wehomeFee = result.wehome_fee
        that.shareCost = result.share_cost
        that.deductTax = result.deduct_tax
        that.reserveReturn = result.reserve_return
        if(bool) {
          if((result.estimate_cost > that.currentBalance) && !that.isOffer) {
              const tip = that.$t('您余额不足')
              that.$options.methods.popTip.call(that, tip)
            }
        }
      })
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-order-price-sub-button",
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
      if (this.amount > this.minValue) {
        this.amount = (this.amount - this.unitValue).toFixed(2) * 1
        this.$options.methods.getResaleCalc.call(this, true)
      } else {
        this.amount = this.minValue*1;
        const tip = this.$t('价格不能低于最低价格')
        this.$options.methods.popErrorTip.call(this, tip)
      }
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-order-price-plus-button",
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
      if (this.amount < this.maxValue) {
        this.amount = (this.amount + this.unitValue).toFixed(2) * 1
        this.$options.methods.getResaleCalc.call(this, true)
      } else {
        this.amount = this.maxValue*1
        const tip = this.$t('价格不能高于最高价格')
        this.$options.methods.popErrorTip.call(this, tip)
      }
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-order-num-sub-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            num: this.num
          }
        });
      })
    )
    subNumber: function() {
      if(this.num >= this.minNumber + this.stepNumber) {
        this.num = this.num - this.stepNumber
        this.$options.methods.getResaleCalc.call(this,true)
      } else {
        this.num = this.minNumber*1
        const tip = this.$t('股份不能低于手',{msg:this.minNumber})
        this.$options.methods.popErrorTip.call(this, tip)
      }
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-order-num-plus-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            num: this.num
          }
        });
      })
    )
    plusNumber: function() {
      if (this.num <= this.maxNumber - this.stepNumber) {
        this.num = this.num + this.stepNumber;
        this.$options.methods.getResaleCalc.call(this, true)
      } else {
        this.num = this.maxNumber*1
        const tip = this.$t('股份数量不能超过')
        this.$options.methods.popErrorTip.call(this, tip)
      }
    },
    // input 输入价格
    amountBlur: function () {
      this.amount = Number(this.amount)
      if (this.amount < this.minValue) {
        this.amount = (this.minValue*1).toFixed(2) * 1
      } else if (this.amount > this.maxValue) {
        this.amount = (this.maxValue*1).toFixed(2) * 1
      } 
      this.$options.methods.getResaleCalc.call(this, true)
    },
    // input 输入数量
    numBlur: function () {
      this.num = Number.parseInt(this.num)
      if(this.num < this.minNumber) {
        this.num = this.minNumber
      } else if (this.num > this.maxNumber) {
        this.num = this.maxNumber;
      } 
      this.$options.methods.getResaleCalc.call(this, true)
    },
    checkAmountNumber: function () {
      const {amount, num, minValue, minNumber, maxValue, maxNumber, assetsment, currentBalance, phone, phoneType, phoneCode} = this
      let bool = false
      if(amount < minValue) {
        const tip = this.$t('价格不能低于最低价格')
        this.$options.methods.popErrorTip.call(this, tip)
      } else if(amount > maxValue) {
        const tip = this.$t('价格不能高于最高价格')
        this.$options.methods.popErrorTip.call(this, tip)
      } else if (num < minNumber) {
         const tip = this.$t('股份不能低于手',{msg:minNumber})
        this.$options.methods.popErrorTip.call(this, tip)
      } else if (num > maxNumber) {
        const tip = this.$t('股份数量不能超过')
        this.$options.methods.popErrorTip.call(this, tip)
      } else if ((assetsment > currentBalance) && !this.isOffer) {
        const tip = this.$t('您余额不足')
        this.$options.methods.popTip.call(this, tip)
      } else if (!phone) {
        const tip = this.$t('请输入手机号码')
        this.$options.methods.popErrorTip.call(this, tip)
      } else if (!phoneCode) {
        const tip = this.$t('请输入验证码')
        this.$options.methods.popErrorTip.call(this, tip)
      } else{
        this.errorTip = ''
        bool = true
      }
      return bool
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-order-submit-order-confirm",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            num: this.num,
            amount: this.amount
          }
        });
      })
    )
    showOrderConfirm: function () {
      const bool = this.$options.methods.checkAmountNumber.call(this)
      console.log(this.checkOk, bool,'bool');
      
      if (!this.checkOk || !bool) return
      this.showOrderSure = true
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-order-cancel-order-confirm",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            num: this.num,
            amount: this.amount
          }
        });
      })
    )
    closeOrderConfirm: function () {
      this.showOrderSure = false
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-order-submit-order-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            num: this.num,
            amount: this.amount
          }
        });
      })
    )
    // 提交购买订单
    submitOrder: function () {
      const bool = this.$options.methods.checkAmountNumber.call(this)
      if (!this.checkOk || !bool) return
      const that = this
      this.$store.dispatch(POST_RESALE_COMMIT_ORDER_ACTION, {
        order_type: this.isOffer ? 1 : 0,
        project_id: this.id,
        list_price: this.amount/this.GLOBAL.minShares,
        list_num: this.num*this.GLOBAL.minShares,
        list_day: this.value,
        phone: this.phone,
        code: this.phoneCode,
        country: this.phoneType
      }).then((result)=>{
        that.showOrderSure = false
        that.$router.push({
            path: '/mine',
            query: {active: 6}
          })
      }).catch((error)=>{
        that.showOrderSure = false
        if (error.errorMsg=="phone number don't match") {
          const tip = that.$t('手机号需与绑定的手机号一致')
          that.$options.methods.popErrorTip.call(that, tip)
        } else if (error.errorMsg=="sms code don't match") {
          const tip = that.$t('验证码错误')
          that.$options.methods.popErrorTip.call(that, tip)
        } else {
          const tip = that.$t('系统错误')
          that.$options.methods.popErrorTip.call(that, tip)
        }
      })
    },
    // 请求接口判断是否获取了手机号码
    loadPhoneNumber: function() {
      const that = this;
      this.$store.dispatch(CHECK_USER_PHONE_BIND_ACTION)
      .then((res)=>{
        if(res.is_bind) {
          that.phone = res.phone
        }
      })
    },
    checkReviewStatus: function () {
      const that = this
      const {reviewStatus,permission} = this
      if(!permission && reviewStatus!=that.GLOBAL.qesProcess) {
          this.$router.push({
            path: '/questionnaire',
            query: {
              slink: that.$route.fullPath,
              qesSource: that.GLOBAL.QES_SOURCE_MKTORDER
            }
          })
        } else if(reviewStatus == that.GLOBAL.qesProcess) {
          const tip = that.$t('GLOBAL.NEED_REVIEW_TIP')
          that.needReview = true
          that.$options.methods.popErrorTip.call(that, tip)
        }
   }
  },
  updated() {
    this.getResaleCalc()   
  },
  created () {
    this.checkReviewStatus()
    this.isOffer = this.$route.query.offers ? true : this.$route.query.bids ? false : true
    this.getHouseDetail()
    this.getMarketOrders(this.id)
    this.loadPhoneNumber()
  },
  computed: {
    id() {
      return Number.parseInt(this.$route.query.id);
    },
    minValue() {
      const valueLable = Math.min(this.orders.wehome_estimate*this.GLOBAL.minShares,this.orders.market_price*this.GLOBAL.minShares)
      return toThousandFix(valueLable*0.95, 2)
    },
    maxValue() {
      const valueLable = Math.max(this.orders.wehome_estimate*this.GLOBAL.minShares,this.orders.market_price*this.GLOBAL.minShares)
      return toThousandFix(valueLable*1.05, 2)
    },
    minNumber() {
      return Number.parseInt(this.minNum/this.GLOBAL.minShares)
    },
    maxNumber() {
      const value = this.isOffer?this.$store.state.invest.houseDetail.user_share_num/this.GLOBAL.tenThou/this.GLOBAL.minShares:this.$store.state.invest.houseDetail.total_share_num/this.GLOBAL.tenThou/this.GLOBAL.minShares
      return Number.parseInt(value)
    },
    unitValue() {
      return 0.01
    },
    currentBalance() {
      return this.$store.state.invest.houseDetail.current_balance
    },
    checkOk() {
      if(this.amount && this.num && this.phone && this.phoneCode && this.value) {
        return true
      } else {
        return false
      }
    },
    permission() {
      return this.$store.state.auth.user.permission
    },
    reviewStatus() {
      return this.$store.state.auth.user.reviewStatus
    },
    houseDetail() {
      return this.$store.state.invest.houseDetail
    },
    isBindNumber() {
      return this.$store.state.auth.user.bindPhone
    }
  }
};
</script>

<style lang="scss" scoped>
.w-button.button-border {
  border: 1px solid #dadada;
  border-left: none;
}
.w-button.offers-active {
  background-color: #4a90e2;
  background-image: none;
}
.w-button.bids-active {
  background-color: #00be4b;
  background-image: none;
}
.info-card-title.no-margin.market-text.left {
  text-align: left !important;
}
.w-selector-wrapper-1 {
  width: 25%;
}

.w-selector-wrapper-2 {
  width: 75%;
}

.div-block-26 {
  background: rgba(255, 255, 255, 0.8);
}

.error-info-wrapper {
  width: 100%;
  text-align: right;
  color: #ff5000;
  padding-top: 20px;
}

.input-error {
  border: 1px solid #ff5000 !important;
}

.quit-wechat-pay {
  position: absolute;
  top: 15px;
  right: 20px;
  width: 16px;
  height: 16px;
  background: url("https://wechat-pics.fangpinduo.com/close.svg") no-repeat
    center center;
  background-size: contain;
}
.refresh-code {
  text-decoration: underline;
  color: -webkit-link;
}
.text-block-unit {
  font-size: 12px;
  margin-top: 15px;
}
.mob-only {
  display: none;
}

.column-55.margin-top {
  margin-top: 15px;
}
.column-55.margin-top.first {
  margin-left: -15px;
}
.image-50 {
  margin-top: -2px;
}
@media (max-width: 479px) {
  .mob-only {
    display: block;
  }
  .pc-only {
    display: none;
  }
  .link-3.w-button.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 990;
    padding: 13px 0;
  }
  .order-section-top {
    padding-top: 0;
  }
  .column-55.margin-top {
    margin-top: 0;
  }
  .column-55.margin-top.first {
    margin-left: 0;
    margin-top: 10px;
  }
}
.order-row.first {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.order-row-tip {
  font-size: 13px;
  padding: 10px 0;
}

.div-block-60.padding-sides {
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 20px;
}
</style>
