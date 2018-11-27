<template>
  <invest-card :house-detail="houseDetail" :day="day">
    <!-- 如果是体验金项目 -->
    <div v-if="houseDetail.exporder"></div>
    <router-link :to="{path:'/questionnaire',query: {exp_id: houseDetail.id}}" class="button card-button green w-button" v-on:click="collectProperty" v-else-if="houseDetail.experience">{{$t('马上投资')}}</router-link>
    <!-- end -->
    <div class="button card-button green w-button parent" v-else-if="houseDetail.investing&&houseDetail.is_purchased">
      <div class="w-button-child first" @click="invitation"><span>{{$t('邀请好友')}}</span><span class="profit-init">{{$t('各获50美金')}}</span></div>
      <router-link :to="{path:'/mine',query: {active: 0}}" class="w-button-child">{{$t('查看项目')}}</router-link>
    </div>


    <router-link :to="{path:'/order',query: {'project_id':houseDetail.id, 'tuanCode': tuanCode}}" class="button card-button green w-button" v-else-if="houseDetail.investing && (houseDetail.project_status==2||houseDetail.project_status==3) && groupDetail.tuan_status==0 && tuanCode">{{$t('参团')}} {{h+':'+m+':'+s}}</router-link>



    <template v-else-if="houseDetail.investing && (houseDetail.project_status==2||houseDetail.project_status==3)">
      
      <div class="button card-button green w-button parent special">
        <!-- <div class="w-button-child first black-bg mob-only" @click="invitation"><span>单独投</span><span class="profit-init">无额外加息</span></div> -->
        <a class="w-button-child first black-bg mob-only" @click="popGroupView"><span>{{$t('单独投')}}</span><span class="profit-init">{{$t('无额外加息')}}</span></a>
        <a class="w-button-child" :class="{'first': index!=houseDetail.tuan_button.length-1}" v-for="(item, index) in houseDetail.tuan_button" :key="item.button_name+index" v-if="houseDetail.tuan_button.length>0" @click="popGroupBox(item.tuan_config_id)">
          <span>{{$t(item.button_name)}}</span>
          <span class="profit-init">
            <span class="profit-text">{{$t('各获首年')}}</span>
            <span class="profit-jiaxi">{{item.prize_desc}}</span>
          </span>
        </a>

        <a class="w-button-child first black-bg pc-only" @click="popGroupView"><span>{{$t('单独投')}}</span><span class="profit-init">{{$t('无额外加息')}}</span></a>

      </div>
      
    </template>
    

    <div class="button card-button disable w-button" v-else-if="houseDetail.investing && houseDetail.project_status>3">{{$t('合投结束')}}</div>
    <div class="button card-button green w-button" v-on:click="uncollectProperty" v-else-if="collected">{{$t('已想投')}}</div>
    <div class="button card-button green w-button" v-on:click="collectProperty" v-else>{{$t('想投')}}</div>
  
    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn"><a href="javascript:;" class="button-14 w-button autowidth" @click="closePopTip">{{$t('知道了')}}</a></div>
      </div>
    </pop-box>
    <transition-box :show="showInvitationCard">
      <div class="invitation-card" @click="getInvitationTicket" v-show="showInvitationCard">
        <p class="invest-invitation-text" v-if="inviteCount>0">{{$t('人已接收邀请', {msg: inviteCount})}}</p>
        <div class="avatar-wrapper">
          <img :src="avatar" alt="avatar" v-for="(avatar,index) in invitedList" :key="avatar+index" v-if="invitedList.length>0">
        </div>
      </div>
    </transition-box>

    <transition-box :show="showPayNoticeBox">
      <div class="assetdetail-report-wrapper group-pay-box" v-show="showPayNoticeBox">
        <group-hall :id="id" :show-tuan-person="false">
          <div class="report-list-close" @click="closeGroupBox"></div>
          <p class="group-or">{{$t('或')}}</p>
          <router-link :to="{path:'/order',query: {'project_id':id, 'tuanId': tuanConfigId}}" class="group-w-button group-union padding-bottom" v-if="tuanConfigId > 1"><span>{{$t('人投',{msg:tuanConfigId})}}</span><span class="profit-text">，{{$t('各获首年')}}</span>
            <span class="profit-jiaxi">{{tuanConfigId>2?$t('加息1'):$t('加息5')}}</span></router-link>
          <router-link :to="{path:'/order',query: {'project_id':id}}" class="group-w-button padding-bottom" v-else><span>{{$t('单独投')}}</span><span>，{{$t('无额外加息')}}</span></router-link>
        </group-hall>
      </div>
    </transition-box>

    <group-card v-if="showGroupView" :show="showGroupView" :group-detail="houseDetail" v-on:closegroup="closeGroupView" ref="child">
      <template slot="grouprule">
        <div class="group-invest-card-content-wrapper">
          <h5 class="heading-64">{{$t('成功邀请2人各获得首年')}}</h5>
          <div class="text-block-55">{{$t('加息1')}}</div>
        </div>
      </template>
      <template slot="groupavatar">
        <span></span>
      </template>
      <template slot="groupbutton">
        <router-link :to="{path:'/order',query: {'project_id':id, 'tuanId': 3}}" class="group-w-button group-union"><span>{{$t('一键开团')}}</span></router-link>
        <p class="group-or">{{$t('或')}}</p>
        <router-link :to="{path:'/order',query: {'project_id':id}}" class="group-w-button"><span>{{$t('单独投')}}</span><span>，{{$t('无额外加息')}}</span></router-link>
      </template>
    </group-card>

    <invitation-box :show="showShareShadow" :slink="slink" :from="GLOBAL.INVITE_SOURCE_PROJECT" :pid="id" @closeShareShadow="closeShareShadow"></invitation-box>
  </invest-card>
</template>

<script>
import {
  SET_COLLECTION_ADD_ACTION,
  SET_COLLECTION_CHECK_ACTION,
  SET_COLLECTION_DEL_ACTION,
  POST_REFER_INVITED_ACTION,
  POST_WECHAT_JSSDK_ACTION,
  GET_OPEN_TUAN_LIST_ACTION
} from '../../modules'

import GroupHall from './groupHall'

export default {
  name: 'propertyInvestCard',
  components: { GroupHall },
  props: {
    houseDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    groupDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    day: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    },
    tuanCode: {
      type: String,
      default: ''
    },
    h: {
      default: '00'
    },
    m: {
      default: '00'
    },
    s: {
      default: '00'
    },
  },
  data () {
    return {
      groupProList:[],
      collected: false,
      showInvitationCard: false,
      showPayNoticeBox: false,
      showGroupView: false,
      tuanConfigId: 1,
      gotTicket: false,
      invitedList: [],
      inviteCount: 0,
      showTip: false,
      tip: '',
      showShareShadow: false,
      slink: ''
    }
  },
  methods: {
    popGroupView: function () {
      if(this.groupProList.length > 0) {
        this.tuanConfigId = 1
        this.showPayNoticeBox = true
      } else {
        this.showGroupView = true
      }
    },
    closeGroupView: function () {
      this.showGroupView = false
    },
    popGroupBox: function (id) {
      if(this.groupProList.length > 0) {
        this.tuanConfigId = id
        this.showPayNoticeBox = true
      } else {
        this.showPayNoticeBox = false
        this.$router.push({
          path: '/order',
          query: {
            'project_id': this.id,
            'tuanId':id
          }
        })
      }
    },
    closeGroupBox: function () {
      this.showPayNoticeBox = false
    },
    closeShareShadow: function (msg) {
      this.showShareShadow = msg
    },
    collectProperty: function () {
      var that = this
      this.$store.dispatch(SET_COLLECTION_ADD_ACTION,{
        type: 1,
        id: that.id
      }).then(()=>{
        that.collected = true
      })
    },
    uncollectProperty: function () {
      var that = this
      this.$store.dispatch(SET_COLLECTION_DEL_ACTION,{
        type: 1,
        id: that.id
      }).then(()=>{
        that.collected = false
      })
    },

    popTip: function (tips) {
      this.showTip = true
      this.tip = tips
    },

    closePopTip : function () {
      this.showTip = false
    },

    checkCollectProperty: function () {
      var that = this
      this.$store.dispatch(SET_COLLECTION_CHECK_ACTION,{
        type: 1,
        id: that.id
      }).then((data)=>{
        that.collected = data.collected
      })
    },

    invitation: function () {
      const that = this
      this.slink = '/property?project_id='+this.id+'&from_id='+this.$store.state.auth.user.id
      if(this.isWeixin) {
        wx.miniProgram.getEnv(function(res) {
          if(res.miniprogram) {
            wx.miniProgram.navigateTo({
              url: '/pages/invitationCard/invitationCard?fullpath=/property'+'&from_id='+that.$store.state.auth.user.id+'&invitedsource='+that.GLOBAL.INVITE_SOURCE_PROJECT+'&token='+that.$store.state.auth.auth.acsToken+'&avatar='+that.$store.state.auth.user.avatar+'&name='+that.$store.state.auth.user.name+'&pid='+that.id
            })
          } else {
            that.$router.push({
              path: '/invitation',
              query: {
                slink: '/property?project_id='+that.id+'&from_id='+that.$store.state.auth.user.id,
                invitedSource: that.GLOBAL.INVITE_SOURCE_PROJECT,
                pId: that.id
              }
            })
          }
        })
        } else {
          that.showShareShadow = true
        }
    },

     // 领取邀请卡红包
    getInvitationTicket: function () {
      const {gotTicket} = this
      this.showInvitationCard = false
      if(gotTicket) {
        const tip = '你之前已经领取过了!'
        this.$options.methods.popTip.call(this, tip)
      } else {
        const tip = '恭喜你，领取成功，马上投资!'
        this.$options.methods.popTip.call(this, tip)
      }
    },

    checkRefer: function (from_id) {
      var that = this
      this.$options.methods.showInvited.call(this,from_id)
      this.$store.dispatch(POST_REFER_INVITED_ACTION,{from_user_id: from_id}).then((data) => {
        if(data.err_code == 'self' && !data.success) {
            // 如果是本人
          that.showInvitationCard = false
          } else if (data.err_code == 'repeat' && !data.success) {
            //如果不是本人，并且领取了红包
            that.showInvitationCard = true
            that.gotTicket = true
          } else {
            // 如果不是本人，并且未领取过红包
            that.showInvitationCard = true
            that.gotTicket = false
          }
      })
    },

    showInvited: function (id) {
      const that = this
      this.$store.dispatch(GET_REFER_INVITED_SHOW_ACTION,{from_user_id: id}).then((data) => {
        that.invitedList = data.invite_avatar
        that.inviteCount = data.invite_count
      })
    },

    initShare: function () {
      const that = this
      const url = location.href
        if(this.isWeixin) {
          this.$store.dispatch(POST_WECHAT_JSSDK_ACTION,{url}).then((res)=>{
            const { app_id } = res
              const { timestamp,nonceStr,signature } = res.result
              wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: app_id, // 必填，公众号的唯一标识
                  timestamp, // 必填，生成签名的时间戳
                  nonceStr, // 必填，生成签名的随机串
                  signature,// 必填，签名
                  jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
              });
              const query = that.$route.query.project_id
              const user = that.$store.state.auth.user
              let options = {
                  title: '投资美国房产，从未如此简单', // 分享标题
                  desc: '5000美金，就可坐拥房屋产权，享有所有房产投资收益', // 分享描述
                  link: 'http://h5.fangpinduo.com'+that.$route.fullPath, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: that.houseDetail.cover_pic_uris[0]?that.houseDetail.cover_pic_uris[0]:'https://wechat-pics.fangpinduo.com/share_logo.jpg', // 分享图标
                  type: 'link', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                  }
                }
              if(query) {
                options = {
                  title: user.name+'邀请你参与房产合投', // 分享标题
                  desc: '成功参与合投，获取50美金奖励', // 分享描述
                  link: 'http://h5.fangpinduo.com'+that.$route.fullPath+'&from_id='+user.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: that.houseDetail.cover_pic_uris[0]?that.houseDetail.cover_pic_uris[0]:'https://wechat-pics.fangpinduo.com/share_logo.jpg', // 分享图标
                  type: 'link', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                  }
                }
              }
              wx.ready(function () {
                wx.onMenuShareAppMessage(options)
                wx.onMenuShareTimeline(options)
              })
          })
        }
    },
    loadGroupList: function () {
      const that = this
      this.$store.dispatch(GET_OPEN_TUAN_LIST_ACTION, {project_id: this.id}).then((res) => {
        if(res.success) {
            that.groupProList = res.data.filter((item) => {
              return item.tuan_status == that.GLOBAL.TUAN_STATUS_ING
            })
          }
      })
    }
  },
  computed:{
    isWeixin() {
      return this.$store.state.base.isWeixin
    },
  },
  watch: {
    houseDetail: function (ne, old) {
      this.initShare()
      this.checkCollectProperty()
    }
  },
  mounted () {
    const fromId = this.$route.query.from_id
    if(fromId) {
      this.checkRefer(fromId)
    } 
    this.loadGroupList()
  }
}
</script>

<style lang="scss" scoped>
.group-or {
  padding: 8px 0;
  margin: 0;
  width: 100%;
  text-align: center;
  color: #dadada;
  font-size: 12px;
}
.group-w-button {
  display: block;
  width: 90%;
  margin: 0 auto;
  padding: 7px 0;
  background-color: #464155;
  color: #fff;
  font-size: 12px;
  text-align: center;
  border-radius: 2px;
  &.padding-bottom {
    margin-bottom: 15px;
  }
  &.group-union {
    background: #D5A478;
    &.padding-bottom {
      margin-bottom: 15px;
    }
  }
}
.assetdetail-report-wrapper {
  position: relative;
  width: 90%;
  max-width: 420px;
  background-color: #fff;
  padding: 20px 20px 20px;
  &.group-pay-box {
    padding: 0;
  }
}
.w-button-child.black-bg.single {
  border-radius: 2px;
  margin-top: 10px;
}
.button.card-button.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
.button.card-button.parent.special {
  position: relative;
  margin-bottom: 50px;
}
.w-button-child {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 2px 0;
  font-size: 13px;
}
.profit-init {
  transform: scale(0.6);
  margin-top: -5px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  .profit-text {
    display: inline-block;
    white-space: nowrap;
  }
}
.profit-jiaxi {
  display: inline-block;
  font-size: 12px;
  white-space: nowrap;
  transform: scale(0.9);
  height: 20px;
  border-radius: 10px;
  padding: 0 10px;
  background: #FF5000;
}
.w-button-child.first {
  border-right: 1px solid #fff;
}
.w-button-child.black-bg {
  background: #464155;
}
.mob-only {
  display: none;
}
.w-button-child.black-bg.pc-only {
    position: absolute;
    top: 42px;
    border-radius: 2px;
  }
@media (max-width: 479px) {
  .button.card-button.parent.special {
    position: fixed;
    margin-bottom: 0;
  }
  .button.card-button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px 0;
    z-index: 10;
  }
  .w-button-child {
    padding: 8px 0;
  }
  .button-14.autowidth {
    width: 90%;
    margin-left: 5%;
  }
  .detail-right-info-card-row.last {
    border-bottom: none;
    padding-bottom: 0;
  }
  .mob-only {
    display: block;
  }
  .w-button-child.black-bg.pc-only {
    position: static;
    display: none;
  }
}
.invitation-card {
  background: url('https://wechat-pics.fangpinduo.com/invest/invitation_card_sample.png') no-repeat center center;
  background-size: contain;
  height: 350px;
  width: 300px;
}
.invest-invitation-text {
  height: 14px;
  width: 100%;
  text-align: center;
  line-height: 14px;
  font-size: 12px;
  margin-top: 56px;
  color: #fff;
}
.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.avatar-wrapper > img {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: 2px;
}
</style>
