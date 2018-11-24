<template>
  <!-- <div class="tiyanjin-title">海报</div> -->
  <div class="invest_rank">
    <div class="invest_rank_header">
      <img src="https://wechat-pics.fangpinduo.com/website/static/image/invest_rank_title.png">
    </div>
    <div class="w-container invest-rank">
      <div class="invest_rank_box">
        <div>
          <div class="invest-rank-text first">
            <span class="invest-rank-text-nickname">{{ user_score.nickname }}</span> {{$t('的投资影响力分数是')}}
            <span class="invest-rank-text-red">{{ (user_score.total_score * 1.0).toFixed(1) }}</span><!-- .toFixed(0) -->
          </div>
          <div class="invest-rank-text">{{$t('您的投资性格画像是')}}
            <span class="invest-rank-text-red">{{ user_score.animal }}</span>
          </div>
          <span class="animal-button" v-for="item in user_score.animal_tags" :key="item">{{ item }}</span>
        </div>
      </div>
       <div class="invest_rank_box">
        <div>
          <div class="invest-rank-text defeat">{{$t('在投资理财领域')}} 
            <span class="invest-rank-text-red">{{ (user_score.defeat * 100).toFixed(1) }}% </span>{{$t('的人')}} <!-- .toFixed(1) -->
          </div>
          <div id="radar" class="detail-chart-wrapper compare-bar"></div>
        </div>
      </div>
      <div class="invest_rank_box">
        <div>
          <div class="invest-rank-text thank first">{{$t('感谢天使投资用户')}}</div>
          <div class="invest-rank-text thank">{{$t('您的WeHome专属ID序号是')}} {{ user_score.invest_user_id }}</div>
        </div>
        <div>
          <img src="https://wechat-pics.fangpinduo.com/website/static/image/invest_rank_qr.png" style="width: 90px; align-items: right;">
        </div>
      </div>
      <div class="invest_rank_footer">
        <img src="https://wechat-pics.fangpinduo.com/website/static/image/invest_rank_footer.png">
      </div>
    </div>

    <pop-box :show-tip="showTip" :tip="tip">
      <div class="w-row">
        <div class="column-55 w-col w-col-6 float-right single-btn">
        <router-link :to="{path:'/experiencegold'}" class="column-111 w-col w-col-4">
          <a href="javascript:;" class="button-14 w-button" @click="closePopTip">{{$t('确定')}}</a>
        </router-link>
        </div>
      </div>
    </pop-box>
  </div>

</template>

<script>
  import {
    GET_USER_INVEST_SCORE_ACTION
  } from '@/scenes/mine/modules'
  import {
    CHECK_QUALIFICATION_ACTION
  } from '@/scenes/home/modules'
  import {POST_WECHAT_JSSDK_ACTION} from '@/scenes/investing/modules'
  import { track, after } from "trackpoint-tools";// TODO!!!!
  import Track from "@/track"
  var echarts = require('echarts/lib/echarts')    // 引入 ECharts 主模块
  require('echarts/lib/chart/radar')              // 引入柱状图
  require('echarts/lib/component/title')          // 引入提示框和标题组件

  export default {
    name: 'invest_rank',
    data() {
      return {
        user_score: {
          nickname: '',
          invest_user_id: '__',
          all_income_return: '',
          invest_count: 0,
          referral_score: 0,
          reg_epoch: 0,
          rent_income: 0,
          total_score: 0,
          defeat: 0,
          animal: '',
          animal_tags: []
        },
        isLoading: true,
        myChart: null,
        showTip: false,
        tip: ''
      }
    },
    methods: {
      @track(after(function () {
        Track.eventTrack({
          category: 'invest_rank',
          action: 'click',
          optLabel: 'href',
          page: this.$route.name,
          optValue: {
          }
        })
      }))
      reportHref(href) {
        window.open(href)
      },
      checkQualification: function () {
        const that = this
        this.$store.dispatch(CHECK_QUALIFICATION_ACTION,{
          type: 'invest_rank'
        }).then((res)=>{
          that.showJoin = res.success;
          if(!res.success) {
            const tip = res.message;
            that.$options.methods.popTip.call(that, tip);
          }
        })
      },
      popTip: function (tips) {
        if (tips) {
          this.showTip = true
          this.tip = tips
        }
      },
      @track(after(function () {
        Track.eventTrack({
          category: 'experiencegold-close-poptip-button',
          action: 'click',
          optLabel: 'button',
          page: this.$route.name,
          optValue: {
          }
        })
      }))
      closePopTip : function () {
        this.showTip = false
      },
      getUserScore: function() {
        const that = this;
        this.$store.dispatch(GET_USER_INVEST_SCORE_ACTION)
        .then((result)=>{
          if (result.success) {
            that.user_score = result.result;
            that.isLoading = false;
            let option = {
              title: {
                text: ''
              },
              series: [{
                data: [{
                  value : [
                    that.user_score.reg_epoch,
                    that.user_score.rent_income,
                    that.user_score.all_income_return,
                    that.user_score.referral_score,
                    that.user_score.invest_count
                  ]
                }]
              }]
            };
            that.myChart.setOption(option);
          }
        })
      },
      initShare: function () {
      const that = this
      const url = location.href
        if(this.isWeixin) {
          this.$store.dispatch(POST_WECHAT_JSSDK_ACTION,{url})
          .then((res)=>{
              const { app_id } = res
              const { timestamp,nonceStr,signature } = res.result
              wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: app_id, // 必填，公众号的唯一标识
                  timestamp, // 必填，生成签名的时间戳
                  nonceStr, // 必填，生成签名的随机串
                  signature,// 必填，签名
                  jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
              });
              let options = {
                  title: that.$t('今天我们又分红了') + that.user_score.animal, // 分享标题
                  desc: that.$t('房东租金分红日'), // 分享描述
                  link: 'https://h5.fangpinduo.com/invest_rank', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: 'https://wechat-pics.fangpinduo.com/share_logo.jpg', // 分享图标   
                  // imgUrl: 'https://wechat-pics.fangpinduo.com/website/everest/tiyanjin-share-icon-pdd.png', // 分享图标
                  type: 'link', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                  }
                }
              wx.ready(function () {
                wx.onMenuShareAppMessage(options)
                wx.onMenuShareTimeline(options)
              })
          })
        }
      },
    },
    computed:{
      isWeixin() {
        return this.$store.state.base.isWeixin
      },
      auth() {
        return this.$store.state.auth.auth
      }
    },
    mounted() {
      if (this.auth.isLoggedIn) {
        this.getUserScore();
        this.checkQualification();
        this.initShare();
      }
      this.myChart = echarts.init(document.getElementById('radar'));
      window.onresize = () => {
        this.myChart.resize()
      };
      const option = {
        title: {
          text: 'Loading',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#fff',
            fontWeight: 'bolder',
            fontSize: 16,
          }
        },
        radar: {
          name: {
            textStyle: {
              color: '#333',
              padding: [-5, -5],
              fontSize: 14
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
              color: '#000',
              opacity: 0.7
            }
          },
          splitLine: {
            show: false
          },
          indicator: [
            { name: this.$t('投资远见'),   min: 40, max: 100 },
            { name: this.$t('被动收入'),   min: 40, max: 100 },
            { name: this.$t('投资回报率'), min: 40, max: 100 },
            { name: this.$t('人际影响力'), min: 40, max: 100 },
            { name: this.$t('资产实力'),  min: 40, max: 100 }
          ]
        },
        series: [{
          type: 'radar',
          symbol:"none",
          lineStyle: {
            opacity: 0
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#FFE8D3'},
                {offset: 1, color: '#ECD1B0'}
              ]),
            opacity: 1
          },
          data: [{
            value : [80, 80, 80, 80, 80]
          }]
        }]
      };
      this.myChart.setOption(option);
    }
  }
</script>

<style lang="scss" scoped>
  .detail-chart-wrapper.compare-bar {
    padding: 0px;
    height: 200px;
    /*width: 100%;*/
    margin-top: 15px;
    margin-bottom: -25px;
  }
  .invest_rank {
    background-image: url('https://wechat-pics.fangpinduo.com/website/static/image/invest_rank_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .w-container.invest-rank {
    max-width: 500px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .invest_rank_header {
    position: relative;
    display: flex;
    height: 180px;
    padding: 20px 20px;
    justify-content: space-around;
    align-items: center;
  }
@media (max-width: 520px) {
  .invest_rank_header {
    height: 100px;
    padding: 0px 0px;
    margin-bottom: -10px;
  }
}
  .invest_rank_box {
    margin-top: 12px;
    position: relative;
    display: flex;
    padding: 15px 10px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .3);
    justify-content: center;
  }
  .invest-rank-text {
    font-size: 14px;
    font-weight: 450;
    font-family: 'PingFang SC';
    letter-spacing: 0.05em;
    text-align: center;
    color: #000;
    margin-top: 12px;
  }
  .invest-rank-text.first {
    margin-top: 0px;
  }
  .invest-rank-text.defeat {
    margin-top: 0px;
    font-weight: 350;
  }
  .invest-rank-text.thank {
    font-size: 14px;
    font-weight: 350;
    margin-top: 23px;
  }
  .invest-rank-text.thank.first {
    margin-top: 20px;
  }
  .invest-rank-text-red {
    font-size: 22px;
    color: #f00;
  }
  .invest-rank-text-nickname {
    font-size: 18px;
  }
  .invest_rank_footer {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: 20px 40px;
    -webkit-justify-content: space-around;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 95%;
  }
  .animal-button {
    display: inline-block;
    padding: 9px 15px;
    background-color: #464155;
    color: white;
    border: 0;
    line-height: inherit;
    text-decoration: none;
    cursor: pointer;
    border-radius: 0;
    text-align: center;
    border-radius: 33px;
    margin-top: 12px;
    margin-left: 10px;
  }
</style>
