<template>
  <div>
    <div class="w-form">
      <div class="text-block-45" v-if="isPhone">{{phone}}</div>
      <form id="email-form-2" name="email-form-2" data-name="Email Form 2" class="form-7" v-else>
        <select id="field" name="field" class="select-field-3 verification-code w-select" @input="selectOption">
          <option :value="ph.value" v-for="(ph,index) in phoneArr" :key="ph.title+index">{{ph.title}}</option>
        </select>
        <input type="text" class="text-field-7 w-input" maxlength="256" name="field-2" data-name="Field 2" :placeholder="$t('请输入手机号码')" id="field-2" required="" @input="phoneChange">
      </form>
    </div>
    <div class="w-form">
      <form id="email-form-3" name="email-form-3" data-name="Email Form 3" class="verification-code-wrapper">
        <input type="text" class="text-field-8 verification-code w-input" maxlength="256" name="name" data-name="Name" :placeholder="$t('请输入验证码')" id="name" @input="codeChange">

        <a href="javascript:;" class="submit-button-5 verification-code w-button" @click="sendSMS">{{sendSMSCountDown > 0 ?  `${$t('已发送')} (${sendSMSCountDown}s)` : $t('获取验证码')}}</a>

      </form>
    </div>

    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 single-btn"><a class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
      </div>
    </pop-box>
  </div>
</template>

<script>
import {SEND_SMS_ACTION} from '@/scenes/login/modules'
export default {
  name: "VerificationCode",
  props: {
    isPhone: {
      type: Boolean,
      default: false
    },
    phone: {
      default: ''
    }
  },
  data() {
    return {
      countryCode: '86',
      verificationcode: '',
      phoneInit: this.phone,
      showTip: false,
      tip: '',
      sendSMSCountDown: 0,
    };
  },
  methods: {
    selectOption(e) {
      this.$emit('select', e.target.value)
      this.countryCode = e.target.value
    },
    phoneChange(e) {
      this.$emit('phoneChange', e.target.value)
      this.phoneInit = e.target.value
    },
    codeChange(e) {
      this.$emit('codeChange', e.target.value)
    },
    // 获取验证码
    sendSMS() {
        const that = this;
        const { isPhone,phone,countryCode,phoneInit,sendSMSCountDown } = this
        if (sendSMSCountDown) return;  //防止计时时重复发送验证
        if (!this.phoneInit.trim() && !isPhone) {
          const tip = this.$t('请输入您的手机号码')
          this.popTip(tip)
        } else {
          const ph = isPhone ? phone : phoneInit
          this.$store.dispatch(SEND_SMS_ACTION,{phone:ph,countryCode}).then((res)=>{
            if(res.success) {
              that.startSMSCountDown();
              } else if(res.errorCode == 10007) {
                const tip = that.$t('请输入您的手机号码')
                that.popTip(tip)
              } else if(res.errorCode == 10005) {
                const tip = that.$t('请重新登录')
                that.popTip(tip)
              } else if(res.errorCode == 20001) {
                const tip = that.$t('请重新登录')
                that.popTip(tip)
              } else if(res.errorCode == 10008) {
                const tip = that.$t('请填写有效手机号')
                that.popTip(tip)
              } else if(res.errorCode == 10006) {
                const tip = that.$t('操作过于频繁')
                that.popTip(tip)
              } else {
                const tip = that.$t('系统错误')
                that.popTip(tip)
              }
          }).catch((res)=>{
            if(res.success) {
              that.startSMSCountDown();
              } else if(res.errorCode == 10007) {
                const tip = that.$t('请输入您的手机号码')
                that.popTip(tip)
              } else if(res.errorCode == 10005) {
                const tip = that.$t('请重新登录')
                that.popTip(tip)
              } else if(res.errorCode == 20001) {
                const tip = that.$t('请重新登录')
                that.popTip(tip)
              } else if(res.errorCode == 10008) {
                const tip = that.$t('请填写有效手机号')
                that.popTip(tip)
              } else if(res.errorCode == 10006) {
                const tip = that.$t('操作过于频繁')
                that.popTip(tip)
              } else {
                const tip = that.$t('系统错误')
                that.popTip(tip)
              }
          })
        }
      },
      startSMSCountDown() {
        const that = this;
        // start count down
        this.sendSMSCountDown = 60;
        this.timer = setInterval(function() {
          that.sendSMSCountDown = that.sendSMSCountDown - 1;
          // clear count down
          if (that.sendSMSCountDown <= 0) {
            that.sendSMSCountDown = 0
            clearInterval(that.timer);
          }
        }, 1000);
      },
      popTip(tips) {
        if(tips) this.tip = tips
        this.showTip = true
      },
      closePopTip () {
        this.showTip = false
      }
  },
  computed:{
    phoneArr() {
      const arr = this.$store.state.home.countries;
      return arr.map((item) => {
              item.value = item.code
              item.title = item.name + '(+'+item.code+')'
              item.name = '+'+item.code
              return item
            })
    }
  },
  mounted() {
    
  },
  destroyed() {
    clearInterval(this.timer)
    this.sendSMSCountDown = 0
  }
};
</script>

<style lang="scss" scoped>
.select-field-3.verification-code.w-select {
  padding-right: 0;
}
.text-field-8.verification-code {
  border-radius: 0 !important;
}
.w-input {
  background-color: #fafafa;
}
</style>
