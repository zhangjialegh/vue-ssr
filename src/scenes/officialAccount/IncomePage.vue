<template>
  <div>
    <banner-model :bgImg="'https://wechat-pics.fangpinduo.com/wehome/website/static/image/income-banner.png'" style="background-size: contain">
     <h2 class="banner-title-global">WeHome收益回报率</h2>
   </banner-model>

   <div class="income_page_wrapper">
    <h4>WeHome回报率</h4>
    <div class="risk-wrapper">
      <div class="risk-little-title">当前平均回报率:<em class="bold-income">11%~16%</em></div>
      <div class="invest-compare-return-ratio"></div>
      <span class="drop-title" @click="toggleRisk"><i class="w-icon-dropdown-toggle" :class="{'rotate': !displayRisk}"></i>可能会有哪些风险？</span>
      <p class="drop-desc" :class="{'close': displayRisk}">
        房产投资存在风险，预估收益并不等同于未来的实际收益，租金收益和股权出售所得可能会低于预估值。每三到五年的股权退出价格，由当时的市场供需情况决定。投资者需根据自身的风险承受能力，谨慎做出投资决策。
      </p>

      <div class="divider"></div>

      <div class="risk-little-title">与其他美元投资产品对比</div>
      <span>年化收益率</span>
      <div class="risk-year-return-ratio"></div>
      
      <div class="divider"></div>


      <div class="risk-little-title">收益回报率</div>
      <div data-w-tab="Tab 3" class="w-tab-pane" v-bind:class="{'w--tab-active':tabIndex == 2}">
        <div class="div-block-15">
          <div class="row-13 w-row">
            <div class="column-12 w-col w-col-6">
              <p>投资</p>
            </div>
            <div class="w-col w-col-6">
              <div data-delay="0" class="w-dropdown" @mouseover="showDropDown" @mouseleave="closeDrop">
                <div class="dropdown-toggle-2 w-dropdown-toggle">
                  <div class="w-icon-dropdown-toggle"></div>
                  <div class="text-block-5">{{(amountArr[inx]).toLocaleString('en-US')}}</div>
                </div>
                <nav class="w-dropdown-list" v-bind:class="{'w--open':showDrop}">
                  <a href="javascript:;" class="w-dropdown-link" v-for="(item,index) in amountArr" v-on:click="countAmount(index)" :key="item+index">{{item.toLocaleString('en-US')}}</a>
                </nav>
              </div>
            </div>
          </div>
          <div class="row-14 w-row">
            <div class="w-col w-col-6">
              <p class="paragraph-26">投资年限</p>
            </div>
            <div class="w-col w-col-6">
              <p class="paragraph-27">预算收益 (含本金）</p>
            </div>
          </div>
          <div class="row-14 w-row" v-for="(item,index) in yearArr" :key="item+index">
            <div class="w-col w-col-6">
              <p class="paragraph-26">{{item}} 年后</p>
            </div>
            <div class="w-col w-col-6">
              <p class="paragraph-27">${{Number.parseInt(Math.pow(1.12,item)*amountArr[inx]).toLocaleString('en-US')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <h4>历史收益表</h4>
    <div class="history-income-wrapper">
      <div class="history-table-wrapper">
        <table class="history-income-table template">
          <tbody>
            <tr>
              <th>美国房产股权投资项目</th>
            </tr>
            <tr v-for="(item,index) in onsaleList" :key="item.title+item.project_id+index">
              <td class="addr">{{item.project_title}}<br/>{{item.complete_address}}</td>
            </tr>
          </tbody>
        </table>

        <table class="history-income-table">
          <tbody>
            <tr>
              <th>美国房产股权投资项目</th>
              <th>房产购入价格</th>
              <th>贷款比例</th>
              <th>月租金</th>
              <th>年化净租金收益</th>
              <th>当前估值</th>
              <th>房产已增值</th>
              <th>已持有周期</th>
            </tr>
            <tr v-for="(item,index) in onsaleList" :key="item.title+item.project_id+index">
              <td class="addr">{{item.project_title}}<br/>{{item.complete_address}}</td>
              <td>${{toThousandSep(item.initial_property_value)}}</td>
              <td>{{toThousandPrt(item.loan_value/item.initial_property_value)}}%</td>

              <td>${{toThousandSep(item.rental_return)}}</td>
              <td>{{item.year_avg_rent_rate?toThousandPrt(item.year_avg_rent_rate)+'%' : '暂无数据'}}</td>


              <td>${{toThousandSep(item.current_property_value)}}</td>

              <td>{{item.current_property_value-item.initial_property_value >= 0 ? toThousandPrt((item.current_property_value-item.initial_property_value)/item.initial_property_value)+'%':'暂无数据'}}</td>
              <td>{{Math.floor((new Date().getTime()/1000 - item.published_datetime)/60/60/24/30)}}个月</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   </div>
  </div>
</template>
<script>
import {GET_PROJECT_ONSALE_ACTION} from '@/scenes/investing/modules'
import {formatHouseDate,toThousandFix,toThousandPrt,toThousandSep} from '@/utils/utils.js'

  export default {
    name: 'incomedream',
    data () {
      return {
        displayRisk: true,
        amountArr: [5000,10000,20000,50000,100000],
        amountUsArr: ['5,000', '10,000', '20,000', '50,000', '100,000'],
        yearArr: [1,3,5,10],
        amountIndex: 0,
        inx: 0,
        showDrop: false,
        tabIndex: 0,
        onsaleList: []
      }
    },
    methods: {
      toThousandFix: toThousandFix,
      toThousandPrt: toThousandPrt,
      toThousandSep:toThousandSep,
      toggleRisk() {
        this.displayRisk = !this.displayRisk
      },
      switchTab (index) {
        this.tabIndex = index
      },
      countAmount (index) {
        this.inx = index
        this.showDrop = false
      },
      showDropDown () {
        this.showDrop = true
      },
      closeDrop () {
        this.showDrop = false
      },
      getOnSale () {
      const that = this
      this.$store.dispatch(GET_PROJECT_ONSALE_ACTION)
      .then((result)=>{
        that.onsaleList = result.onsale.filter((item) => {
          return item.project_status==that.GLOBAL.PROJECT_STATUS_SUCCESS
        })
      })
    },
    },
    created() {
      this.getOnSale()
    }
  }
</script>


<style lang="scss">
.income_page_wrapper {
  padding: 0 10px;
  .divider {
    height: 1px;
    width: 100%;
    background: linear-gradient(#FCFCFC, #D8D8D8);
    margin-top: 20px;
  }
  .market-data-view-container-left {
    width: 220px;
  }
  .market-data-view-title {
    border: none;
  }
  .market-data-view-left-title {
    border-left: none;
  }
  .market-data-view-right-title-ul {
    border: none;
  }
  .history-addr {
    width: 100%;
    white-space: pre-wrap;
  }
  h4 {
    color: #000;
    margin: 25px 0 15px 0;
    font-size: 16px;
  }
  .invest-compare-return-ratio {
    width: 100%;
    height: 125px;
    background: url('https://wechat-pics.fangpinduo.com/image/landingpage/invest-income-rate-2.png') no-repeat center center;
    background-size: contain;
    margin: 20px 0;
  }
  .risk-year-return-ratio {
    width: 100%;
    height: 170px;
    background: url('https://wechat-pics.fangpinduo.com/image/landingpage/invest-chart-1.png') no-repeat center center;
    background-size: contain;
    margin: 12px 0;
  }
  .risk-wrapper {
    background-color: #ffffff;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    .risk-little-title {
      color: #000;
      margin-top: 20px;
    }
    .bold-income {
      font-weight: 500;
    }
  }
  .drop-title {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    color: #C89669;
    .w-icon-dropdown-toggle {
      left: -15px;
      margin: 0;
      top: 50%;
      transform: translateY(-50%) rotate(-90deg);
      transition: all 0.3s;
      &.rotate {
        transform: translateY(-50%) rotate(0);
      }
    }
  }
  .drop-desc{
    transition: max-height 0.3s;
    max-height: 150px;
    overflow: hidden;
    font-size: 12px;
    padding: 0 10px;
    margin-top: 10px;
    margin-bottom: 0;
    &.close {
      max-height: 0px;
    }
  }
  .w-tab-pane {
    display: block;
    width: 100%;
    margin: 15px 0;
  }
  .history-income-wrapper {
    width: 100%;
    position: relative;
    background-color: #ffffff;
    padding-left: 10px;
    .history-table-wrapper{
      width: auto;
      overflow-x: auto;
        .history-income-table {
          &.template {
            position: absolute;
            top: 0;
            left: 10px;
          }
          font-size: 13px;
          color: #4a4a4a;
          background-color: #ffffff;
          th,td {
            white-space: nowrap;
            padding: 15px 0;
            padding-right: 30px;
          }
          th {
            text-align: left;
          }
          td.addr {
            padding-right: 15px;
            display: block;
            white-space: pre-wrap;
            width: 230px;
          }
          tr {
            border-bottom:  1px solid #D8D8D8;
          }
        }
    }
  }
}
</style>
