<template>
  <div>
    <div class="mine-title">{{$t('我的邀请')}}</div>
    <div class="invitation-list-container">
      <div class="invitation-list-wrapper">
        <h4 class="heading-67">{{$t('邀请好友即可获得')}}$50</h4>
        <p class="paragraph-64">{{$t('自己与好友同时投资')}}</p>
        <div class="invitation-button-wrapper"><a class="invitation-button w-button"  @click="invitationFriend">{{$t('邀请好友')}}</a></div>
      </div>
      <div class="invitation-list-main">
        <ul class="invitation-list">
          <li class="invitation-list-title">
            <div class="invitation-list-title-item title">{{$t('好友姓名')}}</div>
            <div class="invitation-list-title-item title">{{$t('注册')}}</div>
            <div class="invitation-list-title-item title">{{$t('参与')}}</div>
            <div class="invitation-list-title-item title">{{$t('奖励入账')}}</div>
          </li>
          <li class="invitation-list-title" :class="{'last':index==invitationList.length-1}" v-for="(invitor, index) in invitationList" :key="invitor.avatar+index" v-if="invitationList.length > 0">
            <div class="invitation-list-title-item start">
              <img v-lazy="invitor.avatar" width="20" height="20" class="image-55">
              <div class="invitation-list-item-text">{{invitor.nick_name}}</div>
            </div>
            <div class="invitation-list-title-item active">{{$t('已注册')}}</div>
            <div class="invitation-list-title-item" :class="{'active': invitor.is_attend}">{{invitor.is_attend?$t('已参与'):$t('未参与')}}</div>
            <div class="invitation-list-title-item" :class="{'active': invitor.is_rewarded}">{{invitor.is_rewarded?$t('已入账'):$t('未入账')}}</div>
          </li>
          <li class="invitation-list-title none" v-if="invitationList.length == 0">{{$t('暂无邀请')}}</li>
        </ul>
      </div>
    </div>
    <invitation-box :show="showShareShadow" :slink="slink" :from="GLOBAL.INVITE_SOURCE_MYINVITE" @closeShareShadow="closeShareShadow"></invitation-box>
  </div>
</template>

<script>
import {GET_USER_REFER_LIST_ACTION} from '@/scenes/mine/modules'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'myinvitaion',
  data () { return {
    invitationList: [],
    showShareShadow: false,
    slink: '/invest'+'&from_id='+this.$store.state.user.id
  } },
  methods: {
    getInvitationList: function () {
      const that = this
      this.$store.dispatch(GET_USER_REFER_LIST_ACTION)
      .then((res)=>{
        that.invitationList = res
      })
    },
    @track(after(function () {
      Track.eventTrack({
        category: 'invitation-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    invitationFriend: function () {
      const that = this
      if(this.isWeixin) {
        wx.miniProgram.getEnv(function(res) {
        if(res.miniprogram) {
          wx.miniProgram.navigateTo({
            url: '/pages/invitationCard/invitationCard?fullpath=/invest'+'&from_id='+that.$store.state.user.id+'&invitedsource='+that.GLOBAL.INVITE_SOURCE_MYINVITE+'&token='+that.$store.state.auth.acsToken+'&avatar='+that.$store.state.user.avatar+'&name='+that.$store.state.user.name
          })
        } else {
          that.$router.push({
            path: '/invitation',
            query: {
              slink: that.slink,
              invitedSource: that.GLOBAL.INVITE_SOURCE_MYINVITE
            }
          })
        }
      })
      } else {
        that.showShareShadow = true
      }
    },
    @track(after(function () {
      Track.eventTrack({
        category: 'invitation-close-share-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    closeShareShadow: function (msg) {
      this.showShareShadow = msg
    }
  },
  computed: {
    isWeixin(){
      return this.$store.state.base.isWeixin
    }
  },
  created: function() {
    this.getInvitationList()
  }
}
</script>

<style lang="scss" scoped>
.invitation-list-item-text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.invitation-list-title-item.start {
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
</style>
