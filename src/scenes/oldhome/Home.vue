<template>
  <div>
    <div class="section usual-bg" :style="{'backgroundImage': `-webkit-linear-gradient(270deg, rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${item.image_url})`,backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${item.image_url})` }" v-if="swiperList.length ==1" v-for="(item, index) in swiperList" :key="item.href+index">
      <div class="div-block-5 static">
        <h2 class="heading-10">{{$t('home.title')}}</h2>
        <p class="paragraph-25">{{$t('home.subtitle')}}</p>
        <router-link to="/invest?from=home" class="button-6 w-button">{{$t('home.joinin')}}</router-link>
      </div>
    </div>
     
    <swiper :options="swiperOption" v-if="swiperList.length > 1">
      <swiper-slide v-for="(item, index) in swiperList" :key="item.image_url+index">
        <div :to="item.href" class="section usual-bg" :style="{'backgroundImage': `-webkit-linear-gradient(270deg, rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${item.image_url})`,backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${item.image_url})` }">
          <div class="div-block-5 static">
            <h2 class="heading-10">{{item.title}}</h2>
            <p class="paragraph-25">{{item.sub_title}}</p>
            <router-link v-if="item.btn_text && item.href" :to="item.href" class="button-6 w-button" :style="{'backgroundColor':`#${splitColor(item.btn_text)[1]}`}"><span>{{splitColor(item.btn_text)[0]}}</span></router-link>
            <a class="button-6 w-button" v-else-if="item.btn_text" @click="showVideo" :style="{'backgroundColor':`#${splitColor(item.btn_text)[1]}`}"><span>{{splitColor(item.btn_text)[0]}}</span> <i class="play-icon"></i></a>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="section-2">
      <div class="container-3 w-container"><img src="@/assets/images/icon6.png" width="100" class="image-2"><img src="@/assets/images/icon5.png" width="100" class="image-2"><img src="@/assets/images/icon4.png" width="100" class="image-2"><img src="@/assets/images/icon3.png"
          width="100" class="image-2"><img src="@/assets/images/icon2.png" width="50" class="image-2"><img src="@/assets/images/icon1.png" width="100" class="image-2"><img src="@/assets/images/icon7.png" width="50" class="image-2"></div>
    </div>
    <div class="section-3">
      <div class="w-container">
        <div class="row-6 w-row">
          <div class="w-col w-col-4">
            <div class="div-block-39"><img src="@/assets/images/icon1_1.png" width="43" class="image-3"></div>
            <h5 class="heading-16">更低门槛</h5>
            <p class="paragraph-17"><strong>5000美金实现海外有房</strong><br>在全美范围内投资优质房产，<br>坐享投资红利，分散投资风险更低</p>
          </div>
          <div class="column-44 w-col w-col-4">
            <div class="div-block-38"><img src="@/assets/images/2_1.png" width="50" srcset="@/assets/images/2_1-p-500.png 500w, @/assets/images/2_1.png 512w" sizes="(max-width: 479px) 67vw, 50px" class="image-4"></div>
            <h5 class="heading-17">最优回报</h5>
            <p class="paragraph-16"><strong>精选美国前10%钻石房源</strong><br>租金月月分红，房产稳定增值。大数据驱动慧眼识房，远超市场平均回报水平</p>
          </div>
          <div class="column-43 w-col w-col-4">
            <div class="div-block-37"><img src="@/assets/images/icon3_1.png" width="44" class="image-5"></div>
            <h5 class="heading-18">稳健增值</h5>
            <p class="paragraph-15"><strong>使房产真正成为流动资产</strong><br>解决买卖、出租海外房产过程中的所有麻烦，股权的可交易性使房产流动性大增</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section-4">
      <div class="w-container">
        <div class="div-block-6">
          <div class="div-block-18">
            <div data-duration-in="300" data-duration-out="100" class="tabs w-tabs">
              <div class="tabs-menu-3 w-tab-menu">
                <a data-w-tab="Tab 1" class="tab-link-4 w-inline-block w-tab-link" v-bind:class="{'w--current':index == tabIndex}" v-for="(item,index) in tabArr" v-on:click="switchTab(index)" :key="item">
                  <div class="text-block-3">{{item}}</div>
                </a>
              </div>
              <div class="tabs-content w-tab-content">
                <div data-w-tab="Tab 1" class="w-tab-pane" v-bind:class="{'w--tab-active':tabIndex == 0}">
                  <h5 class="heading">年回报率对比</h5>
                  <div class="div-block-7" id="homeBar"></div>
                </div>
                <div data-w-tab="Tab 2" class="tab-pane-2 w-tab-pane" v-bind:class="{'w--tab-active':tabIndex == 1}">
                  <h5 class="heading">回报率分析</h5>
                  <h1 class="heading">11.5% ~ 16%</h1><img src="@/assets/images/graph-cn.png" width="420" srcset="@/assets/images/graph-cn-p-500.png 500w, @/assets/images/graph-cn-p-800.png 800w, @/assets/images/graph-cn-p-1080.png 1080w, @/assets/images/graph-cn.png 1545w"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 58vw, 420px"></div>
                <div data-w-tab="Tab 3" class="tab-pane-3 w-tab-pane" v-bind:class="{'w--tab-active':tabIndex == 2}">
                  <h5 class="heading">回报率计算</h5>
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
            </div>
          </div>
          <p class="paragraph-18">房地产投资包含风险。预计收入与未来的实际收入不相等。租金收入和股权出售收益可能低于预期。每三到五年，退出价格就决定于市场供求。投资者需要谨慎根据自己的风险偏好做出投资决策。</p>
        </div>
      </div>
    </div>
    <div class="section-5">
      <div class="container-25 w-container">
        <h4 class="heading-2">我们使投资更容易</h4>
        <div class="row-27 w-row">
          <div class="column-40 w-col w-col-6">
            <h5 class="heading-3">WeHome投资</h5>
            <div class="div-block-42"><img src="@/assets/images/check.png" width="14">
              <p class="paragraph-19">5000美金参与，3个简单步骤，1分钟搞定</p>
            </div>
            <div class="div-block-42"><img src="@/assets/images/check.png" width="14">
              <p class="paragraph-19">起投门槛低，资金分配更加灵活</p>
            </div>
            <div class="div-block-42"><img src="@/assets/images/check.png" width="14">
              <p class="paragraph-19">一站式投资交易，运营管理</p>
            </div>
            <div class="div-block-42"><img src="@/assets/images/check.png" width="14">
              <p class="paragraph-19">俯瞰全美投资洼地，获得最佳租赁策略</p>
            </div>
          </div>
          <div class="column-41 w-col w-col-6">
            <h5 class="heading-4">传统投资</h5>
            <div class="div-block-42"><img src="@/assets/images/check2.png" width="14">
              <p class="paragraph-19">平均20万美金起投，12个步骤，耗时2个月</p>
            </div>
            <div class="div-block-42"><img src="@/assets/images/check2.png" width="14">
              <p class="paragraph-19">大笔资金锁定在非常有限的房产里</p>
            </div>
            <div class="div-block-42"><img src="@/assets/images/check2.png" width="14">
              <p class="paragraph-19">各种房产维护琐碎事宜，耗费精力</p>
            </div>
            <div class="div-block-42"><img src="@/assets/images/check2.png" width="14">
              <p class="paragraph-19 little-height">所获得信息有局限性，同样的钱能获得更好的回报</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-6">
      <div class="w-container">
        <h4 class="heading-5">合投的三个简单步骤</h4>
        <div class="row-8 w-row">
          <div class="w-col w-col-4"><img src="@/assets/images/1.png" width="100" class="image-8">
            <h5 class="heading-15">合投</h5>
            <p class="paragraph-21">与您的好友或WeHome其他投资者合投一套优质房产，共享收益与分担风险。</p>
          </div>
          <div class="w-col w-col-4"><img src="@/assets/images/2.png" width="100" class="image-7">
            <h5 class="heading-13">分红</h5>
            <p class="paragraph-22">筹款成功后，WeHome负责房屋的租赁管理（长租与短租结合）和维护等。每月您将获得租金分红，每个季度您会看到最新评估的房屋市场价值。</p>
          </div>
          <div class="column-14 w-col w-col-4"><img src="@/assets/images/3.png" width="100" class="image-6">
            <h5 class="heading-14">退出</h5>
            <p class="paragraph-23">美国房产属中长期投资，正常按3-5年约定投资期限。投资到期后，WeHome帮助出售房产，将所获的增值收益分配给您。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section-7">
      <div class="w-container" id="dataTimer">
        <h4 class="heading-6">WeHome大数据引擎</h4>
        <div class="row-9 w-row">
          <div class="column-9 w-col w-col-4">
            <div class="div-block-12">
              <h2 class="heading-7">{{Number.parseInt(dataArr[0]).toLocaleString('en-US')}}</h2>
              <p>WeHome列表数据</p>
            </div>
          </div>
          <div class="column-8 w-col w-col-4">
            <div class="div-block-11">
              <h2 class="heading-8">{{Number.parseInt(dataArr[1]).toLocaleString('en-US')}}</h2>
              <p>当前市场房源</p>
            </div>
          </div>
          <div class="w-col w-col-4">
            <div class="div-block-10">
              <h2 class="heading-9">{{Number.parseInt(dataArr[2]).toLocaleString('en-US')}}</h2>
              <p>每天售出的物业</p>
            </div>
          </div>
        </div>
        <p class="paragraph-24">WeHome大数据引擎提供全面的数据支持和决策依据，实时监测超过2100万套房源，并通过独有的房产数据模型为用户提供精准的投资方向。</p>
        <div class="div-block-13" id="homeLine"></div>
      </div>
    </div>
    <refer-list />
    <project-list />
    <video-model :show="showVideoModel" @closeVideo="closeVideo"></video-model>
  </div>
</template>

<script>
  import Axios from '@/axios'
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
  
  export default {
    name: 'home',
    data () {
      return {
        amountArr: [5000, 10000, 20000, 50000, 100000],
        dataArr: [0, 0, 0],
        initArr: [1512923, 128119, 7586],
        yearArr: [1, 3, 5, 10],
        inx: 0,
        showDrop: false,
        tabArr: ['年回报率对比', '回报率分析', '回报率计算'],
        tabIndex: 0,
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        swiperList: [
          {
            image_url: 'https://wechat-pics.fangpinduo.com/website/bannerkevin-rajaram-228616%E7%9A%84%E5%89%AF%E6%9C%AC.jpg',
            href:'/invest?from=home'
          }
        ],
        showVideoModel: false
      }
    },
    methods: {
      splitColor(text) {
        const idx = text.indexOf(':')
        if(idx>-1) {
          return text.split(':')
        } else {
          return [text]
        }
      },
      showVideo() {
        this.showVideoModel = true
      },
      closeVideo(msg) {
        this.showVideoModel = msg
      },
      getLanding: function () {
        const that = this
        Axios.get(
          '/api/content/banner', {}, {
            success: function (res) {
              if(res.length > 1) {
                that.swiperList = res
              }
            },
            error: function (error) {
              console.log(error)
            }
          }
        )
      },
      getInitArr: function () {
        const that = this
        Axios.get(
          '/api/landing/data', {}, {
            success: function (result) {
              that.initArr = result.map((item, index) => {
                return item.value
              })
            },
            error: function (error) {
              console.log(error)
            }
          }
        )
      },
      @track(after(function () {
        Track.eventTrack({
          category: 'return-ratio-tab',
          action: 'click',
          optLabel: 'tab',
          page: this.$route.name,
          optValue: {
            tab: this.tabArr[this.tabIndex]
          }
        })
      }))
      switchTab: function (index) {
        this.tabIndex = index
      },
      @track(after(function () {
        Track.eventTrack({
          category: 'return-ratio-calc-dropdown',
          action: 'click',
          optLabel: 'dropdown',
          page: this.$route.name,
          optValue: {
            amount: this.amountArr[this.inx]
          }
        })
      }))
      countAmount: function (index) {
        this.inx = index
        this.showDrop = false
      },
      showDropDown: function () {
        this.showDrop = true
      },
      closeDrop: function () {
        this.showDrop = false
      },
      drawHomeBar: function () {
        const homeBar = echarts.init(document.getElementById('homeBar'))
        const option = {
          color: ['#3398DB'],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            data: [
              '现金储蓄\n(三年期)', '货币基金', '银行理财', '债券', 'WeHome美国\n房产合投'
            ],
            axisLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            },
            axisLabel: {
              interval: 0,
              color: '#6C6C6C',
              fontSize: 8,
              fontFamily: 'PingFangSC-Regular',
              showMinLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            interval: 4,
            splitNumber: 4,
            min: 0,
            max: 12,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}%',
              color: '#6C6C6C',
              fontFamily: 'PingFangSC-Regular',
              fontSize: 10,
              lineHeight: 16
            },
            splitLine: {
              lineStyle: {
                color: '#D8D8D8'
              }
            }
          }],
          series: [{
            type: 'bar',
            barWidth: '60%',
            data: [
              2, 4, 5, 8, 12
            ],
            animation: false,
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                fontSize: 11,
                fontWeight: 'bold',
                color: function (params) {
                  var colors = ['#5d5d5d', '#5d5d5d', '#5d5d5d', '#5d5d5d', '#d5a478 ']
                  return colors[params.dataIndex]
                }
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorLists = ['#DFE4E6', '#D8DEE1', '#D0D7DA', '#C8D0D5', '#d5a478 ']
                  return colorLists[params.dataIndex]
                }
              }
            }
          }]
        };
  
        homeBar.setOption(option)
        window.addEventListener('resize', () => {
          homeBar.resize()
        })
      },
      drawHomeLine: function () {
        const homeLine = echarts.init(document.getElementById('homeLine'))
  
        window.addEventListener('resize', () => {
          homeLine.resize()
        })
  
        const option = {
          title: {
            text: '美国热门城市房产价格',
            textStyle: {
              color: 'rgb(199,199,199)',
              lineHeight: 30,
              fontSize: 12
            },
            left: '4%'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 1,
            itemGap: 13,
            left: '4%',
            top: 27,
            data: [{
              name: '旧金山',
              textStyle: {
                color: 'rgb(254,111,117)',
                fontSize: 10
              }
            },
            {
              name: '纽约',
              textStyle: {
                color: 'rgb(251,180,69)',
                fontSize: 10
              }
            },
            {
              name: '华盛顿',
              textStyle: {
                color: 'rgb(62,152,213)',
                fontSize: 10
              }
            },
            {
              name: '洛杉矶',
              textStyle: {
                color: 'rgb(103,212,80)',
                fontSize: 10
              }
            }
            ]
          },
          grid: {
            left: '4%',
            right: '3%',
            bottom: '1%',
            top: 80,
            containLabel: true
          },
          xAxis: [{
            boundaryGap: false,
            data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 10,
              color: 'rgb(199,199,199)'
            }
          }],
          yAxis: [{
            name: '$(百万)',
            type: 'value',
            position: 'right',
            nameTextStyle: {
              fontSize: 10,
              color: 'rgb(199,199,199)'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 10,
              color: 'rgb(199,199,199)',
              formatter: function (value) {
                return value / 1000000
              }
            }
          }],
          series: [{
            name: '旧金山',
            type: 'line',
            showSymbol: false,
            smooth: true,
            color: 'rgb(254,111,117)',
            lineStyle: {
              normal: {
                width: 1
              }
            },
            data: [685500, 658000, 752500, 879000, 986000, 1134800, 1157400, 1286743]
          },
          {
            name: '纽约',
            type: 'line',
            showSymbol: false,
            smooth: true,
            color: 'rgb(251,180,69)',
            lineStyle: {
              normal: {
                width: 1
              }
            },
            data: [478700, 459700, 468300, 506400, 522600, 569000, 632400, 697106]
          },
          {
            name: '华盛顿',
            type: 'line',
            showSymbol: false,
            smooth: true,
            color: 'rgb(62,152,213)',
            lineStyle: {
              normal: {
                width: 1
              }
            },
            data: [361000, 363600, 390100, 436300, 464200, 506300, 542500, 544971]
          },
          {
            name: '洛杉矶',
            type: 'line',
            showSymbol: false,
            smooth: true,
            color: 'rgb(103,212,80)',
            lineStyle: {
              normal: {
                width: 1
              }
            },
            data: [401900, 372200, 409700, 482400, 521000, 562100, 611200, 654125]
          }
          ]
        }
  
        homeLine.setOption(option)
      },
      startTimer: function () {
        this.timer = setInterval(() => {
          if (this.dataArr[0] >= this.initArr[0]) {
            clearInterval(this.timer)
            this.dataArr = this.dataArr.map((item, inx) => {
              return this.initArr[inx]
            })
            return
          }
          this.dataArr = this.dataArr.map((item, inx) => {
            return item + this.initArr[inx] / 100
          })
        }, 50)
      },
      onScrollTop: function () {
        const objTop = document.getElementById('dataTimer').offsetTop
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        const windowHgt = document.documentElement.offsetHeight || document.body.offsetHeight
        if (scrollTop + windowHgt > objTop) {
          this.$options.methods.startTimer.call(this)
          window.removeEventListener('scroll', this.$options.methods.onScrollTop.bind(this))
        }
      }
    },
    computed: {
  
    },
    activated () {
      this.onScrollTop()
      window.addEventListener('scroll', this.onScrollTop)
      this.drawHomeBar()
      this.drawHomeLine()
      this.getInitArr()
    },
    mounted () {
      this.drawHomeBar()
      this.drawHomeLine()
      this.getLanding()
    },
    deactivated () {
      window.removeEventListener('scroll', this.onScrollTop)
    }
  }
</script>

<style lang="scss" scoped>
  .heading {
    padding-bottom: 0;
  }
  
  .div-block-7>div {
    width: 100%;
  }
  
  .div-block-5.static {
    top: 250px;
  }
  
  @media (max-width: 479px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
    .div-block-5.static {
      position: static;
    }
  }
  
  .swiper-button-prev.swiper-button-disabled,
  .swiper-button-next.swiper-button-disabled {
    opacity: 0;
  }
  
  :global(.swiper-button-prev) {
    background-image: url('https://wechat-pics.fangpinduo.com/everestWebsite/kno_previous.svg');
    outline: none;
    width: 40px;
    height: 40px;
    background-size: 44px 44px;
  }
  
  :global(.swiper-button-next) {
    background-image: url('https://wechat-pics.fangpinduo.com/everestWebsite/kno_next.svg');
    width: 40px;
    height: 40px;
    background-size: 44px 44px;
    outline: none;
  }
  
  .w-dropdown-link {
    color: #fff;
    background: rgba(22, 22, 22, 0.8);
  }
  
  .w-dropdown-link:hover {
    background: #d5a478;
  }
  .button-6.w-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .play-icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('https://wechat-pics.fangpinduo.com/wehome/website/play.svg') no-repeat center center;
    background-size: contain;
    margin-left: 5px;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets  {
    bottom: 30px;
    height: 0;
  }
</style>