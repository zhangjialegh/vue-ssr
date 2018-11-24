<template>
  <div class="invite-card-wrapper" :style="{'background-image': `url(${bgList[bgIndex]}?imageView2/2/w/420)`}">
    <div class="invitation-container">
      <div class="invitation-title-bar" :style="{'background-image': `url(${titleBarList[bgIndex]})`}"></div>
      <h1 :style="{'color': fontColorList[bgIndex]}">{{$t('邀请卡')}}</h1>
      <img :src="avatar" alt="">
      <p class="invitation-p" :style="{'color': fontColorList[bgIndex]}">
        {{description}}
      </p>
      <div class="invited-slot"></div>
    </div>

    <router-link :to="slink" class="invited-btn">{{$t('立即参与')}}</router-link>
  </div>
</template>

<script>
import {
  GET_ACTIVITY_BY_RFCODE_ACTION,
  GET_ACTIVITY_BY_CODE_ACTION
} from '@/scenes/mine/modules'

export default {
  name: "invited",
  data() {
    return {
      slink: this.$route.query.slink,
      invitedSource: this.$route.query.invitedSource,
      description: '',
      avatar: 'https://wechat-pics.fangpinduo.com/image/png/default-user-image.png',
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
      bgIndex: this.$route.query.suckerId?this.$route.query.suckerId:0
    };
  },
  computed:{

  },
  methods: {
    initInvitedCode: function () {
      const that = this
      const { invitedCode,invitedPid } = this.$route.query
      const { invitedSource } = this
      if (invitedSource == this.GLOBAL.INVITE_SOURCE_CITYPARTNER) {
        let params = {
          rf: this.$route.query.rf
        }
        this.$store.dispatch(GET_ACTIVITY_BY_RFCODE_ACTION,params)
        .then((res)=>{
          that.avatar = res.avatar
          that.$options.methods.initDescription.call(that, res.username, res.desc)
        })
      } else {
        let params = {
          code: invitedCode
        }
        if(invitedPid) {
          params['project_id'] = invitedPid
        }
        this.$store.dispatch(GET_ACTIVITY_BY_CODE_ACTION,params)
        .then((res)=>{
          that.avatar = res.avatar
          that.$options.methods.initDescription.call(that, res.username, res.desc)
        })
      }
      
    },
    initDescription: function (avatarName, project) {
      const that = this
      const { invitedSource } = this
      this.description = project
      // if(invitedSource == this.GLOBAL.INVITE_SOURCE_CITYPARTNER) {
      //   this.description = this.$t('GLOBAL.INVITE_TO_EXP').replace('xx', avatarName)
      // } else if (invitedSource == that.GLOBAL.INVITE_SOURCE_PROJECT && project) {
      //   this.description = project
      // } else {
      //   this.description = this.$t('GLOBAL.INVITE_TO_UN').replace('xx', avatarName)
      // }
    },
  },
  created() {
    this.initInvitedCode()
  }
};
</script>

<style lang="scss" scoped>
.invite-card-wrapper {
  width: 100vw;
  height: 100vh;
  background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/img/invitation/bg1.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
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
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/invitation-title-bar.png') no-repeat center center;
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
.invited-slot {
  height: 80px;
}
.invited-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 48px;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 48px;
  background: #c89669;
  font-size: 16px;
}
</style>
