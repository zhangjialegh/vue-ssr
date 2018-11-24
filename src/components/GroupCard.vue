<template>
  <transition-box :show="show">
    <div v-show="show" class="group-container-wrapper">
      <div class="group-invest-wrapper group-invest-card">
        <div class="group-invest-rule-close" @click="$emit('closegroup')" v-if="!hideClose"></div>
        <div class="group-invest-card-img" v-lazy:background-image="groupDetail.project_pic || groupDetail.cover_pic_uris[0]">
          <slot name="grouplabel">
            <div class="house-group-success" v-if="groupDetail.tuan_status == 1 || groupDetail.tuan_status == 2">
              <span style="whiteSpace:pre-wrap" v-if="groupDetail.tuan_status == 1 && groupDetail.target_num==3">{{$t('加息1')}}</span>
              <span style="whiteSpace:pre-wrap" v-if="groupDetail.tuan_status == 2 || (groupDetail.tuan_status == 1 && groupDetail.target_num==2)">{{$t('加息5')}}</span>
            </div>
          </slot>
        </div>
        <div class="group-invest-card-wrapper">
          <h4 class="group-invest-card-title">{{groupDetail.project_title}}</h4>
          <ul class="group-invest-card-info-wrapper">
            <li class="group-invest-card-info-item">
              <div class="group-invest-card-info-number red">{{toThousandPrt(groupDetail.appreciation_rate_one_year_forecast)}}%</div>
              <div class="group-invest-card-info-text">{{$t('税前年化收益')}}</div>
            </li>
            <li class="group-invest-card-info-item">
              <div class="group-invest-card-info-number">{{groupDetail.investment_year}}年</div>
              <div class="group-invest-card-info-text">{{$t('收益周期')}}</div>
            </li>
            <li class="group-invest-card-info-item">
              <div class="group-invest-card-info-number">
                <div>{{groupDetail.score}}</div>
                <div class="text-block-20" :class="{'diamond':groupDetail.score>=90,'gold':groupDetail.score>=80 && groupDetail.score<90,'silver':groupDetail.score>=70 && groupDetail.score<80,'bronze':groupDetail.score<70}"></div>
              </div>
              <div class="group-invest-card-info-text">{{$t('WeHome评分')}}</div>
              
            </li>
          </ul>
          <slot name="grouprule">
            <div class="group-invest-card-content-wrapper">
              <h5 class="heading-64">{{groupDetail.rule_desc}}</h5>
              <div class="text-block-55">{{groupDetail.prize_desc}}</div>
            </div>
          </slot>
          <slot name="groupavatar">
            <ul class="group-invest-card-avatar-wrapper">
              <li class="group-invest-card-avatar-item" v-for="(item, index) in groupDetail.taun_user" :key="item.avatar+index" v-lazy:background-image="item.avatar?item.avatar:'https://wechat-pics.fangpinduo.com/image/group/group-no-avatar.png'"></li>
            </ul>
          </slot>
          <div class="group-invest-card-btn-wrapper">
            <slot name="groupbutton"></slot>
          </div>
        </div>
      </div>
      <group-scan :show="showGroupScan" :category-item="categoryItem" :group-detail="groupDetail" @closescan="closeGroupScan"></group-scan>
      <group-share-lead v-if="showShareLead">
        <div class="wechat-share-lead-close" @click="closeShareLead">{{$t('知道了')}}</div>
      </group-share-lead>
    </div>
  </transition-box>
</template>
<script>
  import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils.js'
  import {GET_PROJECT_DETAIL_ACTION,POST_WECHAT_JSSDK_ACTION} from '@/scenes/investing/modules'

  export default {
    name: 'GroupCard',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      groupDetail: {
        type: Object,
        required: true
      },
      hideClose: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {  
        showGroupScan: false,
        showShareLead: false,
        categoryItem: {}
      }
    },
    methods: {
      toThousandFix: toThousandFix,
      toThousandPrt: toThousandPrt,
      getProject: function() {
        const that = this;
        const tuanStatus = this.groupDetail.tuan_status
        if(this.isWeixin && tuanStatus == 0) {
          this.showShareLead = true
        } else if(!this.isWeixin && tuanStatus == 0) {
          this.$store.dispatch(GET_PROJECT_DETAIL_ACTION,{id: this.id}).then((result)=>{
            that.showGroupScan = true
            that.categoryItem = result
          })
        }
      },
      closeGroupScan: function () {
        this.showGroupScan = false
        this.showShareLead = false
      },
      closeShareLead: function () {
        this.showShareLead = false
        this.showGroupScan = false
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
                const path = that.$route
                const isPay = that.groupDetail.project_id ? true : false
                const options = {
                    title: that.$t('拼团一起投分红赚更多'), // 分享标题
                    desc: that.$t('邀请好友组团'), // 分享描述
                    link: isPay?'http://h5.fangpinduo.com/property?project_id='+that.groupDetail.project_id+'&tuanCode='+that.groupDetail.invite_code : 'http://h5.fangpinduo.com'+path.fullPath, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: that.groupDetail.project_pic, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                      that.showShareLead = false
                    }
                  }
                wx.ready(function () {
                  wx.onMenuShareAppMessage(options)
                  wx.onMenuShareTimeline(options)
                })
            })
          }
      }
    },
    computed: {
      id() {
        return this.groupDetail.project_id
      },
      isWeixin() {
        return this.$store.state.base.isWeixin
      }
    },
    mounted() {
      this.initShare()
    }
  }
</script>
<style lang="scss" scoped>
.group-invest-wrapper {
  max-height: 100vh;
}
.group-container-wrapper {
  @media (max-width: 479px) {
    width: 95%;
  }
}
.group-invest-card-avatar-item {
  background-size: contain;
}
.house-group-success {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 76px;
  width: 76px;
  background: url('https://wechat-pics.fangpinduo.com/image/group/group_fuli_01.png') no-repeat center center;
  background-size: contain;
  transform: rotate(-14deg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.group-invest-card-info-number {
  display: flex;
  justify-content: center;
  align-items: center;
}
.group-invest-rule-close {
  top:auto;
  bottom: -60px;
  right: 50%;
  transform: translateX(50%);
  background-color: #fff;
  border-radius: 50%;
}

</style>
