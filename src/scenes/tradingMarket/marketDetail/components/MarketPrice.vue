<template>
  <div ref="houseDetail">
    <div class="info-card detail">
      <div class="card-title highlight">{{houseDetail.title}}</div>
      <div class="detail-right-info-card-row">
        <div class="detail-info-card-data-row w-row">
          <div class="w-col w-col-8 w-col-small-6 w-col-medium-6 w-col-tiny-6">
            <div class="card-label left">{{$t('WeHome资产估值')}}</div>
          </div>
          <div class="text-right w-col w-col-4 w-col-small-6 w-col-medium-6 w-col-tiny-6">
            <div class="card-number medium text-right">${{toThousandFix(houseDetail.current_property_value, 0)}}</div>
          </div>
        </div>
        <div class="detail-info-card-data-row w-row">
          <div class="w-col w-col-8 w-col-small-6 w-col-medium-6 w-col-tiny-6">
            <div class="card-label left">{{$t('一年期税前净回报率')}}</div>
          </div>
          <div class="text-right w-col w-col-4 w-col-small-6 w-col-medium-6 w-col-tiny-6">
            <div class="card-number medium text-right">{{toThousandPrt(houseDetail.one_year_return_rate)}}%</div>
          </div>
        </div>
        <div class="detail-info-card-data-row w-row">
          <div class="w-col w-col-8 w-col-medium-6 w-col-small-6 w-col-tiny-6">
            <div class="card-label left">{{$t('WeHome评分')}}</div>
          </div>
          <div class="text-right w-col w-col-4 w-col-medium-6 w-col-small-6 w-col-tiny-6">
            <!-- <div class="card-number medium text-right">{{houseDetail.score}}</div> -->
            <div class="div-block-47 text-right">
              <div class="card-number">{{houseDetail.score}}</div>
              <div class="text-block-20" :class="{'diamond':houseDetail.score>=90,'gold':houseDetail.score>=80 && houseDetail.score<90,'silver':houseDetail.score>=70 && houseDetail.score<80,'bronze':houseDetail.score<70}"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-right-info-card-row">
        <div class="card-label left">{{houseDetail.bed}}{{$t('室')}}{{houseDetail.bath}}{{$t('卫')}}  {{$t('独栋别墅')}}  {{toThousandFix(houseDetail.size,2)}}sqft({{$t('约平米',{msg:toThousandFix(houseDetail.size*0.0929,2)})}}) <br>{{$t('建于',{msg:houseDetail.built_year})}}</div>
      </div>
      <div class="detail-right-info-card-row" @click="mapuri">
        <div class="card-label left">{{houseDetail.complete_address}}</div>
      </div>
      <div class="pc-only" v-if="!orderBool">
        <router-link :to="{path:'/marketorder',query: {id: id, bids: 1}}" class="button card-button green w-button bids">{{$t('买入股份')}}</router-link>
        <div class="or-line">or</div>
        <router-link :to="{path:'/marketorder',query: {id: id, offers: 1}}" class="button card-button green w-button offers" v-if="canOffers">{{$t('卖出股份')}}</router-link>
        <a class="button card-button green w-button button-disabled" v-else>{{$t('卖出股份')}}</a>
      </div>
      

      <div class="market-detail-btn-wrapper mob-only" v-if="!orderBool">
        <router-link :to="{path:'/marketorder',query: {id: id, bids: 1}}" class="button card-button green w-button bids prev">{{$t('买入股份')}}</router-link>
        <!-- <div class="or-line" v-if="!orderBool">or</div> -->
        <router-link :to="{path:'/marketorder',query: {id: id, offers: 1}}" class="button card-button green w-button offers" v-if="canOffers">{{$t('卖出股份')}}</router-link>
        <a class="button card-button green w-button button-disabled" v-else>{{$t('卖出股份')}}</a>
        </div>

      </div>
      
    <div class="info-card detail">
      <div class="text-block-37">{{$t('市场价格')}}</div>
      <div class="market-detail-text-wrapper">
        <div class="market-detail-text-box">
          <div class="market-detail-number text-center">${{toThousandFix(orders.wehome_estimate*GLOBAL.minShares,2)}}</div>
          <div class="market-detail-text text-center">{{$t('WeHome估价')}}</div>
        </div>
        <div class="market-detail-line"></div>
        <div class="market-detail-text-box">
          <div class="market-detail-number text-center">${{orders.market_price?toThousandFix(orders.market_price*GLOBAL.minShares,2):$t('无')}}</div>
          <div class="market-detail-text text-center">{{$t('最近成交价')}}</div>
          <div class="market-detail-text text-center absolute">{{compareLable(orders.wehome_estimate,orders.market_price)}}</div>
        </div>
      </div>
    </div>
    <div class="info-card detail padding-10">
      <div class="div-block-108">
        <div class="div-block-109">
          <!-- <div>
            <div class="text-block-38">1.0032</div>
            <div class="text-block-39">买入价</div>
          </div>
          <div class="div-block-110"></div>
          <div>
            <div class="text-block-38">$6,574.32</div>
            <div class="text-block-39">买入金额</div>
          </div> -->
          <div class="text-block-37">{{$t('买盘卖盘')}}</div>
        </div><img src="@/assets/images/info.png" width="15" height="15" v-tooltip.bottom.end="{ content: $t('GLOBAL.barInfo'), class: 'tooltip-custom tooltip-other-custom'}"></div>
      <div class="div-block-111 bar" id="bar" ref="bar">
        <span>{{$t('暂无交易')}}</span>
      </div>
      <div class="text-block-40" @click="showFilter" v-if="showBar">{{$t('查看更多价格')}}</div>
    </div>
    <div class="info-card detail padding-10">
      <div class="div-block-108">
        <div class="div-block-109">
          <!-- <div>
            <div class="text-block-38">{{price}}</div>
            <div class="text-block-39">{{priceLabel}}</div>
          </div>
          <div class="div-block-110"></div>
          <div>
            <div class="text-block-38">{{amount}}</div>
            <div class="text-block-39">{{amountLabel}}</div>
          </div> -->
          <div class="text-block-37">{{$t('交易指标')}}</div>
        </div><img src="@/assets/images/info.png" width="15" height="15" v-tooltip.bottom.end="{ content: $t('GLOBAL.lineInfo'), class: 'tooltip-custom tooltip-other-custom'}"></div>
      <div class="div-block-111 bar" id="line" ref="line">
        <span>{{$t('暂无指标')}}</span>
      </div>
      <!-- <ul class="unordered-list-4">
        <li class="list-item-2 select-day active">1天</li>
        <li class="list-item-2 select-day">7天</li>
        <li class="list-item-2 select-day">30天</li>
        <li class="list-item-2 select-day">3个月</li>
        <li class="list-item-2 select-day">6个月</li>
        <li class="list-item-2 select-day">1年</li>
      </ul> -->
    </div>
    <!-- 里程碑 -->
    <mile-stones :orderBool="orderBool" :houseDetail="houseDetail" class="pc-only"></mile-stones>
    <transition-box :show="showShadow">
      <div class="bids-offers-wrapper" v-show="showShadow">
        <div class="bids-offers-header">
          <div class="bids-offers-icon">
            <div class="bids-offers offers"></div>
            <div class="bids-offer-item">{{$t('买盘')}}</div>
            <div class="bids-offers bids"></div>
            <div class="bids-offer-item">{{$t('卖盘')}}</div>
          </div>
          <div class="bids-offers-close" @click="closeFilter"></div>
        </div>
        <div class="bids-offers-title">
          <div class="title-item">{{$t('价格')}}</div>
          <div class="title-item">{{$t('交易金额')}}</div>
          <div class="title-item">{{$t('股数手')}}</div>
          <div class="title-item last">{{$t('订单数')}}</div>
        </div>
        <div class="bids-offers-body-item bids" :class="{'last':index==orders.bids.length-1}" v-for="(item,index) in orders.bids" :key="'bids'+item.price+index">
          <div class="body-item">${{toThousandFix(item.price*GLOBAL.minShares, 2)}}</div>
          <div class="body-item">${{toThousandFix(item.price*item.amount, 2)}}</div>
          <div class="body-item">{{toThousandFix(item.amount/GLOBAL.minShares, 0)}}</div>
          <div class="body-item">{{toThousandFix(item.count, 0)}}</div>
          <div class="offers-icon"></div>
        </div>
        <div class="bids-offers-body-item offers" :class="{'last':index==orders.offers.length-1}" v-for="(item,index) in orders.offers" :key="'offers'+item.price+index">
          <div class="body-item">${{toThousandFix(item.price*GLOBAL.minShares, 2)}}</div>
          <div class="body-item">${{toThousandFix(item.price*item.amount, 2)}}</div>
          <div class="body-item">{{toThousandFix(item.amount/GLOBAL.minShares, 0)}}</div>
          <div class="body-item">{{toThousandFix(item.count, 0)}}</div>
          <div class="bids-icon"></div>
        </div>
      </div>
    </transition-box>
  </div>
</template>

<script>
import {formatHouseDate,formatMYDate,toThousandFix,toThousandPrt} from '@/utils/utils.js'
import { track, after } from "trackpoint-tools";
import MileStones from './MileStones';
import Track from "@/track";
var echarts = require('echarts/lib/echarts')
  // 引入柱状图
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/bar')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legendScroll')
  require('echarts/lib/component/title')

export default {
  name: 'marketPrice',
  components: { MileStones },
  props: {
    id: {
      type:Number,
      default: 0
    },
    houseDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    orderBool: {
      type: Boolean,
      default: false
    },
    minNum: {
      type: Number,
      default: 0
    },
    histories: {
      type: Array,
      default: function () {
        return []
      }
    },
    orders: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      price: null,
      amount: null,
      showShadow: false,
      priceLabel: this.$t('成交价'),
      amountLabel: this.$t('成交金额')
    }
  },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt,
    compareLable(gz,cj) {
      if(!gz || !cj) return ''
      if(cj > gz) {
        const ratio = (cj - gz) / gz
        return this.$t('高于估价')+ toThousandPrt(ratio)+'%'
      } else if (cj < gz) {
        const ratio = (gz - cj) / gz
        return this.$t('低于估价')+ toThousandPrt(ratio)+'%'
      } else {
        return ''
      }
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-card-showmoreorder-popup",
          action: "click",
          optLabel: "popup",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    showFilter: function () {
      this.showShadow = true
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-card-close-moreinfo",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    closeFilter: function () {
      this.showShadow = false
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "market-card-mapuri-href",
          action: "click",
          optLabel: "href",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    mapuri: function () {
      const href = this.houseDetail.map_url +'?lng='+ this.houseDetail.longitude +'&lat='+this.houseDetail.latitude+'&addr='+this.houseDetail.complete_address;
      window.open(href)
    },
    drawBar: function () {
      /**
       * 如果没有挂单跳出执行
       */
      if(!this.orders.bids && !this.orders.offers) return

      const that = this
      function compare(property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value1 - value2;
          }
      }

      function contain (arr,obj,type) {
        let bool = null
        arr.forEach((item) => {
          if(item.price == obj.price) {
            if(type==="bids" && obj.amount < 0) {
              bool = item
            } else if (type==="offers" && obj.amount > 0) {
              bool = item
            }
          }
        })
        return bool
      }
      

      const bids = this.orders.bids.map((item) => {
        return {
          amount: -(item.amount * item.price),
          price: item.price*this.GLOBAL.minShares,
          num: item.amount/this.GLOBAL.minShares
        }
      })
      const offers = this.orders.offers.map((item) => {
        return {
          amount: item.amount * item.price,
          price: item.price*this.GLOBAL.minShares,
          num: item.amount/this.GLOBAL.minShares
        }
      })
      const dataLen = bids.concat(offers).length
      const dataMid = dataLen>1?bids.concat(offers).sort(compare('price')):bids.concat(offers)
      const priceArr = dataMid.map((item) => {
        return item.price
      })
      const bidsArr = dataMid.map((item,index) => {
        // return bids[index]&&bids[index].price == item.price ? item.amount : 0
        return contain(bids,item,'bids') ? contain(bids,item,'bids')['num'] : 0
      })
      
      const offersArr = dataMid.map((item,index) => {
        return contain(offers,item,'offers') ? contain(offers,item,'offers')['num'] : 0
      })
      
      const option = {
          tooltip : {
            trigger: 'axis',
            formatter: function (params) {
              const bids = params[0]
              const offers = params[1]
              if(bids.value != 0) {
                return bids.marker + bids.seriesName + '<br />' + that.$t('价格')+'：' + '$' + toThousandFix(bids.axisValue,2) + '<br />' + that.$t('卖出')+'：' + toThousandFix(Math.abs(bids.value),0) + that.$t('手')
              } else if (offers.value != 0) {
                return offers.marker + offers.seriesName + '<br />' + that.$t('价格')+'：' + '$' + toThousandFix(offers.axisValue,2) + '<br />' + that.$t('卖出')+'：' + toThousandFix(Math.abs(offers.value),0) + that.$t('手')
              }
            }
          },
          legend: {
              itemGap: 30,
              itemHeight: 10,
              data: [{
                name: this.$t('买盘'),
                icon: 'circle'
              },{
                name: this.$t('卖盘'),
                icon: 'circle'
              }],
              textStyle: {
                fontSize: 10
              },
              selectedMode: false
          },
          grid: {
              left: 0,
              right: '3%',
              bottom: '2%',
              top: 25,
              containLabel: true
          },
          xAxis : [
              {
                  type : 'value',
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
                    fontSize: 8,
                    formatter: function(value, index) {
                      return toThousandFix(value, 0)
                    }
                  }
              }
          ],
          yAxis : [
              {
                  type : 'category',
                  data : priceArr,
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    color: '#707070',
                    fontSize: 8,
                    formatter: function(value, index) {
                      return '$' + toThousandFix(value)
                    }
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#f2f2f2'
                    }
                  },
                  splitLine: {
                    show: false
                  },
              }
          ],
          series : [
              {
                  name:this.$t('买盘'),
                  type:'bar',
                  data:bidsArr,
                  barGap: '10%',
                  barMaxWidth: 20,
                  barCategoryGap: '10%',
                  itemStyle: {
                    color: '#48d875'
                  }
              },
              {
                  name:this.$t('卖盘'),
                  type:'bar',
                  data:offersArr,
                  barGap: '10%',
                  barMaxWidth: 20,
                  barCategoryGap: '10%',
                  itemStyle: {
                    color: '#338ce0'
                  }
              }
          ]
      }
      const bar = echarts.init(this.$refs.bar)
      bar.setOption(option)
        window.addEventListener('resize', () => {
          bar.resize()
        })
    },
    drawLine: function () {
      /**
       * 如果没有历史交易指标跳出执行
       */
      if(this.histories.length<1) return
      var that = this
      const timeArr=this.histories.map((item) => {
        return item.time
      })
      const time = this.histories.map((item) => {
        return item.time
      }).sort((a, b) => {
        return a-b
      })
      const minTime = formatMYDate(new Date(time[0]).getTime()/1000)  
      const maxTime = formatMYDate(new Date(time[time.length-1]).getTime()/1000)
      const titleTime = '('+minTime+'-'+maxTime+')'
      const amountArr = this.histories.map((item) => {
        return '$'+toThousandFix(item.amount*item.price)
      })
      const numArr = this.histories.map((item) => {
        return toThousandFix(item.amount/this.GLOBAL.minShares, 0)
      })
      const priceArr = this.histories.map((item) => {
        return item.price*this.GLOBAL.minShares
      })
      that.price = priceArr[0]
      that.amount = amountArr[0]
      const option = {
          title: {
            text: titleTime,
            bottom: 0,
            left: 'center',
            textStyle: {
              fontSize: 12,
            }
          },
          color: ['#d5a478'],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              const data = params[0]
              return that.$t('时间')+'：'+ data.name + '<br />' + that.$t('成交价')+'：'+'$'+toThousandFix(data.value)+'<br/>'+that.$t('成交量')+'：'+(numArr[data.dataIndex]) + that.$t('手')
            }
          },
          grid: {
            left: '15%',
            top: 20,
            bottom: 30
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: timeArr,
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#f2f2f2'
                }
              }
          },
          yAxis: [
            {
              type: 'value',
              min: 0,
              max: 'dataMax',
              axisLine: {
                lineStyle: {
                  color: '#f2f2f2'
                }
              },

              splitLine: {
                show: false
              },
              axisLabel: {
                fontSize: 8,
                color: '#707070',
                formatter: function(value, index) {
                  return '$' + toThousandFix(value)
                }
              }
          }
          ],
          series: [{
                  name: this.$t('成交价'),
                  type: 'line',
                  data: priceArr
              }
          ]
      };
      const line = echarts.init(this.$refs.line)
      console.log(line,'line');
      line.setOption(option)
        window.addEventListener('resize', () => {
          line.resize()
        })
    }

  },
  mounted(){
    this.drawLine()
    this.drawBar()
  },
  destroyed () {
      window.removeEventListener('scroll', this.onScrollTop)
    },
  computed: {
    canOffers() {
      const shareNumber = this.houseDetail.user_share_num/this.GLOBAL.tenThou/this.GLOBAL.minShares
      if(shareNumber > this.minNum) {
        return true
      } else {
        return false
      }
    },
    showBar() {
      const data = this.orders
      return (data.bids&&data.bids.length > 0) || (data.offers&&data.offers.length > 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.div-block-111.bar {
  min-height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.or-line {
  text-align: center;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
  font-size: 16px;
}
.button.card-button.bids {
  background: #29A520;
}
.button.card-button.offers {
  background: #2A77D2;
}
.button.card-button.button-disabled {
  background: linear-gradient(180deg, #999, #999);
}
.button.card-button {
  width: 100%;
  border-radius: 0;
}
.button.card-button.prev {
  border-right: 1px solid #fff;
}
.market-detail-btn-wrapper {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mob-only {
  display: none;
}
.market-detail-text.text-center.absolute {
  min-width: 100%;
  position: absolute;
  bottom: -20px;
  background: rgba(0,0,0,0.1);
  border-radius: 5px;
  padding: 0 5px;
  left: 50%;
  transform: translateX(-50%);
}
@media (max-width: 479px) {
  .market-detail-btn-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 990;
  }
  .button.card-button {
    height: 100%;
    padding-top: 13px;
  }
  .mob-only {
    display: flex;
  }
  .pc-only {
    display: none;
  }
}
.text-block-37.lichengbei {
  margin-bottom: 20px;
}
</style>
