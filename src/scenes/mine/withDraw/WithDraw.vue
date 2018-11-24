<template>
<div class="order-section">
    <div class="order-contaiiner w-container">
  <div class="column-92 w-col w-col-12">
    <div class="detail-title">{{$t('提现金额')}}</div>
    <div class="div-block-125 start">
      <div class="div-block-126">
        <div class="text-block-52">{{account}}</div>
      </div>
      <a>{{accountNum}}</a>
    </div>
    <div class="asset-3"></div>
    <div class="withdraw-wrapper">
      <span>$</span>
      <input type="number" :placeholder="$t('可提现金额')+toThousandFix(balance)+$t('美元')" class="withdraw-input" v-model="withcash" ref="withdraw">
    </div>
    <div class="w-col w-col-6 withdraw-verify-wrapper">
      <div class="detail-title">{{$t('手机号验证')}}</div>
      <verification-code 
        @select="selectOption"
        @phoneChange="phoneChange"
        @codeChange="codeChange"
        :phone="phone"
        :isPhone="isBindNumber"
        ></verification-code>
    </div>
    </div>
   </div>
   <div class="w-container">
     <div class="payorder-button-container">
      <!-- <a class="button order-button w-button blue">￥1000</a> -->
      <a class="button order-button w-button" @click="submitWithDraw">{{$t('提交申请')}}</a>
    </div>
   </div>

    <pop-box :show-tip="showTip" :tip="tip" :pop-title="popTitle">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 single-btn"><a class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
      </div>
    </pop-box>
  </div>
</template>

<script>
import {
  CHECK_USER_PHONE_BIND_ACTION,
  GET_USER_WITHDRAW_APPLY_ACTION,
  GET_USER_ACCOUNT_GET_ACTION,
  GET_USER_BILL_LIST_ACTION
} from '@/scenes/mine/modules'
import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'withdraw',
  data () { return {
    phoneType: '86',
    phone: '',
    phoneCode: '',
    withcash: '',
    isBindNumber: false,
    account: '',
    accountNum: '',
    balance: 0,


    showTip: false,
    tip: '',
    popTitle: ''
  } },
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
    closePopTip: function () {
      if(this.popTitle) {
        this.router.push({
          path: '/withdraw/withdrawdetail'
        })
      }
      this.showTip = false
      this.popTitle = ''
    },
    // 请求接口判断是否获取了手机号码
    loadPhoneNumber: function() {
      const that = this;
      this.$store.dispatch(CHECK_USER_PHONE_BIND_ACTION)
      .then((res)=>{
        that.isBindNumber = res.is_bind
        if(res.is_bind) {
          that.phone = res.phone
        }
      })
    },
    submitWithDraw: function() {
      const that = this
      const bankId = Number(this.$route.query.account_id)
      const {phone, phoneType, phoneCode, withcash, balance} = this
      if(!phone) {
        const tip = this.$t('请输入手机号码')
        this.$options.methods.popTip.call(this, tip)
      } else if(!phoneCode) {
        const tip = this.$t('请输入验证码')
        this.$options.methods.popTip.call(this, tip)
      } else if (!withcash) {
         const tip = this.$t('提现金额不能为空')
        this.$options.methods.popTip.call(this, tip)
      } else if (withcash > balance) {
         const tip = this.$t('提现金额不能大于余额')
        this.$options.methods.popTip.call(this, tip)
      } else{
        this.$store.dispatch(GET_USER_WITHDRAW_APPLY_ACTION,{
          account_id: Number(bankId),
          amount: Number(withcash)
        }).then((res)=>{
          if(res.success) {
            const tip = that.$t('提现申请成功请您耐心等待')
            that.popTitle = that.$t('提现申请成功')
            that.$options.methods.popTip.call(that, tip)
          } else if(res.errorCode == that.GLOBAL.WITHDRAW_REPEAT.errorCode) {
            const tip = that.$t('你有未完成的提现申请')
            that.$options.methods.popTip.call(that, tip)
          } else {
            const tip = that.$t('系统错误')
            that.$options.methods.popTip.call(that, tip)
          }
        }).catch((error)=>{
          console.log(error);
          const tip = that.$t('系统错误')
          that.$options.methods.popTip.call(that, tip)
        })
      }
    },
    loadBankInfo: function() {
      const that = this
      const bankId = Number(this.$route.query.account_id)
      if(bankId) {
        this.$store.dispatch(GET_USER_ACCOUNT_GET_ACTION,{
          account_id: bankId
        }).then((res)=>{
          if(res.success) {
            that.account = res.data.account_name
            that.accountNum = res.data.account_no
          } else {
            that.tip = that.$t('系统错误')
            that.showTip = true
          }
        }).catch((error)=>{
          that.tip = that.$t('信息获取失败')
          that.showTip = true
        })
      }
    },
    loadBillList: function () {
      var that = this
      this.$store.dispatch(GET_USER_BILL_LIST_ACTION)
      .then((res)=>{
        that.balance = res.current_balance
      })
    },
  },
  mounted() {
    this.$refs.withdraw.focus()
  },
  created() {
    this.loadPhoneNumber()
    this.loadBankInfo()
    this.loadBillList()
  }
}
</script>

<style lang="scss" scoped>
.withdraw-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: 500;
    color: #000;
  }
}
.order-section {
  min-height: 100vh;
}
.detail-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
}
.withdraw-input {
  width: 100%;
  margin-left: 10px;
  border: none;
  font-size: 18px;
  outline: none;
  &::-webkit-input-placeholder { 
    color:#999; 
    font-weight: 300;
  }
  &::-moz-input-placeholder { 
    color:#999; 
    font-weight: 300;
  }
}
.payorder-button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text-block-52 {
  margin-right: 20px;
}

@media (max-width: 479px) {
  .payorder-button-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    .button.order-button {
      border-radius: 0;
    }
  }
}




.w-dropdown-list {
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  min-width: 0;
  border: none;
  width: 100%;
  display: block;
}
.w-dropdown-link:hover {
  background: #d5a478;
  color:#fff; 
}
.w-row.padding-bottom {
  padding-bottom: 10px;
}
.padding-right-20 {
  padding-left: 0;
  padding-right: 20px;
  text-align: right;
}
.padding-right {
  padding-left: 0;
  padding-right: 5px;
  text-align: right;
}
.padding-top-18 {
  padding-top: 18px;
}
.w-row.padding {
  padding: 10px 20px;
}
.cancel-charge {
  background: #d5a478;
  color: #fff;
  text-align: center;
  display: block;
  font-size: 12px;
  padding: 5px 10px;
  margin-top: -5px;
  margin-bottom: -5px;
  cursor: pointer;
}
.hide-arrow {
  visibility: hidden;
}
.balance-title {
  font-size: 12px;
  padding-left: 20px;
  padding-top: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.balance-time {
  padding-left: 20px;
  font-size: 12px;
}
.deal-title {
  font-size: 12px;
  padding-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 10px;
}
.deal-time {
  padding-left: 20px;
  font-size: 12px;
}
.processing {
  display: inline-block;
  background: #d5a478;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 14px;
  transform: scale(0.8);
  cursor: pointer;
}
@media (max-width: 479px) {
  .mine-title.property-2 {
    margin-top: 0;
  }
  .cancel-charge {
    padding: 5px;
  }
  .heading-43-add.padding-right {
    text-align: right;
  }
  .w-col.w-col-10.w-10 {
    width: 71.33333333%;
  }
  .w-col.w-col-2.w-2 {
    width: 28.66666667%;
  }
}
.w-title{
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.bank-wrap{
    border: 1px solid #E9E9E9;
    background: #fff;
    padding: 0 16px;
    display: flex;
    align-items: center;
}
.btn-border{
    color: #D5A478;
    border: 1px solid #D5A478;
    padding: 10px 40px;
    display: inline-block;
    margin: 10px;
}
.btn-border:hover{
    color: #fff;
    background:  #D5A478;
}
.status-wrap{
  text-align: right;
}
</style>
