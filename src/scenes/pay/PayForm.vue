
<template>
  <div class="w-container">
    <div class="pay-form-header">
      <img src="https://wechat-pics.fangpinduo.com/wehome/static/logo-black.jpg" class="pay-form-logo" />
      <h5 class="pay-form-title">{{title}}</h5>
    </div>


    <div class="pay-form-body">
      <div class="pay-form-item">
        <i class="iconfont icon-fe-mail"></i>
        <div class="pay-from-input-wrapper">
          <strong>Email</strong>
          <input type="text" placeholder="you@email.com" v-model="email">
          <span class="iconfont icon-error" v-if="emailEr"></span>
        </div>
      </div>

      <div class="pay-form-item">
        <i class="iconfont icon-card"></i>
        <div class="pay-from-input-wrapper">
          <strong>Card</strong>
          <input type="number" placeholder="•••• •••• •••• ••••" maxlength="16" v-model="card">
          <span class="iconfont icon-error" v-if="cardEr"></span>
        </div>
      </div>

      <div class="pay-form-item">
        <i class="iconfont icon-calendar"></i>
        <div class="pay-from-input-wrapper expiry">
          <strong>Expiry</strong>
          <input ref="expiryM" v-model="expiryM" type="text" placeholder="MM" class="expiry-input month">
          <span>/</span>
          <input ref="expiryY" v-model="expiryY" type="text" placeholder="YY" class="expiry-input year">
          <span class="iconfont icon-error" v-if="expiryEr"></span>
        </div>

        <div class="pay-from-input-wrapper cvc">
          <i class="iconfont icon-Lock"></i>
          <strong>CVC</strong>
          <input type="text" placeholder="123" v-model="cvc">
          <span class="iconfont icon-error" v-if="cvcEr"></span>
        </div>
      </div>
      
    </div>

    
    <div>
    <button type="button" class="w-button button card-button" @click="submitInfo" > <span class="pay-logo">✓</span>Pay ${{toThousandFix(amount)}}</button>
    </div>
    <pop-box :show-tip="showErrorTip" :tip="errorTip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn"><a href="javascript:;" class="button-14 w-button" @click="closeErrorTip">知道了</a></div>
      </div>
    </pop-box>
    <LoadingToast :show="showLoading" :text="loadingText"/>
  </div>
</template>
<script>
import {POST_CARD_PAY_ACTION} from '@/scenes/investing/modules'
import { toThousandFix } from '@/utils/utils.js'
export default {
  name:"payForm",
  data(){
    return {
      loadingText: this.$t('正在处理订单'),
      showLoading: false,
      title: this.$route.query.title,
      amount: this.$route.query.amount,
      showErrorTip:false,
      errorTip:'',
      email: '',
      emailEr: false,
      card: '',
      cardEr: false,
      expiryM: '',
      expiryEr: false,
      expiryY: '',
      cvc: '',
      cvcEr: false
    }
  },
  methods:{
    toThousandFix:toThousandFix,
    expiryChange: function (e) {
      const val = e.target.value
      console.log(Number(val) === Number(val),this.expiry,'Number(val)');
      if(Number(val) === Number(val)) {
        this.expiry = val
      } else {
        this.expiry = ''
      }
    },
    checkEmail: function (email) {
      const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      return reg.test(email)
    },
    closeErrorTip: function () {
      this.showErrorTip = false
    },
    submitInfo: function () {
      const {email,card,expiryM,expiryY,cvc} = this
      console.log(email,card,expiryM,expiryY,cvc,'sdfsfsf');
      const emailReg = this.$options.methods.checkEmail.call(this,email)
      if(!email || !emailReg) {
        this.emailEr = true
      } else if(!card) {
        this.cardEr = true
      } else if(!expiryM || expiryM.length!=2) {
        this.expiryEr = true
      } else if(!expiryY || expiryY.length!=2) {
        this.expiryEr = true
      } else if(!cvc) {
        this.cvcEr = true
      } else {
        const that = this
        this.showLoading = true
        this.$store.dispatch(POST_CARD_PAY_ACTION,{
          order_id: this.$route.query.order_id,
          card_num: card,
          year: expiryY,
          month: expiryM,
          cvc: cvc,
          email: email
        }).then((res)=>{
          that.showLoading = false
          if(res.success) {
            that.$router.push({ 
              path: "/pay/paysuccess"
            });
          } else {
            if (res.errorCode == 400010){
              that.errorTip=that.$t("银行卡余额不足")
            } else if(res.errorCode == 400011){
              that.errorTip=that.$t("银行卡被拒绝")
            } else if(res.errorCode == 400012){
              that.errorTip=that.$t("银行卡过期")
            } else if(res.errorCode == 400013){
              that.errorTip=that.$t("CVC不正确")
            } else if(res.errorCode == 400014){
              that.errorTip=that.$t("银行卡号码不对")
            } else if(res.errorCode == 400015){
              that.errorTip=that.$t("错误的zipcode")
            } else if(res.errorCode == 400016){
              that.errorTip=that.$t("银行卡类型不支持")
            } else{
              that.errorTip=that.$t("请联系客服")
            }
            that.showErrorTip=true
          }
        }).catch(()=>{
          that.showLoading = false
          that.errorTip = that.$t("信息获取失败")
          that.showErrorTip = true
        })
      }
    }

  },
  computed:{
    isWeixin() {
      return this.$store.state.base.isWeixin
    }
  },
  watch: {
    card: function (newVal, oldVal) {
      this.cardEr = false
    },
    email: function (newVal, oldVal) {
      this.emailEr = false
    },
    cvc: function (newVal, oldVal) {
      this.cvcEr = false
    },
    expiryM: function(newVal, oldVal) {
      this.expiryEr = false
      if(Number(newVal)===Number(newVal)) {
        if(newVal>1 && newVal.length == 1) {
          this.expiryM = newVal > 9 ? newVal : '0'+newVal
        } else if (newVal.length == 2 && newVal < 1) {
          this.expiryM = oldVal
        } else if (newVal.length == 2 && newVal < 13) {
          this.expiryM = newVal
          this.$refs.expiryY.focus()
        } else if (newVal.length == 2 && newVal > 12) {
          this.expiryM = oldVal
          this.$refs.expiryY.focus()
        } else if (newVal.length == 3) {
          this.expiryM = oldVal
          this.$refs.expiryY.focus()
        } 
      } else {
        this.expiryM = oldVal
      }
    },
    expiryY: function(newVal, oldVal) {
      this.expiryEr = false
      if(Number(newVal)===Number(newVal)) {
        if(newVal.length>2) {
          this.expiryY = oldVal
        }
      } else {
        this.expiryY = oldVal
      }
    }
  }
  
}

</script>

<style lang="scss" scoped>
.w-container {
  overflow: hidden;
}
.expiry-input {
  width: 30px;
  &.year {
    margin-left: 3px;
  }
}
.pay-form-header {
  width: 100%;
  height: 150px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
}
.pay-form-logo {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #fff;
}
i {
  font-size: 14px;
  padding-right: 5px;
}
input {
  width: 100%;
  border: none;
  outline: none;
  margin-left: 20px;
  &::-webkit-input-placeholder { 
    color:rgb(220, 220, 220); 
  }
  &::-moz-input-placeholder { 
    color:rgb(220, 220, 220); 
  }
}
.card-button {
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  // background: #3ea8e5;
  outline: none;
  @media (max-width: 479px) {
    position: fixed;
    padding: 15px 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 9;
  }
}
.pay-logo {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
  background: rgba(0,0,0,0.1);
  line-height: 10px;
  font-size: 16px;
  text-align: center;
}
.pay-form-body {
  background: #fff;
  width: 100%;
}
.pay-form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  strong {
    color: #000;
  }
  .pay-from-input-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &.cvc {
      border-left: 1px solid rgba(0,0,0,0.1);
      padding-left: 10px;
      @media (max-width: 479px) {
        width: 55%;
      }
    }
    &.expiry {
      @media (max-width: 479px) {
        width:45%;
      }
    }
    .icon-error {
      color: #d81e06;
      display: block;
      width: 16px;
      height: 16px;
      font-size: 13px;
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
    }
  }
}
</style>

