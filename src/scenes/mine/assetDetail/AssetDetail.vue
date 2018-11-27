<template>
<div class="mine-section">
    <div class="w-container">
      <h4 class="heading-59">{{$t('资产价值')}}</h4>
    </div>
    <div class="w-container" v-if="$route.query.id">
      <div class="asset-3 extra _3">
        <div class="div-block-105">
          <div class="row-64 w-row flex">
            <div class="column-97 width-auto">
              <h5><strong>{{asset.project_title}}</strong></h5>
            </div>
            <a @click="openReport('operation')" class="column-list-wrapper to-detail" v-if="operationReport"> {{$t('查看财报')}} ></a>
            <div class="column-list-wrapper to-detail" v-else></div>
          </div>
        </div>
        <div class="div-block-97">
          <div class="row-50 w-row">
            <div class="w-col w-col-4">
              <h6 class="heading-47">{{$t('持股比例')}}</h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">{{toThousandPrt(asset.share_percent)}}% ({{toThousandFix(asset.share_num/GLOBAL.tenThou, 0)}}{{$t('万股')}})</h6>
            </div>
          </div>
          <div class="row-50 w-row">
            <div class="w-col w-col-4">
              <h6 class="heading-47">{{$t('累计分红')}}</h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">${{toThousandFix(asset.accumulated_income)}}</h6>
            </div>
          </div>
          <div class="row-50 w-row">
            <div class="w-col w-col-4">
              <h6 class="heading-47">{{$t('股份价值')}}</h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">${{toThousandFix(asset.current_value)}}</h6>
            </div>
          </div>
          <div class="row-50 w-row">
            <div class="w-col w-col-4">
              <h6 class="heading-47">{{$t('购入时间')}}</h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">{{asset.be_owner_time_str}}</h6>
            </div>
          </div>
          <div class="row-50 w-row">
            <div class="w-col w-col-4">
              <h6 class="heading-47">{{$t('锁定期结束')}}</h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">{{asset.end_time_str}}</h6>
            </div>
          </div>
          <div class="row-50 w-row">
            <div class="w-col w-col-4">
              <h6 class="heading-47" v-tooltip.bottom.start="{ content: emerTip, class: 'tooltip-custom tooltip-other-custom'}">{{$t('储备金')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">${{asset.reserve_value}}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-container">
      <div class="asset-3 extra _3">
       <div class="div-block-105">
          <div class="row-64 w-row flex">
            <div class="column-97 width-auto">
              <h5><strong>{{$t('项目估值明细')}} </strong></h5>
            </div>
            <a @click="openReport('estimate')" class="column-list-wrapper to-detail" v-if="estimateReport">
              {{$t('查看估值')}} >
            </a>
            <div class="column-list-wrapper to-detail" v-else></div>
          </div>
        </div>
        <div class="div-block-97">
          <!-- <div class="row-53 w-row">
            <div class="w-col w-col-6">
              <h6 class="heading-45" @click="popTip(valueTip)">本月估值<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></h6>
            </div>
            <div class="w-col w-col-6">
              <h6 class="heading-46">${{toThousandFix(assetDetail.share_value)}}</h6>
            </div>
          </div> -->
          <!-- <div class="row-50 w-row">
            <div class="w-col w-col-4">
              <h6 class="heading-47"><span v-if="assetDetail.loan_value">(</span>最新估值<span v-if="assetDetail.loan_value">-贷款金额)</span>*认购份额</h6>
              <h6 class="heading-47"><span v-if="assetDetail.loan_value">(</span>${{toThousandFix(assetDetail.project_value)}}<span v-if="assetDetail.loan_value">- ${{toThousandFix(assetDetail.loan_value)}})</span>*{{toThousandPrt(assetDetail.share_percent)}}%</h6>
            </div>
            <div class="w-col w-col-8 w-8"></div>
          </div> -->
          <div class="row-50 w-row" v-if="assetDetail.property_value">
            <div class="w-col w-col-4">
              <h6 class="heading-47">{{$t('项目最新估值')}}<span class="list-element-small" v-if="assetDetail.property_mom">({{$t('环比')}}{{assetDetail.prepaid_expenses>0?'+':''}}{{toThousandFix(assetDetail.property_mom)}}%)</span></h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">${{toThousandFix(assetDetail.current_value)}}</h6>
            </div>
          </div>
          <div class="row-50 w-row" v-if="assetDetail.prepaid_expenses">
            <div class="w-col w-col-4">
              <h6 class="heading-47">{{assetDetail.prepaid_expenses_title}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom.start="{ content: assetDetail.prepaid_expenses_tip, class: 'tooltip-custom tooltip-other-custom'}"></h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">${{toThousandFix(assetDetail.prepaid_expenses)}}</h6>
            </div>
          </div>
          <div class="row-50 w-row" v-if="assetDetail.reserve_value">
            <div class="w-col w-col-4">
              <h6 class="heading-47">{{assetDetail.reserve_value_title}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50" v-tooltip.bottom.start="{ content: assetDetail.reserve_value_tip, class: 'tooltip-custom tooltip-other-custom'}"></h6>
            </div>
            <div class="w-col w-col-8">
              <h6 class="heading-49">${{toThousandFix(assetDetail.reserve_value)}}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-container" v-show="!$route.query.project_id">
      <div class="asset-3 extra _3">
       <div class="div-block-105">
          <div class="row-64 w-row flex">
            <div class="column-97 chart-title">
              <h5><strong>{{$t('项目估值趋势')}}</strong></h5>
            </div>
            <ul class="column-list-wrapper">
              <!-- <li class="column-list-item active">近一年</li>
              <i></i>
              <li class="column-list-item">近一年</li>
              <i></i>
              <li class="column-list-item">近一年</li>
              <i></i>
              <li class="column-list-item">近一年</li> -->
            </ul>
          </div>
        </div>
        <div class="div-block-97 chart" ref="line"><span v-if="projectHistory.length==0">{{$t('暂无估值')}}</span></div>
      </div>
    </div>
    <div class="w-container" v-show="!$route.query.project_id">
      <div class="asset-3 extra _3">
       <div class="div-block-105">
          <div class="row-64 w-row flex-start">
            <div class="column-97">
              <h5><strong>{{$t('历史分红金额')}}</strong><span class="light-text">（{{$t('点击该月趋势图查看详情')}}）</span></h5>
            </div>
          </div>
        </div>
        <div class="div-block-97 chart bar" ref="bar"><span v-if="rentList.length==0">{{$t('暂无分红')}}</span></div>
      </div>
    </div>
    <div class="w-container" v-if="orderFile">
      <div class="wire-preview-container">
        <div class="wire-transfer-title _2">{{$t('项目协议及证书')}}</div>
        <div class="row-24 w-row preview-file-wrapper">
          <div class="w-col w-col-6">
            <div class="div-block-33">
              <preview-image :src="orderFile.certificate">
                <img :src="orderFile.certificate" width="209" sizes="(max-width: 479px) 100vw, 209px">
              </preview-image>
            </div>
          </div>
          <div class="column-34 w-col w-col-6" v-if="orderFile.file.length > 0">
            <a :href="item.url" @click="downloadFile(item.url)" target="_blank" class="button-12 _1 w-button" v-for="(item, index) in orderFile.file" :key="item.url+index">{{item.title}}</a>
          </div>
        </div>
      </div>
    </div>

     <transition-box :show="showReportList">
        <div class="assetdetail-report-wrapper" v-show="showReportList">
          <div class="report-list-close" @click="closeReportList"></div>
          <p class="report-list-title">{{asset.project_title}}</p>
          <div class="assetdetail-list">
            <a @click="reportHref(item[reportType+'_report'])" class="property-2-flex-detail-wrapper" :class="{'first': index==0}" v-for="(item, index) in reportList" :key="item.estimate_report+item.operation_report+index">
              <div>{{item[reportType+'_name']}}</div>
              <img src="@/assets/images/Chevron.png" width="36" class="image-20">
            </a>
          </div>
        </div>
      </transition-box>
  </div>
</template>

<script>
import {
  GET_USER_PROJECT_VALUE_ACTION,
  GET_USER_PROJECT_ASSET_ACTION,
  GET_USER_SHARE_ACTION,
  GET_USER_PROJECT_HISTORY_ACTION,
  GET_USER_PROJECT_RENTS_ACTION,
  GET_USER_ORDER_FILES_ACTION
} from '@/scenes/mine/modules'
import {formatHouseDate,formatMYDate,formatValidDate,toThousandFix,toThousandPrt} from '@/utils/utils'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'
var echarts = require('echarts/lib/echarts')
  // 引入柱状图
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/bar')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legendScroll')
  require('echarts/lib/component/title')
  require("echarts/lib/component/dataZoom")

export default {
  name: 'assetDetail',
  data () { return {
    assetDetail: {},
    asset: {},
    tip:'',
    showTip: false,
    valueTip: this.$t('根据同一街区'),
    emerTip: this.$t('高增值类型房产需按比例'),
    projectHistory: [],
    rentList: [],
    operationReport: '',
    estimateReport: '',
    clickReport: '',

    orderFile: null,
    showReportList: false,
    reportList: [],
    url: '',
    reportType: 'operation'
  } },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt,
    formatValidDate: formatValidDate,
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'assetdetail-close-report-list-pop',
        action: 'click',
        optLabel: 'pop',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    closeReportList: function () {
      this.showReportList = false
    },
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'assetdetail-operationReport-href',
        action: 'click',
        optLabel: 'href',
        page: this.$route.name,
        optValue: {
        }
      })
    }))
    reportHref(href) {
      location.href = href
    },
    openReport: function (type) {
      this.reportType = type
      this.showReportList = true
    },
    loadShareDetail: function () {
      const shareId = this.$route.query.id
      const projectId = this.$route.query.project_id
      var that = this
      if(shareId) {
        this.$store.dispatch(GET_USER_PROJECT_VALUE_ACTION,{
          share_id: shareId
        }).then((data)=>{
          that.assetDetail = data
        })
      } else if(projectId) {
        this.$store.dispatch(GET_USER_PROJECT_ASSET_ACTION,{
          project_id: projectId
        }).then((data)=>{
          that.assetDetail = data
        })
      }
    },
    loadShareProperty: function () {
      var that = this
      this.$store.dispatch(GET_USER_SHARE_ACTION)
      .then((data)=>{
        const asset = data.shares.filter((item)=>{
          return item.id == that.$route.query.id
        })[0]
        asset.be_owner_time_str = formatHouseDate(asset.be_owner_time)
        asset.end_time_str = formatHouseDate(asset.end_time)
        that.asset = asset
      })
    },
    getProjectHistory: function () {
      const that = this
      this.$store.dispatch(GET_USER_PROJECT_HISTORY_ACTION,{
        share_id: this.$route.query.id
      }).then((response)=>{
        const res = response.data
        that.projectHistory = res
        that.operationReport = res[res.length - 1]['operation_report']
        that.estimateReport = res[res.length - 1]['estimate_report']
        res.length>0 && that.$options.methods.drawLine.call(that, res)
        that.reportList = res.filter((item) => {
          return item.estimate_report && item.operation_report
        })
      })
    },
    getRentList: function () {
      const that = this
      this.$store.dispatch(GET_USER_PROJECT_RENTS_ACTION,{
        share_id: this.$route.query.id
      }).then((res)=>{
        that.rentList = res.data
        res.data.length>0 && that.$options.methods.drawBar.call(that, res.data)
      })
    },
    drawLine: function (res) {
      const that = this
      const line = echarts.init(this.$refs.line)
      const timeArr = res.map((item)=>{
        return formatMYDate(item.created_at)
      })
      const valueArr = res.map((item)=>{
        return item.current_value
      })
      const option = {
          tooltip : {
            trigger: 'axis',
            formatter: function (params) {
              const o = params[0]
              const t = o.name
              const val = o.value
              return that.$t('时间')+ t + '<br/>' +that.$t('估值')+'：$'+ toThousandFix(val, 0)
            }
          },
          legend: {
            right: 10,
            itemWidth: 12,
            data: [{
              name: this.$t('项目估值'),
              icon: 'line'
            }],
            textStyle: {
              fontSize: 10
            },
          },
          grid: {
              left: '3%',
              right: '3%',
              bottom: '2%',
              top: 25,
              containLabel: true
          },
          xAxis: {
              type: 'category',
              data: timeArr,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#f2f2f2'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                color: '#707070',
                fontSize: 8
              }
          },
          yAxis: {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#707070',
                fontSize: 8,
                formatter: function(val, index) {
                  return '$'+toThousandFix(val/1000, 0)+'K'
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#f2f2f2'
                }
              },
          },
          series: [{
              data: valueArr,
              type: 'line',
              name: this.$t('项目估值'),
              symbol: 'none',
              lineStyle: {
                color: '#D5A478',
                width: 1
              }
          }]
      };
      line.setOption(option)
      window.addEventListener('resize', () => {
        line.resize()
      })
    },
    drawBar: function (res) {
      const that = this
      const bar = echarts.init(this.$refs.bar)
      const timeArr = res.map((item)=>{
        return formatHouseDate(item.created_at)
      })
      const valueArr = res.map((item)=>{
        return item.amount
      })
      const option = {
          grid: {
              left: '3%',
              right: '3%',
              bottom: '15%',
              top: 25,
              containLabel: true
          },
          tooltip : {
            trigger: 'axis',
            formatter: function (params) {
              const o = params[0]
              const t = o.name
              const val = o.value
              return that.$t('时间')+ t + '<br/>' +that.$t('估值')+'：$'+ toThousandFix(val, 2)
            }
          },
          dataZoom: [
            {
              show: true,
              startValue: 0,
              endValue: 6
            },
            {
              type: 'inside',
              show: true,
              startValue: 0,
              endValue: 6
            }
          ],
          xAxis: [{
              type: 'category',
              data: timeArr,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#f2f2f2'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                color: '#707070',
                fontSize: 8
              }
          }],
          yAxis: [{
              type: 'value',
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#707070',
                fontSize: 8,
                formatter: function(val, index) {
                  return '$'+toThousandFix(val, 2)
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#f2f2f2'
                }
              }
          }],
          series: [{
              data: valueArr,
              type: 'bar',
              barCategoryGap: '40%',
              barMaxWidth: '25%',
              itemStyle: {
                color: '#D5A478'
              },
              label: {
                show: true,
                position: 'top',
                fontSize: 10,
                color: '#6A6F73',
                formatter: function(params) {
                  return '$'+toThousandFix(params.value, 2)
                }
              }
          }]
      };
      bar.setOption(option)
      window.addEventListener('resize', () => {
        bar.resize()
      })
    },

    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "assetdetail-preview-download",
          action: "click",
          optLabel: "download",
          page: this.$route.name,
          optValue: {
            url: this.url
          }
        });
      })
    )
    downloadFile: function (url) {
      this.url = url
    },
    getOrderFile: function (orderId) {
      var that = this
      this.$store.dispatch(GET_USER_ORDER_FILES_ACTION,{
        order_id: orderId
      }).then((result)=>{
        that.orderFile = result
      })
    }
  },
  mounted: function () {
    this.loadShareDetail()
    if(!this.$route.query.project_id>0) {
      this.getProjectHistory()
      this.getRentList()
    }
    if(this.$route.query.id>0) {
      this.loadShareProperty()
    }
    if(this.$route.query.order_id>0) {
      this.getOrderFile(this.$route.query.order_id)
    }
  }
}
</script>

<style lang="scss" scoped>
.w-container .w-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.flex-start {
    justify-content: flex-start;
  }
}
.list-element-small {
  transform: scale(0.9)
}
.mine-section {
  min-height: 100vh;
}
.column-97.chart-title {
  width: 165px;
  padding-right: 0;
}
.column-97.width-auto {
  width: auto;
  min-width: 210px;
  padding-right: 0;
  strong {
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.column-97 .light-text {
  color: #9B9B9B;
  font-size: 12px;
  font-weight: normal;
}
.div-block-97.chart {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.div-block-97.chart.bar {
  height: 250px;
}
.row-64.w-row.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.column-list-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  padding-right: 10px;
  &.to-detail {
    color: #D5A478;
    font-size: 12px;
    padding-right: 30px;
    cursor: pointer;
  }
  i {
    display: block;
    width: 1px;
    height: 16px;
    margin: 0 0px;
    background-color: #E9E9E9;
  }
}
.column-list-item {
  box-sizing: border-box;
  height: 24px;
  border-radius: 12px;
  line-height: 24px;
  padding: 0 8px;
  background: #E9E9E9;
  transform: scale(0.8);
  color: #333333;
  cursor: pointer;
}
.column-list-item.active {
  background: #D5A478;
  color: #fff;
}
.wire-preview-container {
  background: #fff;
  .wire-transfer-title._2 {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    padding: 20px;
  }
  .w-col.w-col-6 {
    width: 45%;
  }
}
.button-12._1 {
  width: 60%;
}
@media (max-width: 479px) {
  .column-list-wrapper.to-detail {
    padding-right: 10px;
  }
  .w-col.w-col-8.w-8 {
    width: 0;
  }
  .preview-file-wrapper {
    flex-direction: column;
  }
  .wire-preview-container {
    .w-col.w-col-6 {
      width: 100%;
    }
  }
  .column-34 {
    margin-bottom: 30px;
  }
}
</style>
