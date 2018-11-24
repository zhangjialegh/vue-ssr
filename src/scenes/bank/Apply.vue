<template>
    <div class="w-container  page-content">
        <h1 class="page-title">预约办理</h1>
        <div class="imp-text">为了提高银行的审核通过率，请您仔细填写以下个人信息，提交信息后请留意银行电话通知。</div>
        <ol style="margin-top:16px;padding-left:20px;">
            <li>开设美国银行账户不用出国、不用地址证明、不用签证证明、不用资产证明</li>
            <li>若因资料原因审核不通过或审核开户通过并成功参与WeHome投资，开户服务费全额退还</li>
            <li>我们将严格保证用户信息安全， 为您财富升值保驾护航</li>
            <li>证件类型必须为护照，且需要有效期在半年以上</li>
        </ol>
        <h3 class="title2">个人信息</h3>
        <div class="w-form">
            <div class="w-row">
                <div class="w-col w-col-6 form-group">
                    <label for="name">姓名<span class="red-text">*</span></label>
                    <input type="text" v-model="name" name="name"  v-validate="'required'" class="input w-input" placeholder="请输入你的真实中文姓名" maxlength="20" />
                    <span v-if="errors.has('name')" class="error">{{ errors.first('name') }}</span>

                </div>
                <div class="w-col w-col-6 form-group">
                    <label for="idcardType">证件号码<span class="red-text">*</span></label>
                    <div class="input-group">
                        <select name="cardType" v-model="idcardType" value="1">
                            <option value="1">护照</option>
                        </select>
                        <input type="text" name="idcard" v-model="idcard" v-validate="'required'" v-bind:placeholder="idcardType==='1'?'请输入9位护照号码':'请输入身份证号码'"  maxlength="20"/>
                    </div>
                    <span v-if="errors.has('idcard')" class="error">{{ errors.first('idcard') }}</span>
                </div>
            </div>
            <div class="w-row">
                <div class="w-col w-col-6 form-group">
                    <label for="mobile">手机<span class="red-text">*</span></label>
                    <input type="text" v-model="mobile" name="mobile"  v-validate="'required'" class="input w-input"  placeholder="请输入11位手机号码"/>
                    <span v-if="errors.has('mobile')" class="error">{{ errors.first('mobile') }}</span>
                </div>
                <div class="w-col w-col-6 form-group">
                    <label for="email">电子邮件<span class="red-text">*</span></label>
                    <input type="text" v-model="email" name="email"  v-validate="'required|email'" class="input w-input" placeholder="请输入电子邮件" />
                    <span v-if="errors.has('email')" class="error">{{ errors.first('email') }}</span>
                </div>
            </div>
        </div>

        <h3 class="title2">付款信息</h3>
        <div>
            <span>服务费(成功参与合投后全额退还):</span> <span class="money">¥ {{orderMoney}}</span><br/>
            
        </div>
        <div class="pay-warp">
            <button class="btn-submit" @click="applySubmit">
            预约并支付
            </button>
        </div>
        
        <div class="div-block-26" v-show="showQrCode">
            <div class="div-block-66">
                <div class="quit-wechat-pay" @click="closeQrcode"></div>
                <div class="div-block-67">
                <canvas id="canvas" class="image-27" v-show="!refreshCode"></canvas>
                <canvas id="cano" class="image-27" v-show="refreshCode"></canvas>
                <div class="div-block-69">
                    <div>
                    <div class="text-block-26"><strong>请使用微信扫一扫</strong></div>
                    <div class="text-block-27"><strong>扫描二维码支付</strong></div>
                    </div>
                </div>
                </div>
                <div class="div-block-68"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/phone-bg.png">
                <div class="text-block-24">微信支付</div>
                </div>
                <div class="text-block-25" v-if="!refreshCode">扫码支付定金¥{{orderMoney}}</div>
                <div class="text-block-25" v-else>二维码已过期，<a href="javascript:;" @click="applySubmit('refresh')" class="refresh-code">点击刷新</a>重新获取二维码</div>
            </div>
        </div>
        <pop-box :show-tip="showTip" :tip="tip">
            <div class="w-row">
            <div class="column-55 w-col w-col-6"><a href="javascript:;" class="button-13 w-button" @click="closePopTip">取消订单</a></div>
            <div class="column-55 w-col w-col-6"><a href="javascript:;" class="button-14 w-button" @click="applySubmit">继续支付</a></div>
            </div>
        </pop-box>
        <pop-box :show-tip="showErrorTip" :tip="tip">
          <div class="w-row">
            <div class="column-55 w-col w-col-6 float-right single-btn"><a href="javascript:;" class="button-14 w-button" @click="closePopTip">知道了</a></div>
          </div>
        </pop-box>
        <pop-box :show-tip="showOrderTip" :tip="ordertip">
          <div class="w-row">
            <div class="column-55 w-col w-col-6 float-right single-btn"><a href="javascript:;" class="button-14 w-button" @click="closeOrderPopTip">继续补充资料</a></div>
          </div>
        </pop-box>
    </div>

    
</template>

<script>
import {POST_HUAMEI_PAY_ACTION} from '@/scenes/bank/modules'
import {GET_PAYMENT_STATUS_ACTION} from '@/scenes/investing/modules'
import {GET_USER_HUAMEI_ORDER_ACTION} from '@/scenes/mine/modules'
import { track, after } from "trackpoint-tools";
import { formatValidDate, getElementTop } from "../../utils/utils.js";
import Track from "@/track";
import { Validator } from 'vee-validate';
import {zh} from 'vuejs-datepicker/dist/locale'
import QRCode from "qrcode";

export default {
  name: "bankAccountApply",
  data() {
    return {
        zh:zh,
        orderMoney:999,
        name: "",
        idcardType: "1",
        idcard: "",
        mobile: "",
        email: "",
        showQrCode: false,
        refreshCode: true,
        showErrorTip:false,
        showTip: false,
        tip:'',
        errorTip: "",
        overTime: 0,
        maxTime: 5000 * 60,
        pollingInterval: 2000, //ms poll 订单状态间隔
        showOrderTip:false,
        ordertip:'',
    };
  },
  created(){
    const dictionary = {
      zh: {
        messages:{
          required: (field) => `${field}不能为空`,
          email:"请输入正确的电子邮箱"
        },
        attributes:{
          name:'姓名',
          idcard:'证件号码',
          mobile:'手机号码',
          email:'邮箱'
        },
      }
    };
    Validator.localize(dictionary);
    const validator = new Validator();
    validator.localize('zh');
  },
  methods: {
    applySubmit: function(e) {
      this.$validator.validateAll().then((result) => {
        if(result){
          var that = this;
          this.$store.dispatch(POST_HUAMEI_PAY_ACTION,{
            name: this.name,
            phone: this.mobile,
            id_num: this.idcard,
            email: this.email,
            order_source: that.isWeixin ? 2 : 1 //0:miniapp(default)  1:web 2:微信h5
          }).then((data)=>{
            that.refreshCode = false;
            if (that.isWeixin) {
              WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(
                res
              ) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  that.$router.push({ path: "/bank/addinfo", query: {} });
                } else {
                  const tips = "支付失败或取消支付";
                  that.$options.methods.popTip.call(that, tips);
                } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              });
            } else {
                that.$options.methods.generateQrcode.call(that,data.code_url,data.timeStamp)
            }
          }).catch((error)=>{
            let tips = "提交申请失败，请联系客服";
            if (error.errorCode === that.GLOBAL.ORDER_IS_EXISTS.errorCode){
              tips = "你已经有一个华美的订单正在进行,不能重复提交";
            }
            that.$options.methods.popErrorTip.call(that, tips);
          })
        }else{
          console.log(this.errors)
          const error = this.$el.querySelector('.error')
          if(!error) return;
          window.scrollTo({
              top: getElementTop(error)-200,
              behavior: "smooth"
          })
        }
        
      });
    },
    generateQrcode: function(code, orderNum){
      this.showQrCode = true;
      const that = this;
      const canvas = document.getElementById("canvas");
      const cano = document.getElementById("cano");
      QRCode.toCanvas(cano, "二维码已过期，刷新页面重新获取二维码", {
        width: 250,
        margin: 0
      });
      QRCode.toCanvas(canvas, code, { width: 250, margin: 0 }, function() {
        clearInterval(that.time)
        that.time = setInterval(() => {
          if (that.overTime >= that.maxTime) {
            clearInterval(that.time);
            that.refreshCode = true;
          }
          that.$store.dispatch(GET_PAYMENT_STATUS_API,{
            out_trade_no: orderNum
          }).then((result)=>{
            if (result.payment_status == 1) {
                clearInterval(that.time)
                that.$router.push({ path: "/bank/addinfo"})
            }
          })
          that.overTime += that.pollingInterval;
        }, that.pollingInterval);
      });
    },
    popErrorTip: function(tips){
      if (tips) {
        this.showErrorTip = true
        this.tip = tips
      }
    },
    popTip: function (tips) {
      if (tips) {
        this.showTip = true
        this.tip = tips
      }
    },
    closePopTip : function () {
      this.showTip = false
      this.showErrorTip = false
    },
    closeQrcode: function() {
      clearInterval(this.time)
      this.showQrCode = false;
    },
    closeOrderPopTip: function(){
      // 关闭提示框
      this.showOrderTip = false
      // 跳转到addinfo继续补充资料
      this.$router.push({ path: "/bank/addinfo", query: {} });
    }
  },
  activated(){
    var that = this
    this.$store.dispatch(GET_USER_HUAMEI_ORDER_API)
    .then((res)=>{
      if(res){
        if(res.huamei_status){
          that.hasHuameiOrder=true;
          if(res.huamei_status===1){
            that.ordertip = "您有订单正在进行,可以直接前往补充资料"
            that.showOrderTip = true
          }
        }
      }
    })
  },
  computed:{
      isWeixin(){
          return this.$store.state.base.isWeixin
      }
  }
};
</script>


<style lang="scss" scoped>
.error{
    color: #FF5000;
}
.page-content {
  padding: 16px 16px 100px;
}
.page-title {
  font-size: 20px;
  color: #333;
  border-bottom: 1px solid #ddd;
}
.imp-text {
  color: #ff5000;
  font-size: 14px;
}
.money {
  color: #ff5000;
  font-size: 20px;
}
.title2 {
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;
}
.w-form {
  label {
    font-weight: normal;
    font-size: 12px;
  }
}
.pay-warp {
  margin-top: 24px;
  text-align: right;
  border-top: 1px solid #ddd;
  padding-top: 16px;
}
.btn-submit {
  background: #d5a478;
  padding: 10px 20px;
  color: #fff;
}
.form-group{
  margin-bottom: 16px;
}
.w-input{
  margin-bottom: 0;
}
.input-group {
  position: relative;
  display: table;
  width: 100%;
  height: 38px;
  padding: 0;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 1.428571429;
  color: #333333;
  vertical-align: middle;
  background-color: #ffffff;
  border: 1px solid #cccccc;

  select {
    height: 38px;
    border: none;
    background: none;
    display: table-cell;
    margin: 0 8px;
    &:focus {
      outline: 0;
    }
  }
  input {
    display: table-cell;
    height: 38px;
    border: none;
    border-left: 1px solid #ddd;
    padding-left: 10px;
    min-width: 180px;
    &:focus {
      outline: 0;
    }
  }
  &:focus {
    border-color: #3898ec;
    outline: 0;
  }
}
.refresh-code {
  color: -webkit-link;
}
.div-block-26 {
  background: rgba(255, 255, 255, 0.8);
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
</style>
