<template>
	<div data-w-tab="Tab 2" class="tab-pane w-tab-pane w--tab-active">
    <div class="card-return-row highlight no-underline w-row">
      <div class="text-left mobile-right-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number large">${{Number.parseInt(houseDetail.current_property_value ? houseDetail.current_property_value : houseDetail.price).toLocaleString('en-US')}}</div>
        <div class="card-label text-center">{{$t('当前房价')}}</div>
      </div>
      <div class="text-center mobile-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number large">{{(houseDetail.appreciation_rate * 100).toFixed(2)}}%</div>
        <div class="card-label">{{$t('过去12个月房屋增长值')}}</div>
      </div>
      <div class="text-right mobile-left-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number large text-right">{{((houseDetail.leverage_profit_detail?houseDetail.leverage_profit_detail.no_leverage_appreciation_rate:houseDetail.appreciation_rate_one_year_forecast) * 100).toFixed(2)}}%</div>
        <div class="card-label text-right">{{$t('预计未来1年增值')}}</div>
      </div>
    </div>
    <div class="detail-chart-wrapper compare-bar" ref="line"></div>
    <div class="info-card-title">{{$t('租金分析')}}</div>
    <div class="detail-invest-compare-row w-row">
      <div class="w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number medium">
        	{{houseDetail.price_rent_ratio}} <span class="detail-invest-compare-score">{{houseDetail.price_rent_ratio_grading == 0 ? $t('低') : (houseDetail.price_rent_ratio == 1 ? $t('中') : $t('高'))}}</span>
        </div>
        <div class="card-label" v-tooltip.bottom.start="{ content: $t('GLOBAL.rentSaleRatio'), class: 'tooltip-custom tooltip-other-custom'}">{{$t('售租比')}}<img src="@/assets/images/info.png" width="12" height="12" class="image-50"></div>
      </div>
      <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number medium">${{Number.parseInt(houseDetail.rental_return_annual).toLocaleString('en-US')}}</div>
        <div class="card-label">{{$t('年长租收入')}}</div>
      </div>
      <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number medium">${{Number.parseInt(houseDetail.airbnb_return_annual).toLocaleString('en-US')}}</div>
        <div class="card-label text-center">{{$t('年短租收入')}}</div>
      </div>
    </div>
    <div class="detail-invest-compare-row w-row">
      <div class="w-col w-col-4 w-col-small-4 w-col-tiny-4"></div>
      <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number medium">${{Number.parseInt(houseDetail.rental_compare_neighborghood).toLocaleString('en-US')}}</div>
        <div class="card-label text-center">{{houseDetail.rental_return_annual>houseDetail.rental_compare_neighborghood?$t('高'):$t('低')}}{{$t('于本街区')}}</div>
      </div>
      <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number medium">${{Number.parseInt(houseDetail.airbnb_compare_neighborghood).toLocaleString('en-US')}}</div>
        <div class="card-label text-center">{{houseDetail.airbnb_return_annual>houseDetail.airbnb_compare_neighborghood?$t('高'):$t('低')}}{{$t('于本街区')}}</div>
      </div>
    </div>
    <div class="w-row">
      <div class="w-col w-col-4 w-col-small-4 w-col-tiny-4"></div>
      <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number medium">${{Number.parseInt(houseDetail.rental_compare_city).toLocaleString('en-US')}}</div>
        <div class="card-label text-center">{{houseDetail.rental_return_annual>houseDetail.rental_compare_city?$t('高'):$t('低')}}{{$t('于本城市')}}</div>
      </div>
      <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
        <div class="card-number medium">${{Number.parseInt(houseDetail.airbnb_compare_city).toLocaleString('en-US')}}</div>
        <div class="card-label text-center">{{houseDetail.airbnb_return_annual>houseDetail.airbnb_compare_city?$t('高'):$t('低')}}{{$t('于本城市')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require("echarts/lib/component/legendScroll")
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')

// 基于准备好的dom，初始化echarts实例

export default {
  name: 'PropertyCompareTab',
  props: {
    houseDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    cityDetail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    
  },
  mounted () {
    let houseData = this.houseDetail.price_trend.slice();
    let cityData = this.cityDetail.price_trend;
    var dateList = cityData.map(function (item) {
        return item.year;
    });
    var intialYear = houseData[0].year,intialMonth = houseData[0].month
    for (let i = 0; i < cityData.length; i++) {
      if(cityData[i].year < intialYear || (cityData[i].year == intialYear && cityData[i].month < intialMonth)) {
          houseData.unshift(
              {month: cityData[i].month, price: '', year: cityData[i].year}
            )
      }
    }

    let num = houseData.length
    var valueList = houseData.map(function (item,index) {
      if(item.current) {
      num = index
      } 
      if(index <= num) {
        return item.price
      } else {
        return '-'
      }
    });

    var valueListX = houseData.map(function (item,index) {
      if(item.current) {
      num = index
      } 
      if(index < num) {
        return '-'
      } else {
        return item.price
      }
    });

    let dot = cityData.length

    var valueList2 = cityData.map(function (item,index) {
        if(item.current) {
      dot = index
      } 
      if(index <= dot) {
        return item.price
      } else {
        return '-'
      }
    });

    var valueList2X = cityData.map(function (item,index) {
        if(item.current) {
      dot = index
      } 
      if(index < dot) {
        return '-'
      } else {
        return item.price
      }
    });

    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              const house = params[0].value!='-'?params[0]:params[1]
              const city = params[2].value!='-'?params[2]:params[3]
              const houseValue = '$'+Number.parseInt(house.value).toLocaleString('en-US')
              const cityValue = '$'+Number.parseInt(city.value).toLocaleString('en-US')
              return house['name']+'<br/>'+house.marker+houseValue+'<br/>'+city.marker+cityValue
            }
          },
        // Make gradient line here
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
        }],
        title: {
            text: this.$t('该房源与所在城市房价对比趋势图'),
            textStyle: {
              color: '#333',
              fontSize: 10
            },
            left: 0
        },
        legend: {
          data:[this.$t('该房源'),this.$t('本城市')],
          show: true,
          top: 0,
          right: 0,
          itemGap: 0,
          itemWidth: 10,
          itemHeight: 1,
          icon: 'rect',
          textStyle: {
            fontSize: 10
          },
        },
        grid: {
          top: 35,
          bottom: 20,
          left: 40,
          right: 15
        },
        xAxis: {
            data: dateList,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            max: 'dataMax'
        },
        yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: (value, index) => {
                return value / 1000 + 'k'
              }
            },
            nameGap: 10,
            min: 'dataMin'
        },
        series: [{
            name:this.$t('该房源'),
            type: 'line',
            showSymbol: false,
            data: valueList,
            itemStyle:{
                  normal:{
                      lineStyle:{
                        color: '#FF5A5F'
                      }
                  }
              }
        },
        {
            name:this.$t('该房源'),
            type: 'line',
            showSymbol: false,
            data: valueListX,
            itemStyle:{
                  normal:{
                      lineStyle:{
                          color: '#FF5A5F',
                          type:'dotted'  //'dotted'虚线 'solid'实线
                      }
                  }
              }, 
        },
        {
            name:this.$t('本城市'),
            type: 'line',
            showSymbol: false,
            data: valueList2,
            itemStyle:{
                  normal:{
                      lineStyle:{
                        color:"#00BE4B"
                      }
                  }
              }
        },
        {
            name:this.$t('本城市'),
            type: 'line',
            showSymbol: false,
            data: valueList2X,
            itemStyle:{
                  normal:{
                      lineStyle:{
                          color:"#00BE4B",
                          type:'dotted'  //'dotted'虚线 'solid'实线
                      }
                  }
              }, 
        },]
    };  

    const myChart = echarts.init(this.$refs.line)
    window.onresize = () => {
      myChart.resize()
    }
    myChart.setOption(option)  
  }
}
</script>

<style lang="scss" scoped>
.detail-chart-wrapper.compare-bar {
  width: 100%;
  height: 220px;
}
.image-50 {
  margin-top: -2px;
}
</style>
