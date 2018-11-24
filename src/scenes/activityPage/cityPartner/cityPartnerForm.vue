<template>
  <div>
    <div class="section-3">
      <div class="w-container">
        <div class="city_partner_title">
          <strong>WeHome合伙人<br/></strong>轻松赚美金
        </div>
        <div class="city_partner_form_wrapper">
          <div class="city_partner_form_img"></div>
          <div class="city_partner_form" v-if="!submitSuccess">
            <p>请填写一下问题。<br/>提交申请后，WeHome客服人员会与你联系</p>
            <div class="login-form w-form">
              <input
                type="text"
                class="input w-input"
                maxlength="20"
                autofocus="true"
                :placeholder="$t('姓名')"
                v-model="name"
              >
              <verification-code 
                @select="selectOption"
                @phoneChange="phoneChange"
                @codeChange="codeChange"
                :phone="phone"
                :isPhone = "isBindPhone"
                ></verification-code>
              <input
                type="text"
                class="input w-input"
                maxlength="20"
                autofocus="true"
                :placeholder="$t('邮箱')"
                v-model="email"
              >
              <input
                type="text"
                class="input w-input"
                maxlength="20"
                autofocus="true"
                :placeholder="$t('城市')"
                v-model="city"
              >
              <select class="input w-input" v-model="jobs" v-validate="'required'" name="industry">
                <option  v-for="item in industryList" :key="item" :value="item">{{item}}</option>
              </select>
              <!-- <div data-delay="0" class="dropdown-5 w-dropdown" :style="{width: '100%'}">
                <div class="dropdown-toggle-8 w-dropdown-toggle">
                  <div class="icon-6 w-icon-dropdown-toggle"></div>
                  <div class="text-block-53">{{$t('职业')}}</div>
                  <div class="text-block-53 profit-title" v-for="item in couponList" :key="item.id" v-else-if="couponList.length>0 && profitOpt>0">{{item.id==profitOpt?item.title:''}}</div>
                  <div class="text-block-53" v-else>{{$t('请选择可用福利')}}</div>
                </div>
              </div> -->
              <div class="w-form read_notice">
                <input type="checkbox" name="proto" id="proto" class="w-checkbox-input" v-model="checkAgreement">
                <label class="field-label-17 w-form-label" for="proto">{{$t('我阅读且同意')}}</label>
                <a class="agreenment-item" target="_blank" @click="popProtocal">《WeHome合伙人协议》</a>
              </div>
              <button class="button login-button w-button" @click="submitCityPartner" :class="{'grey': !fill}">
                {{$t('提交申请')}}
              </button>
            </div>
          </div>
          <div class="city_partner_form after_submit" v-else>
            <h2>谢谢，</h2>
            <p>
              您的申请已经收到，<br/>WeHome专员将在一个工作日内与您取得联系。
            </p>
            <router-link :to="{path:'mine',query: {active: 7}}" replace class="city_partner_view"><span>查看申请</span><i class="w-icon-arrow-down"></i></router-link>
          </div>
        </div>
      </div>
    </div>

    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 single-btn"><a class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
      </div>
    </pop-box>

    <proto-cal :show="showTocal" @close="closeProtocal"/>
  </div>
</template>

<script>
  import {
    CHECK_USER_PHONE_BIND_ACTION,
    GET_USER_PARTNER_STATUS_ACTION
  } from '@/scenes/mine/modules'
  import {POST_PARTNER_APPLY_ACTION} from '@/scenes/activityPage/modules'
  import { track, after } from 'trackpoint-tools'
  import Track from '@/track'
  import ProtoCal from './protocal.vue'
  export default {
    name: 'citypartnerform',
    components: { ProtoCal },
    data () {
      return {
        name: '',
        phone: '',
        phoneType: '86',
        phoneCode: '',
        city: '',
        email: '',
        jobs: '互联网科技',
        checkAgreement: false,
        submitSuccess: false,
        showTip: false,
        tip:'',
        showTocal: false,
        isBindPhone: false,
        industryList: [
          '互联网科技',
          '金融服务',
          '房地产与建筑',
          '出版与媒体',
          '零售与消费品',
          '咨询机构',
          '工业',
          '电子',
          '其他'
        ],
      }
    },
    methods: {
      selectOption(msg) {
        this.phoneType = msg
      },
      phoneChange(msg) {
        this.phone = msg
      },
      codeChange(msg) {
        this.phoneCode = msg
      },
      closeProtocal(msg) {
        this.showTocal = msg
      },
      loadPhoneNumber() {
      const that = this;
      this.$store.dispatch(CHECK_USER_PHONE_BIND_ACTION)
      .then((res)=>{
        that.isBindPhone = res.is_bind
        if(res.is_bind) {
          that.phone = res.phone
        }
      })
    },
      popProtocal() {
        this.showTocal = true
      },
      showPopTip(tip) {
        this.tip = tip
        this.showTip = true
      },
      closePopTip() {
        this.showTip = false
      },
      getCityPartnerState() {
      const that = this
      this.$store.dispatch(GET_USER_PARTNER_STATUS_ACTION)
      .then((res)=>{
        const status = res.status
        if(status === null) {
          that.submitSuccess = false
        } else {
          that.submitSuccess = true
        }
      })
    },
      submitCityPartner () {
        const { phone,phoneCode, phoneType, name,city,checkAgreement,email,jobs,fill } = this
        if(!fill) return
        var that = this;
        this.$store.dispatch(POST_PARTNER_APPLY_ACTION,{
          phone,
          name,
          country: phoneType,
          code: phoneCode,
          city,
          email,
          jobs
        }).then((res)=>{
          if (res.success) {
            that.submitSuccess = true
          } else if (res.errorCode==that.GLOBAL.USER_PHONE_EXISTS.errorCode) {
            const tip = that.$t('该手机号已被绑定')
            that.showPopTip.call(that, tip)
          } else if (res.errorCode==that.GLOBAL.SMS_CODE_INVALID.errorCode) {
            const tip = that.$t('验证码错误')
            that.showPopTip.call(that, tip)
          } else {
            const tip = that.$t('系统错误')
            that.showPopTip.call(that, tip)
          }
        })
      }
    },
    computed: {
      fill() {
        const { phone,phoneCode, name,city,checkAgreement,jobs, email } = this
        if(phone && phoneCode && name && city && checkAgreement && jobs && email) {
          return true
        }
        return false
      }
    },
    mounted () {
      this.getCityPartnerState()
      this.loadPhoneNumber()
    }
  }
</script>

<style lang="scss" scoped>
  .city_partner_title {
    width: 100%;
    text-align: center;
    font-size: 34px;
    color: #000;
    font-weight: 300;
    line-height: 40px;
    padding-bottom: 40px;
    @media (max-width: 479px) {
      font-size: 26px;
    }
  }
  .city_partner_form_wrapper {
    width: 100%;
    display: table;
    padding: 0 100px;
    @media (max-width: 479px) {
      padding: 0 30px;
    }
    .city_partner_form_img {
      display: table-cell;
      width: 45%;
      background: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/rawpixel-567016-unsplash.png') no-repeat center center;
      background-size: cover;
      @media (max-width: 479px) {
        display: block;
        height: 200px;
        width: 100%;
      }
    }
    .city_partner_form {
      display: table-cell;
      width: 55%;
      padding: 0 40px;
      &.after_submit {
        p {
          padding: 40px 0;
        }
        .city_partner_view {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 40px;
          i {
            display: block;
            width:25px;
            height: 25px;
            border-radius: 50%;
            background-color: #D5A478;
            color: #fff;
            margin-left: 10px;
            &::before {
              content: "\E603";
              display: block;
              transform: rotate(-90deg);
            }
          }
        }
      }
      @media (max-width: 479px) {
        display: block;
        width: 100%;
        padding: 30px 0 0;
      }
    }
  }
  .w-form {
    &.read_notice {
      padding: 10px 0;
      margin-left: 22px;
      margin-bottom: 0;
    }
  }
  .agreenment-item {
    color: #4383FF;
    margin-right: 5px;
  }
  .w-button.login-button{
    outline: none;
    &.grey {
      background: #9B9B9B;
    }
  }
</style>