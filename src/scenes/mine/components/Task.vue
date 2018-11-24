<template>
  <div >
    <div class="mine-title">{{$t('我的任务')}}</div>
    <div class="task-progress-wrapper">
      <div class="progress-bar-parent">
        <div class="parogress-bar-child" :style="{width: 12.5*userTaskScore+'%'}"></div>
        <div class="progress-gift" :class="{'gift-1':prizeItem.task_group_id==1,'gift-2':prizeItem.task_group_id==2,'gift-3':prizeItem.task_group_id==3,'gift-small': prizeItem.is_pick_prize || (userTaskScore < prizeItem.need_score)}" :style="{backgroundImage:prizeItem.is_pick_prize?`url(${require('@/assets/images/gift.png')})`:userTaskScore>= prizeItem.need_score?`url(${require('@/assets/images/gift-active.png')})`:`url(${require('@/assets/images/gift.png')})`}"  v-for="(prizeItem,index) in task" :key="prizeItem.task_group_id+'-'+index" @click="getGroupPrize(prizeItem.task_group_id, prizeItem.need_score, prizeItem.is_pick_prize)">
          <div class="demo" :class="{'last':prizeItem.task_group_id==3}" v-if="!prizeItem.is_pick_prize && (userTaskScore <= prizeItem.need_score) && checkPrizeScore(prizeItem)">
            <p>{{$t('礼盒奖励')}}</p>
            <span>({{prizeItem.prize_desc}})</span>
          </div>
        </div>

        <div class="progress-gift center"  v-if="maxScore === userTaskScore && checkTaskOver()">
          <div class="demo over">
            <p>{{$t('恭喜完成新手任务')}}</p>
            <span>({{$t('开启投资之旅吧')}})</span>
          </div>
        </div>
      </div>
    </div>

    <div class="task-table-list" v-for="(prizeItem,index) in task" :key="prizeItem.task_group_id+'-'+index">
      <div class="task-title">{{prizeItem.prize_desc}}</div>
      <ul class="task-gift-item">
        <li v-for="(taskItem,idx) in prizeItem.tasks" :key="taskItem.task_id+'-'+idx">
          <p>
            <strong>{{taskItem.task_name}}</strong>
            <span>{{taskItem.task_desc}}</span>
          </p>
          <button class="disabled" v-if="!checkPrizeScore(prizeItem)">{{$t('去完成')}}</button> 
          <button class="complete" @click="doTask(taskItem, true)" v-else-if="taskItem.is_pick_prize && taskItem.is_finished">{{$t('已完成')}}</button>
          <button class="pick-up" v-else-if="!taskItem.is_pick_prize && taskItem.is_finished" @click="pickUpTask(taskItem.task_id)">{{$t('领取')}}</button>
          <button @click="doTask(taskItem)" v-else>{{$t('去完成')}}</button>
        </li>
      </ul>
    </div>

    <transition-box :show="showServiceCode">
      <div class="service-wrapper" v-show="showServiceCode">
        <div class="group-invest-rule-close" @click="closeFollowWechat"></div>
        <div class="service-header">
          <span>{{$t('扫码关注')}}</span>
          <span></span>
        </div>
        <div class="qrcode-wrapper">
          <canvas ref="canvas" class="image-27"></canvas>
        </div>
        <div class="service-footer">
        </div>
      </div>
    </transition-box>

    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn">
          <a href="javascript:;" class="button-14 w-button" @click="closeTip">{{$t('知道了')}}</a>
        </div>
      </div>
    </pop-box>
  </div>
</template>

<script>
import {
  GET_USER_TASK_STARTER_ACTION,
  GET_USER_TASK_GET_GROUP_PRIZE_ACTION,
  GET_USER_TASK_GET_PRIZE_ACTION,
  GET_USER_TASK_DO_ACTION,
  GET_USER_TASK_QRCODE_ACTION,
  GET_USER_TASK_FOLLOW_WECHAT_ACTION
} from '@/scenes/mine/modules'
import {formatValidDate} from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'
import QRCode from "qrcode"

export default {
  name: 'task',
  data () { return {
    task: [],
    showTip: false,
    tip: '',
    userTaskScore: 0,
    maxScore: 0,
    showServiceCode: false,
    overTime: 0,
    pollingInterval: 2000, //ms
    maxTime: 1000 * 10,
  } },
  methods: {
    getTaskList: function () {
      const that = this
      this.$store.dispatch(GET_USER_TASK_STARTER_ACTION)
      .then((res)=>{
        that.task = res.data
         that.maxScore = res.max_score
         that.userTaskScore = res.user_task_score
      })
    },
    popTip: function (tip) {
      this.tip = tip
      this.showTip = true
    },
    closeTip() {
      this.showTip = false
    },
    getGroupPrize: function (groupId, needScore, isPick) {
      const that = this
      const { userTaskScore } =  this
      if(isPick) {
         const tip = that.$t('该奖励已领取')
         this.$options.methods.popTip.call(this, tip)
      } else if (userTaskScore >= needScore) {
        this.$store.dispatch(GET_USER_TASK_GET_GROUP_PRIZE_ACTION,{
          task_group_id: groupId
        }).then((res)=>{
          that.$options.methods.getTaskList.call(that)
          const tip = that.$t('奖励领取成功')
          that.$options.methods.popTip.call(that, tip)
        })
      } else {
         const tip = that.$t('完成相关任务才能领取')
         this.$options.methods.popTip.call(this, tip)
      }
    },

    checkTaskOver: function () {
      const over = this.task.filter((item)=>{
        return !item.is_pick_prize
      })
      if(over.length > 0) {
        return false
      } else {
        return true
      }
    },

    checkPrizeScore: function (prizeItem) {
      const id = prizeItem.task_group_id
      const { task, userTaskScore } = this
      let prevScore = 0
      let prevPrizeGet = true
      if((id - 2) > -1) {
        task.forEach((item)=>{
          if(item.task_group_id==(id-1)) {
            prevScore = item.need_score
            prevPrizeGet = item.is_pick_prize
          }
        })
      }
      if(userTaskScore >= prevScore && prevPrizeGet) {
        return true
      } else {
        return false
      }
    },
    pickUpTask: function (taskId) {
      const that = this
      this.$store.dispatch(GET_USER_TASK_GET_PRIZE_ACTION)
      .then((res)=>{
        that.$options.methods.getTaskList.call(that)
      })
    },
    // 做任务
    doTask:function(task, isFinish) {
      this.$store.dispatch(GET_USER_TASK_DO_ACTION,{
        task_id: task.task_id
      })
      if(task.task_type===3){
        if (isFinish) return;
        this.$options.methods.followWechat.call(this)
      }else{
        if(/^\/blog\//g.test(task.task_link.link) || /^(http)/g.test(task.task_link.link)) {
          window.location.href = task.task_link.link
        } else {
          this.$router.push(task.task_link.link)
        }
      }
    },
    followWechat: function () {
      const that = this
      this.$store.dispatch(GET_USER_TASK_QRCODE_ACTION)
      .then((res)=>{
        that.showServiceCode = true
            const code = res.url
            const canvas=that.$refs.canvas
            QRCode.toCanvas(canvas, code, { width: 160, margin: 0 }, function() {
              // 轮询是否关注公众号
              clearInterval(that.time)
              that.time = setInterval(() => {
                that.$store.dispatch(GET_USER_TASK_FOLLOW_WECHAT_ACTION)
                .then((res)=>{
                  if(res.is_follow_wechat) {
                    that.showServiceCode = false
                    clearInterval(that.time)
                    that.$options.methods.getTaskList.call(that)
                  }
                })
              }, that.pollingInterval);
            });
      })
    },  
    closeFollowWechat: function () {
      this.showServiceCode = false
      clearInterval(this.time)
    }
  },
  computed: {
    isWeixin () {
      return this.$store.state.base.isWeixin
    }
  },
  mounted: function () {
   this.getTaskList()
  },
  destroyed() {
    clearInterval(this.time)
  },
}
</script>

<style lang="scss" scoped>
.task-progress-wrapper {
  width: 100%;
  padding: 20px;
  margin-bottom: 25px;
  .progress-bar-parent {
    height: 6px;
    border-radius: 3px;
    background-color: #D7D7D7;
    position: relative;
    margin-top: 80px;
    .parogress-bar-child {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 30px; //TODO
      border-radius: 3px;
      transition: all 0.5s;
      background-color: #d5a478;
    }
    .progress-gift {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      transform: translate(-50%,-55%);
      &.gift-small {
        background-size: 40% 40%;
      }
      &.center {
        left: 50%;
      }
      &.gift-1 {
        left: 37.5%;
      }
      &.gift-2 {
        left: 75%;
      }
      &.gift-3 {
        left: 100%;
      }
      .demo{
        width:180px;
        height:65px;
        border:1px solid #d5a478;
        position: absolute;
        background-color: #fff;
        display: flex;
        top: -70px;
        left: 50%;
        transform: translateX(-50%);
        align-items: center;
        justify-content: center;
        flex-direction: column;
        & > p {
          color: #d5a478;
        }
        & > span {
          color: #9b9b9b;
          font-weight: 300;
        }
        &.last {
          transform: translateX(-90%);
          &::before {
            left:90%;
            transform: translateX(-50%);
          }
          &::after {
            left:90%;
            transform: translateX(-50%);
          }
        }
        p {
          margin: 0;
        }
        &::after, &::before {
          content: '';
          display: block;
          position:absolute;
          width:0;
          height:0px;
        }
        &::before {
          border:8px solid transparent;
          border-top-color:#d5a478;  /*这里的颜色一定要跟上面demo边框颜色一样*/
          bottom:-16px;
          left:50%;
          transform: translateX(-50%);
        }
        &::after {
          border:7px solid transparent;
          border-top-color:#fff;/*这里的颜色一定要跟demo背景颜色一样*/
          bottom:-13px;
          left:50%;
          transform: translateX(-50%);
        }
        &.over {
          &::after, &::before {
            display: none
          }
        }

    }
    }
  }
}
.task-table-list {
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
  padding: 0 20px;
  border: 1px solid #E9E9E9;
  .task-title {
    font-weight: 500;
    color: #4A4A4A;
    font-size: 16px;
    padding: 20px 0;
  }
  .task-gift-item {
    width: 100%;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #E9E9E9;
      padding: 15px 0;
      button {
        width: 70px;
        height: 32px;
        color: #fff;
        border-radius: 2px;
        outline: none;
        background-color: #d5a478;
        &.disabled {
          background-color: #999999;
        }
        &.pick-up {
          background-color: #FF5000;
        }
        &.complete {
          background-color: #4A4A4A;
        }
      }
      p {
        margin: 0;
        strong {
          display: block;
          color: #4A4A4A;
          margin-bottom: 3px;
          white-space: nowrap;
        }
        span {
          color: #999999;
          white-space: nowrap;
          font-weight: 300;
        }
      }
    }
  }
}
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
.image-27 {
  margin-bottom: 0;
}
</style>
