<template>
  <div class="info-card detail" v-if="groupList.length">
    <div class="text-block-37" ref="grouphall">{{showTuanPerson?$t('拼团动态'):$t('与他人拼团更快成团')}} <span class="group-tuan-person" v-if="tuanPersons && showTuanPerson">{{$t('人已拼团',{msg:tuanPersons})}}</span></div>
    <!-- <div class="swiper-bobao-wrapper">
      <div class="w-container">
        <swiper :options="swiperOption">
          <swiper-slide key="1">
            <div class="group-bobao-item">
              <div>颠覆了快递费</div>
              <button @click="toGroupHall">查看多人投动态</button>
            </div>
          </swiper-slide>
          <swiper-slide key="2">
            <div class="group-bobao-item">
              <div>颠覆了快递费</div>
              <button @click="toGroupHall">查看多人投动态</button>
            </div>
          </swiper-slide>
          <swiper-slide key="3">
            <div class="group-bobao-item">
              <div>颠覆了快递费</div>
              <button @click="toGroupHall">查看多人投动态</button>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div> -->
    <div class="group-hall-wrapper">
      <div class="group-hall-list-wrapper">
        <div class="group-hall-item" v-for="(item, index) in groupList" :key="item.id">
           <div class="user-info-wrapper">
              <img class="avatar" :src="item.person_list[0].avatar" alt="">
              <span class="name">{{item.person_list[0].username}}</span>
            </div>
            <div class="group-hall-content">
              <div class="group-hall-state-wrapper" v-if="item.tuan_status == GLOBAL.TUAN_STATUS_ING">
                <strong>{{$t('人成团',{msg:item.target_person_num-item.person_num})}}</strong>
                <p>{{$t('剩余')}}{{dayArr[index]}}{{$t('天')}}{{hArr[index]}}:{{minArr[index]}}:{{secArr[index]}}</p>
              </div>
              <div class="group-hall-state-wrapper" v-else>
                <strong>{{$t('拼团成功')}}</strong>
              </div>
              <i class="line"></i>
              <button @click="showGroupCard(item.invite_code)" class="group-button" v-if="item.tuan_status == GLOBAL.TUAN_STATUS_ING">{{buttonDesc}}</button>
              <button @click="showGroupCard(item.invite_code)" class="group-button success" v-else>{{$t('查看')}}</button>
            </div>
        </div>
      </div>
      <!-- 如果改为动态播报可以用以下代码 -->
      <!-- <swiper :options="swiperOption2" class="group-hall-list-wrapper">
        <swiper-slide>
          <div class="group-hall-item">
            <div class="user-info-wrapper">
              <img class="avatar" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJl7EFl1JylgPWgh6SOyteiboY3bgHWSX3FkGHz4HD1YRQGRUXggY481JmOBdIybjYXFGl04Hjb3cQ/132" alt="">
              <span class="name">测试测试测试</span>
            </div>
            <div class="group-hall-content">
              <div class="group-hall-state-wrapper">
                <strong>差一人成团</strong>
                <p>剩余23:24:25</p>
              </div>
              <i class="line"></i>
              <button @click="showGroupCard('code')">马上参团</button>
            </div>
          </div>
        </swiper-slide>
      </swiper> -->
    </div>

    <slot></slot>
    <group-card v-if="showGroupPop" :show="showGroupPop" :group-detail="groupDetail" v-on:closegroup="closeGroup" ref="child">
      <template slot="groupbutton">
        <router-link :to="{path:'/order',query: {'project_id':groupDetail.project_id, 'tuanCode': groupDetail.invite_code}}" class="group-invest-card-btn share w-button" v-if="groupDetail.tuan_status==GLOBAL.TUAN_STATUS_ING">{{groupDetail.button_desc}}</router-link>
        <a class="group-invest-card-btn w-button" v-else>{{$t('拼团成功')}}</a>
      </template>
    </group-card>
  </div>
</template>

<script>
import {GET_REFER_TUAN_ACTION,GET_OPEN_TUAN_LIST_ACTION} from '../../modules'
import { getElementTop } from '@/utils/utils'

export default {
  name: 'grouphall',
  props: {
    id: {
      type: Number
    },
    showTuanPerson: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dayArr: [],
      hArr: [],
      minArr: [],
      secArr: [],
      groupList: [],
      showGroupPop: false,
      groupDetail: null,
      buttonDesc: this.$t('马上拼团'),
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        direction: 'vertical'
      },
      swiperOption2: {
        slidesPerView: 3,
        spaceBetween: 0,
        loop: true,
        direction: 'vertical'
      }
    }
  },
  methods: {
    toGroupHall: function () {
      if(typeof window !== 'undefined') {
        window.scrollTo(0,getElementTop(this.$refs.grouphall)-130)
      }
    },
    closeGroup: function () {
      this.showGroupPop = false
    },
    // 多人投卡片
    showGroupCard: function (code) {
      const that = this
      this.$store.dispatch(GET_REFER_TUAN_ACTION,{invite_code: code}).then((res)=>{
        res['button_desc'] = that.buttonDesc
        that.groupDetail = res
        that.showGroupPop = true
      })
    },
    investCountDown: function (endTimeArr) {
      const that = this
      clearInterval(this.timer)
      this.timer = setInterval(function () {
        let day = []
        let h = []
        let min = []
        let sec = []
        for (let i = 0; i < endTimeArr.length; i++) {
          const currentTime = new Date().getTime()
          const timeLeft = (endTimeArr[i] - currentTime / 1000)          
          if (timeLeft <= 0) {
            day[i] = h[i] = min[i] = sec[i] = 0
          } else {
            let a = Math.floor(timeLeft / 60 / 60 / 24)
            let b = Math.floor(timeLeft / 60 / 60 - a * 24)
            let c = Math.floor((timeLeft - a * 24 * 60 * 60 - b * 60 * 60) / 60)
            let d = Math.floor(timeLeft % 60)
            day[i] = a > 9 ? a : '0'+a
            h[i] =  b > 9 ? b : '0'+b
            min[i] = c > 9 ? c : '0'+c
            sec[i] = d > 9 ? d : '0'+d
          }
        }
        that.dayArr = day
        that.hArr = h
        that.minArr = min
        that.secArr = sec
      }, 1000)
    },
    loadGroupList: function () {
      const that = this
      this.$store.dispatch(GET_OPEN_TUAN_LIST_ACTION, {project_id: this.id}).then((res) => {
        if(res.success) {
          let count = 0
          res.data.forEach((item) => {
              count += item.person_num
          })
          that.tuanPersons = count
          let groupProList = res.data.filter((item) => {
            return item.tuan_status == that.GLOBAL.TUAN_STATUS_ING && item.person_list.length > 0
          })

          let groupListSuccess = res.data.filter((item) => {
            return item.tuan_status > that.GLOBAL.TUAN_STATUS_ING && item.person_list.length > 0
          })

          that.groupList = that.showTuanPerson?groupProList.concat(groupListSuccess):groupProList

          const timerArr = groupProList.map((item) => {
            return item.end_time
          })
          that.$options.methods.investCountDown.call(that, timerArr)
        }
      })
    }
  },
  mounted() {
    this.loadGroupList()
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.swiper-bobao-wrapper {
  position: fixed;
  top: 60px;
  left: 0;
  height: 45px;
  width: 100%;
  background-color: #fff;
  z-index: 99;
  box-shadow: 0px 2px 10px 0 rgba(0,0,0,0.1);
  .w-container {
    height: 100%;
    overflow: hidden;
  }
  @media (max-width: 479px) {
    padding: 0 20px;
  }
}
.group-hall-list-wrapper {
  max-height: 234px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-left: 15px;
  padding-right: 15px;
}
.group-bobao-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  button {
    background-color: #FF5000;
    padding: 5px 10px;
    color: #fff;
    outline: none;
    border-radius: 3px;
    font-size: 13px;
  }
}
.info-card {
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 15px;
  &.detail {
    margin-bottom: 0;
  }
  .text-block-37 {
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .group-tuan-person {
      color: #FF5000;
      font-size: 12px;
    }
  }
}
.group-hall-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-top: 1px solid rgba(0,0,0,0.1);
  .user-info-wrapper {
      width: 90px;
      overflow: hidden;
    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      vertical-align: middle;
      white-space: nowrap;
      font-size: 12px;
      overflow: hidden;
      width: 50px;
      text-overflow: ellipsis;
      text-align: center;
      margin-left: 10px;
      font-weight: 600;
      color: #000;
    }
  }
  .group-hall-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 90px);
    .line {
      display: block;
      height: 30px;
      width: 1px;
      background-color: rgba(0,0,0,0.1);
    }
  }
 
  .group-hall-state-wrapper {
    font-size: 12px;
    width: 100px;
    span {
      color: #000;
      line-height: 16px;
    }
    p {
      margin: 0;
      color: #999;
      line-height: 14px;
    }
  }
   
  .group-button {
    padding: 0 10px;
    height: 34px;
    border-radius: 3px;
    background: #FF5000;
    font-size: 12px;
    line-height: 34px;
    color: #fff;
    transform: scale(0.9);
    outline: none;
    width: 68px;
    &.success {
      background: #fff;
      border: 1px solid #FF5000;
      color: #FF5000;
    }
  }
}
</style>
