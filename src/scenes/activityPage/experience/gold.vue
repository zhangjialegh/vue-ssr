<template>
  <div class="wire-transfer-section tiyanjin">
    <div class="w-container">
      <div class="tianjin-wrapper">
        <div class="tiyanjin-header-wrapper-v2">
          <div class="tiyanjin-header" :class="{'eng': $i18n.locale!=GLOBAL.ZH_CN}"></div>
        </div>
        <div class="tiyanjin-body-wrapper v2">
          <div class="tiyanjin-profile-wrapper">
            <div class="tiyanjin-num">
              <div class="tiyanjin-num-title">$5000</div>
              <div class="tiyanjin-num-text">{{$t('体验金gold')}}</div>
            </div>
            <div class="tiyanjin-num-line"></div>
            <div class="tiyanjin-num">
              <div class="tiyanjin-num-title">12%-18%</div>
              <div class="tiyanjin-num-text"><strong class="bold-text-9">{{$t('预期年化收益')}}</strong></div>
            </div>
            <div class="tiyanjin-num-line"></div>
            <div class="tiyanjin-num">
              <div class="tiyanjin-num-title">30{{$t('天')}}</div>
              <div class="tiyanjin-num-text">{{$t('期限')}}</div>
            </div>
          </div>
          <div class="tiyanjin-profile-wrapper liucheng">
            <div class="tiyanjin-step-wrapper"><img :src="$i18n.locale==GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/wehome/website/static/image/tiyanjin-liucheng-pc-v3.png':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/en/gold_mobile_en.png'" class="image-57"><img :src="$i18n.locale==GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/wehome/website/static/image/tiyanjin-liucheng-mob-v3.png':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/en/steps_mobile_en.png'" class="image-56"></div>
            <div class="tiyanjin-title-wrapper">
              <div class="tiyanjin-title">{{$t("体验流程")}}</div>
            </div>
          </div>
          <div class="tiyanjin-profile-wrapper liucheng rule">
            <div class="tiyanjin-step-wrapper">
              <div class="div-block-15">
                <div class="row-14 w-row line">
                  <div class="w-col w-col-6">
                    <p class="paragraph-26">{{$t('投资年限')}}</p>
                  </div>
                  <div class="w-col w-col-6">
                    <p class="paragraph-27">{{$t('预收益')}}</p>
                  </div>
                </div>
                <div class="row-14 w-row">
                  <div class="w-col w-col-6">
                    <p class="paragraph-26">{{$t('个月后',{msg:1})}}</p>
                  </div>
                  <div class="w-col w-col-6">
                    <p class="paragraph-27">${{Number.parseInt(5030).toLocaleString('en-US')}}</p>
                  </div>
                </div>
                <div class="row-14 w-row" v-for="(item,index) in yearArr" :key="item+index">
                  <div class="w-col w-col-6">
                    <p class="paragraph-26">{{$t('年后',{msg:item})}}</p>
                  </div>
                  <div class="w-col w-col-6">
                    <p class="paragraph-27">${{Number.parseInt(Math.pow(1.12,item)*amountArr[inx]).toLocaleString('en-US')}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="tiyanjin-title-wrapper">
              <div class="tiyanjin-title">{{$t('回报收益')}}</div>
            </div>
          </div>
          <div class="tiyanjin-profile-wrapper liucheng rule">
            <div class="tiyanjin-step-wrapper">
              <ul class="tiyanjin-shuoming-wrapper">
                <li class="tiyanjin-shuoming-item">{{$t('邀请的未投资')}}<br></li>
                <li class="tiyanjin-shuoming-item"> {{$t('用户体验期为领取')}}<br></li>
                <li class="tiyanjin-shuoming-item">{{$t('每个未投资用户')}}<br></li>
                <li class="tiyanjin-shuoming-item">{{$t('请好友参与真实投')}}<br></li>
              </ul>
              <div class="tiyanjin-zhu">{{$t('解释权归WeHome所有')}}<br></div>
            </div>
            <div class="tiyanjin-title-wrapper">
              <div class="tiyanjin-title">{{$t('规则说明')}}</div>
            </div>
          </div>
          <div class="tiyanjin-btn-wrapper">
            <a class="tiyanjin-btn w-button" @click="inviteJoin" v-if="!showJoin">{{$t('邀请好友平')}}</a>
            <router-link :to="{path:'/experienceinvest', query:{activity: $route.query.activity}}" class="tiyanjin-btn w-button" v-else>{{$t('立即领取')}}</router-link>
          </div>
        </div>
      </div>
    </div>

    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn">
          <a href="javascript:;" class="button-14 w-button" @click="closePopTip">{{$t('确定')}}</a>
        </div>
      </div>
    </pop-box>

    <invitation-box :show="showShareShadow" :slink="slink" :from="GLOBAL.INVITE_SOURCE_EXP" @closeShareShadow="closeShareShadow"></invitation-box>
  </div>
</template>
<script>
  import {
    CHECK_QUALIFICATION_ACTION
  } from '@/scenes/home/modules'
  import {
    GET_ACTIVITY_GETCODE_ACTION
  } from '@/scenes/mine/modules'
  import {
    POST_WECHAT_JSSDK_ACTION
  } from '@/scenes/investing/modules'
  import { track, after } from 'trackpoint-tools'
  import Track from '@/track'

  export default {
    name: 'experiencegold',
    data() {
      return {
        amountArr: [5000, 10000, 20000, 50000, 100000],
        yearArr: [1, 3, 5],
        inx: 0,
        showDrop: false,
        showTip: false,
        tip: '',
        showJoin: true,
        activityCode: '',
        showShareShadow: false,
        slink: '',
      }
    },
    methods: {
      closeShareShadow: function (msg) {
        this.showShareShadow = msg
      },
      @track(after(function () {
        Track.eventTrack({
          category: 'experiencegold-invitation-button',
          action: 'click',
          optLabel: 'button',
          page: this.$route.name,
          optValue: {
          }
        })
      }))
      inviteJoin: function () {
        const that = this
        if(this.isWeixin) {
          wx.miniProgram.getEnv(function(res) {
          if(res.miniprogram) {
            wx.miniProgram.navigateTo({
              url: '/pages/invitationCard/invitationCard?fullpath='+that.$route.path+'&activity='+that.activityCode+'&invitedsource='+that.GLOBAL.INVITE_SOURCE_EXP+'&token='+that.$store.state.auth.acsToken+'&avatar='+that.$store.state.user.avatar+'&name='+that.$store.state.user.name
            })
          } else {
            that.$router.push({
              path: '/invitation',
              query: {
                slink: that.slink,
                invitedSource: that.GLOBAL.INVITE_SOURCE_EXP
              }
            })
          }
        })
        } else {
          that.showShareShadow = true
        }
      },
      countAmount: function (index) {
        this.inx = index
        this.showDrop = false
      },
     showDropDown: function () {
        this.showDrop = true
      },
      closeDrop: function () {
        this.showDrop = false
      },
      popTip: function (tips) {
        if (tips) {
          this.showTip = true
          this.tip = tips
        }
      },
      @track(after(function () {
        Track.eventTrack({
          category: 'experiencegold-close-poptip-button',
          action: 'click',
          optLabel: 'button',
          page: this.$route.name,
          optValue: {
          }
        })
      }))
      closePopTip : function () {
        this.showTip = false
      },
      checkQualification: function () {
        const that = this
        this.$store.dispatch(CHECK_QUALIFICATION_ACTION,{
          type: 'money_exp'
        }).then((res)=>{
          that.showJoin = res.success
          if(!res.success) {
            const tip = res.message
            that.$options.methods.popTip.call(that, tip)
          }
        })
      },
      getInviteCode: function () {
        const that = this
        this.$store.dispatch(GET_ACTIVITY_GETCODE_ACTION,{
          act_id: 1
        }).then((res)=>{
          if(res.code) {
            that.activityCode = res.code
            that.slink = that.$route.fullPath+'?activity='+res.code
            that.$options.methods.initShare.call(that, res.code)
          }
        })
      },
      initShare: function (code) {
      const that = this
      const url = location.href
        if(this.isWeixin) {
          this.$store.dispatch(POST_WECHAT_JSSDK_ACTION,{url})
          .then((res)=>{
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
            let options = {
                title: '我出资，你赚钱', // 分享标题
                desc: '来就送5000美金，房产分红都归你', // 分享描述
                link: 'http://h5.fangpinduo.com/experiencegold?activity=' + code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://wechat-pics.fangpinduo.com/website/experience/tiyanjin-wx.png', // 分享图标   
                // imgUrl: 'https://wechat-pics.fangpinduo.com/website/everest/tiyanjin-share-icon-pdd.png', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                }
              }
            wx.ready(function () {
              wx.onMenuShareAppMessage(options)
              wx.onMenuShareTimeline(options)
            })
          })
        }
      },
    },
    mounted() {
      if (this.auth.isLoggedIn) {
        this.checkQualification()
        this.getInviteCode()
      }
    },
    computed: {
      auth() {
        return this.$store.state.auth.auth
      },
      isWeixin() {
        return this.$store.state.base.isWeixin
      }
    }
  }
</script>
<style lang="scss" scoped>
.div-block-15 {
  width: auto;
}
.w-dropdown-link {
  color: #fff;
  background: rgba(22, 22, 22, 0.8);
}

.w-dropdown-link:hover {
  background: #d5a478;
}
.w-col-6.width100 {
  width: 100%;
}
.row-14.line {
  border-top: 1px solid rgba(217, 217, 217, 0.3);
}
.tiyanjin-btn.invite {
  background: #464155;
  color: #fff;
}
.tiyanjin-liucheng-wrapper {
  padding: 0 25px;
}
@media (max-width: 479px) {
  .tiyanjin-header-wrapper-v2 {
    // height: 320px;
    height: 280px;
  }
  .tiyanjin-header {
    height: 100%;
  }
  .tiyanjin-title-wrapper {
    width: 140px;
    height: 50px;
  }
  .tiyanjin-btn.w-button {
    height: 50px;
    line-height: 32px;
    font-size: 16px;
  }
}
</style>