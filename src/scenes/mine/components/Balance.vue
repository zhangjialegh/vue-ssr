<template>
  <div>
    <div class="mine-title">{{$t('我的余额')}}</div>
    <div class="text-block-54">
      <!-- *存入资金购买房产股权  -->
      <span class="processing" v-if="process" @click="showFilter">{{$t('入金明细')}}</span>
      <router-link to="/withdraw/withdrawdetail" class="processing withdraw" v-if="withDrawList.length" @click="showFilter">{{$t('提现明细')}}</router-link>
    </div>
    <div class="div-block-125">
      <div class="div-block-126">
        <div class="text-block-52">{{$t('账户余')}}：</div>
        <div class="text-block-51">${{toThousandFix(balance)}}<span v-if="freezeBalance"> + ${{toThousandFix(freezeBalance)}}({{$t('冻结')}})</span></div>
      </div>
      <div class="in-out-btn-wrapper">
        <router-link to="/deposit" class="link-4 w-button">{{$t('存入资金')}}</router-link>
        <router-link to="/withdraw/banklist" class="link-4 w-button withdraw">{{$t('申请提现')}}</router-link>
      </div>
      
      </div>
    <div class="asset-3"></div>
    <div class="div-block-127">
      <div class="mine-title property-2">{{$t('交易记录')}}</div>
      <div data-delay="0" class="dropdown-5 w-dropdown" @mouseover="openList" @mouseout="closeList" v-if="amountArray.length > 1">
        <div class="dropdown-toggle-8 w-dropdown-toggle">
          <div class="icon-6 w-icon-dropdown-toggle"></div>
          <div class="text-block-53">{{amountArray[amountIndex]}}</div>
        </div>
        <nav class="dropdown-list-2 w-dropdown-list" v-if="openNav">
          <a href="javascript:;" class="dropdown-link-4 w-dropdown-link" :key="item" v-for="(item,index) in amountArray" @click="pickIndex(index)">{{item}}</a>
        </nav>
      </div>
    </div>
    <div class="row-46 w-row padding" v-if="billList.length==0">{{$t('暂无详情')}}</div>
    <div class="asset-3 asset-mi" v-else>
      <div class="row-46 w-row">
        <div class="w-col w-col-10">
          <h5 class="heading-42">{{$t('交易详情')}}</h5>
        </div>
        <div class="w-col w-col-2">
          <h5 class="heading-42 heading-42-add padding-right-20">{{$t('金额')}}</h5>
        </div>
      </div>
      <div class="row-49 w-row" v-for="(item,index) in billList.slice(0, loadingNum)" @click="naviteToDetail(item)" :key="item.time_str + index">
        <div class="column-93 w-col w-col-10 w-10">
          <div class="balance-title"><strong class="bold-text-7">{{item.title}}</strong></div>
          <span class="balance-time">{{item.time_str}}</span>
        </div>
        <div class="w-col w-col-2 w-2">
          <h6 class="heading-43 heading-43-add padding-right gain padding-top-18">{{item.amount>0?'':'-'}}${{Math.abs(item.amount)}}<img :class="{'hide-arrow':!item.rent_detail}" src="https://wechat-pics.fangpinduo.com/website/asset/arrow-right.svg" height="14" width="14"/></h6>
        </div>
        <!-- <div class="w-col w-col-2">
          <h6 class="heading-43 heading-43-add padding-right gain">-$28<img :class="{'hide-arrow':!item.rent_detail}" src="https://wechat-pics.fangpinduo.com/website/asset/arrow-right.svg" height="14" width="14"/></h6>
        </div> -->
      </div>
      <loading-more 
      v-if="billList.length > 0"
      :list-arr="billList" 
      :loading-num="loadingNum"
      @loading="loadingMore"></loading-more>
    </div>
    <transition-box :show="showShadow">
      <div class="bids-offers-wrapper" v-show="showShadow">
        <div class="bids-offers-header">
          <div>{{$t('汇款记录')}}</div>
          <div class="bids-offers-close" @click="closeFilter"></div>
        </div>
        <div class="asset-3 asset-mi">
          <div class="row-46 w-row">
            <div class="w-col w-col-8 w-8">
              <h5 class="heading-42">{{$t('汇款详情')}}</h5>
            </div>
            <div class="w-col w-col-2 w-2">
              <h5 class="heading-42 heading-42-add">{{$t('状态')}}</h5>
            </div>
            <div class="w-col w-col-2 w-2">
              <h5 class="heading-42 heading-42-add">  </h5>
            </div>
          </div>
          <div class="row-49 w-row" v-for="(item,index) in chargeList" :key="item.created_at + index">
            <div class="column-93 w-col w-col-8 w-8">
              <div class="deal-title"><strong class="bold-text-7">{{'「'+item.transfer_account+'」' +$t('转入')+ toThousandFix(item.transfer_amount)}}</strong></div>
              <span class="deal-time">{{item.created_at.split(' ')[0]}}</span>
            </div>
            <div class="w-col w-col-2 w-2">
              <h6 class="heading-43 heading-43-add gain">
                {{item.payment_status==0?$t('确认中'):item.payment_status==1?$t('成功'):item.payment_status==2?$t('失败'):item.payment_status==3?$t('已取消'):$t('已完成')}}
              </h6>
            </div>
            <div class="w-col w-col-2 w-2">
              <h6 class="heading-43 heading-43-add padding-right gain"><span class="cancel-charge" @click="cancelCharge(item.id)" v-if="item.payment_status==0">{{$t('取消汇款')}}</span></h6>
            </div>
          </div>
        </div>
      </div>
      </transition-box>
      <div v-if="hasHuameiOrder">
        <div class="w-row w-title">
          <div class="w-col w-col-4 mine-title">{{$t('华美银行开户服务')}}</div>
          <div class="w-col w-col-8 mine-subtitle hm-kf1"><span>{{$t('联系客服')}}Maggie:13161587939</span><span>（{{$t('也可通过此号码添加客服微信号')}}）</span></div>
        </div>
        <div class="bank-wrap w-row">
          <div class="w-col w-col-4"><img src="https://wechat-pics.fangpinduo.com/sunny/huamei/huameibank.png" alt="huamei-logo"></div>
          <div class="status-wrap w-col w-col-8">
            <a v-if="huamei_status===1" class="btn-border" href="/bank/addinfo">{{$t('补充资料')}}</a>
            <span v-else>{{status_display}}</span>
          </div>
        </div>
        <div class="hm-kf2"><span>{{$t('联系客服')}}Maggie:13161587939</span><span>（{{$t('也可通过此号码添加客服微信号')}}）</span></div>
      </div>
    </div>
    
</template>

<script>
import {
  GET_USER_PAYMENT_CANCEL_ACTION,
  GET_USER_PAYMENT_LIST_ACTION,
  GET_USER_WITHDRAW_HISTORY_ACTION,
  GET_USER_BILL_LIST_ACTION,
  GET_USER_HUAMEI_ORDER_ACTION
} from '@/scenes/mine/modules'
import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'asset',
  data () { return {
    asset: {},
    billList: [],
    balance: 0,
    freezeBalance: 0,
    amountArray: [],
    filterList: [],
    amountIndex: 0,
    openNav: false,
    showShadow: false,
    process: false,
    chargeList: [],
    loadingNum: this.GLOBAL.loadInitNum,
    hasHuameiOrder:false,
    huamei_status:0,
    status_display:'',
    withDrawList: []
  } },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt,
    loadingMore(msg) {
      this.loadingNum = msg
    },
    openList: function () {
      this.openNav = true
    },
    closeList: function () {
      this.openNav = false
    },
    showFilter: function () {
      this.showShadow = true
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'balance-close-market-bid-offer-records-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    closeFilter: function () {
      this.showShadow = false
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'balance-market-cancel-charge-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    cancelCharge: function (id) {
      var that = this
      this.$store.dispatch(GET_USER_PAYMENT_CANCEL_ACTION,{
        payment_id: id
      }).then((data)=>{
        that.$options.methods.loadReChargeList.call(that)
      })
    },

    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'balance-to-detail-router',
        action: 'click',
        optLabel: 'router',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
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

    loadReChargeList: function () {
      var that = this
      this.$store.dispatch(GET_USER_PAYMENT_LIST_ACTION)
      .then((data)=>{
        that.chargeList = data.res.payments
        that.process = data.res.processing
      })
    },

    loadWithDrawList: function () {
      var that = this
      this.$store.dispatch(GET_USER_WITHDRAW_HISTORY_ACTION)
      .then((res)=>{
        that.withDrawList = res.data
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
        console.log(data.filter_list,'data.filter_list');
        
        for (let i = 0; i < data.filter_list.length; i++) {
          const element = data.filter_list[i];
          amountArray.push(element.project_title)
        }
        that.balance = data.current_balance
        that.freezeBalance = data.freeze_balance
        that.billList = data.bill_list
        that.amountArray = amountArray
        that.filterList = data.filter_list
        that.amountIndex = 0
      })
    },
    loadHuameiOrder: function(){
      var that = this
      this.$store.dispatch(GET_USER_HUAMEI_ORDER_ACTION)
      .then((res)=>{
        if(res){
          if(res.huamei_status){
            that.hasHuameiOrder=true;
          }
          that.huamei_status=res.huamei_status;
          that.status_display=res.status_display.full_desc
        }
      })
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'balance-dropdown',
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
      let pId = 0
      for (let i = 0; i < filterList.length; i++) {
        const element = filterList[i];
        if (amountArray[idx] == element.project_title) {
          pId = element.project_id
        }
      }
      if(pId) {
        this.$store.dispatch(GET_USER_BILL_LIST_ACTION,{
          project_id: pId
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
  computed: {
    isWeixin() {
      return this.$store.state.base.isWeixin
    }
  },
  mounted() {
    const isAdd = this.$route.query.addbalance
    if (isAdd) {
      this.showShadow = true
    }
    this.loadBillList()
    this.loadReChargeList()
    this.loadHuameiOrder()
    this.loadWithDrawList()
  }
}
</script>

<style lang="scss" scoped>
.w-dropdown-list {
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  min-width: 0;
  border: none;
  width: 100%;
  display: block;
}
.link-4.w-button.withdraw {
  background: #464155;
}
.w-dropdown-link:hover {
  background: #d5a478;
  color:#fff; 
}
.w-row.padding-bottom {
  padding-bottom: 10px;
}
.padding-right-20 {
  padding-left: 0;
  padding-right: 20px;
  text-align: right;
}
.padding-right {
  padding-left: 0;
  padding-right: 5px;
  text-align: right;
}
.padding-top-18 {
  padding-top: 18px;
}
.w-row.padding {
  padding: 10px 20px;
}
.cancel-charge {
  background: #d5a478;
  color: #fff;
  text-align: center;
  display: block;
  font-size: 12px;
  padding: 5px 10px;
  margin-top: -5px;
  margin-bottom: -5px;
  cursor: pointer;
}
.hide-arrow {
  visibility: hidden;
}
.balance-title {
  font-size: 12px;
  padding-left: 20px;
  padding-top: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.balance-time {
  padding-left: 20px;
  font-size: 12px;
}
.deal-title {
  font-size: 12px;
  padding-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 10px;
}
.deal-time {
  padding-left: 20px;
  font-size: 12px;
}
.processing {
  display: inline-block;
  background: #d5a478;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 14px;
  cursor: pointer;
  &.withdraw {
    background: #464155;
  }
}
.w-title{
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.bank-wrap{
    border: 1px solid #E9E9E9;
    background: #fff;
    padding: 0 16px;
    display: flex;
    align-items: center;
}
.btn-border{
    color: #D5A478;
    border: 1px solid #D5A478;
    padding: 10px 40px;
    display: inline-block;
    margin: 10px;
}
.btn-border:hover{
    color: #fff;
    background:  #D5A478;
}
.status-wrap{
  text-align: right;
}
.hm-kf1{
  display: block;
}
.hm-kf2{
  margin-top: 8px;
  display: none;
}
@media (max-width: 479px) {
  .in-out-btn-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
  }
  .mine-title.property-2 {
    margin-top: 0;
  }
  .cancel-charge {
    padding: 5px;
  }
  .heading-43-add.padding-right {
    text-align: right;
  }
  .w-col.w-col-10.w-10 {
    width: 71.33333333%;
  }
  .w-col.w-col-2.w-2 {
    width: 28.66666667%;
  }
  .btn-border{
    padding: 10px 24px;
  }

  .hm-kf1{
    display: none;
  }
  .hm-kf2{
    display: block;
  }
}

</style>
