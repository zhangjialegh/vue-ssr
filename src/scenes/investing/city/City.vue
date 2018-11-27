<template>
  <div>
    <div class="city-hero-section" v-lazy:background-image="cityDetail.detail_pic_uri">
      <div class="city-hero-container w-container">
        <div class="city-hero-title-wrapper">
          <h1 class="city-hero-title">{{cityDetail.display_name}}</h1>
          <img src="@/assets/images/city-hero-title-top.png" sizes="(max-width: 479px) 92vw, (max-width: 767px) 93vw, (max-width: 991px) 728px, 940px" class="city-hero-deco-top">
          <img src="@/assets/images/city-hero-title-bottom.png" sizes="(max-width: 479px) 92vw, (max-width: 767px) 93vw, (max-width: 991px) 728px, 940px" class="city-hero-deco-bottom">
        </div>
      </div>
    </div>
    <div class="city-intro-section">
      <div class="w-container">
        <div class="city-intro-card">
          <h3 class="city-intro-title">{{$t('投资概况')}}</h3>
          <p class="city-intro-paragraph">
            {{cityDetail.description}}
          </p>
          <div class="city-intro-row w-row">
            <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <div class="city-intro-number-wrapper">
                <div class="card-number large">${{Number.parseInt(cityDetail.average_purchase_price).toLocaleString('en-US')}}</div>
                <div class="card-label">{{$t('平均购入价格')}}</div>
              </div>
            </div>
            <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <div class="city-intro-number-wrapper">
                <div class="card-number large">{{(cityDetail.average_return_rate * 100).toFixed(2)}}%</div>
                <div class="card-label">{{$t('平均综合收益率')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="city-price-section">
      <div class="w-container">
        <div class="info-card large-margin">
          <div class="detail-title no-margin-top">{{$t('价格分析')}}</div>
          <div class="city-price-row w-row">
            <div class="city-price-column w-col w-col-6 w-col-stack w-col-tiny-tiny-stack">
              <div class="inline-block">
                <div class="card-number large">${{Number.parseInt(cityDetail.average_listing_price).toLocaleString('en-US')}}</div>
                <div class="card-label">{{$t('挂牌中间价')}}</div>
              </div>
              <div class="city-price-arrow-wrapper">
                <div class="card-number large text-red">{{cityDetail.listing_purchase_diff_rate > 0 ? '+' : '-'}}{{cityDetail.listing_purchase_diff_rate > 0 ? (cityDetail.listing_purchase_diff_rate).toFixed(2) : (cityDetail.listing_purchase_diff_rate * -1).toFixed(2)}}%</div><img src="@/assets/images/city-price-arrow.png" class="image"></div>
              <div class="inline-block">
                <div class="card-number large">${{Number.parseInt(cityDetail.average_purchase_price).toLocaleString('en-US')}}</div>
                <div class="card-label">{{$t('成交中间价')}}</div>
              </div>
            </div>
            <div class="w-col w-col-6 w-col-stack w-col-tiny-tiny-stack">
              <div class="w-row">
                <div class="city-price-column w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="inline-block">
                    <div class="card-number large">${{Number.parseInt(cityDetail.average_house_price).toLocaleString('en-US')}}</div>
                    <div class="card-label">{{$t('别墅中间价')}}</div>
                  </div>
                </div>
                <div class="city-price-column last w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="inline-block">
                    <div class="card-number large">${{Number.parseInt(cityDetail.average_condo_price).toLocaleString('en-US')}}</div>
                    <div class="card-label">{{$t('公寓中间价')}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-title-row w-row">
            <div class="w-col w-col-4">
              <div class="info-card-title">{{$t('价格历史趋势')}}</div>
            </div>
            <div class="w-clearfix w-col w-col-8">
              <div class="chart-label" v-on:click="changeCities('line')">{{$t('换一组城市')}}</div>
              <div class="chart-label"></div>
            </div>
          </div>
          <!-- <img src="@/assets/images/city-detail-chart-1.png" sizes="(max-width: 479px) 87vw, (max-width: 767px) 84vw, (max-width: 991px) 646px, 798px"> -->
          <div class="detail-chart-wrapper compare-bar" id="compareLine"></div>
          </div>
      </div>
    </div>
    <div class="city-return-section">
      <div class="w-container">
        <div class="info-card large-margin">
          <div class="detail-title no-margin-top">{{$t('回报分析')}}</div>
          <div class="city-price-row w-row">
            <div class="w-col w-col-6">
              <div class="w-row">
                <div class="city-price-column w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="inline-block">
                    <div class="card-number large">{{((cityDetail.average_appreciation_rate + cityDetail.average_rental_return_rate)*100).toFixed(2)}}%</div>
                    <div class="card-label">{{$t('一年期税前净回报率')}}</div>
                  </div>
                </div>
                <div class="city-price-column w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="inline-block">
                    <div class="card-number large">{{(1/(cityDetail.average_appreciation_rate + cityDetail.average_rental_return_rate)).toFixed(2)}}{{$t('年')}}</div>
                    <div class="card-label">{{$t('平均收回投资时间')}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="city-return-progress-column w-col w-col-6">
              <div class="w-row">
                <div class="w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="city-return-plus-wrapper">{{$t('增值')}} <span class="card-number large">{{(cityDetail.average_appreciation_rate * 100).toFixed(2)}}%</span></div>
                  <div class="detail-invest-overview-operator">+</div>
                </div>
                <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div>{{$t('长租租金')}} <span class="card-number large">{{(cityDetail.average_rental_return_rate * 100).toFixed(2)}}%</span></div>
                </div>
              </div>
              <div class="card-progress-bar-base large detail">
                <div class="card-progress-bar-done large" v-bind:style="{width:(cityDetail.average_appreciation_rate/(cityDetail.average_appreciation_rate+cityDetail.average_rental_return_rate)*100) + '%'}"></div>
              </div>
            </div>
          </div>
          <div class="chart-title-row w-row">
            <div class="w-col w-col-4 w-col-small-4">
              <div class="info-card-title">{{$t('对比过去1年回报率')}}</div>
            </div>
            <div class="w-clearfix w-col w-col-8 w-col-small-8">
              <div class="chart-label" v-on:click="changeCities('bar')">{{$t('换一组城市')}}</div>
              <div class="chart-label"></div>
              <div class="chart-label"></div>
            </div>
          </div>
          <div class="detail-chart-wrapper compare-bar" id="compareBar"></div>
          <div class="city-rent-table">
            <div class="city-rent-row w-row">
              <div class="w-col w-col-2 w-col-small-2 w-col-tiny-2">
                <div class="card-label">{{$t('形式')}}</div>
              </div>
              <div class="text-right w-col w-col-10 w-col-small-10 w-col-tiny-10">
                <div class="w-row">
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-label">{{$t('在租房源')}}</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-label">{{$t('入住率')}}</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-label">{{$t('平均租金')}}</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-label">{{$t('收益率')}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="city-rent-row w-row">
              <div class="w-col w-col-2 w-col-small-2 w-col-tiny-2 center">
                <div style="whiteSpace: nowrap">{{$t('长租')}}</div>
              </div>
              <div class="text-right w-col w-col-10 w-col-small-10 w-col-tiny-10">
                <div class="w-row">
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3 text-center">
                    <div class="card-number center">{{cityDetail.rental_property_count}}</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-number center">{{(cityDetail.rental_occupancy_rate * 100).toFixed(2)}}%</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-number center">${{Number.parseInt(cityDetail.rental_median_price).toLocaleString('en-US')}}</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-number center">{{(cityDetail.average_rental_return_rate * 100).toFixed(2)}}%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="city-rent-row w-row">
              <div class="w-col w-col-2 w-col-small-2 w-col-tiny-2 center">
                <div style="whiteSpace: nowrap">{{$t('短租')}}</div>
              </div>
              <div class="text-right w-col w-col-10 w-col-small-10 w-col-tiny-10">
                <div class="w-row">
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-number center">{{cityDetail.airbnb_property_count}}</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-number center">{{(cityDetail.airbnb_occupancy_rate * 100).toFixed(2)}}%</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-number center">${{Number.parseInt(cityDetail.airbnb_median_rate).toLocaleString('en-US')}}</div>
                  </div>
                  <div class="w-col w-col-3 w-col-small-3 w-col-tiny-3">
                    <div class="card-number center">{{(cityDetail.airbnb_return_rate * 100).toFixed(2)}}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <property-list :category="category"/> -->
  </div>
</template>

<script>
import {
  GET_CITY_DETAIL_ACTION,
  GET_CITY_COMPARE_ACTION,
  GET_PROPERTY_BY_TYPE_ACTION
} from '../modules.js'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/title')

export default {
  name: 'city',
  data () {
    return {
      cityDetail: {},
      source: '',
      category: {}
    }
  },
  methods: {
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'change-group-city-button',
        action: 'click',
        optLabel: 'button',
        page: this.$route.name,
        optValue: {
          cityId: this.cityDetail.id,
          source: this.source
        }
      })
    }))
    changeCities: function (source) {
      this.source = source
      this.$options.methods.loadCompareCities.bind(this)(this.cityDetail.id)
    },
    getcityDetail: function (id) {
      const that = this
      this.$store.dispatch(GET_CITY_DETAIL_ACTION,{
        id: id,
        web: 1
      }).then((res)=>{
        res['listing_purchase_diff_rate'] =
              Number.parseInt(
                (res.average_purchase_price / res.average_listing_price -
                  1) *
                  10000
              ) / 100.0
            that.cityDetail = res
      })
    },
    loadCompareCities: function (id) {
      const that = this
      this.$store.dispatch(GET_CITY_COMPARE_ACTION,{
        id: id,
        showCurrent: 0,
        num: 5
      }).then((res)=>{
        that.$options.methods.drawBarChart.bind(that)(res)
        that.$options.methods.drawLineChart.bind(that)(res)
      })
    },
    loadPropertySuggest: function (id) {
      const that = this
      this.$store.dispatch(GET_PROPERTY_BY_TYPE_ACTION,{
        id,
        status: 1,
        type: 1
      }).then((res)=>{
        that.category = {
          name: '',
          list: res
        }

        console.log({
          name: '',
          list: res
        },'category');
        
      })
    },
    drawBarChart: function (compareCities) {
      const that = this
      let myChart = echarts.init(document.getElementById('compareBar'))
      const xArr1 = compareCities.slice(0, 5).map((item, index) => {
        if (index < 4) {
          return item.display_name
        } else {
          return this.cityDetail.display_name + '\n ' + that.$t('当前城市')
        }
      })

      const yArr1 = compareCities.slice(0, 5).map((item, index) => {
        if (index < 4) {
          return item.average_appreciation_rate * 100
        } else {
          return this.cityDetail.average_appreciation_rate * 100
        }
      })

      const yArr2 = compareCities.slice(0, 5).map((item, index) => {
        if (index < 4) {
          return item.average_rental_return_rate * 100
        } else {
          return this.cityDetail.average_rental_return_rate * 100
        }
      })

      window.addEventListener('resize', () => {
        myChart.resize()
      })

      let option = {
        legend: {
          data: [that.$t('增值收益率'), that.$t('租金收益率')],
          show: true,
          top: 0,
          right: 0,
          itemGap: 0,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'rect',
          textStyle: {
            fontSize: 10
          }
        },
        grid: {
          top: 30,
          bottom: 35,
          left: 60,
          right: 20
        },
        yAxis: {
          data: xArr1,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 10,
            color: '#888888'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(218,218,218,0.7)'
            }
          }
        },
        xAxis: {
          axisTick: {
            show: true,
            lineStyle: {
              color: 'rgba(218,218,218,0.7)'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(218,218,218,0.7)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(218,218,218,0.7)'
            }
          },
          axisLabel: {
            color: '#888888',
            formatter: value => {
              return value + '%'
            }
          }
        },
        series: [
          {
            name: that.$t('增值收益率'),
            type: 'bar',
            stack: '1',
            data: yArr1,
            barWidth: 25,
            itemStyle: {
              color: 'rgba(213,164,120,0.75)'
            }
          },
          {
            name: that.$t('租金收益率'),
            type: 'bar',
            stack: '1',
            data: yArr2,
            barWidth: 25,
            itemStyle: {
              color: '#8C8995'
            }
          }
        ]
      }
      myChart.setOption(option)
    },

    drawLineChart: function (compareCities) {
      const that = this

      const myChart = echarts.init(document.getElementById('compareLine'))

      const axisArr = this.cityDetail.price_trend.map((item, index) => {
        return item.year
      })

      const xArr = compareCities.slice(0, 5).map((item, index) => {
        if (index < 4) {
          return item.display_name
        } else {
          return this.cityDetail.display_name + that.$t('当前城市')
        }
      });

      const dataLines = compareCities.slice(0, 5).map((item, index) => {
        if (index < 4) {
          return item.price_trend.map((it, idx) => {
            return it.price
          })
        } else {
          return this.cityDetail.price_trend.map((it, idx) => {
            return it.price
          })
        }
      })

      window.addEventListener('resize', () => {
        myChart.resize()
      })

      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: xArr,
          show: true,
          right: 0,
          itemGap: 0,
          itemWidth: 16,
          itemHeight: 1,
          icon: 'rect',
          textStyle: {
            fontSize: 10,
            color: '#888888'
          }
        },
        grid: {
          containLabel: true,
          top: 40,
          bottom: 10,
          left: 0,
          right: 20
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: axisArr,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#888888'
          }
        },
        yAxis: {
          type: 'value',
          min: 'dataMin',
          axisLabel: {
            color: '#888888',
            formatter: value => {
              return '$' + value / 1000 + 'k'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: xArr[0],
            type: 'line',
            smooth: true,
            data: dataLines[0],
            showSymbol: false,
            color: '#B4BEC8',
            itemStyle: {
              normal: {
                lineStyle: {
                  // 'dotted'虚线 'solid'实线
                  type: 'dotted'
                }
              }
            }
          },
          {
            name: xArr[1],
            type: 'line',
            smooth: true,
            data: dataLines[1],
            showSymbol: false,
            color: '#BE6EE5',
            itemStyle: {
              normal: {
                lineStyle: {
                  type: 'dotted' // 'dotted'虚线 'solid'实线
                }
              }
            }
          },
          {
            name: xArr[2],
            type: 'line',
            smooth: true,
            data: dataLines[2],
            showSymbol: false,
            color: '#008CFF',
            itemStyle: {
              normal: {
                lineStyle: {
                  type: 'dotted' // 'dotted'虚线 'solid'实线
                }
              }
            }
          },
          {
            name: xArr[3],
            type: 'line',
            smooth: true,
            data: dataLines[3],
            showSymbol: false,
            color: '#00BE4B',
            itemStyle: {
              normal: {
                lineStyle: {
                  type: 'dotted' // 'dotted'虚线 'solid'实线
                }
              }
            }
          },
          {
            name: xArr[4],
            type: 'line',
            smooth: true,
            data: dataLines[4],
            showSymbol: false,
            color: '#FF5A5F'
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  mounted () {
    this.loadPropertySuggest(this.id)
    this.getcityDetail(this.id)
    this.loadCompareCities(this.id)
  }
}
</script>

<style lang="scss" scoped>
.detail-chart-wrapper.compare-bar {
  width: 100%;
  height: 300px;
}
.card-number.center,
.w-col-tiny-2.center {
  text-align: center;
}
</style>
