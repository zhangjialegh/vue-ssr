<template>
  <div class="mine-section">
    <div v-if="invest_rank_banner_flag">
      <router-link :to="{path:'/invest_rank'}">
      <img href="/invest_rank" src="https://wechat-pics.fangpinduo.com/website/static/image/invest_rank_banner.png">
      </router-link>
    </div>
    <div>
        <Asset :asset="asset" :exp-balance="expBalance" />
    </div>
    <div class="row-75 w-row">
      <div class="wx-title">我的账户</div>
      <router-link :to="{path:'/mine', query: {'active': 0}}" class="column-111 w-col w-col-4">
       <p class="paragraph-63"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/wx/wx_project.png" height="20" width="20" alt="asset">
         <span>我的项目</span>
      </p>
      </router-link>
      <router-link :to="{path:'/mine', query: {'active': 1}}" class="column-111 w-col w-col-4">
       <p class="paragraph-63"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/wx/wx_balance.png" height="20" width="20" alt="balance">
         <span>我的余额</span>
      </p>
      </router-link>
      <router-link :to="{path:'/mine', query: {'active': 2}}" class="column-111 w-col w-col-4">
       <p class="paragraph-63"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/wx/wx_note.png" height="20" width="20" alt="asset">
         <span>我的消息</span>
         <span class="notice-tip" v-if="notice && notice.count">（{{notice.count}}条新消息）</span>
      </p>
      </router-link>
      <router-link :to="{path:'/guidedream'}" class="column-111 w-col w-col-4">
       <p class="paragraph-63"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/wx/wx_profile.png" height="20" width="20" alt="asset">
         <span>新手引导</span>
      </p>
      </router-link>
      <router-link :to="{path:'/mine', query: {'active': 3}}" class="column-111 w-col w-col-4">
       <p class="paragraph-63"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/wx/wx_profile.png" height="20" width="20" alt="asset">
         <span>我的福利</span>
      </p>
      </router-link>
      <router-link :to="{path:'/mine', query: {'active': 4}}" class="column-111 w-col w-col-4">
       <p class="paragraph-63"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/wx/wx_task.png" height="20" width="20" alt="asset">
         <span>我的任务</span>
      </p>
      </router-link>
      <router-link :to="{path:'/mine', query: {'active': 5}}" class="column-111 w-col w-col-4">
       <p class="paragraph-63"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/wx/wx_invite.png" height="20" width="20" alt="asset">
         <span>我的邀请</span>
      </p>
      </router-link>
      <router-link :to="{path:'/mine', query: {'active': 6}}" class="column-111 w-col w-col-4">
       <p class="paragraph-63" :class="{'end':cityPartnerStatus !== null}"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/wx_deallist.png" height="20" width="20" alt="asset">
         <span>我的交易</span>
      </p>
      </router-link>



      <router-link :to="{path:'/citypartner'}" class="column-111 w-col w-col-4" v-if="cityPartnerStatus === null">
       <p class="paragraph-63 last"> 
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/hhr-hhr.png" height="20" width="20" alt="asset">
         <span>WeHome合伙人</span>
      </p>
      </router-link>
      <template v-else>
        <div class="wx-title">合伙人</div>
        <router-link :to="{path:'/mine', query: {'active': 7}}" class="column-111 w-col w-col-4">
        <p class="paragraph-63"> 
          <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/hhr-yaoqing.png" height="20" width="20" alt="asset">
          <span>合伙人邀请</span>
        </p>
        </router-link>
        <router-link :to="{path:'/mine', query: {'active': 8}}" class="column-111 w-col w-col-4">
        <p class="paragraph-63"> 
          <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/hhr-ziliao.png" height="20" width="20" alt="asset">
          <span>公司业务资料</span>
        </p>
        </router-link>
        <router-link :to="{path:'/mine', query: {'active': 9}}" class="column-111 w-col w-col-4">
        <p class="paragraph-63"> 
          <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/hhr-jieshao.png" height="20" width="20" alt="asset">
          <span>分佣规则介绍</span>
        </p>
        </router-link>
        <router-link :to="{path:'/mine', query: {'active': 10}}" class="column-111 w-col w-col-4">
        <p class="paragraph-63 last"> 
          <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/hhr-jiangli.png" height="20" width="20" alt="asset">
          <span>合伙人奖励</span>
        </p>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import {
  GET_USER_PARTNER_STATUS_ACTION,
  GET_USER_ASSET_ACTION,
  GET_ACTIVITY_EXP_BALANCE_ACTION
} from '@/scenes/mine/modules'
import Asset from './components/Asset.vue'
export default {
  name: "wxmine",
  components: {Asset},
  data() {
    return {
      asset: {},
      expBalance: 0,
      invest_rank_banner_flag: false,
      cityPartnerStatus: null
    };
  },
  methods: {
    getCityPartnerState() {
      const that = this
      this.$store.dispatch(GET_USER_PARTNER_STATUS_ACTION)
      .then((res)=>{
        const status = res.status
        that.cityPartnerStatus = status
      })
    },
    getUserAsset: function () {
      const that = this
      this.$store.dispatch(GET_USER_ASSET_ACTION)
      .then((res)=>{
        that.asset = res
        if (res.total_asset > 4000) {
          that.invest_rank_banner_flag = false; // true
        }
      })
    },
    getUserBalance: function () {
      const that = this
      this.$store.dispatch(GET_ACTIVITY_EXP_BALANCE_ACTION)
      .then((res)=>{
        that.expBalance = res.balance
      })
    }
  },
  computed: {
    notice: function() {
      return this.$store.state.user.notes
    }
  },
  mounted() {
    this.getCityPartnerState()
    this.getUserAsset()
    this.getUserBalance()
  }
};
</script>
<style lang="scss" src="@/assets/style/wx_nav.scss"></style>
<style lang="scss" scoped>
.wx-title {
  padding: 20px 20px;
  color: #000;
  font-size: 16px;
}
.mine-section {
  margin-top: 0 !important;
  padding: 0;
  min-height: calc(100vh - 55px);
  background: #fff !important;
}
@media (max-width: 479px) {
  .row-75 {
    border-left: none;
    border-right: none;
  }
  .paragraph-63 {
    text-align: left;
    padding: 15px 20px;
    border-top: 1px solid rgb(243, 243, 243);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: url("https://wechat-pics.fangpinduo.com/mobwebsite/mine/arrow-right.svg")
      no-repeat right center;
    background-size: 10% 40%;
  }
  .paragraph-63.first {
    border-top: none;
  }

  .paragraph-63.end {
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(243, 243, 243);
  }

  .paragraph-63.last {
    margin-bottom: 50px;
  }
  .paragraph-63 > img {
    margin-right: 15px;
  }
  .div-block-128 > img {
    border-radius: 50%;
  }
  .notice-tip {
    font-size: 12px;
    color: red;
  }
}
</style>
