<template>
  <div class="w-container">
    <div class="paper">
      <p style="font-size:16px;margin-top:20px;">{{$t('存入资金')}}</p>
      <p class="input-group">
        <label for="">$</label>
        <input v-model="amount" type="number" min="100" max="99999" :placeholder="$t('请输入金额')"/>
        <div class="error" v-if="showErrorTip">{{errorTip}}</div>
      </p>
      <p>
        <button type="button" class="w-button button card-button" @click="submitOrder()">{{$t("下一步")}}</button>
      </p>
    </div>
    <LoadingToast :show="showLoading" :text="loadingText"/>
  </div>
</template>

<script>
import {CREATE_DEPOAIT_ORDER_ACTION} from '@/scenes/mine/modules'
export default {
  name:'deposit',
  data(){
    return {
      amount:null,
      showLoading:false,
      loadingText:"",
      showErrorTip:false,
      errorTip:'',
    }
  },
  watch:{
    amount:function(){
      this.showErrorTip=false
    },
  },
  methods:{
    submitOrder:function(){
      let that = this
      let amount = this.amount
      if (isNaN(parseInt(amount))){
        this.errorTip = this.$t('请输入正确的数字')
        this.showErrorTip=true
        return;
      }
      amount = parseInt(amount)
      if(amount<1000){
        this.errorTip = this.$t('金额不能低于1000美金')
        this.showErrorTip=true
        return;
      }
      
      let data = {
        amount: amount,
        order_source: this.isWeixin ? 2 : 1
      }
      that.showLoading = true
      this.$store.dispatch(CREATE_DEPOAIT_ORDER_ACTION,data)
      .then((result)=>{
        if(result.success){
          that.$router.push({
            path: '/pay',
            query: {
              order_id: result.order_id
            }
          })
        } else{
          that.errorTip = result.message;
          that.showErrorTip = true
        }
        that.showLoading=false
      }).catch((error)=>{
        that.errorTip = that.$t('提交或联系客服');
        that.showErrorTip = true
        that.showLoading=false
      })
    }
  },
  computed:{
    isWeixin() {
      return this.$store.state.base.isWeixin
    }
  },
}
</script>

<style lang="scss" scoped>
.paper{
  padding:15px;
  margin-bottom: 10px;
  background: #fff;
  box-shadow: 1px 1px 5px #ddd;
}
.error{
  color: #ff0000;
}
.input-group {
  position: relative;
  display: table;
  width: 100%;
  height: 42px;
  padding: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 1.428571429;
  color: #333333;
  vertical-align: middle;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  label{
    display: table-cell;
    border: none;
    padding-left: 16px;
    width: 24px;
    font-size: 18px;
  }
  input {
    display: table-cell;
    height: 42px;
    border: none;
    padding-left: 10px;
    width: 100%;
    font-size: 18px;
    &:focus {
      outline: 0;
    }
  }
  &:focus {
    border-color: #3898ec;
    outline: 0;
  }
}
.card-button{
  margin-top: 30px;
}
@media (max-width: 479px){

  .button.card-button{
      width: 100%;
      padding: 12px 0;
  }
  
}
</style>
