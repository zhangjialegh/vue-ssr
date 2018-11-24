<template>
	<div data-w-tab="Tab 1" class="tab-pane detail-invest-score w-tab-pane w--tab-active">
	  <div class="invest-beat-percent">
	  	{{$t('击败了全市',{msg: houseDetail.score})}}
	  </div>
	  <!-- <img src="../../../../assets/images/chart.png" class="detail-chart-wrapper"> -->
		<div class="detail-chart-wrapper compare-bar" id="radar"></div>
		<div class="card-number large text-center" v-if="houseDetail.leverage_profit_detail">{{((houseDetail.leverage_profit_detail.no_leverage_appreciation_rate + houseDetail.leverage_profit_detail.no_leverage_rent_rate)*100).toFixed(2)}}%</div>
	  <div class="card-number large text-center" v-else>{{((houseDetail.appreciation_rate_one_year_forecast + houseDetail.rental_return_rate_net)*100).toFixed(2)}}%</div>
	  <div class="text-center">{{$t('一年期税前净回报率')}}<span v-if="houseDetail.leverage_profit_detail">{{$t('未加杠杆收益')}}</span></div>
	  <div class="card-progress-bar-base large detail cube">
	    <div class="card-progress-bar-done progress-split large cube" v-bind:style="{width:(houseDetail.leverage_profit_detail.no_leverage_appreciation_rate/(houseDetail.leverage_profit_detail.no_leverage_appreciation_rate+houseDetail.leverage_profit_detail.no_leverage_rent_rate)*100) + '%'}" v-if="houseDetail.leverage_profit_detail"></div>

			<div class="card-progress-bar-done progress-split large cube" v-bind:style="{width:(houseDetail.appreciation_rate_one_year_forecast/(houseDetail.appreciation_rate_one_year_forecast+houseDetail.rental_return_rate_net)*100) + '%'}" v-else></div>
	  </div>
	  <div class="w-row">
	    <div class="w-col w-col-6 w-col-small-6 w-col-tiny-6">
	      <div class="detail-invest-overview-plus-wrapper">
	      	{{$t('增值')}} <span class="card-number large" v-if="houseDetail.leverage_profit_detail">{{((houseDetail.leverage_profit_detail.no_leverage_appreciation_rate)*100).toFixed(2)}}%</span><span class="card-number large" v-else>{{((houseDetail.appreciation_rate_one_year_forecast)*100).toFixed(2)}}%</span>
	      </div>
	      <div class="detail-invest-overview-operator">+</div>
	    </div>
	    <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
	      <div>
	      	{{$t('长租租金')}} <span class="card-number large" v-if="houseDetail.leverage_profit_detail">{{((houseDetail.leverage_profit_detail.no_leverage_rent_rate)*100).toFixed(2)}}%</span><span class="card-number large" v-else>{{((houseDetail.rental_return_rate_net)*100).toFixed(2)}}%</span>
	      </div>
	    </div>
	  </div>

    <template v-if="houseDetail.leverage_profit_detail">
			<div class="card-number large text-center margin-top">{{((houseDetail.leverage_profit_detail.rent_rate + houseDetail.leverage_profit_detail.appreciation_rate)*100).toFixed(2)}}%</div>
			<div class="text-center">{{houseDetail.leverage_profit_detail.desc}}</div>
			<div class="card-progress-bar-base large detail cube">
				<div class="card-progress-bar-done progress-split large cube" v-bind:style="{width:(houseDetail.leverage_profit_detail.appreciation_rate/(houseDetail.leverage_profit_detail.appreciation_rate+houseDetail.leverage_profit_detail.rent_rate)*100) + '%'}"></div>
			</div>
			<div class="w-row">
				<div class="w-col w-col-6 w-col-small-6 w-col-tiny-6">
					<div class="detail-invest-overview-plus-wrapper">
						{{$t('增值')}} <span class="card-number large">{{((houseDetail.leverage_profit_detail.appreciation_rate)*100).toFixed(2)}}%</span>
					</div>
					<div class="detail-invest-overview-operator">+</div>
				</div>
				<div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
					<div>
						{{$t('长租租金')}} <span class="card-number large">{{((houseDetail.leverage_profit_detail.rent_rate)*100).toFixed(2)}}%</span>
					</div>
				</div>
			</div>
		</template>
		
	</div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/radar')
// 引入提示框和标题组件
require('echarts/lib/component/title')
export default {
	name: 'PropertyScoreTab',
	props: {
		houseDetail : {
      type: Object,
      default: function () {
        return {}
      }
    },
	},
  data () { 
		return {
		} 
	},
	mounted () {
		let myChart = echarts.init(document.getElementById('radar'))  
		window.onresize = () => {
      myChart.resize()
    }
		
		const option = {
			title: {
				text: this.houseDetail.score,
				x: 'center',
				y: 'center',
				textStyle: {
						color: '#fff',
						fontWeight: 'bolder',
						fontSize: 20,
				}
		},
    radar: {
        name: {
            textStyle: {
                color: '#333',
                padding: [0, 5]
           }
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#d5a478',
						opacity: 0.58
					}
				},
				splitArea: {
						show: true,
						areaStyle: {
							color: '#DADADA',
							opacity: 0.7
						}
				},
				splitLine: {
            show: false
        },
        indicator: [
           { name: this.$t('房屋增值'), max: 100},
           { name: this.$t('抗跌能力'), max: 100},
           { name: this.$t('长租收益'), max: 100},
           { name: this.$t('短租收益'), max: 100},
           { name: this.$t('持有成本'), max: 100}
        ]
    },
    series: [{
				type: 'radar',
				symbol:"none",
				lineStyle: {
					opacity: 0
				},
        areaStyle: {
					color: '#d5a478',
					opacity: 1
				},
        data : [
            {
                value : [this.houseDetail.score_appreciation,
        this.houseDetail.score_cost,
        this.houseDetail.score_rental,
        this.houseDetail.score_airbnb,
        this.houseDetail.score_anti_risk]
            }
        ]
    }]
};
    myChart.setOption(option) 
	}
}
</script>

<style lang="scss" scoped>
.detail-chart-wrapper.compare-bar {
	height: 220px;
	width: 100%;
}
.card-progress-bar-base.cube {
	border-radius: 0;
}
.card-progress-bar-done.progress-split {
	border-radius: 0;
  background-image: none;
}

.card-progress-bar-done.cube {
	border-radius: 0;
}

.card-number.large.margin-top {
	margin-top: 50px;
}
</style>
