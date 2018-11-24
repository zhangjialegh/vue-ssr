<template>
  <div class="wire-transfer-section">
    <div class="w-container">
      <h4 class="heading-59">{{$t('资产列表')}}</h4>
    </div>
    <div class="w-container">
      <div class="asset-3 extra _3" v-for="item in shareList" :key="item.id" v-if="shareList.length > 0">
        <div class="row-63 w-row">
          <div class="w-col w-col-3">
            <h6 class="top-3-title _1">{{$t('项目名称')}}</h6>
          </div>
          <div class="w-col w-col-3">
            <h6 class="top-3-title _1">{{$t('持股比例')}}</h6>
          </div>
          <div class="w-col w-col-2">
            <h6 class="top-3-title _1">{{$t('累计分红')}}</h6>
          </div>
          <div class="w-col w-col-2">
            <h6 class="top-3-title _1">{{$t('股份价值')}}</h6>
          </div>
          <div class="w-col w-col-2"></div>
        </div>
        <div class="row-43 w-row">
          <div class="column-83 w-col w-col-3">
            <h6 class="heading-38"><strong class="bold-text-4">{{item.project_title}}</strong></h6>
          </div>
          <div class="w-col w-col-3">
            <div class="row-42 phone w-row">
              <div class="w-col w-col-6">
                <h6 class="heading-39">{{$t('持股比例')}}</h6>
              </div>
              <div class="column-76 w-col w-col-6">
                <h6 class="heading-40"><strong>{{toThousandPrt(item.share_percent)}}% ({{toThousandFix(item.share_num/GLOBAL.tenThou/GLOBAL.minShares)}}{{$t('手')}})</strong></h6>
              </div>
            </div>
            <h6 class="heading-37 web">{{toThousandPrt(item.share_percent)}}% ({{toThousandFix(item.share_num/GLOBAL.tenThou, 0)}}{{$t('万股')}})</h6>
          </div>
          <div class="w-col w-col-2">
            <div class="row-42 phone w-row">
              <div class="w-col w-col-6">
                <h6 class="heading-39">{{$t('累计分红')}}</h6>
              </div>
              <div class="column-76 w-col w-col-6">
                <h6 class="heading-40"><strong>${{toThousandFix(item.accumulated_income)}}</strong></h6>
              </div>
            </div>
            <h6 class="heading-37 web">${{toThousandFix(item.accumulated_income)}}</h6>
          </div>
          <div class="w-col w-col-2">
            <div class="row-42 phone w-row">
              <div class="w-col w-col-6">
                <h6 class="heading-39">{{$t('股权价值')}}</h6>
              </div>
              <div class="column-76 w-col w-col-6">
                <h6 class="heading-40"><strong>${{toThousandFix(item.current_value)}}</strong></h6>
              </div>
            </div>
            <h6 class="heading-37 web"><strong><em class="italic-text-2">${{toThousandFix(item.current_value)}}</em></strong></h6>
          </div>
          <div class="w-col w-col-2" v-if="item.id">
            <h6 class="heading-54 hover-pointer" @click="navigatoDetail(item.id, item.order_id)">{{$t('查看详情')}}</h6>
          </div>
        </div>
      </div>

      <div class="asset-3 extra _3" v-if="shareList.length == 0">
        <div class="w-row padding-bottom">{{$t('暂无详情')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatHouseDate,toThousandFix,toThousandPrt} from '@/utils/utils'
import {GET_USER_SHARE_ACTION} from '@/scenes/mine/modules'
export default {
  name: 'sharelist',
  data () { return {
    shareList: []
  } },
  methods: {
    toThousandFix:toThousandFix,
    toThousandPrt:toThousandPrt,
    loadShareProperty: function () {
      var that = this
      this.$store.dispatch(GET_USER_SHARE_ACTION)
      .then((data)=>{
        data.shares.forEach((item)=>{
          item.be_owner_time_str = formatHouseDate(item.be_owner_time)
          item.end_time_str = formatHouseDate(item.end_time)
        })
        that.shareList = data.shares
      })
    },
    navigatoDetail: function (id, orderId) {
      this.$router.push({
        path:'assetDetail',
        query: {
          id: id,
          order_id: orderId?orderId:0
        }
      })
    },
  },
  created () {
    this.loadShareProperty()
  }
}
</script>

<style lang="scss" scoped>
.w-row.padding-bottom {
  padding-bottom: 10px;
  padding-left: 20px;
}
.hover-pointer {
  cursor: pointer;
}
.heading-38 {
  text-align: center;
}
.heading-37 {
  text-align: center;
}
@media (max-width: 767px) {
  .w-col-3 {
    width: 25%
  }
  .w-col-2 {
    width: 16.66666667%;
  }
}
@media (max-width: 479px) {
  .row-63.w-row {
    display: none;
  }
  .w-col-3 {
    width: 100%;
  }
  .w-col-2 {
    width: 100%;
  }
  .heading-37.web {
    margin-top: 0px;
    text-align: left;
  }
  .heading-37.web.asset {
    text-align: center;
  }
  .wire-transfer-section {
    min-height: 100vh;
  }
  .heading-38 {
    text-align: left;
  }
}
</style>