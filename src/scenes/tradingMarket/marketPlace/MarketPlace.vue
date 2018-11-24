<template>
  <div>
    <!-- <div class="section-8 invest-bg market-bg">
      <h2 class="market-place-title">投资美国房产<span class="pc-only">，</span><div class="mob-only"></div>从未如此简单</h2>
      <router-link to="/wiretransfer" class="button-6 w-button">100美元起投，马上入金</router-link>
    </div> -->
    <banner-model>
      <h2 class="banner-title-global">{{$t('投资美国房产从未如此简单')}}</h2>
    </banner-model>
    <!-- 滚动播报 暂时隐藏 -->
    <div class="scroll-bar-wrapper">
      <div class="scroll-bar w-container">
        <vue-seamless-scroll :data="optionList" :class-option="optionLeft" class="vue-seamless">
          <ul class="card-scroll-container">
            <li class="scroll-bar-item" v-for="(item,index) in optionList" :key="item.text+index+item.wechat_avatar_uri">
              {{item.text}}
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
    <div class="home-properties-section market-list-wrapper">
      <!-- <income-entry></income-entry> -->
      <div class="w-container">
        <div class="card-scroll-container-wrapper market-list-wrapper">
          <!-- 合投项目 -->
          <div class="home-section-title market-list-title">
            <div>{{$t('投资项目')}}</div>
            <div class="form-block-3 w-form">
              <div class="div-block-121">
                <div class="div-block-122" :class="{'active':model}" @click="modelSwitch(true)"><i class="iconfont icon-pic-model font13"></i>
                  <div class="text-block-47">{{$t('卡片')}}</div>
                </div>
                <div class="div-block-122 after" :class="{'active':!model}" @click="modelSwitch(false)"><i class="iconfont icon-list-model"></i>
                  <div class="text-block-47">{{$t('列表')}}</div>
                </div>
              </div>
            </div>
          </div>
          <invest-component :model="model" :display-title="displayTitle" class="padding-bottom"></invest-component>
          <!-- 转售市场 -->
          <div class="home-section-title market-list-title">
            <div>{{$t('转售市场')}}</div>
          </div>
          <market-list-market-place :model="model" class="padding-bottom" :market-list="resaleList"/>
          <!-- 城市白皮书 -->
          <city-component :city-list="cityList"/>
          <!-- 房源推荐 -->
          <!-- <property-list v-if="categoryList.length > 0" v-for="(category, idx) in categoryList" :category="category" :key="category.name+idx"/> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    GET_CITY_CATEGORY_ACTION,
    GET_BROADCAST_ACTION,
    GET_PROJECT_ONSALE_ACTION,
    GET_QUESTION_STATUS_ACTION,
    GET_RESALE_LIST_ACTION,
    GET_CITY_LIST_ACTION
  } from '@/scenes/investing/modules'

  import { track, after } from 'trackpoint-tools'
  import Track from '@/track'

  export default {
    name: 'invest',
    data() {
      return {
        categoryList:[],
        model: true,
        displayTitle: false,
        marketLen: 0,
        displayMarket: true,
        dayArr: [],
        hArr: [],
        minArr: [],
        secArr: [],
        turnQuenstionares: false,
        showTip: false,
        tip: '',
        show: false,
        swiperOption: {
          slidesPerView: 'auto',
          speed: 4000,
          loop: true,
          autoplay: {
            delay: 0
          }
        }
      }
    },
    methods: {
      getMarketLen(msg) {
        this.marketLen = msg
      },
     modelSwitch: function (bool) {
       this.model = bool
     },
     loadAsync: function() {
       const that = this
        this.$store.dispatch(GET_CITY_CATEGORY_ACTION).then((res)=>{
          that.categoryList = res.data
        })
        this.$store.dispatch(GET_PROJECT_ONSALE_ACTION),
        this.$store.dispatch(GET_BROADCAST_ACTION),
        this.$store.dispatch(GET_RESALE_LIST_ACTION),
        this.$store.dispatch(GET_CITY_LIST_ACTION,{
          showDetail: 0,
          showHidden: 0
        })
     }
    },
    mounted() {
      this.loadAsync()
    },
    computed: {
      optionLeft () {
        return {
          limitMoveNum: 1,
          direction: 2
        }
      },
      optionList () {
        const { optionList } = this.$store.state.invest
        let list = []
        if(JSON.stringify(optionList) !== "{}") {
          list  = optionList.browse_data.concat(optionList.huameibank_data,optionList.invest_data,optionList.pintuan_data,optionList.resale_data).sort((a, b)=>{
              return a - b
            })
        }
        return list
      },
      cityList() {
        return this.$store.state.invest.cityList
      },
      resaleList() {
        const {resaleList} = this.$store.state.invest
        let list = resaleList
            const len = resaleList?resaleList.length:0
            list.forEach((item)=>{
                item.investor_avatar = item.members.map((avatar)=>{
                  return avatar.wechat_avatar_uri
                }).slice(0,4)
                item.investor_count = item.members.length
            })
            
        return list
      },
      auth() {
        return this.$store.state.auth.auth
      }
    }
  }
</script>
<style lang="scss">
.home-highlight-section {
  position: relative;
}
.padding-bottom {
  padding-bottom: 40px;
}
:global(.swiper-container-horizontal > .swiper-wrapper) {
  -webkit-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
}
// .card-scroll-wrapper {
//   width: 33%;
// }

.section-8.invest-bg.market-bg {
  background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/marketplace-bg-v4.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 200px;
  flex-direction: column !important;
}
.home-section-title.market-list-title {
  padding-right: 0 !important;
}
.scroll-bar.w-container {
  overflow: hidden;
}
.vue-seamless {
  width: 930px;
  height: 20px;
  overflow: hidden;
  ul.card-scroll-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .scroll-bar-item {
      white-space: nowrap;
      padding: 0 25px;
    }
  }
}
.market-list-container {
  padding-top: 50px;
}
.iconfont.font13 {
  font-size: 13px;
  line-height: 1;
}
.market-place-title {
    font-family: 'Open Sans', sans-serif;
    color: #fff;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    letter-spacing: 1px;
    margin-bottom: 30px;
    margin-top: 10px;
}
.mob-only {
  display: none;
}
.button-6.w-button {
  margin-top: 30px;
}
@media (max-width: 767px) {
  .card-scroll-container-wrapper.market-list-wrapper {
    padding: 0 10px !important;
  }
}
@media (max-width: 479px) {
  .section-8.invest-bg.market-bg {
    height: 300px;
  }
  .mob-only {
    display: block;
  }
  .pc-only {
    display: none;
  }
  .card-scroll-wrapper {
    width: 100%;
    margin-bottom: 10px;
  }
  .card-scroll-wrapper.pc-only {
    display: none;
  }
  .card-img-wrapper {
    width: 100%;
  }
  .card-info-wrapper {
    width: 100%;
  }
  .home-highlight-section {
    padding-bottom: 40px;
  }
  .button-6.w-button {
    margin-top: 20px;
  }
}

</style>