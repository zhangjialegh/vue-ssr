<template>
  <div>
    <template v-if="couponList.length > 0">
      <div class="mine-title">{{$t('我的优惠券')}}</div>
      <div class="column-profile w-row">
        <div class="profile-card-item w-col w-col-6" v-for="item in couponList" :key="item.id">
          <div class="profile-card-wrapper">
            <div class="profile-card-item-left">
              <h5 class="heading-65">{{item.title}}</h5>
              <div class="text-block-57">{{$t('有效期至')}}{{item.end_time}}</div>
              <div class="text-block-58" v-if="item.rule_desc">{{item.rule_desc}}</div>
            </div>
            <div class="profile-card-item-right">
              <a @click="navigatoDetail(item.type)" class="link-5 w-button">{{$t('使用')}}</a>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <template v-if="unusedList.length > 0">
      <div class="mine-title">{{$t('失效或已使用')}}</div>
      <div class="column-profile w-row">
        <div class="profile-card-item w-col w-col-6" v-for="item in unusedList" :key="item.id">
          <div class="profile-card-wrapper">
            <div class="profile-card-item-left">
              <h5 class="heading-65">{{item.title}}</h5>
              <div class="text-block-57">{{$t('有效期至')}}{{item.end_time}}</div>
              <div class="text-block-58" v-if="item.rule_desc">{{item.rule_desc}}</div>
            </div>
            <div class="profile-card-item-right" :class="{'used': item.used,'unused': !item.used}"></div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="!unusedList.length && !couponList.length">
      <div class="mine-title">{{$t('我的福利')}}</div>
      <div class="asset-1 border">
        <div class="row-63 w-row border-bottom">{{$t('暂无详情')}}</div>
      </div>
    </template>
    <transition-box :show="showLectureCode">
      <div class="service-wrapper" v-show="showLectureCode">
        <div class="group-invest-rule-close" @click="closeLecture"></div>
        <div class="service-header">
          <span>{{$t('扫码小程序')}}</span>
          <span></span>
        </div>
        <div class="qrcode-wrapper">
          <img src="https://wechat-pics.fangpinduo.com/website/wechat/wehome_lecture2.png" alt="servercode">
        </div>
        <div class="service-footer">
          {{$t('收听投资课程')}}
        </div>
      </div>
    </transition-box>
  </div>
</template>

<script>
import {GET_USER_TASK_DRAW_ALL_ACTION,GET_USER_COUPON_LIST_ACTION} from '@/scenes/mine/modules'
import {formatValidDate} from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'profile',
  data () { return {
    couponList: [],
    unusedList: [],
    showLectureCode: false,
  } },
  methods: {
    drawAllPrize: function () {
      const that = this
      this.$store.dispatch(GET_USER_TASK_DRAW_ALL_ACTION)
      .then((res)=>{
        that.$options.methods.getCouponList.call(that)
      })
    },
    getCouponList: function () {
      const that = this
      this.$store.dispatch(GET_USER_COUPON_LIST_ACTION)
      .then((res)=>{
        for (let i = 0; i < res.coupons.length; i++) {
          const element = res.coupons[i];
          res.coupons[i].end_time = element.expiry_date ? formatValidDate(element.expiry_date) : null
        }

        for (let i = 0; i < res.outofdate.length; i++) {
          const element = res.outofdate[i];
          res.outofdate[i].end_time = element.expiry_date ? formatValidDate(element.expiry_date) : null
        }

        for (let i = 0; i < res.used.length; i++) {
          const element = res.used[i];
          res.used[i].end_time = element.expiry_date ? formatValidDate(element.expiry_date) : null
        }
         that.couponList = res.coupons
         that.unusedList = res.outofdate.concat(res.used)
      })
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'profile-navigate-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    navigatoDetail: function (type) {
      if(type) {
        this.$router.push({
          path:'/invest'
        })
      } else {
        this.$options.methods.addServer.call(this)
      }
    },
    addServer: function () {
      const that = this
      if(this.isWeixin) {
        wx.miniProgram.getEnv(function(result) { //判断是否是微信小程序
            if(result.miniprogram) {
               that.showLoading=false
               wx.miniProgram.navigateTo({
                  url: '/pages/courseDetail/courseDetail?id=1'
                })
            } else {
              that.showLectureCode = true
            }
          }
        )
      } else {
        this.showLectureCode = true
      }
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'profile-close-lecture-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    closeLecture: function () {
      this.showLectureCode = false
    }
  },
  computed: {
    isWeixin () {
      return this.$store.state.base.isWeixin
    }
  },
  created: function () {
   this.drawAllPrize()
  }
}
</script>

<style lang="scss" scoped>
.service-wrapper {
  width: 300px;
  background-color: #fff;
  padding: 40px 50px;
  position: relative;
}
.service-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding-bottom: 30px;
}
.qrcode-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  position: relative;
}
.qrcode-wrapper > img {
  width: 100%;
  height: 100%;
}
.service-footer {
  width: 100%;
  text-align: center;
  padding-top: 10px;
}
.w-row.border-bottom {
  border: none;
  display: block;
}
.profile-card-item-left {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
</style>
