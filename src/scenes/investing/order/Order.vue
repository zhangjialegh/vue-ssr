<template>
  <div class="order-section">
    <div class="order-contaiiner w-container">
      <div class="detail-title">{{$t('确认订单')}}</div>
      <div class="order-section-top">
        <div class="w-row">
          <div class="w-col w-col-6">
            <div class="order-row">
              <div class="info-card-title">{{$t('认购金额',{msg: investIntial})}}</div>
              <div class="w-form invest-amount-wrapper left">
                <input type="number" class="input invest-amount w-input" :class="{'input-error': amountEr}" maxlength="256" name="amount" data-name="Amount" placeholder="$5,000" id="amount" v-model="amount">
                <a class="detail-amount-minus-button w-button" v-on:click="subAmount">-</a>
                <a class="detail-amount-plus-button w-button" v-on:click="plusAmount">+</a>
              </div>
            </div>
            <div class="order-row">
              <div class="info-card-title inline-block no-margin">{{$t('认购金额美元')}}
                <img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('境外跨行汇款'), class: 'tooltip-custom tooltip-other-custom'}">
              </div>
              <div class="card-number medium float-right">${{amount?Number.parseInt(amount).toLocaleString('en-US'):0}}</div>
            </div>
            <div class="order-row">
              <div class="info-card-title inline-block no-margin">{{$t('认购费美元')}}
                <img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('认购费率'), class: 'tooltip-custom tooltip-other-custom'}">
              </div>
              <div class="card-number medium float-right">-${{amount?parseFloat((amount-amount/1.02).toFixed(2)).toLocaleString('en-US'):0}}</div>
            </div>
            <div class="order-row">
              <div class="info-card-title inline-block no-margin">{{$t('实际投资额美元')}}
                <img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('实际投资额公式'), class: 'tooltip-custom tooltip-other-custom'}">
              </div>
              <div class="card-number medium float-right">${{amount?parseFloat((amount/1.02).toFixed(2)).toLocaleString('en-US'):0}}</div>
            </div>
            <div class="order-row">
              <div class="info-card-title inline-block no-margin">{{$t('项目发行价值美元')}}
                <img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('项目发行价值为'), class: 'tooltip-custom tooltip-other-custom'}">
              </div>
              <div class="card-number medium float-right">${{Number.parseInt(houseDetail.initial_issue_value).toLocaleString('en-US')}}</div>
            </div>
            <div class="order-row">
              <div class="info-card-title inline-block no-margin">{{$t('预计持股比例')}}
                <img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom="{ content: $t('持股比例公式'), class: 'tooltip-custom tooltip-other-custom'}">
              </div>
              <div class="card-number medium gold float-right">{{(amount/1.02/ houseDetail.initial_issue_value * 100).toFixed(2)}}%</div>
            </div>
            
          </div>
          
          <div class="order-card-column w-col w-col-6">
            <invest-card :house-detail="houseDetail" :day="houseDetail.day"></invest-card>
          </div>
        </div>
      </div>
      <div class="order-section-top" v-if="$route.query.tuanId || $route.query.tuanCode">
        <div class="info-card-title">{{$t('多人投规则')}}</div>
        <div class="div-block-23">
          <p class="paragraph-40">
            <span class="group-rule" v-for="item in houseDetail.tuan_rules" :key="item">
              {{item}}
            </span>
          </p>
        </div>
      </div>
      <div class="order-section-top small-bottom-margin">
        <div class="order-person-info-notice">*{{$t('请确保您填写')}}</div>
        <div class="info-card-title">{{$t('个人资料')}}</div>
        <div class="w-form">
          <div class="w-row">
            <div class="w-col w-col-6">
              <label for="name-5" class="form-label">
                {{$t('名字')}} <span class="text-red">*</span>
              </label>
              <input type="text" class="input w-input" :class="{'input-error':nameEr}" maxlength="256" name="name-5" data-name="Name 5" :placeholder="$t('请输入你的姓名')" id="name-5" v-model="name">
            </div>

            <div class="w-col w-col-6"><label for="identity-2" class="form-label">{{$t('证件号码')}} <span class="text-red">*</span></label>
                <div class="w-row">
                  <div class="column-48 w-col w-col-4">
                    <select id="bank-2" name="bank-2" data-name="Bank 2" v-model="idType" class="input order-bank-selector w-select">
                      <option :value="index" v-for="(id,index) in idArr" :key="id+index">{{id}}</option>
                    </select>
                  </div>
                <div class="w-col w-col-8"><input type="text" class="input w-input" :class="{'input-error':idNumberEr}" maxlength="256" name="identity-2" data-name="Identity 2" :placeholder="$t('证件号码')" id="identity-2" v-model="idNumber"></div>
              </div>
            </div>
          </div>
          <div class="w-row">
            <div class="w-col w-col-6"><label for="phone-2" class="form-label">{{$t('手机号码')}} <span class="text-red">*</span></label>
                <div class="w-row">
                  <div class="w-col w-col-4">
                    <select id="bank-2" name="bank-2" data-name="Bank 2" v-model="phoneType" class="input order-bank-selector w-select">
                      <option :value="phone.value" v-for="(phone,index) in phoneArr" :key="phone.title+index">{{phone.title}}</option>
                    </select>
                  </div>
                <div class="w-col w-col-8"><input type="text" class="input w-input" :class="{'input-error':phoneEr}" maxlength="256" name="identity-2" data-name="Identity 2" :placeholder="$t('手机号码')" id="identity-2" v-model="phone"></div>
              </div>
            </div>
            <div class="w-col w-col-6">
              <label for="email-2" class="form-label">
                {{$t('电子邮件')}} <span class="text-red">*</span>
              </label>
              <input type="email" class="input w-input" :class="{'input-error':emailEr}" maxlength="256" name="email-2" data-name="Email 2" :placeholder="$t('请填写有效电子邮箱')" id="email-2" v-model="email">
            </div>
          </div>
          <div class="order-row no-border-bottom">
            <div class="info-card-title">{{$t('投资协议')}}</div>
            <div class="w-form">
              <input type="checkbox" name="proto" id="proto" class="w-checkbox-input" v-model="checkAgreement">
              <label class="field-label-17 w-form-label" for="proto">{{$t('我阅读且同意')}}</label>
              <template v-if="houseDetail.agreements && houseDetail.agreements.length>0">
                <a class="agreenment-item" :href="item.url" target="_blank" v-for="(item,index) in houseDetail.agreements" :key="item.title+index">《{{item.title}}》</a>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="order-section-top">
        <div class="info-card-title">{{$t('付款信息')}}</div>
        <div class="div-block-23">
          <p class="paragraph-40" v-html="$t('协议说明')"></p>
        </div>
        <div class="order-row">
          <div class="info-card-title">{{$t('会员专享')}}</div>
          <div class="w-form invest-amount-wrapper left">
            <div data-delay="0" class="dropdown-5 w-dropdown" @click="showProfitShadow">
              <div class="dropdown-toggle-8 w-dropdown-toggle">
                <div class="icon-6 w-icon-dropdown-toggle"></div>
                <div class="text-block-53" v-if="couponList.length==0">{{$t('暂无可用福利')}}</div>
                <div class="text-block-53 profit-title" v-for="item in couponList" :key="item.id" v-else-if="couponList.length>0 && profitOpt>0">{{item.id==profitOpt?item.title:''}}</div>
                <div class="text-block-53" v-else>{{$t('请选择可用福利')}}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="row-18 w-row">
            <div class="w-col w-col-6">
              <h1 class="heading-19">{{$t('支付金额美元')}}<span class="money">$ {{amount?Number.parseInt(amount).toLocaleString('en-US'):0}}</span></h1>
            </div>
            <!-- <div class="column-15 w-col w-col-6">
              <a href="#" class="button-8 w-button">支付宝定金付款</a>
              <a href="#" class="button-9 w-button">微信定金付款</a>
            </div> -->
          </div>
        </div>
      </div>
      <!-- <div class="payorder-button-container">
        <a class="button order-button w-button blue">￥1000</a>
        <a class="button order-button w-button" v-on:click="payOrder('submit')">立即支付订金</a>
      </div> -->
      <div class="payorder-button-container">
        <a class="button order-button w-button blue">$ {{amount?Number.parseInt(amount).toLocaleString('en-US'):0}}</a>
        <a class="button order-button w-button" v-on:click="payOrder2()">{{$t('提交订单')}}</a>
      </div>
    </div>

    <!-- <div class="div-block-26">
    <div class="div-block-25">
      <div class="div-block-30">
        <p class="paragraph-47">扫码支付定金¥{{houseDetail.deposit}}</p>
      </div>
      <div class="div-block-31"><img src="@/assets/images/wehatpay.png" width="140"></div>
      <canvas id="canvas" class="image-16"></canvas>
      </div>
  </div> -->

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
      <div class="text-block-25" v-if="!refreshCode">{{$t('扫码支付定金')}}{{houseDetail.deposit}}</div>
      <div class="text-block-25" v-else>{{$t('二维码已过期')}}<a href="javascript:;" @click="payOrder('refresh')" class="refresh-code">{{$t('刷新')}}</a>{{$t('页面重新获取二维码')}}</div>
    </div>
  </div>
  <pop-box :show-tip="showTip" :tip="tip">
    <div class="w-row">
      <div class="column-55 w-col w-col-6"><a href="javascript:;" class="button-13 w-button" @click="closePopTip">{{$t('取消订单')}}</a></div>
      <div class="column-55 w-col w-col-6"><a href="javascript:;" class="button-14 w-button" @click="payContinue">{{$t('继续支付')}}</a></div>
    </div>
  </pop-box>

  <pop-box :show-tip="showErrorTip" :tip="errorTip">
    <div class="w-row">
      <div class="column-55 w-col w-col-6 float-right single-btn"><a href="javascript:;" class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
    </div>
  </pop-box>

  <group-card v-if="showGroupPop" :group-detail="groupDetail" :hide-close="true">
    <template slot="groupbutton">
      <router-link :to="{path: '/mine', query: {active: 0}}" class="group-invest-card-btn copy w-button">{{$t('查看资产')}}</router-link>
      <a class="group-invest-card-btn share w-button" @click="inviteJoinGroup">{{$t('微信邀请好友参团')}}</a>
    </template>
  </group-card>

  <group-intro :show="showGroupIntro">
    <a class="group-invest-btn group-invest-btn-continue w-button" @click="closeGroupIntro(false)">{{$t('继续提醒')}}</a>
    <a class="group-invest-btn group-invest-btn-close w-button" @click="closeGroupIntro(true)">{{$t('知道了')}}</a>
  </group-intro>
    <transition-box :show="showProfit">
      <div class="profile-wrapper profile-card-container" v-show="showProfit">
        <div class="profile-header">
          <!-- <div class="profile-card-close" @click="cancelProfit"></div> -->
          <a @click="cancelProfit" class="link-6 w-button cancel">{{$t('取消')}}</a><a @click="confirmProfit" class="link-6 w-button">{{$t('确定')}}</a></div>
        <ul class="unordered-list-7 to-use">
          <li class="list-item-7" v-for="item in couponList" :key="item.id">
            <div class="profile-card-wrapper">
              <div class="profile-card-item-left">
                <h5 class="heading-65">{{item.title}}</h5>
                <div class="text-block-57">{{$t('有效期至')}}{{item.end_time}}</div>
                <div class="text-block-58" v-if="item.rule_desc">{{item.rule_desc}}</div>
              </div>
              <div class="profile-card-item-right"><a @click="optionProfit(item.id)" class="link-5 w-button" :class="{'unselect ': profitOpt!=item.id}">{{profitOpt==item.id?$t('已选择'):$t('使用')}}</a></div>
            </div>
          </li>
        </ul>
      </div>
    </transition-box>
    <transition-box :show="showOrderQr">
      <div class="tiyanjin-wrapper" v-show="showOrderQr">
        <div class="tiyanjin-service-head">
          <div class="text-block-59">{{houseDetail.title}}<br></div>
          <div class="text-block-60">{{$t('长按或扫码关注')}}<br></div>
          <div class="text-block-60">{{$t('及时查收分红到账信息')}}<br></div>
        </div><img src="https://wechat-pics.fangpinduo.com/website/wehome/tiyanjin-wechat-service-qrcode.png" class="tiyanjin-service-img">
        <div class="tiyanjin-service-foot">
          <div class="text-block-61">{{$t('收到分红消息后')}}<br></div>
        </div>
        <div class="tiyanjin-wrapper-close" @click="closeOrderQr"></div>
      </div>
    </transition-box>
  </div>
</template>

<script>
import {
  CREATE_CROWDFUNDING_ORDER_ACTION,
  GET_PAYMENT_STATUS_ACTION,
  GET_REFER_TUAN_ACTION,
  SET_USER_COLOSE_ACTION,
  GET_COUPON_LIST_ACTION,
  GET_QUESTION_STATUS_ACTION,
  GET_PROJECT_DETAIL_ACTION,
  PLACE_CROWDFUNDING_ORDER_ACTION
  } from '../modules'
import QRCode from "qrcode";
import { formatValidDate } from '@/utils/utils.js'
import { track, after } from "trackpoint-tools";
import Track from "@/track";


export default {
  name: "order",
  data() {
    return {
      showQrCode: false,
      refreshCode: true,
      needReview: false,
      overTime: 0,
      groupId: null,
      pollingInterval: 2000, //ms
      maxTime: 5000 * 60,
      groupDetail: {},
      showGroupPop: false,
      showGroupIntro: false,
      isLoading: true,
      amount: 5000,
      amountEr: false,
      nameEr: false,
      idNumberEr: false,
      phoneEr: false,
      emailEr: false,
      investIntial: 5000,
      payMethod: 'submit',
      name: "",
      idNumber: "",
      phone: "",
      phoneType: 86,
      checkAgreement: false,
      email: "",
      errorTip: "",
      idType: 0,
      idArr: ["身份证", "护照", "港澳通行证"],
      phoneArr: [
        {
          value: 86,
          title: "中国大陆(+86)"
        },
        {
          value: 1,
          title: "美国(+1)"
        },
        {
          value: 852,
          title: "中国香港(+852)"
        }
      ],
      showTip: false,
      showErrorTip: false,
      tip: '',
      couponList: [],
      showProfit: false,
      profitOpt: -1,
      selectedCard: -1,
      showOrderQr: false,
      is_inner:false, // 是否为内部用户
      submit_type:1,
    };
  },
  methods: {
    getHouseDetail: function() {
      const that = this;
      this.$store.dispatch(GET_PROJECT_DETAIL_ACTION,{id: that.id}).then((result)=>{
        let day;
        const time = result.phase_end ? result.phase_end : 0;
        const delta = time - new Date().getTime() / 1000;
        if (delta > 0) {
          day = Math.floor(delta / 60 / 60 / 24);
        } else {
          day = 0;
        }
        // 初始化用户信息
        that.idType = Number.parseInt(result.user_info.id_type) ? Number.parseInt(result.user_info.id_type) : 0
        that.idNumber = result.user_info.id_num ? result.user_info.id_num : ''
        that.name = result.user_info.name ? result.user_info.name : ''
        that.phoneType = result.user_info.country ? result.user_info.country : '86'
        that.phone = result.user_info.phone ? result.user_info.phone : ''
        result.day = day;
        result.investing = true
        that.isLoading = false;
        // 订单页暂时不再弹出多人投介绍，在项目详情页弹出
        // that.showGroupIntro = result.show_tuan_intro ? true : false
        if(that.tuanCode) {
          that.$options.methods.loadGroupInfo.call(that, that.tuanCode)
        }
      })
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "order-calc-sub-button",
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
        Track.eventTrack({
          category: "order-calc-plus-button",
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
      if (this.amount <= this.houseDetail.initial_value - 1000) {
        this.amount = Number.parseInt(Number(this.amount)) + 1000;
      }
    },
    clearEr: function() {
      this.amountEr = this.nameEr = this.idNumberEr = this.phoneEr = this.emailEr = false;
      this.errorTip = "";
    },
    popTip: function (tips) {
      if (tips) {
        this.showTip = true
        this.tip = tips
      }
    },
    @track(after(function () {
      Track.eventTrack({
        category: 'order-close-over-tip-popup',
        action: 'click',
        optLabel: 'popup',
        page: this.$route.name,
        optValue: {
          tip: this.tip,
          payMethod: this.payMethod,
          errorTip: this.errorTip,
          amount: this.amount,
          name: this.name,
          id_type: this.idType,
          id_num: this.idNumber,
          phone: this.phone,
          country: this.phoneType,
          projectId: Number.parseInt(this.houseDetail.project_id)
        }
      })
    }))
    closePopTip : function () {
      this.showTip = false
      this.showErrorTip = false
      if(this.needReview) {
        this.$router.push({
          path: '/invest',
        })
      }
    },
    formValidate:function(){
      const {
        amount,
        name,
        idNumber,
        phone,
        email,
        investIntial,
        idType,
        phoneType,
        amountEr,
        nameEr,
        idNumberEr,
        phoneEr,
        emailEr,
        houseDetail,
        checkAgreement
      } = this;
      // 
      this.$options.methods.clearEr.call(this);
      
      if (!amount) {
        this.errorTip = this.$t('投资金额不能为空');
        this.showErrorTip = true
        this.amountEr = true;
      } else if (amount < investIntial) {
        this.errorTip = this.$t('投资金额不能小于5000美金');
        this.showErrorTip = true
        this.amountEr = true;
      } else if (amount > this.houseDetail.initial_value) {
        this.errorTip = this.$t('投资金额不能超过本项目总价');
        this.showErrorTip = true
        this.amountEr = true;
      } else if (!name) {
        this.errorTip = this.$t('请输入你的姓名');
        this.showErrorTip = true
        this.nameEr = true;
      } else if (!idNumber) {
        this.errorTip = this.$t('请输入你的证件号码');
        this.showErrorTip = true
        this.idNumberEr = true;
      } else if (!phone) {
        this.errorTip = this.$t('请输入你的手机号码');
        this.showErrorTip = true
        this.phoneEr = true;
      } else if (!email) {
        this.errorTip = this.$t('请填写有效电子邮箱');
        this.showErrorTip = true
        this.emailEr = true;
      } else if (!checkAgreement) {
        this.errorTip = this.$t('请阅读投资协议');
        this.showErrorTip = true
      } else if ((houseDetail.raise_value - houseDetail.amount_count) > investIntial && (houseDetail.raise_value - houseDetail.amount_count) < amount) {
        const tips = this.$t('尊敬的投资者',{msg:(houseDetail.raise_value - houseDetail.amount_count)})
        this.amount = houseDetail.raise_value - houseDetail.amount_count
        this.$options.methods.popTip.call(this, tips)
      } else if ((houseDetail.raise_value - houseDetail.amount_count) < investIntial && amount >= investIntial) {
        const tips = this.$t('项目已进入超募状态')
        this.$options.methods.popTip.call(this, tips)
      } else {
        return true;
      }
      return false;
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "order-pay-submit-button",
          action: "click",
          optLabel: "submit",
          page: this.$route.name,
          optValue: {
            payMethod: this.payMethod,
            errorTip: this.errorTip,
            amount: this.amount,
            name: this.name,
            id_type: this.idType,
            id_num: this.idNumber,
            phone: this.phone,
            country: this.phoneType,
            projectId: Number.parseInt(this.houseDetail.project_id)
          }
        });
      })
    )
    payOrder: function(method) {
      this.submit_type = 1;
      this.refreshCode = false;
      this.payMethod = method
      
      if(this.$options.methods.formValidate.call(this)){
        this.$options.methods.payRequest.call(this)
      }
    },
    /*点击提交按钮*/
    payOrder2:function(){
      this.submit_type = 2;
      if(!this.$options.methods.formValidate.call(this,"submit_order")){
        return false;
      }
      this.submitOrder()
    },
    /*提交WeHome订单*/
    submitOrder: function(){
      const that = this;
      this.$options.methods.closePopTip.call(this)
      const {amount, name, idType, idNumber, email,phone, phoneType, isWeixin, tuanId, tuanCode, groupId, selectedCard} = this
      const data = {
          project_id: Number.parseInt(this.houseDetail.project_id),
          amount: amount,
          name: name,
          id_type: idType,
          id_num: idNumber,
          phone: phone,
          email: email,
          country: phoneType,
          order_source: isWeixin ? 2 : 1 //0:miniapp(default)  1:web 2:微信h5
        }

      if (groupId) {
        data.tuan_id = Number.parseInt(groupId)
      } else if (tuanId > 1) {
        data.tuan_config_id = Number.parseInt(tuanId)
      }

      if (selectedCard > 0) {
        data.coupon_id = Number(selectedCard)
      }
      this.$store.dispatch(CREATE_CROWDFUNDING_ORDER_ACTION,data).then((result) => {
        if(result.success){
          this.$router.push({
            path: '/pay',
            query: {
              order_id: result.order_id
            }
          })
        } else{
          that.errorTip = result.message;
          that.showErrorTip = true
        }
      }).catch((error) => {
        that.errorTip = that.$t('订单提交错误')
        that.showErrorTip = true
      })
    },
    /*继续支付*/
    payContinue:function(){
      if(this.submit_type == 2){
        this.submitOrder()
      }else{
        this.payRequest()
      }
    },
    @track(after(function () {
      Track.eventTrack({
        category: 'order-pay-over-tip-popup',
        action: 'click',
        optLabel: 'popup',
        page: this.$route.name,
        optValue: {
          tip: this.tip,
          payMethod: this.payMethod,
          errorTip: this.errorTip,
          amount: this.amount,
          name: this.name,
          id_type: this.idType,
          id_num: this.idNumber,
          phone: this.phone,
          country: this.phoneType,
          projectId: Number.parseInt(this.houseDetail.project_id)
        }
      })
    }))
    payRequest: function () {
      const that = this;
      this.$options.methods.closePopTip.call(this)
      const {amount, name, idType, idNumber, email,phone, phoneType, isWeixin, tuanId, tuanCode, groupId, selectedCard} = this
      const data = {
          projectId: Number.parseInt(this.houseDetail.project_id),
          amount: amount,
          name: name,
          id_type: idType,
          id_num: idNumber,
          phone: phone,
          email: email,
          country: phoneType,
          order_source: isWeixin ? 2 : 1 //0:miniapp(default)  1:web 2:微信h5
        }

      if (groupId) {
        data.tuan_id = Number.parseInt(groupId)
      } else if (tuanId > 1) {
        data.tuan_config_id = Number.parseInt(tuanId)
      }
      if (selectedCard > 0) {
        data.coupon_id = Number(selectedCard)
      }
      this.$store.dispatch(PLACE_CROWDFUNDING_ORDER_ACTION,data).then((result)=>{
        if(that.isWeixin) {
            that.$options.methods.onBridgeReady.call(that,result,result.invite_code)
        } else {
            that.$options.methods.generateQrcode.call(
            that,
            result.code_url,
            result.timeStamp,
            result.invite_code
          );
        }
      }).catch((error)=>{
        console.log(error);
        that.errorTip = that.$t('订单提交错误')
        that.showErrorTip = true
      })
    },
    generateQrcode: function(code, orderNum, tuanCode) {
      this.showQrCode = true;
      const that = this;
      const canvas = this.$refs.canvas;
      const cano = this.$refs.cano;
      QRCode.toCanvas(cano, this.$t('刷新页面重新获取二维码'), {
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
          that.$store.dispatch(GET_PAYMENT_STATUS_ACTION,{out_trade_no: orderNum}).then((result)=>{
            if (result.payment_status == 1) {
              clearInterval(that.time)
              that.showOrderQr = true
            }
          })
          that.overTime += that.pollingInterval;
        }, that.pollingInterval);
      });
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "order-qrcode-close-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
            amount: this.amount
          }
        });
      })
    )
    closeQrcode: function() {
      clearInterval(this.time)
      this.showQrCode = false;
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "order-close-service-qr-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    closeOrderQr: function() {
      this.showOrderQr = false
      this.$router.push({ path: "/mine", query: {active: 0} })
    },

    // 公众号支付控件
    onBridgeReady: function (data, code) {
      const that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
          function(res){     
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                // if(code) {
                //   that.$options.methods.loadGroupInfo.call(that, code)
                // } else {
                  that.showOrderQr = true
                // }
              } else {
                const tips = that.$t('支付失败或取消支付')
                that.$options.methods.popTip.call(that, tips)
              }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          }
      )
    },

    // 多人投
    loadGroupInfo: function (code) {
    const that = this;
    this.$store.dispatch(GET_REFER_TUAN_ACTION,{invite_code: code}).then((data)=>{
      that.groupDetail = data
      that.groupId = data.tuan_id
    })
   },
   closeGroupIntro: function (params) {
     const that = this
     if(params) {
       this.$store.dispatch(SET_USER_COLOSE_ACTION,{mask:16})
     }
     this.showGroupIntro = false
   },
   getCouponList: function () {
      const that = this
      let data = {
        range: 2
      }
      const {groupId, tuanId} = this
      if (groupId || tuanId > 1) {
        data.tuan = 1
      } 
      this.$store.dispatch(GET_COUPON_LIST_ACTION,data).then((res)=>{
        for (let i = 0; i < res.coupons.length; i++) {
          const element = res.coupons[i];
          res.coupons[i].end_time = element.expiry_date ? formatValidDate(element.expiry_date) : null
        }
        that.couponList = res.coupons
        that.is_inner = res.is_inner
      })
    },
    showProfitShadow: function () {
      if (this.couponList.length) {
        this.showProfit = true
      } else {
        this.errorTip = this.$t('暂无可用福利');
        this.showErrorTip = true
      }
    },
    optionProfit: function (id) {
      this.profitOpt = id
    },
    confirmProfit: function () {
      if (this.profitOpt > -1) {
        this.selectedCard = this.profitOpt
        this.$options.methods.closeProfitShadow.call(this)
      } else {
        this.errorTip = this.$t('请选择一项福利')
        this.showErrorTip = true
      }
    },
    cancelProfit: function () {
      this.profitOpt = this.selectedCard > 0 ? this.selectedCard:-1
      this.$options.methods.closeProfitShadow.call(this)
    },
    closeProfitShadow: function () {
      this.showProfit = false
    },
   inviteJoinGroup: function (params) {
     
   },
   checkReviewStatus: function () {
     const {permission,reviewStatus} = this
     if(!permission && reviewStatus!=this.GLOBAL.qesProcess) {
        this.$router.push({
          path: '/questionnaire',
          query: {
            slink: this.$route.fullPath,
            qesSource: this.GLOBAL.QES_SOURCE_PJTORDER
          }
        })
      } else if(reviewStatus == this.GLOBAL.qesProcess) {
        this.errorTip = this.$t('GLOBAL.NEED_REVIEW_TIP')
        this.showErrorTip = true
        this.needReview = true
      }
   }
  },
  created() {
    this.getHouseDetail();
    this.getCouponList()
    if(!this.tuanId && !this.tuanCode) {
      this.checkReviewStatus()
    }
  },
  computed: {
    id() {
      return this.$route.query.project_id
    },
    tuanId() {
      return this.$route.query.tuanId
    },
    tuanCode() {
      return this.$route.query.tuanCode
    },
    isWeixin() {
      return this.$store.state.base.isWeixin
    },
    permission() {
      return this.$store.state.auth.user.permission
    },
    reviewStatus() {
      return this.$store.state.auth.user.reviewStatus
    },
    houseDetail() {
      return this.$store.state.invest.houseDetail
    }
  }
};
</script>

<style lang="scss" scoped>
.w-selector-wrapper-1 {
  width: 25%;
}
.w-selector-wrapper-2 {
  width: 75%;
}
.order-row.no-border-bottom {
  border-bottom: none;
}
.order-section-top {
  border-bottom: none;
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
.link-6.cancel {
  background: #fff;
  color: #d5a478;
  border: 1px solid #d5a478;
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
.payorder-button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .button.order-button.blue {
    display: none;
    background: #464155;
  }
}

@media (max-width: 479px) {
  .order-section-top {
    padding-top: 0;
  }
  .detail-title {
    margin-top: 30px;
  }
  .dropdown-5 {
    width: 100%;
  }
  .payorder-button-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    .button.order-button.blue {
      display: block;
      border-right: 1px solid #fff;
    }
    .button.order-button {
      border-radius: 0;
    }
  }
}
.group-rule {
  white-space: pre-line;
}
.text-block-53.profit-title {
  color: #ff5000;
}
.w-dropdown {
  z-index: 0;
}
.profile-card-close {
  background-color: #fff;
}
.text-block-57 {
  font-size: 12px;
}
.w-checkbox-input {
  margin-left: 8px;
}
.agreenment-item {
  color: #4383FF;
  margin-right: 5px;
}
.order-person-info-notice {
  color: #FF5000;
  margin-bottom: 20px;
}
.money{
  color: #d5a478;
  font-size:18px;
}
</style>
