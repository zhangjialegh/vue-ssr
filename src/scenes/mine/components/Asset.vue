<template>
  <div>
    <template v-if="!isWeixin">
    <div class="mine-title">{{$t('我的资产')}}</div>
    <div class="asset-3">
      <div class="asset-1 w-row">
        <div class="w-col w-col-4">
          <h6 class="top-3-title _2">{{$t('当前总资产')}}</h6>
          <h3 class="top-3-amount" v-if="asset.total_asset">${{toThousandFix(asset.total_asset)}}</h3>
          <h3 class="top-3-amount" v-else>{{$t('暂无资产')}}</h3>
        </div>
        <router-link to="/sharelist" class="w-col w-col-4 active">
          <h6 class="top-3-title _2">{{$t('资产价值')}}</h6>
          <h3 class="top-3-amount" v-if="asset.project_asset">${{toThousandFix(asset.project_asset)}}</h3>
          <h3 class="top-3-amount" v-else>$0</h3>
          <div v-if="expBalance" class="tiyanjin-balance">+${{toThousandFix(expBalance)}}({{$t('体验金')}})</div>
          <img src="https://wechat-pics.fangpinduo.com/mobwebsite/mine/arrow-right.svg" alt="asset">
        </router-link>
        <router-link :to="{path:'/mine' ,query: {active:1}}" class="w-col w-col-4 active">
          <h6 class="top-3-title _2">{{$t('账户余额')}}</h6>
          <h3 class="top-3-amount" v-if="asset.current_balance">${{toThousandFix(asset.current_balance)}}</h3>
          <h3 class="top-3-amount" v-else>$0</h3>
          <div v-if="asset.freeze_balance" class="tiyanjin-balance">+ ${{toThousandFix(asset.freeze_balance)}}({{$t('冻结')}})</div>
          <img src="https://wechat-pics.fangpinduo.com/mobwebsite/mine/arrow-right.svg" alt="balane">
        </router-link>
      </div>
    </div>
    </template>
    <div class="mine-title">{{$t('我的项目')}}</div>
    <div class="row-73 mobile-row w-row" v-if="expOrderList.length > 0 || orderList.length > 0">

      <!-- 体验金项目列 -->
      <a class="column-1 w-col w-col-4"  v-for="(orderItem,index) in expOrderList" :key="orderItem.project_title + index">
        <div class="card-wrapper-property-2">
          <div class="card property-2 over-hidden">
            <div class="card-img-wrapper property-2" v-lazy:background-image="orderItem.project_cover_urls[0]">
              <div class="project-brand">{{$t('体验金项目')}}</div>
              <a class="card-img-filter-shadow opacity" @click="viewMore(orderItem)">
                <div class="property-view">{{$t('查看项目资产估值')}}</div>
              </a>
            </div>
            <div class="card-info-wrapper property-2">
              <div class="card-title property-2 flex">
                <span class="son-title">{{orderItem.project_title}}</span>
                <span class="left-label" v-if="orderItem.left_day>0">{{$t('剩余天',{msg:orderItem.left_day > 9 ? orderItem.left_day : '0'+orderItem.left_day})}}</span>
              </div>
              <ul class="unordered-list-6" @click="viewMore(orderItem)">
                <li class="property-2-card-list">
                  <div>{{$t('预期年化收益')}}</div>
                  <div>{{toThousandPrt(orderItem.project_rate_year)}}%</div>
                </li>
                <li class="property-2-card-list">
                  <div>{{$t('持股比例')}}</div>
                  <div>{{toThousandPrt(orderItem.share_ratio)}}%</div>
                </li>
                <li class="property-2-card-list">
                  <div>{{$t('累计分红')}}</div>
                  <div>${{toThousandFix(orderItem.total_dividend)}}</div>
                </li>
                <li class="property-2-card-list">
                  <div>{{$t('投资金额')}}</div>
                  <div>${{toThousandFix(orderItem.share_ratio_value, 0)}}</div>
                </li>
                <li class="property-2-card-list">
                  <div>{{$t('查看更多')}}</div>
                  <img src="@/assets/images/Chevron.png" width="36" class="image-20">
                </li>
              </ul>
              <router-link class="property-2-flex-detail-wrapper" :to="{path:'/property',query: {project_id: orderItem.project_id, exporder: 'true'}}">
                 <div>{{$t('项目详情')}}</div>
                 <img src="@/assets/images/Chevron.png" width="36" class="image-20">
              </router-link>
              <div class="property-2-multi-btn markert">
                
                <router-link :to="{path:'/experiencegold'}" class="market-property-2-btn prev gold">
                  {{$t('邀请好友')}}
                </router-link>
                <router-link :to="{path:'/assetDetail', query:{'project_id':orderItem.project_id}}" class="market-property-2-btn luohan">
                  <div class="luohan gold">{{$t('查看资产评估')}}</div>
                </router-link>
              </div>
              </div>
            </div>
          </div>
        </a>

      <!-- 订单项目列 -->
      <a class="column-1 w-col w-col-4"  v-for="(orderItem,index) in orderList" :key="orderItem.property_info.title + index">
        <div class="card-wrapper-property-2">
          <div class="card property-2">
            <div class="card-img-wrapper property-2" v-lazy:background-image="orderItem.property_info.cover_pic_uris[0]">
              <div class="div-block-123" v-if="orderItem.order_info && orderItem.order_info.order_status!=GLOBAL.ORDER_STATUS_SUCCESS && orderItem.order_info.order_status!=GLOBAL.ORDER_STATUS_FAILURE"><img src="https://wechat-pics.fangpinduo.com/website/icon/info-white.svg" width="12" height="12">
                <div class="text-block-49">{{orderItem.order_info.show_info.phase_desc}}   <span v-if="showTime">({{dayArr[index]>9?dayArr[index]:'0'+dayArr[index]}}天{{hArr[index]>9?hArr[index]:'0'+hArr[index]}}:{{minArr[index]>9?minArr[index]:'0'+minArr[index]}}:{{secArr[index]>9?secArr[index]:'0'+secArr[index]}})</span></div>
              </div>

              <div class="card-img-filter-shadow" v-if="orderItem.order_info && orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_FAILURE" @click="viewMore(orderItem)">
                <div>{{$t('交易关闭')}}</div>
              </div>

              <a class="card-img-filter-shadow opacity" v-else @click="viewMore(orderItem)">
                <div class="property-view">{{$t('查看项目资产估值')}}</div>
              </a>
            </div>
            <div class="card-info-wrapper property-2" :class="{'order-failure': orderItem.order_info && orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_FAILURE}">
              <div class="card-title property-2">{{orderItem.project_info.title}}</div>
              <ul class="unordered-list-6" @click="viewMore(orderItem)">
                <li class="property-2-card-list">
                  <div>{{$t('预期年化收益')}}</div>
                  <div>{{toThousandPrt(orderItem.property_info.appreciation_rate_one_year_forecast + orderItem.property_info.rental_return_rate_net)}}%</div>
                </li>

                <li class="property-2-card-list" v-if="orderItem.project_info.support_resale && (!orderItem.order_info || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_SUCCESS)">
                  <div>{{$t('持股比例')}}</div>
                  <div>{{toThousandPrt(orderItem.share_percent)}}%({{toThousandFix(orderItem.share_num, 0)}}{{$t('万股')}})</div>
                </li>
                <li class="property-2-card-list" v-else>
                  <div>{{$t('合投目标')}}</div>
                  <div>${{toThousandFix(orderItem.property_info.initial_value, 0)}}</div>
                </li>

                <li class="property-2-card-list" v-if="orderItem.project_info.support_resale && (!orderItem.order_info || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_SUCCESS)">
                  <div>{{$t('累计分红')}}</div>
                  <div>${{toThousandFix(orderItem.total_rent, 2)}}</div>
                </li>
                <li class="property-2-card-list" v-else>
                  <div>{{$t('当前合投金额')}}</div>
                  <div>${{toThousandFix(orderItem.property_info.amount_count, 0)}}</div>
                </li>

                <li class="property-2-card-list" v-if="orderItem.project_info.support_resale && (!orderItem.order_info || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_SUCCESS)">
                  <div>{{$t('股份价值')}}</div>
                  <div>${{toThousandFix(orderItem.total_share_value, 2)}}</div>
                </li>
                <li class="property-2-card-list" v-else>
                  <div>{{$t('参与人数')}}</div>
                  <div>{{toThousandFix(orderItem.property_info.investor_count, 0)}}人</div>
                </li>

                <li class="property-2-card-list">
                  <div>{{$t('查看更多')}}</div>
                  <img src="@/assets/images/Chevron.png" width="36" class="image-20">
                </li>
              </ul>
              <router-link class="property-2-flex-detail-wrapper" :to="orderItem.project_info.support_resale?{path: '/marketDetail',query:{id:orderItem.project_id}}:{path:'/property',query: {project_id: orderItem.project_id}}">
                 <div>{{$t('项目详情')}}</div>
                 <img src="@/assets/images/Chevron.png" width="36" class="image-20">
              </router-link>
              <div class="property-2-multi-btn markert" v-if="orderItem.project_info.support_resale && (!orderItem.order_info || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_SUCCESS)">
                <router-link :to="{path:'/marketorder',query: {id: orderItem.project_id, bids: 1}}" class="text-block-50 offers">{{$t('买入股份')}}</router-link>
                <router-link :to="{path:'/marketorder',query: {id: orderItem.project_id, offers: 1}}" class="text-block-50 bids">{{$t('卖出股份')}}</router-link>
              </div>

              <div class="property-2-multi-btn markert" v-else-if="orderItem.order_info.tuan_info">
                <router-link :to="{path:orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_DOWN_PAY && orderItem.order_info.is_can_transfer ? '/wiretransfer' :orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_DOWN_PAY? '' : orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_NOTIFY_ALL_PAY || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_CONFIRM_NO_PAY ? '' : orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_CONFIRM_ALL_PAY || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_SUCCESS ? '/proofPreview' : orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_FAILURE ? '' : '',query: {order_id: orderItem.order_id}}" class="market-property-2-btn" v-bind:class="{prev: orderItem.order_info.order_status!=GLOBAL.ORDER_STATUS_FAILURE, disable:(orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_DOWN_PAY && !orderItem.order_info.is_can_transfer) || (orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_NOTIFY_ALL_PAY || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_CONFIRM_NO_PAY) || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_FAILURE}">
                  {{orderItem.order_info.show_info.phase_button}}
                </router-link>
                <div class="market-property-2-btn luohan" v-if="orderItem.order_info.order_status!=GLOBAL.ORDER_STATUS_FAILURE && orderItem.order_info.tuan_info.tuan_status == 0" @click="showGroupCard(orderItem.order_info.tuan_info.invite_code, orderItem.order_info.tuan_info.button)">
                  <div class="luohan">{{orderItem.order_info.tuan_info.button}}</div>
                  <div class="luohan bottom" v-if="orderItem.order_info.tuan_info.end_time && (groupDayArr[index] || groupHArr[index] || groupMinArr[index] || groupSecArr[index])">
                    {{(groupHArr[index]+groupDayArr[index]*24) < 10 ? '0' + groupHArr[index] : groupHArr[index]+groupDayArr[index]*24}}{{$t('小时')}}{{groupMinArr[index] < 10 ? '0' + groupMinArr[index] : groupMinArr[index]}}{{$t('分')}}{{groupSecArr[index] < 10 ? '0' + groupSecArr[index] : groupSecArr[index]}}{{$t('秒')}}
                  </div>
                </div>
                <div class="market-property-2-btn luohan" v-if="orderItem.order_info.order_status!=GLOBAL.ORDER_STATUS_FAILURE && orderItem.order_info.tuan_info.tuan_status > 0" @click="showGroupCard(orderItem.order_info.tuan_info.invite_code, orderItem.order_info.tuan_info.button)">
                  <div class="luohan">{{
                    (orderItem.order_info.tuan_info.tuan_status == 1 || orderItem.order_info.tuan_info.tuan_status == 2) ?
                    orderItem.order_info.tuan_info.button.slice(0,4) : orderItem.order_info.tuan_info.button}}</div>
                </div>
              </div>

              <div class="property-2-multi-btn markert" v-else>
                <router-link :to="{path:orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_DOWN_PAY && orderItem.order_info.is_can_transfer ? '/wiretransfer' :orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_DOWN_PAY? '' : orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_NOTIFY_ALL_PAY || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_CONFIRM_NO_PAY ? '' : orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_CONFIRM_ALL_PAY || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_SUCCESS ? '/proofPreview' : orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_FAILURE ? '' : '',query: {order_id: orderItem.order_id}}" class="market-property-2-btn" v-bind:class="{disable:(orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_DOWN_PAY && !orderItem.order_info.is_can_transfer) || (orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_NOTIFY_ALL_PAY || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_CONFIRM_NO_PAY) || orderItem.order_info.order_status==GLOBAL.ORDER_STATUS_FAILURE}" >
                  {{orderItem.order_info.show_info.phase_button}}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="asset-1 border" v-else>
      <div class="row-63 w-row border-bottom">{{$t('暂无详情')}}</div>
    </div>
    <group-card v-if="showGroupPop" :show="showGroupPop" :group-detail="groupDetail" v-on:closegroup="closeGroup" ref="child">
      <template slot="groupbutton">
        <a class="group-invest-card-btn share w-button" @click="getMyEvent">{{groupDetail.button_desc}}</a>
      </template>
    </group-card>
    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn">
          <a href="javascript:;" class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a>
        </div>
      </div>
    </pop-box>
  </div>
</template>

<script>
import {
  GET_USER_ORDER_LIST_ACTION,
  GET_ACTIVITY_EXP_BALANCE_ACTION,
  GET_USER_ASSET_ACTION,
  GET_USER_BILL_LIST_ACTION,
  GET_ACTIVITY_ORDER_ACTION
} from '@/scenes/mine/modules'
import {GET_REFER_TUAN_ACTION} from '@/scenes/investing/modules'
import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'asset',
  data () { return {
    orderList: [],
    dayArr: [],
    hArr: [],
    minArr: [],
    secArr: [],
    groupDayArr: [],
    groupHArr: [],
    groupMinArr: [],
    groupSecArr: [],
    arr: [],
    showTime: false,
    showGroupPop: false,
    groupDetail: {},
    timer: null,


    asset: {},
    shareList: [],
    billList: [],
    balance: 0,
    amountArray: [],
    filterList: [],
    amountIndex: 0,
    openNav: false,

    expOrderList: [],

    expBalance: 0,

    showTip: false,
    tip: ''
  } },
  methods: {
    viewMore: function (order) {
       if(order.order_info) {
         const status = order.order_info.order_status
         const {ORDER_STATUS_FAILURE,ORDER_STATUS_SUCCESS} = this.GLOBAL
         if(status<ORDER_STATUS_SUCCESS) {
           const tip = this.$t('完成转账汇款后')
           this.$options.methods.popTip.call(this, tip)
         } else if(status==ORDER_STATUS_FAILURE) {
           const tip = this.$t('规定的时间内完成汇款')
           this.$options.methods.popTip.call(this, tip)
         } else if(status==ORDER_STATUS_SUCCESS) {
           this.$router.push({
            path: '/assetDetail',
            query: {
              id: order.share_id,
              order_id: order.order_info.id
            }
          })
         }
       } else if (order.exp_money) {
         this.$router.push({
           path: '/assetDetail',
           query: {
             project_id: order.project_id
           }
         })
       } else {
         this.$router.push({
           path: '/assetDetail',
           query: {
             id: order.share_id,
             order_id: 0
           }
         })
       } 
    },
    popTip: function (tips) {
      if (tips) {
        this.showTip = true
        this.tip = tips
      }
    },
    closePopTip: function () {
      this.showTip = false
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'asset-group-project-detail-popup',
        action: 'click',
        optLabel: 'popup',
        page: this.$route.name,
        optValue: {
          groupDetail: this.groupDetail
        }
      })
    }))
    getMyEvent(){
          this.$refs.child.getProject();
          //调用子组件的方法，child是上边ref起的名字，emitEvent是子组件的方法。
      },
    openList: function () {
      this.openNav = true
    },
    closeList: function () {
      this.openNav = false
    },
    getOrderList: function (id) {
      const that = this
      this.$store.dispatch(GET_USER_ORDER_LIST_ACTION)
      .then((data)=>{
        that.orderList = data
        let arr = [], timer = [], groupTimer = [];
        for(let i=0;i<data.length;i++) {
          var deltaTime = data[i].project_info.phase_end - new Date().getTime() / 1000;
          if(deltaTime > 0) {
            arr[i] = Math.floor(deltaTime / 60 / 60 / 24)
          } else {
            arr[i] = 0
          }
          timer[i] = data[i].order_info ? data[i].order_info.show_info.phase_deadline : 0
          if (data[i].order_info && data[i].order_info.tuan_info) {
            groupTimer[i] = data[i].order_info.tuan_info.end_time
          }
        }
        that.arr = arr
        that.$options.methods.investCountDown.call(that,timer)
        if(groupTimer.length > 0) {
          that.$options.methods.groupInvestCount.call(that,groupTimer)
        }
      })
    },
    getExpBalance: function () {
      const that = this
      this.$store.dispatch(GET_ACTIVITY_EXP_BALANCE_ACTION)
      .then((res)=>{
        that.expBalance = res.balance
      })
    },
    investCountDown: function (endTimeArr) {
      let that = this
      clearInterval(this.timer)
      this.timer = setInterval(function () {
        let day = [],h = [],min = [],sec = [];
        for (let i = 0; i < endTimeArr.length; i++) {
          const currentTime = new Date().getTime()
          const timeLeft = endTimeArr[i] ? (endTimeArr[i] - currentTime / 1000) : -1
          if (timeLeft <= 0) {
            day[i] = h[i] = min[i] = sec[i] = 0
            that.showTime = false
            clearInterval(that.timer)
          } else {
            that.showTime = true
            day[i] = Math.floor(timeLeft / 60 / 60 / 24)
            h[i] = Math.floor(timeLeft / 60 / 60 - day[i] * 24)
            min[i] = Math.floor((timeLeft - day[i] * 24 * 60 * 60 - h[i] * 60 * 60) / 60)
            sec[i] = Math.floor(timeLeft % 60)
          }
        }
          that.dayArr = day
          that.hArr = h
          that.minArr = min
          that.secArr = sec

      },1000)
    },
    groupInvestCount: function (endTimeArr) {
      let that = this
      clearInterval(this.countdown)
      this.countdown = setInterval(function () {
        let day = [],h = [],min = [],sec = [];
        for (let i = 0; i < endTimeArr.length; i++) {
          const currentTime = new Date().getTime()
          const timeLeft = endTimeArr[i] ? (endTimeArr[i] - currentTime / 1000) : -1
          if (timeLeft <= 0) {
            day[i] = h[i] = min[i] = sec[i] = 0
            clearInterval(that.countdown)
          } else {
            day[i] = Math.floor(timeLeft / 60 / 60 / 24)
            h[i] = Math.floor(timeLeft / 60 / 60 - day[i] * 24)
            min[i] = Math.floor((timeLeft - day[i] * 24 * 60 * 60 - h[i] * 60 * 60) / 60)
            sec[i] = Math.floor(timeLeft % 60)
          }
        }
          that.groupDayArr = day
          that.groupHArr = h
          that.groupMinArr = min
          that.groupSecArr = sec

      },1000)
    },
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt,
    naviteToDetail: function (data) {
      if(data.rent_detail) {
        this.$router.push({
          path:'/revenueDetail',
          query: {
            data: JSON.stringify(data)
          }
        })
      }
    },
    loadUserAsset: function () {
      var that = this
      this.$store.dispatch(GET_USER_ASSET_ACTION)
      .then((data)=>{
        that.asset = data
      })
    },

    loadBillList: function () {
      var that = this
      this.$store.dispatch(GET_USER_BILL_LIST_ACTION)
      .then((data)=>{
        data.bill_list.forEach((item)=>{
          item.time_str = formatHouseDate(item.time)
        })
        let amountArray = [that.$t('全部收益')]
        // amountArray.push()
        console.log(amountArray,'amountArray')
        for (let i = 0; i < data.filter_list.length; i++) {
          const element = data.filter_list[i];
          amountArray.push(element.project_title)
        }
        that.balance = data.current_balance
        that.billList = data.bill_list
        that.amountArray = amountArray
        that.filterList = data.filter_list
        that.amountIndex = 0 
      })
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'asset-balance-dropdown',
        action: 'click',
        optLabel: 'dropdown',
        page: this.$route.name,
        optValue: {
          asset: this.amountArray[this.amountIndex]
        }
      })
    }))
    pickIndex: function (idx) {
      this.amountIndex = idx
      this.$options.methods.closeList.call(this)
      var that = this
      const { filterList,amountArray } = this
      for (let i = 0; i < filterList.length; i++) {
        const element = filterList[i];
        if (amountArray[idx] == element.project_title) {
          this.$store.dispatch(GET_USER_BILL_LIST_ACTION,{
            project_id: element.project_id
          }).then((data)=>{
            data.bill_list.forEach((item)=>{
              item.time_str = formatHouseDate(item.time)
            })
            that.balance = data.current_balance
            that.billList = data.bill_list
          })
        } else {
          this.$store.dispatch(GET_USER_BILL_LIST_ACTION).then((data)=>{
            data.bill_list.forEach((item)=>{
              item.time_str = formatHouseDate(item.time)
            })
            that.balance = data.current_balance
            that.billList = data.bill_list 
          })
        }
      }
  },

  @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'asset-showgroup-card-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
          groupDetail: this.groupDetail
        }
      })
    }))
  // 多人投卡片
  showGroupCard: function (code, buttonInfo) {
    const that = this
    this.$store.dispatch(GET_REFER_TUAN_API,{
      invite_code: code
    }).then((data)=>{
        data['button_desc'] = buttonInfo
        that.groupDetail = data
        that.showGroupPop = true 
    })
  },
  closeGroup: function () {
    this.showGroupPop = false
  },
  // 获取体验金项目
  getExpProjectOrder: function () {
      const that = this
      this.$store.dispatch(GET_ACTIVITY_ORDER_ACTION)
      .then((res)=>{
        that.expOrderList = res.orders.filter((item, index) => {
          let leftDay ;
          const end =  new Date(item.end_date).getTime()
          const delta = end - Date.now()
          if(delta > 0) {
            leftDay = Math.ceil(delta/1000/60/60/24)
          } else {
            leftDay = 0
          }
          item.left_day = leftDay
          return item
        })
      })
    }
  },
  computed: {
    isWeixin () {
      return this.$store.state.base.isWeixin
    }
  },
  mounted() {
    this.loadUserAsset()
    this.loadBillList()
    this.getOrderList()
    this.getExpBalance()
    this.getExpProjectOrder()
  },
  destroyed:function (){
    clearInterval(this.timer)
    clearInterval(this.countdown)
  },
  watch: {
    '$route'(to,from) {
      this.loadUserAsset()
      this.loadBillList()
      this.getOrderList()
      this.getExpBalance()
      this.getExpProjectOrder()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-info-wrapper.property-2.order-failure {
  .property-2-card-list, 
  .card-title.property-2, 
  .property-2-flex-detail-wrapper,
  .market-property-2-btn.disable
  {
    color: #999;
  }
}
.property-2-card-list {
  .image-20 {
    transform: rotate(90deg);
    width: 10px;
    padding-right: 0;
  }
}
.unordered-list-6 {
  cursor: pointer;
}
.card-img-filter-shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    &.property-view {
      border: 1px solid rgba(255,255,255,0.4);
      border-radius: 2px;
      font-size: 12px;
      padding: 5px 10px;
      background-color: rgba(0,0,0,0.2);
    }
  }
  &.opacity {
    opacity: 0;
    transition: opacity 0.2s;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
}
.property-2-flex-detail-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border-bottom: 1px solid #dadada;
  color: #000;
  font-size: 12px;
  .image-20 {
    transform: rotate(90deg);
    width: 10px;
    padding-right: 0;
  }
}
@media (max-width: 479px) {
  .card-info-wrapper {
    width: auto;
  }
}
.card-title.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
  .son-title {
    display: block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.left-label {
  display: block;
  border-radius: 3px 0 0 3px;
  padding: 1px 10px;
  background: #D64834;
  color: #fff;
  font-weight: normal;
  transform: scale(0.8) translateX(10px);
}
.column-92.w-col.w-col-10 {
  width: 100%;
}
.card-wrapper-property-2 {
  margin-bottom: 10px;
}
.card-title.property-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.property-2-multi-btn.block {
  display: block;
  text-align: center;
}
.div-block-124 {
  cursor: pointer;
}
.heading-38 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.w-col .w-col-3-5 {
  width: 35%;
}
.show-nav {
  display: block;
  right: 20px;
}
.w-dropdown-list {
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  min-width: 0;
  border: none;
  width: 100%;
  display: block;
}
.w-dropdown-link:hover {
  background: #d5a478;
  color:#fff; 
}
.hover-pointer {
  cursor: pointer;
}
.padding-right {
  padding-left: 0;
  padding-right: 20px;
  text-align: right;
}
.hide-arrow {
  visibility: hidden;
}
.dropdown-toggle-6.w-dropdown-toggle {
  margin-right: 0;
}
.padding-right._1 {
  padding-right: 34px;
}
.asset-1.border {
  border: 1px solid #e9e9e9;
}
.w-row.border-bottom {
  border: none;
  display: block;
}
.w-row.padding {
  padding: 10px 20px;
}
.w-col.active:hover {
  background: rgba(0, 0, 0, 0.1)
}
.w-col > img {
  position: absolute;
  top: 50%;
  right: 30px;
  height: 20px;
  height: 20px;
  transform: translateY(-50%);
}
.w-row.padding-bottom {
  border: none;
}
.project-brand {
  position:absolute;
  top:17px;
  left:-120px;
  height:26px;
  width:300px;
  transform:rotate(-45deg);
  background-color:#D64834;
  color:white;
  font-size:12px;
  text-align:center;
  line-height:26px;
}
.card.property-2.over-hidden {
  overflow: hidden;
}
.market-property-2-btn.prev {
  color: #666;
  &.gold {
    color: #d5a478;
  }
}
.luohan.gold {
  color: #d5a478;
}
.tiyanjin-balance {
  font-size: 16px;
  text-align: center;
}
.div-block-124.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
