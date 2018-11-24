<template>
  <div class="mine-section" :class="{'is-weixin': isWeixin}">
    <div class="w-container">
      <div class="w-row">
        <div class="column-56 w-col w-col-2" v-if="!isWeixin">
          <div class="div-block-70">
            <div class="mine-links-wrapper" v-on:click="switchTab">
              <div class="mine-avatar" :style="{ backgroundImage: `url(${user.avatar})`}"></div>
              <a class="mine-link mobile-tab header" @click="toggleMineLink"><strong>我的账户</strong><i class="w-icon-arrow-down" :class="{'rotate':mineLinkClose}"></i></a>
              <template v-if="!mineLinkClose">
                <a data-active="0" class="mine-link mobile-tab" :class="{current: active==0}">{{$t('我的资产')}}</a>
                <a data-active="1" class="mine-link mobile-tab" :class="{current: active==1}">{{$t('我的余额')}}</a>
                <a data-active="2" class="mine-link mobile-tab" :class="{current: active==2}">
                  <span data-active="2">{{$t('我的消息')}}</span>
                  <span data-active="2" class="note-inner-notice" v-if="notice && notice.count">{{notice.count}}</span>
                </a>
                <a data-active="3" class="mine-link mobile-tab" :class="{current: active==3}">{{$t('我的福利')}}</a>
                <a data-active="4" v-if="isMobile" class="mine-link mobile-tab" :class="{current: active==4}">{{$t('我的任务')}}</a>
                <a data-active="5" class="mine-link mobile-tab" :class="{current: active==5}">{{$t('我的邀请')}}</a>
                <a data-active="6" class="mine-link mobile-tab" :class="{current: active==6}">{{$t('我的交易')}}</a>
              </template>
              <!-- <div class="mine_link_wrapper" :class="{'close': mineLinkClose}">
                <a data-active="0" class="mine-link mobile-tab" :class="{current: active==0}">{{$t('我的资产')}}</a>
                <a data-active="1" class="mine-link mobile-tab" :class="{current: active==1}">{{$t('我的余额')}}</a>
                <a data-active="2" class="mine-link mobile-tab" :class="{current: active==2}">
                  <span data-active="2">{{$t('我的消息')}}</span>
                  <span data-active="2" class="note-inner-notice" v-if="notice && notice.count">{{notice.count}}</span>
                </a>
                <a data-active="3" class="mine-link mobile-tab" :class="{current: active==3}">{{$t('我的福利')}}</a>
                <a data-active="4" v-if="isMobile" class="mine-link mobile-tab" :class="{current: active==4}">{{$t('我的任务')}}</a>
                <a data-active="5" class="mine-link mobile-tab" :class="{current: active==5}">{{$t('我的邀请')}}</a>
                <a data-active="6" class="mine-link mobile-tab" :class="{current: active==6}">{{$t('我的交易')}}</a>
              </div> -->
              <router-link to="citypartner" v-if="cityPartnerStatus==null" class="mine-link mobile-tab">WeHome合伙人</router-link>
              <template v-else>
                <a class="mine-link mobile-tab header" @click="toggleGroupLink"><strong>合伙人</strong><i class="w-icon-arrow-down" :class="{'rotate':groupLinkClose}"></i></a>
                <template v-if="!groupLinkClose">
                  <a data-active="7" class="mine-link mobile-tab" :class="{current: active==7}">合伙人邀请</a>
                  <a data-active="8" class="mine-link mobile-tab" :class="{current: active==8}">公司业务资料</a>
                  <a data-active="9" class="mine-link mobile-tab" :class="{current: active==9}">分佣规则介绍</a>
                  <a data-active="10" class="mine-link mobile-tab" :class="{current: active==10}">累计收益</a>
                </template>
              </template>
              
              <!-- <div class="group_link_wrapper" :class="{'close': groupLinkClose}">
                <a data-active="7" class="mine-link mobile-tab" :class="{current: active==7}">{{$t('我的邀请')}}</a>
                <a data-active="8" class="mine-link mobile-tab" :class="{current: active==8}">公司业务资料</a>
                <a data-active="9" class="mine-link mobile-tab" :class="{current: active==9}">分佣规则介绍</a>
                <a data-active="10" class="mine-link mobile-tab" :class="{current: active==10}">合伙人奖励</a>
              </div> -->
            </div>
          </div>
        </div>
        <div class="w-col w-col-10">
          <Asset v-if="active==0" />
          <Balance v-else-if="active==1" />
          <my-notes v-else-if="active==2" />
          <Profile v-else-if="active==3" />
          <Task v-else-if="active==4" />
          <my-invitation v-else-if="active==5" />
          <deal-list v-if="active==6"/>
          <city-invite v-if="active==7" :status="cityPartnerStatus"/>
          <city-com-info v-if="active==8"/>
          <city-rule v-if="active==9"/>
          <city-award v-if="active==10"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyNotes from './components/MyNotes.vue'
import router from '@/router'
import Asset from './components/Asset.vue'
import Balance from './components/Balance.vue'
import DealList from './components/DealList.vue'
import Profile from './components/Profile.vue'
import MyInvitation from './components/MyInvitation.vue'
import CityInvite from './components/CityInvite'
import CityComInfo from './components/CityComInfo'
import CityRule from './components/CityRule'
import CityAward from './components/CityAward'
import Task from './components/Task.vue'
import VueSticky from 'vue-sticky'
import {
  GET_USER_PARTNER_STATUS_ACTION
} from '@/scenes/mine/modules'

export default {
  name: 'mine',
  components: { MyNotes,Asset,Balance,DealList,Profile,Task,MyInvitation,CityInvite,CityComInfo,CityRule,CityAward },
  data () { return {
    active: 0,
    isTiyanjin: false,
    isRujin: false,
    isTouzi: false,
    isYaoqing: false,

    mineLinkClose: false,
    groupLinkClose: false,
    cityPartnerStatus: null
  } },
  methods: {
    toggleMineLink: function () {
      this.mineLinkClose = !this.mineLinkClose
    },
    toggleGroupLink: function () {
      this.groupLinkClose = !this.groupLinkClose
    },
    switchTab: function (e) {
      const active = e.target.dataset.active
      if(active != undefined && active != null) {
        this.$router.push({
          path: 'mine',
          query: {
            active: active
          }
        })
      }
    },
    getCityPartnerState() {
      const that = this
      this.$store.dispatch(GET_USER_PARTNER_STATUS_ACTION)
      .then((res)=>{
        const status = res.status
        that.cityPartnerStatus = status
      })
    }
    
  },
  computed: {
    query () {
      return this.$route.query.active
    },
    isWeixin () {
      return this.$store.state.base.isWeixin
    },
    notice() {
      return this.$store.state.user.notes
    },
    isMobile () {
      return this.$store.state.base.isMobile
    },
    user() {
      return this.$store.state.auth.user
    }
  },
  directives: {
    'sticky': VueSticky,
  },
  created () {
    const query = this.$route.query.active ? Number.parseInt(this.$route.query.active) : 0
    this.active = query
    this.getCityPartnerState()
  },
  watch: {
    '$route'(to,from) {
      this.active = to.query.active ? to.query.active : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.mine-section {
  margin-top: 0 !important;
  min-height: 69vh;
}
.mine-section.is-weixin {
  margin-top: 0 !important;
  min-height: 100vh;
}
.note-inner-notice {
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  background: red;
  color: #fff;
  top: 50%;
  transform: translateY(-50%) scale(0.8);
  right: 20px;
}
.mine_link_wrapper {
  transition: max-height 0.3s;
  max-height: 300px;
  overflow: hidden;
  &.close {
    max-height: 0px;
  }
}
.group_link_wrapper {
  transition: max-height 0.3s;
  max-height: 200px;
  overflow: hidden;
  &.close {
    max-height: 0px;
  }
}
.mine-link.mobile-tab {
  position: relative;
  cursor: pointer;
  &.current {
    &::before {
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #d5a478;
    left: 10px;
    top: 0;
  }
  @media (max-width: 479px) {
    &::before {
      display: none;
    }
  }
  }
  &.header {
    width: 100%;
    padding: 0 20px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 479px) {
      display: none;
    }
    i {
      display: block;
      transition: all 0.3s;
      transform: rotate(-180deg);
      &.rotate {
        transform: rotate(0)
      }
    }
  }
}
.asset-1.task {
  padding: 20px 0;
}
.task-ligo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.task-title {
  width: 100%;
  text-align: center;
  color: #000;
}
.task-item {
  height: 3px;
  position: relative;
  background: #D8D8D8;
  width: 25%;
  margin-bottom: 40px;
  margin-top: 20px;
  @media (max-width: 479px) {
    width: 25%;
    &.last {
      background: transparent;
      width: 0;
    }
    &.first {
      background: transparent;
      width: 0;
    }
  }
  &.last {
    background: transparent;
    width: 0;
  }
  &.first {
    background: transparent;
    width: 0;
  }
  &.active {
    background: #d5a478;
  }
  .task-cont {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-100%, -50%);
    height: 80px;
    width: 60px;
    cursor: pointer;
    .task-circle {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      width:24px;
      height: 24px; 
      text-align: center;
      line-height: 18px;
      font-size: 12px;
      border-radius: 50%;
      color: #9b9b9b;
      border: 3px solid #D8D8D8;
      background: #fff;
      &.active {
        border: 2px solid #d5a478;
        color: #d5a478;
      }
    }
    .task-text {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translateX(50%);
      white-space: nowrap;
      margin: 0;
      font-size: 12px;
      color: #333;
      &.active {
        color: #d5a478;
      }
    }
  }
}
@media (max-width: 479px) {
  .asset-3.task {
    margin-top: 30px;
  }
  .mine-links-wrapper {
    padding: 0 5px;
    border: none;
  }
  .div-block-70 {
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .note-inner-notice {
    right: -2px;
  }
}

</style>
