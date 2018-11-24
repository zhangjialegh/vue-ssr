<template>
  <div class="invite-card-wrapper-parent">
    <div class="invite-card-wrapper-top">
      <div class="invite-card-wrapper" :class="{'transform': select}" :style="{'background-image': `url(${bgList[bgIndex]}?imageView2/2/w/420)`}">
        <div class="invitation-container">
          <div class="invitation-title-bar" :style="{'background-image': `url(${titleBarList[bgIndex]})`}"></div>
          <h1 :style="{'color': fontColorList[bgIndex]}">{{$t('邀请卡')}}</h1>
          <img :src="$store.state.user.avatar" alt="wehome">
          <p class="invitation-p" :style="{'color': fontColorList[bgIndex]}">
            {{description}}
          </p>
          <!-- <span class="invitation-code">邀请码：283091</span> -->
          <div class="invitation-code-container">
            <div class="invitation-code-center"></div>
            <canvas ref="canvas"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="invite-card-wrapper-bottom" :class="{'hidden': !select}">
      <p class="invite-card-select-p">{{$t('选择分享卡片背景')}}</p>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in bgList" :key="item+index">
          <div class="invite-card-bg-item" :class="{'active': index==bgIndex}" :style="{'background-image':`url(${item}?imageView2/2/w/150)`}" @click="selectBg(index)">
          </div>
        </swiper-slide>
      </swiper>
      <button class="invite-card-send" @click="sureToSelect">{{$t('发送邀请')}}</button>
    </div>

    <group-share-lead v-if="showShareLead">
      <div class="wechat-share-lead-close" @click="closeShareLead">{{$t('知道了')}}</div>
    </group-share-lead>

  </div>
</template>

<script>
import {
  GET_ACTIVITY_GETCODE_ACTION
} from '@/scenes/mine/modules'
import {GET_PROJECT_DETAIL_ACTION,POST_WECHAT_JSSDK_ACTION} from '@/scenes/investing/modules'
import QRCode from "qrcode"
import {toThousandFix,toThousandPrt} from '@/utils/utils'

export default {
  name: "invitation",
  data() {
    return {
      invitedSource: this.$route.query.invitedSource,
      invitedCode: '',
      invitedPid: null,
      description: this.$t('GLOBAL.INVITE_FROM_UN'),
      select: true,
      showShareLead: false,
      swiperOption: {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 15,
        grabCursor: true,
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true
      },
      bgList: [
        'https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/bg1.png',
        'https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/bg2.png',
        'https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/bg3.png',
        'https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/bg4.png',
        'https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/bg5.png'
        ],
      titleBarList: [
        'https://wechat-pics.fangpinduo.com/wehome/website/static/image/invitation-title-bar.png',
        'https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/invitation-bar.svg',
        'https://wechat-pics.fangpinduo.com/wehome/website/static/image/invitation-title-bar.png',
        'https://wechat-pics.fangpinduo.com/wehome/website/static/image/invitation-title-bar.png',
        'https://wechat-pics.fangpinduo.com/wehome/website/static/image/invitation-title-bar.png'
      ],
      fontColorList: [
        '#ffffff',
        '#464155',
        '#ffffff',
        '#ffffff',
        '#ffffff'
      ],
      bgIndex: 0
    };
  },
  methods: {
    closeShareLead: function () {
      this.showShareLead = false
    },
    sureToSelect: function() {
      this.select = false
      this.$options.methods.generateQrcode.call(this)
      this.$options.methods.onMenuShare.call(this)
      setTimeout(() => {
        this.showShareLead = true
      }, 500)
    },
    selectBg: function(idx) {
      this.bgIndex = idx
    },
    generateQrcode: function(cd, pid) {
      const code = cd ? cd : this.invitedCode
      const id = pid ? pid : this.invitedPid
      let query = '&invitedSource='+this.invitedSource+'&invitedCode='+code
      if(id) {
        query += '&invitedPid='+id
      }
      const url = this.$route.query.slink + query + this.suckerId
      const that = this;
      const canvas = this.$refs.canvas;
      // 体验金
      console.log('http://h5.fangpinduo.com/invited?slink=' + url,'ted');
      
      QRCode.toCanvas(canvas, 'http://h5.fangpinduo.com/invited?slink=' + url, {margin:0,width:100});
    },
    initDescription: function (project) {
      const that = this
      const { invitedSource } = this
      if(invitedSource == that.GLOBAL.INVITE_SOURCE_EXP) {
        this.description = this.$t('GLOBAL.INVITE_FROM_EXP').replace('xx', this.$store.state.user.name)
      } else if (invitedSource == that.GLOBAL.INVITE_SOURCE_PROJECT && project) { //TODO------
        this.description = this.$store.state.user.name +this.$t('正在WeHome参与')+project.title+'合投项目，共享'+toThousandPrt(project.appreciation_rate_one_year_forecast + project.rental_return_rate_net)+this.$t('估值报告每月更新')
      } else if (invitedSource == that.GLOBAL.INVITE_SOURCE_CITYPARTNER) {
        this.description = '美国房产投资，从未如此简单；\n一起去美国合投一套房，5000美金享受年化10%-16%收益'
      }
    },
    getInviteCode: function () {
      const that = this
      const { invitedSource } = this
      let act_id = 2
        // that.GLOBAL.INVITE_SOURCE_EXP   that.GLOBAL.INVITE_SOURCE_PROJECT  
     if(invitedSource == that.GLOBAL.INVITE_SOURCE_EXP) {
       act_id = 1
     } else if (invitedSource == that.GLOBAL.INVITE_SOURCE_PROJECT) {
       act_id = 3
     }
     this.$store.dispatch(GET_ACTIVITY_GETCODE_ACTION,{
       act_id: act_id    //1 体验金，2 通用， 3 项目
     }).then((res)=>{
       if(res.code) {
          that.invitedCode = res.code
          that.invitedPid = that.$route.query.pId
          const projectId = that.$route.query.pId
          that.$options.methods.generateQrcode.call(that, res.code, projectId)
          that.$options.methods.initShare.call(that, res.code, projectId)
          if(projectId) {
            that.$options.methods.getHouserDetail.call(that, projectId)
          }
        } else {
          console.log(res.message)
        }
     })
    },
    getHouserDetail: function(pId) {
      const that = this;
      this.$store.dispatch(GET_PROJECT_DETAIL_ACTION,{
        id: pId
      }).then((result)=>{
        that.$options.methods.initDescription.call(that, result)
      })
    },
    onMenuShare: function(cd, pid) {
      const that = this
      const code = cd ? cd : this.invitedCode
      const id = pid ? pid : this.invitedPid
      let query = '&invitedSource='+this.invitedSource
      if(code) {
        query += '&invitedCode='+code
      }
      if(id) {
        query += '&invitedPid='+id
      }
      const { invitedSource } = this 
      const slink = this.$route.query.slink + query + this.suckerId
      let options = {
          title: this.$t('投资美国房产从未如此简单'), // 分享标题
          desc: this.$t('就可坐拥房屋产权'), // 分享描述
          link: 'http://h5.fangpinduo.com/invited?slink='+slink+'&rf='+ that.$route.query.rf, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://wechat-pics.fangpinduo.com/share_logo.jpg', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
          }
        }
      if(invitedSource == that.GLOBAL.INVITE_SOURCE_EXP) {
        options = {
          title: this.$t('我出资你赚钱'), // 分享标题
          desc: this.$t('来就送5000美金'), // 分享描述
          link: 'http://h5.fangpinduo.com/invited?slink=' + slink +'&rf='+ that.$route.query.rf, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://wechat-pics.fangpinduo.com/website/experience/tiyanjin-wx.png', // 分享图标   
          // imgUrl: 'https://wechat-pics.fangpinduo.com/website/everest/tiyanjin-share-icon-pdd.png', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
          }
        }
      } else if(invitedSource == that.GLOBAL.INVITE_SOURCE_PROJECT) {
        options = {
          title: that.$store.state.user+this.$t('邀请你参与房产合投'), // 分享标题
          desc: this.$t('成功参与合投'), // 分享描述
          link: 'http://h5.fangpinduo.com/invited?slink='+slink+'&rf='+ that.$route.query.rf, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://wechat-pics.fangpinduo.com/share_logo.jpg', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
          }
        }
      } else if(invitedSource == that.GLOBAL.INVITE_SOURCE_CITYPARTNER) {
        options = {
          title: that.$store.state.user.name+'邀请你开启全新投资方式', // 分享标题
          desc: '限时发放5000美元体验金，马上领取', // 分享描述
          link: 'http://h5.fangpinduo.com/invited?slink='+slink+'&rf='+ that.$route.query.rf, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://wechat-pics.fangpinduo.com/share_logo.jpg', // 分享图标
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
    },
    /**微信分享自定义 */
    initShare: function (code, id) {
        const that = this
        const url = location.href
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
          that.$options.methods.onMenuShare.call(that, code, id)
        })
      }
  },
  mounted() {
    this.getInviteCode()
    this.initDescription()
  },
  computed: {
    suckerId() {
      return '&suckerId='+this.bgIndex
    }
  }
};
</script>

<style lang="scss" scoped>
.invite-card-wrapper-top {
  height: 62vh;
}
.invite-card-wrapper-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 40vh;
  width: 100vw;
  background: #fff;
  transition: all 0.5s;
  overflow: hidden;
  &.hidden {
    height: 0;
  }
  .invite-card-select-p {
    color: #000;
    width: 100%;
    text-align: center;
    margin: 0;
    height: 6vh;
    line-height: 6vh;
  }
  .invite-card-send {
    display: block;
    width: 90%;
    background: #d5a478;
    margin: calc(5vh - 18px) auto;
    color: #fff;
    height: 36px;
    border-radius: 2px;
  }
}
.invite-card-wrapper {
  width: 100vw;
  height: 100vh;
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/invitation-card.png') no-repeat center center;
  background-size: 100% 100%;
  transition: all 0.5s;
  &.transform {
    transform: scale(0.55) translateY(-36vh);
  }
}
.invite-card-bg-item {
  background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/bg1.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  position: relative;
  height: 24vh;
  &.active {
    &::before {
      content: '';
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.1);
    }
    &::after {
      content: '✓';
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 14px;
      background: #d5a478;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 20px;
      text-align: center;
    }
  }
}
.invitation-container {
  padding-top: 15%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.invitation-title-bar {
  width: 60%;
  height: 22px;
  margin: 0 auto;
  background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/invitation-bar.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
h1 {
  font-size: 45px;
  text-align: center;
  color: #fff;
  margin-top: 5px;
}
img {
  width: 80px;
  height: 80px;
  display: block;
  margin: 8px auto;
  border-radius: 50%;
  border: 2px solid #fff;
}
.invitation-p {
  color: #fff;
  font-size: 15px;
  line-height: 28px;
  width: 100%;
  text-align: center;
  white-space: pre-wrap;
  padding: 0 25px;
}
.invitation-code {
  display: block;
  text-align: center;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  padding: 0px 0 0px;
}
.invitation-code-container {
  margin: 20px auto;
  width: 104px;
  height: 104px;
  border: 2px solid #fff;
  position: relative;
}
.invitation-code-center {
  background: #fff url('https://wechat-pics.fangpinduo.com/wehome/everestwebsite/favicon.ico') no-repeat center center;
  background-size: 90% 90%;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
