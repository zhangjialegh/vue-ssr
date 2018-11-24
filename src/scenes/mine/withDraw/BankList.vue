<template>
  <div class="order-section">
    <div class="order-contaiiner w-container">
      <div class="detail-title">
        <span>{{$t('提现账户选择')}}</span>
        <router-link class="bank-add-new" to="/withdraw/bankinfo">+ {{$t('添加新账户')}}</router-link>
      </div>
      <div class="column-92 w-col w-col-12">
        <div class="column-profile w-row">
          <div class="profile-card-item w-col w-col-6" v-for="(item) in bankList" :key="item.id" >
            <div class="bank-list-wrapper">
              <!-- <div class="profile-card-item-left" @click="switchBankList(item.id)">
                <h5 class="heading-65">{{item.account_name}}</h5>
                <div class="text-block-57">{{item.bank_name}}</div>
                <div class="text-block-58">{{item.account_no}}</div>
              </div> -->

              <router-link :to="{path:'/withdraw/withdraw',query:{'account_id': item.id}}" class="profile-card-item-left">
                <div>
                  <h5 class="heading-65">{{item.account_name}}</h5>
                  <div class="text-block-57">{{item.bank_name}}</div>
                  <div class="text-block-58">{{item.account_no}}</div>
                </div>
                <img src="https://wechat-pics.fangpinduo.com/mobwebsite/mine/arrow-right.svg" alt="banklist">
              </router-link>
              <div class="profile-card-item-right">
                <a @click="delBankInfo(item.id)" class="edit-bank-info">{{$t('删除')}}</a>
                <router-link :to="{path:'/withdraw/bankinfo',query: {account_id: item.id}}" class="edit-bank-info edit">{{$t('编辑')}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-container">
      <!-- <div class="payorder-button-container">
        <a class="button order-button w-button" @click="sureToWithDraw">下一步</a>
      </div> -->
      <p class="withdraw-notice-title">{{$t('提现相关提示')}}：</p>
      <ul class="withdraw-notice-ul">
        <li class="withdraw-notice-li">{{$t('提现绑定的银行卡')}}</li>
        <li class="withdraw-notice-li" v-html="$t('提现到非美国银行卡')"></li>
        <li class="withdraw-notice-li">{{$t('提现到美国华美银行')}}</li>
        <li class="withdraw-notice-li">{{$t('更优电汇手续费')}}</li>
      </ul>
    </div>

    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 single-btn"><a class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
      </div>
    </pop-box>

    <pop-box :show-tip="isDelete" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6"><a href="javascript:;" class="button-13 w-button" @click="closeDeleteAccount">{{$t('取消')}}</a></div>
        <div class="column-55 w-col w-col-6"><a href="javascript:;" class="button-14 w-button" @click="sureDeleteAccount">{{$t('确定')}}</a></div>
      </div>
    </pop-box>
    
  </div>
</template>

<script>
import {
  GET_USER_ACCOUNT_DEL_ACTION,
  GET_USER_ACCOUNT_LIST_ACTION
} from '@/scenes/mine/modules'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'banklist',
  data () { return {
    bankIndex: 0,
    bankList: [],
    showTip: false,
    tip: '',
    isDelete: false,
    deleteIndex: -1
  } },
  methods: {
    delBankInfo: function(idx) {
      const that = this;
      if(this.bankList.length<2) {
        const tip = this.$t('请至少保留一个账户')
        that.$options.methods.popTip.call(that, tip)
      } else {
        this.isDelete = true
        this.tip = this.$t('确定删除该账户')
        this.deleteIndex = Number(idx)
      }
    },
    sureDeleteAccount: function () {
      const that = this
      this.$store.dispatch(GET_USER_ACCOUNT_DEL_ACTION,{
        account_id: this.deleteIndex
      }).then((res)=>{
        that.$options.methods.closeDeleteAccount.call(that)
        if(res.success) {
          that.$options.methods.loadBankList.call(that)
        }
      })
    },
    closeDeleteAccount: function () {
      this.isDelete = false
      this.tip = ''
      this.deleteIndex = -1
    },
    popTip: function (tips) {
      if (tips) {
        this.showTip = true
        this.tip = tips
      }
    },
    closePopTip : function () {
      this.showTip = false
    },
    switchBankList: function(idx) {
      this.bankIndex = idx
    },
    loadBankList: function() {
      const that = this;
      this.$store.dispatch(GET_USER_ACCOUNT_LIST_ACTION)
      .then((res)=>{
        if(res.success) {
          const list = res.data
          const bankId = Number(that.$route.query.account_id)
          if(list.length < 1) { // 如果为空，跳转账户信息填写页
            router.replace({
              path: '/withdraw/bankinfo'
            })
          } else { // 如果不为空，默认选择第一张
            that.bankList = list
            let bool = true
            list.forEach(ele => {
              if(ele.id==bankId) {
                bool = false
              }
            });
            that.bankIndex = bool ? list[0].id : bankId ? bankId : list[0].id
          }
        }
      })
    },
    sureToWithDraw: function() {
      this.$router.push({
        path: '/withdraw/withdraw',
        query: {
          account_id: this.bankIndex
        }
      })
    }
  },
  created(){
    this.loadBankList()
  }
}
</script>

<style lang="scss" scoped>
.order-section {
  min-height: 100vh;
}
.bank-list-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 98%;
  height: 100%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
  &.active {
    box-shadow: 0 0 10px 0 #d5a478;
    position: relative;
    overflow: hidden;
    // border: 1px solid #d5a478;
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: -25px;
      left: -25px;
      width: 50px;
      height: 50px;
      transform: rotate(45deg);
      background: #d5a478;
    }
    &:before {
      content: '✓';
      display: block;
      position: absolute;
      z-index: 9;
      top: 0;
      left: 0;
      width: 23px;
      height: 23px;
      line-height: 23px;
      color: #fff;
      text-align: center;
      font-size: 16px;
    }
  }
}
.profile-card-item-left {
  border-right: 1px solid rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 25px;
  }
}
.detail-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
}
.bank-add-new {
  color: #d5a478;
  font-size: 13px;
  cursor: pointer;
}
.payorder-button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.withdraw-notice-title {
  color: #FF4623;
  font-weight: 500;
  margin-top: 50px;
}
.withdraw-notice-ul {
  list-style-type: decimal;
  color: #FF5000;
  padding-left: 15px;
}
.withdraw-notice-li {
  line-height: 22px;
  font-size: 13px;
  padding-bottom: 12px;
}
.profile-card-item-right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  .edit-bank-info {
    width: 100%;
    height: 50%;
    line-height: 40px;
    text-align: center;
    color: #d5a478;
    &.edit {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
@media (max-width: 479px) {
  .payorder-button-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    .button.order-button {
      border-radius: 0;
    }
  }
}
</style>
