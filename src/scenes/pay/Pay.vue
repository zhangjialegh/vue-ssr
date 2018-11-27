
<template>
  <div class="w-container">
    <div class="note-list">
      <div class="note">
        <div class="note-title">{{$t('项目')}}:</div>
        <div class="note-content">{{order_title}}<span>{{show_deposit?$t("订金"):""}}</span></div>
      </div>
      <div class="note">
        <div class="note-title">{{$t('金额')}}:</div>
        <div class="note-content money"><span>{{currency=='usd'?'$':'￥'}}</span>&nbsp;<span>{{amount.toLocaleString('en-US')}}</span><span v-if="payMethod==13" class="service_fee"> + $ {{service_charge}} ({{$t('手续费')}})</span></div>
      </div>
    </div>
    <div class="list">
      <div v-if="productType!==1" class="list-title">{{$t('选择支付方式')}}</div>
      <div v-if="productType==1" class="tab-nav">
        <div class="tab-nav-item" :class="currency=='usd'?'active':''" @click="changeCurrency('usd')">{{$t('在线支付')}}</div>
        <div class="tab-nav-item" :class="currency=='cny'?'active':''" @click="changeCurrency('cny')">{{$t('转账汇款')}}</div>
      </div>
      <div v-if="currency=='usd'">
        <div v-if="showBalance" class="list-item" @click="selectPayMethod(GLOBAL.WEHOME_PAYMENT_METHOD_BALANCE)">
        <div class="item-object">
          <img src="@/assets/images/balance-pay.png" class="item-image" alt="" />
        </div>
        <div class="item-content">
          <div class="item-title">{{$t('余额支付')}}</div>
          <div class="item-desc">
            {{$t('可用余额')}}: <span class="money-small">$ <span>{{current_balance.toLocaleString('en-US')}}</span></span>
          </div>
          <div class="item-extra">
            <CheckBox :checked="GLOBAL.WEHOME_PAYMENT_METHOD_BALANCE==payMethod" :size="26"/>
          </div>
        </div>
      </div>
      <div v-if="productType==4" class="list-item" @click="selectPayMethod(GLOBAL.WEHOME_PAYMENT_METHOD_REMITTANCE)">
        <div class="item-object">
          <img src="@/assets/images/exchange.png" class="item-image" alt="" />
        </div>
        <div class="item-content">
          <div class="item-title">{{$t('转账汇款')}}</div>
          <div class="item-desc"></div>
          <div class="item-extra">
            <CheckBox :checked="GLOBAL.WEHOME_PAYMENT_METHOD_REMITTANCE==payMethod" :size="26"/>
          </div>
        </div>
      </div>
      <div class="list-item" @click="selectPayMethod(GLOBAL.WEHOME_PAYMENT_METHOD_STRIPE)">
        <div class="item-object">
          <img src="@/assets/images/bankcard.png" class="item-image" alt="" />
        </div>
        <div class="item-content">
          <div class="item-title">{{$t('银行卡支付')}}
            <img src="@/assets/images/card-visa.png" class="bankcard" alt="" />
            <img src="@/assets/images/card-master.png" class="bankcard" alt="" />
            <!-- <img src="@/assets/images/card-maestro.png" class="bankcard" alt="" /> -->
            <img src="@/assets/images/card-ae.png" class="bankcard" alt="" />
          </div>
          <div class="item-desc"><span class="tag">{{$t('手续费')}}1.9%</span></div>
          <div class="item-extra">
            <CheckBox :checked="GLOBAL.WEHOME_PAYMENT_METHOD_STRIPE==payMethod" :size="26"/>
          </div>
        </div>
      </div>
      </div>
      
      <div v-else-if="currency=='cny'">
        <div class="list-item" @click="selectPayMethod(GLOBAL.WEHOME_PAYMENT_METHOD_WECHAT)">
          <div class="item-object">
            <img src="@/assets/images/wechatpay.png" class="item-image" alt="" />
          </div>
          <div class="item-content">
            <div class="item-title">{{$t('微信支付')}}</div>
            <div class="item-desc"><span class="tag">{{$t('订金')}}</span></div>
            <div class="item-extra">
              <CheckBox :checked="GLOBAL.WEHOME_PAYMENT_METHOD_WECHAT==payMethod" :size="26"/>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <!-- 仅当产品类型为合投项目时显示该提示 -->
    <div>
      <div v-if="currency=='usd'&&this.payMethod==GLOBAL.WEHOME_PAYMENT_METHOD_STRIPE" class="paper">
        <p>{{$t('在线支付说明')}}:</p>
        <ol class="pay-desc">
          <li>{{$t('支付渠道收取转账金额的')}}<span class="important">3.9%</span>{{$t('作为手续费')}}</li>
          <li>{{$t('用户承担')}}<span class="important">1.9%</span>{{$t('手续费')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('手续费注释'), class: 'tooltip-custom tooltip-other-custom'}">,{{$t('WeHome为用户承担')}}<span class="important">2%</span>{{$t('手续费')}}</li>
        </ol>
        <p>{{$t('注')}}: {{$t('WeHome不会记录任何银行卡信息')}}</p>
      </div>
      <div v-if="currency=='cny'&&need_deposit&&productType==1" class="paper">
        <p>{{$t('转账汇款说明')}}:</p>
        <ol class="pay-desc" v-html="$t('汇款说明明细')">
        </ol>
      </div>
    </div>
    
    <div>
      <button type="button" class="w-button button card-button" @click="pay()">{{submit_btn_text}}</button>
    </div>
    <LoadingToast :show="showLoading" :text="loadingText"/>
    
    <pop-box :show-tip="showErrorTip" :tip="errorTip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn"><a href="javascript:;" class="button-14 w-button" @click="closeErrorTip">{{$t('确定')}}</a></div>
      </div>
    </pop-box>
    <!-- 错误提示窗-阻止进入页面 -->
    <pop-box :show-tip="showPreventTip" :tip="preventTip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn"><a href="javascript:;" class="button-14 w-button" @click="closePreventTip">{{$t('确定')}}</a></div>
      </div>
    </pop-box>
    <!-- 扫码支付 -->
    <div class="div-block-26" v-show="showQrCode">
      <div class="div-block-66">
          <div class="quit-wechat-pay" @click="closeQrcode"></div>
        
        <div class="div-block-67">
          <canvas ref="canvas" class="image-27" v-show="!refreshCode"></canvas>
          <canvas ref="cano" class="image-27" v-show="refreshCode"></canvas>
          <div class="div-block-69">
            <div>
              <div class="text-block-26"><strong>{{$t('请使用微信扫一扫')}}</strong></div>
              <div class="text-block-27"><strong>{{$t('扫描二维码支付')}}</strong></div>
            </div>
          </div>
        </div>
        <div class="div-block-68"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/phone-bg.png">
          <div class="text-block-24">{{$t('微信支付')}}</div>
        </div>
        <div class="text-block-25" v-if="!refreshCode">{{$t('扫码支付定金')}}{{amount}}</div>
        <div class="text-block-25" v-else>{{$t('二维码已过期')}}，<a href="javascript:;" @click="refreshWechatPay('refresh')" class="refresh-code">{{$t('刷新')}}</a>{{$t('页面重新获取二维码')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  POST_BALANCE_PAY_ACTION,
  POST_WECHET_PAY_ACTION,
  GET_WECHEATPAY_STATUS_ACTION,
  GET_WEHOME_ORDER_ACTION
} from '@/scenes/investing/modules'
import QRCode from "qrcode";
import { base64Encode } from '@/utils/utils.js'
export default {
  name:"pay",
  data(){
    return {
      showLoading:false,
      loadingText:"",
      showErrorTip:false,
      errorTip:'',
      showPreventTip:false,
      preventTip:'',
      /** 订单相关  */
      payMethod:1, // 支付方式
      currency:'usd', // 币种,默认为美元
      showBalance:false, // 是否显示余额支付
      amount:0, // 支付金额
      actual_amount:0, // 支付余额
      order_title:'', // 订单标题
      order_desc :'' , // 订单描述
      out_trade_no:'', // 订单号
      deposit_amount:0, // 订金金额
      current_balance:0, // 可用余额
      productType:0, // 产品类型
      need_deposit:false,
      show_deposit:false, //是否显示'订金'
      submit_btn_text:this.$t('立即支付'), // 提交按钮文本
      service_charge:0, // 手续费
      service_charge_percent:0.019, // 手续费费率
      /** 微信支付  */
      showQrCode:false,
      refreshCode: true,
      needReview: false,
      overTime: 0,
      groupId: null,
      pollingInterval: 2000, //ms
      maxTime: 5000 * 60,
    }
  },
  methods:{
    // 变更币种
    changeCurrency:function(currency){
      this.currency = currency
      // 设置默认支付方式
      this.payMethod = this.currency=='usd'? this.GLOBAL.WEHOME_PAYMENT_METHOD_STRIPE:this.GLOBAL.WEHOME_PAYMENT_METHOD_WECHAT
      // 合投项目可以自由选择支付订金或者付全款
      if(this.productType==1){
        this.need_deposit=this.currency=='cny'
        this.amount=this.need_deposit?this.deposit_amount:this.actual_amount
        this.service_charge=Math.round(100*this.amount/(1-this.service_charge_percent)*this.service_charge_percent)/100
      }
      
      this.selectPayMethod(this.payMethod)
    },
    // 银行卡支付
    cardPay:function(){
      this.$router.push({
        path: '/pay/payform',
        query: {
          order_id: this.$route.query.order_id,
          title: this.order_title,
          amount: this.amount/(1-this.service_charge_percent)
        }
      })
    },
    // 余额支付
    balancePay:function(){
      let that = this;
      that.loadingText=this.$t("正在处理订单")
      that.showLoading=true
      this.$store.dispatch(POST_BALANCE_PAY_ACTION,{order_id:that.order_id})
      .then((res)=>{
        if (res && res.success){
            that.$router.push({ path: "/pay/paysuccess", query: {} });
          } else {
            // todo:
            this.errorTip=res.message
            this.showErrorTip=true
            that.loadingText=""
            that.showLoading=false
          }
      }).catch((err)=>{
          console.log(err)
          this.errorTip=that.$t("提交支付失败,请联系客服")
          this.showErrorTip=true
          that.loadingText=""
          that.showLoading=false
      })
    },
    // 微信支付
    wechatPay:function(){
      let that = this;
      that.loadingText=this.$t("正在处理订单")
      that.showLoading=true
      let orderSource = 0  //0:miniapp(default)  1:web 2:微信h5
      if(that.isWeixin) {
        wx.miniProgram.getEnv(function(result) { //判断是否是微信小程序
            if(result.miniprogram) {
               that.showLoading=false
               wx.miniProgram.navigateTo({
                  url: '/pages/wxpay/wxpay?orderId='+that.order_id+'&token='+ that.$store.state.auth.auth.acsToken
                })
            } else {
              orderSource = 2
              that.$options.methods.doRealWechatPay.call(that, orderSource)
            }
          }
        )
      } else {
        orderSource = 1
        that.$options.methods.doRealWechatPay.call(that, orderSource)
      }
    },
    doRealWechatPay: function(orderSource) {
      const that = this
      this.$store.dispatch(POST_WECHET_PAY_ACTION,{
        order_id:that.order_id,
        need_deposit:that.need_deposit,
        order_source: orderSource
      }).then((res)=>{
        if (res && res.success){
          if(that.isWeixin) {
              that.onBridgeReady(res.data,res.data.invite_code)
          } else {
              that.generateQrcode(
                res.data.code_url,
                res.data.trade_no,
                res.data.invite_code
              );
          }
        } else {
          // todo:
          that.errorTip=res.message
          that.showErrorTip=true
        }
        that.loadingText=""
        that.showLoading=false
      }).catch((err)=>{
        console.log(err)
        that.errorTip=that.$t("提交支付失败,请联系客服")
        that.showErrorTip=true
        that.loadingText=""
        that.showLoading=false
      })
    },
    // 选择支付方式
    selectPayMethod:function(payMethod){
      this.payMethod = payMethod;
      if(this.need_deposit&&this.currency=='cny'){
        this.show_deposit=true
        this.submit_btn_text = this.$t("支付订金")
      }else if(this.GLOBAL.WEHOME_PAYMENT_METHOD_REMITTANCE==this.payMethod){
        // 转账汇款
        this.submit_btn_text = this.$t("查看收款账号")
      }else{
        this.show_deposit=false
        this.submit_btn_text = this.$t("立即支付")
      }
    },
    // 点击支付按钮
    pay:function(){
      if(this.payMethod==this.GLOBAL.WEHOME_PAYMENT_METHOD_STRIPE){
        // 信用卡支付
        this.showLoading = true
        this.cardPay()
      }else if(this.payMethod==this.GLOBAL.WEHOME_PAYMENT_METHOD_WECHAT){
        // 微信支付
        this.showLoading = true
        this.wechatPay()
      }else if(this.payMethod==this.GLOBAL.WEHOME_PAYMENT_METHOD_BALANCE){
        // 余额支付
        this.showLoading = true
        this.balancePay()
      } else if(this.payMethod==this.GLOBAL.WEHOME_PAYMENT_METHOD_REMITTANCE){
        // 转账汇款
        this.showLoading = true
        this.$router.push({ path: "/wiretransfer", query: {} });
      }
    },
    // 公众号支付控件
    onBridgeReady: function (data, code) {
      const that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
          function(res){     
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                  // 支付成功,跳转到支付成功页面
                  that.$router.push({ path: "/pay/paysuccess", query: {} });
              } else {
                that.errorTip=that.$t("支付失败或取消支付")
                that.showErrorTip=true
              }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          }
      )
    },
    // 生成支付二维码
    generateQrcode: function(code, trade_no, tuanCode) {
      this.showQrCode = true;
      const that = this;
      const canvas = this.$refs.canvas;
      const cano = this.$refs.cano;
      QRCode.toCanvas(cano, this.$t("刷新页面重新获取二维码"), {
        width: 250,
        margin: 0
      });
      QRCode.toCanvas(canvas, code, { width: 250, margin: 0 }, function() {
        clearInterval(that.time)
        that.refreshCode = false;
        that.time = setInterval(() => {
          if (that.overTime >= that.maxTime) {
            clearInterval(that.time);
            that.refreshCode = true;
          }
          that.$store.dispatch(GET_WECHEATPAY_STATUS_ACTION,{trade_no: trade_no}).then((result)=>{
            console.log(result)
            if (result.payment_status == 2) {
              clearInterval(that.time)
              // 支付成功,跳转到支付成功页面
              that.$router.push({ path: "/pay/paysuccess", query: {} });
            }
          })
          that.overTime += that.pollingInterval;
        }, that.pollingInterval);
      });
    },
    // 刷新微信支付二维码
    refreshWechatPay: function(){
      this.wechatPay()
    },
    closeQrcode: function() {
      clearInterval(this.time)
      this.showQrCode = false;
    },
    closeErrorTip:function(){
      this.showErrorTip=false
      this.errorTip=''
    },
    // 关闭阻止进入页面提示
    closePreventTip:function(){
      this.showPreventTip=false
      this.preventTip=''
      // 返回首页
      this.$router.push({ path: "/", query: {} });
    }
  },
  created() {
    let that = this;
    let order_id = this.$route.query.order_id;
    if(!order_id){
      // 没有传order_id,跳转到首页
      this.$router.push({ path: "/", query: {} });
    }
    this.order_id =  this.$route.query.order_id;
    this.$store.dispatch(GET_WEHOME_ORDER_ACTION,{order_id:order_id})
    .then((res)=>{
      if (res && res.success){
        if (res.order.order_status != 0){
          that.preventTip=that.$t('不能继续支付')
          that.showPreventTip= true
          return
        }
        const order = res.order;
        that.actual_amount = order.actual_amount
        that.deposit_amount = order.deposit_amount
        that.currency = order.currency
        that.need_deposit = order.need_deposit
        that.amount = order.actual_amount
        that.order_title = order.order_title
        that.order_desc = order.order_desc
        that.current_balance = res.user.current_balance
        // 如果余额充足,则使用余额支付 , 充值订单不显示余额支付
        that.showBalance = res.user.current_balance >= that.actual_amount && order.product_type != 4
        // 美金的默认支付方式为信用卡支付,人民币的默认支付方式为微信支付
        that.payMethod = that.currency=='usd'? that.GLOBAL.WEHOME_PAYMENT_METHOD_STRIPE:that.GLOBAL.WEHOME_PAYMENT_METHOD_WECHAT
        that.productType = order.product_type
        that.service_charge=Math.round(100*that.amount/(1-that.service_charge_percent)*that.service_charge_percent)/100
      } else {
        if(res.errorCode==40003){
          that.preventTip=that.$t('订单不存在')
          that.showPreventTip= true
        }
        console.log(res)
      }
    })
    // stripe支付配置
    // this.handler = StripeCheckout.configure({
    //   key: that.GLOBAL.STRIPE_PK,
    //   image: 'https://wechat-pics.fangpinduo.com/wehome/static/logo-black.jpg',
    //   // locale: 'zh',
    //   token: function(token) {
    //     // You can access the token ID with `token.id`.
    //     // Get the token ID to your server-side code for use.
    //     that.loadingText="正在处理订单"
    //     that.showLoading=true
    //     Axios.post(
    //       '/api/pay/stripe_card_pay',{
    //         order_id:order_id,
    //         ...token
    //       },
    //       {
    //         success:function(res){
    //           if (res && res.success){
    //             router.push({ path: "/pay/paysuccess", query: {} });
    //           } else {
    //             if (res.errorCode == 400010){
    //               this.errorTip="银行卡余额不足"
    //             }else if(res.errorCode == 400011){
    //               this.errorTip="银行卡被拒绝"
    //             }else if(res.errorCode == 400012){
    //               this.errorTip="银行卡过期"
    //             } else if(res.errorCode == 400013){
    //               this.errorTip="CVC不正确"
    //             } else if(res.errorCode == 400014){
    //               this.errorTip="银行卡号码不对"
    //             } else if(res.errorCode == 400015){
    //               this.errorTip="错误的zip code"
    //             } else if(res.errorCode == 400016){
    //               this.errorTip="银行卡类型不支持"
    //             }  else{
    //               this.errorTip="提交支付失败,请联系客服"
    //             }
    //             this.showErrorTip=true
    //           }
    //         },
    //         error:function(res){
    //           console.log(res)
    //           this.errorTip="提交支付失败,请联系客服"
    //           this.showErrorTip=true
    //         },
    //         always:function(){
    //           that.loadingText=""
    //           that.showLoading=false
    //         }
    //       }
    //     )
    //   },
    //   opened: function(){
    //     // 当支付窗口显示时,关闭Loding
    //     that.showLoading=false
    //   },
    //   closed: function(){
    //     // 当支付窗口取消后,关闭Loding
    //     that.showLoading=false
    //   },
    //   /** 生成支付二维码 */
    //   generateQrcode: function(code, orderNum, tuanCode) {
    //     this.showQrCode = true;
    //     const that = this;
    //     const canvas = this.$refs.canvas;
    //     const cano = this.$refs.cano;
    //     QRCode.toCanvas(cano, "二维码已过期，刷新页面重新获取二维码", {
    //       width: 250,
    //       margin: 0
    //     });
    //     QRCode.toCanvas(canvas, code, { width: 250, margin: 0 }, function() {
    //       clearInterval(that.time)
    //       that.time = setInterval(() => {
    //         if (that.overTime >= that.maxTime) {
    //           clearInterval(that.time);
    //           that.refreshCode = true;
    //         }
    //         Axios.get(
    //           "/api/order/payment_status",
    //           {
    //             out_trade_no: orderNum
    //           },
    //           {
    //             success: function(result) {
    //               if (result.payment_status == 1) {
    //                 clearInterval(that.time)
    //                 // if(tuanCode) {
    //                 //   that.$options.methods.loadGroupInfo.call(that, tuanCode)
    //                 // } else {
    //                   that.showOrderQr = true
    //                 // }
    //               }
    //             },
    //             error: function(error) {
    //               console.log(error);
    //             }
    //           }
    //         );
    //         that.overTime += that.pollingInterval;
    //       }, that.pollingInterval);
    //     });
    //   },
    // });
    
  },
  mounted() {
    let that = this;
    // window.addEventListener('popstate', function(){
    //   console.log('handle close...');
    //   that.handler.close();
    // });
  },
  computed:{
    isWeixin() {
      return this.$store.state.base.isWeixin
    }
  },
  
}

</script>

<style lang="scss" scoped>
.button{
  outline: none;
}
.note-list{
  padding:15px;
  margin-bottom: 10px;
  background: #fff;
  box-shadow: 1px 1px 5px #ddd;
}
.note {
  display: flex;
  .note-title{
    padding: 6px;
  }
  .note-content{
    flex:1;
    padding: 6px;
  }
}
.money{
  color:#d5a478;
  font-size: 18px;
}
.list{
  background: #fff;
  box-shadow: 1px 1px 5px #ddd;
  .list-title{
    border-bottom: 1px solid #dfdfdf;
    padding:10px 15px;
    
  }
}
.list-item{
  padding: 10px 15px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #dfdfdf;
  &:active{
    background: #efefef;
  }
  .item-object{
    margin-right: 12px;
  }
  .item-content{
    flex: 1;
    align-items: center;
  }
  .item-image{
    width: 48px;
    height:48px;
    background: #fff;
    border-radius: 50%;
  }
  .item-title{
    font-size:16px;
    color:#444;
    .bankcard{
      max-height:16px;
    }
  }
  .item-desc{
    margin-top: 4px;
    color:#999;
  }
  .item-extra{
    position: absolute;
    right:0;
    top:0;
    height:100%;
    padding-right: 15px;
    line-height: 100%;
    display:flex;
    align-items: center;
    .radio{
      width: 20px;
      height: 20px;
    }
  }
}
.tag {
  color:#d5a478;
  border:1px solid #d5a478;
  border-radius:4px;
  padding:2px 4px;
  margin-right:5px;
  font-size: 12px;
}
.paper{
  background: #fff;
  box-shadow: 1px 1px 5px #ddd;
  padding:15px;
  margin-top: 15px;
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
  background: url("https://wechat-pics.fangpinduo.com/close.svg") no-repeat center center;
  background-size: contain;
  z-index: 99;
  cursor: pointer;
}
.refresh-code {
  text-decoration: underline;
  color: -webkit-link;
}
.tab-nav{
  width: 100%;
  display: flex;
  align-content: center;
  position: relative;
  background: #efefef;
  
  .tab-nav-item{
    padding:12px 24px;
    text-align:center;
    position: relative;
    &:active{
      color:#d5a478;
      background-color: #fff;
    }
    &.active{
      color:#d5a478;
      background-color: #fff;
      &:before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 0;
        bottom: 0;
        border-bottom: 2px solid #d5a478;
      }
    }
  }
}
.pay-desc{
  padding-left: 20px!important;
}
.service_fee{
  font-size: 14px;
}
.important{
  color:#d5a478;
  font-size:16px;
}

@media (max-width: 479px){

  .button.card-button{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 12px 0;
      z-index: 10;
  }
  .tab-nav{
    .tab-nav-item{
      flex:1;
      padding:12px 16px;
    }
  }
}
</style>

