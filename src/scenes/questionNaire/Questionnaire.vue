<template>
  <div class="body">
    <div class="questions" :class="{'is_wechat':isWechat}">
    <h5 class="heading-21">{{$route.query.exp_id?$t('距离5000美金就差最后一步'):$t('WeHome美国房产合投意向调查')}}</h5>
    <p class="paragraph-42">
      <span v-if="$route.query.exp_id">{{$t('恭喜您')}}</span>
      <span v-for="item in paras" :key="item" v-else>{{item}}</br></span>
    </p>
    <div class="w-form">
      <form id="email-form-3" name="email-form-3" data-name="Email Form 3">
        <div v-for="(ques,index) in qsList" :key="ques.content+index">
          <label class="field-label-16">{{ques.rank}}.{{ques.content}}</label>
         <!-- 单选 -->
        <div class="row-20 w-row" v-if="ques.answer_type==0">
          <div class="w-col w-col-6" v-for="item in ques.answers" :key="item.content">
            <div class="radio-button-field w-radio">
              <input type="radio" :id="'t'+item.id" :name="item.id" class="w-radio-input" v-model="ques.model" :value="item.id" @change="radioChange(item.id,ques.id)">
              <label :for="'t'+item.id" class="field-label-19 w-form-label">{{item.content}}</label>
            </div>
          </div>
        </div>
        <!-- 多选 -->
        <div class="row-20 w-row" v-if="ques.answer_type==1">
          <div class="w-col w-col-6" v-for="item in ques.answers" :key="item.content">
            <div class="checkbox-field-3 w-checkbox">
              <input type="checkbox" :id="item.id" :name="item.id" class="w-checkbox-input" v-model="item.checked" :value="item.id" @change="checkboxChange(item.checked,item.id,ques.id)">
              <label :for="item.id" class="field-label-17 w-form-label">{{item.content}}</label>
            </div>
            </div>
        </div>
        <!-- 填空 -->
        <input v-if="ques.answer_type==2" type="text" class="text-field-4 w-input" maxlength="256" :name="ques.id" :placeholder="ques.placeholder?ques.placeholder:$t('填写城市')" :id="ques.id" v-model="text" @change="inputChange(ques.id)">
        </div>
        <!-- 填空 -->
        <label class="field-label-16" v-show="!isBindPhone">{{$t('为了更好的为您服务')}}</label>
        
        <verification-code 
          @select="selectOption"
          @phoneChange="phoneChange"
          @codeChange="codeChange"
          v-if="!isBindPhone"
          ></verification-code>
        <p class="paragraph-43">{{$t('感谢您的耐心作答')}}</p>
        <router-link :to="{path:$route.query.slink}" class="ignore-button w-button" v-if="$route.query.slink && $route.query.qesSource==GLOBAL.QES_SOURCE_LOGIN">{{$t('跳过此步骤')}}</router-link>
        <input type="button" :value="expId?$t('开始赚钱'):$t('完成')" data-wait="Please wait..." class="submit-button-2 w-button" @click="submitAnswers">
    </form>
    </div>
  </div>
    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn">
          <router-link :to="{path:'/invest'}" class="button-14 w-button" @click="closePopTip" v-if="needReview">{{$t('知道了')}}</router-link>
          <a href="javascript:;" class="button-14 w-button" @click="closePopTip" v-else-if="needQes">{{$t('确定')}}</a>
          <router-link :to="{path:'/invest'}" class="button-14 w-button" @click="closePopTip" v-else>{{$t('去投资')}}</router-link>
        </div>
      </div>
    </pop-box>

    <pop-box :show-tip="!showTip && showExpTip" :tip="expTip" :pop-title="popTitle">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn">
          <a href="javascript:;" class="button-14 w-button" @click="closeExpTip">{{$t('马上评估')}}</a>
        </div>
      </div>
    </pop-box>

    <div class="tiyanjin-service-wrapper" v-if="showExp">
      <div class="tiyanjin-wrapper">
        <div class="tiyanjin-service-head">
          <div class="text-block-59">{{$t('恭喜您成功投资体验金项目')}}<br></div>
          <div class="text-block-60">{{$t('长按或扫码关注')}}<br></div>
          <div class="text-block-60">{{$t('及时查收分红到账信息')}}<br></div>
        </div><img src="https://wechat-pics.fangpinduo.com/website/wehome/tiyanjin-wechat-service-qrcode.png" class="tiyanjin-service-img">
        <div class="tiyanjin-service-foot">
          <div class="text-block-61">{{$t('隔天开始收益')}}<br></div>
          <!-- <div class="text-block-62">30天有效期，请登录个人中心-个人资产查看收益详情<br></div> -->
        </div>
        <div class="tiyanjin-wrapper-close" @click="closeExpQrCode"></div>
      </div>
    </div>

    <LoadingToast :show="showLoading" :text="loadingText"/>
  </div>
</template>

<script>
import {GET_QUESTION_INVESTIGATION_ACTION,CREATE_EXP_GOLD_ORDER_ACTION} from '@/scenes/investing/modules'
import {CHECK_USER_PHONE_BIND_ACTION,POST_QUESTION_COMMIT_ACTION} from '@/scenes/mine/modules'
import { track, after } from "trackpoint-tools";
import Track from "@/track";
export default {
  name: "questionNaire",
  data() {
    return {
      loadingText:'',
      showLoading: false,
      quenstionares: [],
      answernares: [],
      answerIds: [],
      paras: [],
      qsItem: [],
      picked: "",
      text: "",
      phone: "",
      phoneCode: '',
      phoneType: '86',
      isBindPhone: false,
      ansObj: {},
      tip: this.$t('请先完成问卷'),
      showTip: false,
      needQes: false,
      showExp: false,
      showExpTip: false,
      needReview: false,
      expTip: this.$t('恭喜您'),
      popTitle: this.$t('恭喜您挑选到意向房源')
    };
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
    loadQuestionnaire: function() {
      const that = this;
      this.$store.dispatch(GET_QUESTION_INVESTIGATION_ACTION,{}).then((res)=>{
        if (res.categories) {
          that.quenstionares = res.categories;
          that.paras = res.case_title;
          that.needQes = true
          if(that.$route.query.exp_id) {
            that.showExpTip = true
          }
        } else if(that.$route.query.exp_id) {
            that.$options.methods.createExpProjectOrder.call(that, that.$route.query.exp_id)
        } else {
          const tip = that.$t('您已经参与过合投意向调查')
          that.$options.methods.popTip.call(that,tip)
        }
      }).catch((error)=>{
        console.log(error);
        that.errorTip = that.$t('信息提交错误请仔细检');
      })
    },
    @track(after(function () {
      Track.eventTrack({
        category: 'questionnaire-close-experence-qr-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    closeExpQrCode: function() {
      this.showExp = false;
      this.$router.push({ path: "/mine", query: {active: 0} })
    },
    // 请求接口判断是否获取了手机号码
    loadPhoneNumber: function() {
      const that = this;
      this.$store.dispatch(CHECK_USER_PHONE_BIND_ACTION,{}).then((res)=>{
        that.isBindPhone = res.is_bind
      })
    },
    radioChange: function(ansId, qusId) {
      let { ansObj } = this;
      ansObj[qusId] = ansId;
      this.ansObj = ansObj;
    },
    checkboxChange: function(bool, ansId, qusId) {
      let { ansObj } = this;
      let arr = ansObj[qusId] || [];
      if (bool) {
        arr.push(ansId);
      } else {
        arr = arr.filter(item => {
          return item != ansId;
        });
        arr = arr.length > 0 ? arr : "";
      }
      ansObj[qusId] = arr;
      this.ansObj = ansObj;
    },
    inputChange: function(qusId) {
      let { ansObj, text } = this;
      if (text) {
        ansObj[qusId] = text;
        this.ansObj = ansObj;
      }
    },
    beforeSubmit: function(obj) {
      let bool = true,
        arr = [];
      const { qsList } = this;
      arr = Object.keys(obj).map(item => {
        if (!obj[item]) {
          bool = false;
        }
        if (typeof obj[item] == "object") {
          return {
            question_id: Number.parseInt(item),
            answer: obj[item]
          };
        } else if (typeof obj[item] == "string") {
          return {
            question_id: Number.parseInt(item),
            content: obj[item]
          };
        } else if (typeof obj[item] == "number") {
          return {
            question_id: Number.parseInt(item),
            answer: [obj[item]]
          };
        }
      });
      return Object.keys(obj).length == qsList.length && bool ? arr : false;
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "questionnaire-submit",
          action: "click",
          optLabel: "submit",
          page: this.$route.name,
          optValue: this.ansObj
        });
      })
    )
    submitAnswers: function() {
      const { ansObj, phone, phoneCode,phoneType,isBindPhone } = this;
      let that = this;
      let val = this.$options.methods.beforeSubmit.call(this, ansObj);
      if (!val) {
        const tip = that.$t('请先完成问卷')
        this.$options.methods.popTip.call(this, tip)
      } else if (!phone && !isBindPhone) {
        const tip = that.$t('请输入手机号码')
        this.$options.methods.popTip.call(this, tip)
      } else if (!phoneCode && !isBindPhone) {
        const tip = that.$t('请输入验证码')
        this.$options.methods.popTip.call(this, tip)
      } else {
        this.showLoading = true
        this.$store.dispatch(POST_QUESTION_COMMIT_ACTION,{
          answers: val,
          phone,
          country: phoneType,
          code: phoneCode
        }).then((res)=>{
          that.showLoading = false
          const need_review = res.need_review
          if (res.success) {
            if(!need_review) {
              if(that.sLink) {
                that.$router.push({
                  path: that.sLink
                })
              } else {
                const tip = that.$t('GLOBAL.NEED_REVIEW_TIP')
                that.needReview = true
                that.$options.methods.popTip.call(that, tip)
              }
            } else if (that.expId) {
              that.$options.methods.createExpProjectOrder.call(that, that.expId)
            } else {
              that.$router.push({ path: "/invest" })
            }
          } else if (res.errorCode==1) {
            const tip = that.$t('请重新登录')
            that.$options.methods.popTip.call(that, tip)
          } else if (res.errorCode==2) {
            const tip = that.$t('验证错误请确')
            that.$options.methods.popTip.call(that, tip)
          } else {
            const tip = that.$t('系统错误')
            that.$options.methods.popTip.call(that, tip)
          }
        })
      }
    },
    popTip: function (tip) {
      this.tip = tip
      this.showTip = true
    },
    @track(after(function () {
        Track.eventTrack({
          category: 'questionnaire-close-tip-popup',
          action: 'click',
          optLabel: 'popup',
          page: this.$route.name,
          optValue: this.ansObj
       })
      }))
    closePopTip : function () {
      this.showTip = false
      this.needReview = false
    },
    @track(after(function () {
        Track.eventTrack({
          category: 'questionnaire-close-experience-popup',
          action: 'click',
          optLabel: 'popup',
          page: this.$route.name,
          optValue: {}
       })
      }))
    closeExpTip() {
      this.showExpTip = false
    },
    // 体验金项目下单
    createExpProjectOrder: function (idx) {
      const that = this
      this.$store.dispatch(CREATE_EXP_GOLD_ORDER_ACTION, {project_id: idx}).then(()=>{
        that.showExp = true
      })
    },
  },
  computed: {
    qsList() {
      let list = [];
      this.quenstionares.forEach((item, idx) => {
        item.questions.forEach(tar => {
          list.push(tar);
        });
      });
      return list;
    },
    id() {
      return this.$route.query.project_id;
    },
    expId() {
      return this.$route.query.exp_id
    },
    isWechat() {
      return this.$store.state.base.isWeixin
    },
    qesSource() {
      return this.$route.query.qesSource
    },
    sLink() {
      return this.$route.query.slink
    }
  },
  created() {
    this.loadPhoneNumber();
    this.loadQuestionnaire();
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
.body {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% + 60px);
}
.radio-button-field {
  display: block;
}
.tiyanjin-service-foot {
  margin: 10px 0;
}
.ignore-button {
  background: transparent;
  color: #d5a478;
  margin-top: 10px;
  width: 100%;
  border: 1px solid #d5a478;
}
@media (max-width: 479px) {
  .questions {
    height: 85%;
    padding: 20px;
  }
  .questions.is_wechat {
    height: 90%;
    top: 0;
  }
}
</style>