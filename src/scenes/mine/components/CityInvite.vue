<template>
   <div>
      <div class="mine-title">我的城市合伙人</div>
      <div class="city_invite_state_wrapper">
        <p>审核状态</p>
        <div class="city_invite_state">
          <div class="city_invite_desc">
            <div class="city_invite_dot" :class="{'success':status===1,'fail':status===2}"></div>
            <p><strong>{{status===0?'申请审核中':status===1?'审核成功':status===2?'未通过审核': '获取资格'}}</strong><span v-if="status===1">你的申请审核通过，开始联系你有投资意向的朋友来做美国房东吧！</span><span v-if="status===0">你的申请提交成功，审核正在进行中，请耐心等待。</span></p>
          </div>
          <div class="invitation-list-wrapper" v-if="status===1">
            <h4 class="heading-67">发动你的主角人脉</h4>
            <p class="paragraph-64">让你身边的人知道美金投资新方式</p>
            <div class="invitation-button-wrapper"><a class="invitation-button w-button"  @click="invitationFriend">{{$t('邀请好友')}}</a></div>
          </div>
        </div>
      </div>

      <div class="mine-title">邀请人状态</div>
      <div class="city_invite_wrapper">
        <ul class="city_invite_list">
          <li>姓名</li>
          <li>注册成功</li>
          <li>投资金额</li>
          <li>奖励</li>
          <li></li>
        </ul>


        <ul class="city_invite_body" v-if="status===1">
          <li class="no_info" v-if="partnerList.length == 0">暂无更新</li>
          <li v-for="(part) in partnerList" :key="part.user_id" v-else>
            <ul class="city_invite_list">
              <li @click="iCloseFunc(part.user_id)">{{part.username}}<i class="w-icon-arrow-down" :class="{'rotate':iCloseArr.indexOf(part.user_id) === -1,'hidden': part.childs.length === 0}"></i></li>
              <li>{{formatInDate(part.created_at)}}</li>
              <li>{{part.total_invest ? '$'+toThousandSep(part.total_invest) : '-'}}</li>
              <li>{{part.amount ? '$'+toThousandSep(part.amount) : '-'}}</li>
              <li class="gold-text" @click="showList(part.user_id)">查看</li>
            </ul>
            <ul class="city_invite_list inner" v-for="(child) in part.childs" :key="child.user_id" v-if="iCloseArr.indexOf(part.user_id) !== -1">
              <li>{{child.username}}</li>
              <li>{{formatInDate(child.created_at)}}</li>
              <li>{{child.total_invest ? '$'+toThousandSep(child.total_invest) : '-'}}</li>
              <li>{{child.amount ? '$'+toThousandSep(child.amount) : '-'}}</li>
              <li class="gold-text" @click="showList(child.user_id)">查看</li>
            </ul>
          </li>
        </ul>

        <ul class="city_invite_body" v-else>
          <li class="no_info">暂无更新</li>
        </ul>
      </div>
      <transition-box :show="show">
        <div class="city-partner-box" v-show="show">
          <div class="city_invite_wrapper popbox">
            <ul class="city_invite_list popbox">
              <li>姓名</li>
              <li>投资日期</li>
              <li>投资金额</li>
              <li>奖励</li>
              <li>分佣状态</li>
            </ul>

            <ul class="city_invite_body popbox">
              <li class="no_info" v-if="childenList.length == 0">暂无更新</li>
              <li v-for="(child,index) in childenList" :key="child.created_at+index">
                <ul class="city_invite_list popbox-little">
                  <li>{{child.username}}</li>
                  <li>{{formatInDate(child.created_at)}}</li>
                  <li>{{child.order_amount ? '$'+toThousandSep(child.order_amount) : '-'}}</li>
                  <li>{{child.amount ? '$'+toThousandSep(child.amount) : '-'}}</li>
                  <li>{{shareStatus(child.status)}}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="report-list-close-city" @click="closeList"></div>

        </div>
      </transition-box>
      <invitation-city-partner :show="showShareShadow" :slink="slink" :from="GLOBAL.INVITE_SOURCE_CITYPARTNER" @closeShareShadow="closeShareShadow"></invitation-city-partner>
      <LoadingToast :show="showLoading"/>
    </div>
</template>

<script>
import {
  GET_USER_PARTNER_INVITED_ACTION,
  GET_USER_PARTNER_INVITEE_ACTION
} from '@/scenes/mine/modules'
import { formatInDate, toThousandSep } from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'
import { create } from 'qrcode/lib/core/qrcode';

export default {
  name: 'cityInvite',
  data () { return {
    show: false,
    showLoading: false,
    partnerList: [],
    childenList: [],
    iCloseArr: [],
    slink: '/experiencegold',
    showShareShadow: false,
    ref_code: this.$route.query.rf
  } },
  props: {
      status: {
        type: Number,
        default: null
      }
    },
  methods: {
    formatInDate: formatInDate,
    toThousandSep: toThousandSep,
    iCloseFunc(index) {
      const arr = this.iCloseArr
      const idx = arr.indexOf(index)
      if(idx !== -1) {
        arr.splice(idx,1)
      } else {
        arr.push(index)
      }
      this.iCloseArr = arr
    },
    shareStatus(id) {
      let desc = ''
      switch (id) {
        case 1:
          desc = '审核通过'
          break;
        case 2:
          desc = '审核失败'
          break;
        case 3:
          desc = '取消申请'
          break;
        case 4:
          desc = '关闭申请'
          break;
        default:
          desc = '提交申请'
          break;
      }
      return desc
    },

    getCityPartnerInviteList() {
      const that = this
      this.$store.dispatch(GET_USER_PARTNER_INVITED_ACTION)
      .then((res)=>{
        that.partnerList = res.data
      })
    },
    showList(id) {
      const that = this
      this.showLoading = true
      this.$store.dispatch(GET_USER_PARTNER_INVITEE_ACTION)
      .then((res)=>{
        that.showLoading = false
        that.show = true
        that.childenList = res.data
      })
    },
    closeList() {
      this.show = false
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'city-partner-invitation-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    invitationFriend () {
      const that = this
      if(this.isWeixin) {
        wx.miniProgram.getEnv(function(res) {
        if(res.miniprogram) {
          wx.miniProgram.navigateTo({
            url: '/pages/invitationCard/invitationCard?fullpath=/experiencegold'+'&invitedsource='+that.GLOBAL.INVITE_SOURCE_CITYPARTNER+'&token='+that.$store.state.auth.auth.acsToken+'&avatar='+that.$store.state.auth.user.avatar+'&name='+that.$store.state.auth.user.name
          })
        } else {
          that.$router.push({
            path: '/invitation',
            query: {
              slink: that.slink,
              invitedSource: that.GLOBAL.INVITE_SOURCE_CITYPARTNER
            }
          })
        }
      })
      } else {
        that.showShareShadow = true
      }
    },
    closeShareShadow(msg) {
      this.showShareShadow = msg
    }
  },
  computed: {
    isWeixin() {
      return this.$store.state.base.isWeixin
    }
  },
  created() {
    this.getCityPartnerInviteList()
  }
}
</script>

<style lang="scss" scoped>
.report-list-close-city {
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  background: #fff url('https://wechat-pics.fangpinduo.com/wehome/website/usual/close.svg') no-repeat center center;
  background-size: 40% 40%;
  border-radius: 50%;
  margin-top: 30px;
}
.city-partner-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.city_invite_wrapper {
  width: 100%;
  border: 1px solid #E9E9E9;
  background-color: #fff;
  &.popbox {
    max-height: 50vh;
    overflow-y: auto;
    width: 100%;
    max-width: 700px;
  }
  .city_invite_list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    color: #000;
    font-size: 13px;
    li {
      width: 20%;
      padding: 10px;
      white-space: nowrap;
      text-align: center;
      &:last-of-type {
        width: 12%;
        padding-left: 0;
      }
      &:nth-of-type(2) {
        width: 23%;
      }
      &:first-of-type {
        width: 25%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        i {
          display: block;
          transition: all 0.3s;
          margin-left: 20px;
          transform: rotate(-180deg);
          &.hidden {
            visibility: hidden;
          }
          &.rotate {
            transform: rotate(0)
          }
        }
      }
      &.gold-text {
        color: #D5A478;
        cursor: pointer;
      }
    }
    
    &.inner {
      & > li:last-of-type {
        width: 12%;
        padding-left: 0;
      }
      & > li:nth-of-type(2) {
        width: 23%;
      }
      & > li:first-of-type {
        padding-left: 25px;
        width: 25%;
      }
    }
    &.popbox-little {
      li {
        width: 20%;
      }
    }
    &.popbox {
       li {
        width: 20%;
        padding: 20px 0;
      }
    }
  }
  .city_invite_body {
    list-style: none;
    padding: 0;
    margin: 0;
    & > li {
      border-top: 1px solid #E9E9E9;
    }
    &.popbox {
      border: none;
    }
  }
}
.city_invite_state_wrapper {
  background-color: #fff;
  border: 1px solid #E9E9E9;
  margin-bottom: 10px;
  & > p {
    padding: 10px;
    margin-bottom: 0;
  }
  .city_invite_state {
    padding: 10px;
    border-top: 1px solid #E9E9E9;
    .city_invite_desc {
      margin-bottom: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #000;
      font-size: 13px;
      & > p {
        margin-bottom: 0;
        strong {
          display: block;
          width: 100px;
        }
        span {
          color: #9b9b9b;
          font-weight: 300;
          width: auto;
        }
      }
      .city_invite_dot {
        width: 10px;
        position: relative;
        margin-right: 10px;
         &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          display: block;
          width: 8px;
          height: 8px;
          transform: translateY(-50%);
          border-radius: 50%;
          background-color: #F5A623;
        }
        &.success::before {
          background-color: #7ED321;
        }
        &.fail::before {
          background-color: red;
        }
      }
    }
  }
}
.no_info {
  padding: 10px;
  text-align: center;
}
</style>
