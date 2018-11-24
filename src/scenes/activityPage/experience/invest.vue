<template>
  <div class="wire-transfer-section tiyanjin invest">
    <div class="w-container">
      <div class="tianjin-wrapper">
        <!-- <div class="tiyanjin-header-wrapper">
          <div class="tiyanjin-header"></div>
        </div> -->
        <div class="tiyanjin-header-text-title">{{$t('下项目开始赚钱')}}</div>
        <div class="tiyanjin-body-wrapper select">
          <div class="tiyanjin-property-wrapper">
          <swiper class="card-scroll-container" :options="swiperOption" ref="mySwiper">
            <swiper-slide class="card-scroll-wrapper" v-for="(categoryItem, index) in categoryList" :key="categoryItem.title+index">
               <router-link :to="{path:'/property',query: {project_id: categoryItem.id, experience: 'true'}}">
                <div class="card">
                  <div class="card-img-wrapper"><img v-lazy="categoryItem.cover_pic_uris[0]" sizes="(max-width: 767px) 300px, (max-width: 991px) 230.125px, 300.09375px"></div>
                  <div class="card-info-wrapper">
                    <div class="card-title">{{categoryItem.title}}</div>
                    <div class="card-return-row w-row">
                      <div class="no-margin w-col w-col-4">
                        <p class="days _1">{{((categoryItem.appreciation_rate_one_year_forecast + categoryItem.rental_return_rate_net) * 100).toFixed(2)}}%</p>
                        <p class="dayscard">{{$t('预期收益')}}</p>
                      </div>
                      <div class="no-margin w-col w-col-4">
                        <p class="days">30{{$t('天')}}</p>
                        <p class="dayscard center">{{$t('体验周期')}}</p>
                      </div>
                      <div class="column-31 w-col w-col-4">
                        <div class="div-block-47">
                          <div class="card-number">{{categoryItem.score}}</div>
                          <div class="text-block-20" :class="{'diamond':categoryItem.score>=90,'gold':categoryItem.score>=80 && categoryItem.score<90,'silver':categoryItem.score>=70 && categoryItem.score<80,'bronze':categoryItem.score<70}"></div>
                        </div>
                        <p class="paragraph-48 right">{{$t('WeHome评分')}}</p>
                      </div>
                    </div>
                    <div class="card-return-row w-row">
                      <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
                        <div class="days _1">{{((categoryItem.rental_return_rate_net) * 100).toFixed(2)}}%</div>
                        <div class="card-label text-left">{{$t('租金收益率')}}</div>
                      </div>
                      <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right">
                        <div class="card-number text-right">{{((categoryItem.appreciation_rate_one_year_forecast) * 100).toFixed(2)}}%</div>
                        <p class="paragraph-48 right">{{$t('增值收益率')}}</p>
                      </div>
                    </div>
                    <div class="card-return-row w-row">
                      <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
                        <div class="avatar-list _1">
                          <div class="avatar" v-for="(avatar, index) in categoryItem.investor_avatar" v-lazy:background-image="avatar" :key="avatar+index"></div>
                          <div class="avatar last"></div>
                        </div>
                        <div class="card-label text-left">{{$t('人参与合投',{msg:categoryItem.investor_count})}}</div>
                      </div>
                      <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right">
                        <div class="card-number text-right">${{Number.parseInt(categoryItem.initial_value).toLocaleString('en-US')}}</div>
                        <div class="card-label text-right">{{$t('项目总价')}}</div>
                      </div>
                    </div>
                    <div class="card-meta-wrapper flex-center" v-if="categoryItem.tags.length > 0">
                        <span class="tag-item" v-for="(item, index) in categoryItem.tags" :key="item+index">{{item}}</span>
                    </div>
                  </div>
                </div>
            </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
          </div>
          <div class="tiyanjin-btn-wrapper flex"><a class="tiyanjin-btn w-button invest" @click="sureToInvest">{{$t('开始赚美金')}}</a></div>
        </div>
      </div>

      <pop-box :show-tip="showTip" :tip="tip">
        <div class="w-row">
          <div class="column-55 w-col w-col-6">
            <router-link to="/" class="button-13 w-button">{{$t('知道了')}}</router-link>
          </div>
          <div class="column-55 w-col w-col-6">
            <router-link :to="{path: '/experiencegold'}" class="button-14 w-button">{{$t('查看规则')}}</router-link>
          </div>
        </div>
      </pop-box>
      <!-- 领取体验金 -->
      <div class="tiyanjin-drag-shadow" v-show="showExpShadow">
        <transition name="bounce">
          <div class="tiyanjin-drag-wrapper" v-if="showExpDrag" @click="closeExpDrag">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    GET_ACTIVITY_EXT_PROJECT_LIST_ACTION,
    POST_ACTIVITY_ACCEPTINVITE_ACTION
  } from '@/scenes/activityPage/modules'
  import {CHECK_QUALIFICATION_ACTION} from '@/scenes/home/modules'
  import { track, after } from 'trackpoint-tools'
  import Track from '@/track'

  export default {
    name: 'experiencegold',
    data() {
      return {
       swiper:null,
       swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination'
          }
        },
        categoryList: [],
        showJoin: false,
        showTip: false,
        showExpShadow: false,
        showExpDrag: false,
        tip: ''
      }
    },
    methods: {
      // 获取体验金项目列表
      getExpProjectList: function () {
        const that = this
        this.$store.dispatch(GET_ACTIVITY_EXT_PROJECT_LIST_ACTION)
        .then((res)=>{
          that.categoryList = res.results.map((item) => {
            if(item.tags.length > 0) {
              return item
            } else {
              item.tags = [that.$t('优质房源')]
              return item
            }
          }).slice(0,3)
        })
      },
      checkQualification: function () {
        const that = this
        this.$store.dispatch(CHECK_QUALIFICATION_ACTION,{
          type: 'money_exp'
        }).then((res)=>{
          that.showJoin = res.success
          if(!res.success) {
            const tip = res.message
            that.$options.methods.popTip.call(that, tip)
          } else {
            if(!that.$store.state.dragExp) {
              setTimeout(()=>{
                that.showExpShadow = true
                that.showExpDrag = true
              },600)
            }
            
          }
        })
      },
      acceptInvite: function (code) {
        const that = this
        this.$store.dispatch(POST_ACTIVITY_ACCEPTINVITE_ACTION,{code})
      },
      @track(after(function () {
        Track.eventTrack({
          category: 'experienceinvest-selectproject-button',
          action: 'click',
          optLabel: 'button',
          page: this.$route.name,
          optValue: {
          }
        })
      }))
      sureToInvest: function () {
        const idx = this.swiper.activeIndex
        const pId = this.categoryList[idx].id
        if(this.showJoin) {
          this.$router.push({
            path: '/property',
            query: {
              project_id: pId,
              experience: 'true'
            }
          })
        } else {
          this.$options.methods.popTip.call(this, this.tip)
        }
      },
      popTip: function (tips) {
        if (tips) {
          this.showTip = true
          this.tip = tips
        }
      },
      @track(after(function () {
        Track.eventTrack({
          category: 'experienceinvest-close-expdrag-button',
          action: 'click',
          optLabel: 'button',
          page: this.$route.name,
          optValue: {
          }
        })
      }))
      closeExpDrag() {
        const that = this
        this.showExpDrag = false
        this.$store.commit('DRAG_EXPERIENCE')
        setTimeout(() => {
          that.showExpShadow = false
        },500)
      }
    },
    mounted() {
      this.swiper = this.$refs.mySwiper.swiper
      this.getExpProjectList()
      if (this.auth.isLoggedIn) {
        this.checkQualification()
        if(this.$route.query.activity) {
          this.acceptInvite(this.$route.query.activity)
        }
      }
    },
    computed: {
      auth() {
        return this.$store.state.auth.auth
      }
    }
  }
</script>
<style lang="scss" scoped>
.swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }
  .card-scroll-wrapper {
    width: 310px;
    padding: 0;
    margin-top: -5px;
  }
  .card-img-wrapper {
    height: 180px;
    position: relative;
    &:hover .card-img-shadow-wrapper {
      opacity: 0;
    }
  }
  .card-img-shadow-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .card-img-shadow {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 1;
  }
  .card-img-text {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    span {
      display: block;
      padding: 0 15px;
      height: 30px;
      border-radius: 18px;
      line-height: 30px;
      border: 1px solid #fff;
      font-size: 12px;
    }
  }
  .swiper-pagination {
    margin-bottom: -15px;
    padding-top: 15px;
  }
  .tiyanjin-header-text-title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #fff;
    margin: 20px 0 50px;
  }
  @media (max-width: 479px) {
    .card-img-wrapper {
      width: auto;
    }
    .card-info-wrapper {
      width: auto;
    }
    .wire-transfer-section {
      padding-top: 0;
    }
    .card-scroll-container {
      padding-bottom: 20px;
    }
    .swiper-pagination {
      margin-bottom: -35px;
      padding-top: 10px;
    }
    .tiyanjin-header-text-title {
      font-size: 16px;
      line-height: 20px;
      margin: 20px 0 30px;
    }
  }
  .card-img-wrapper > img{
    height: 100%;
    width: 100%;
  }
  .card-scroll-wrapper:hover {
    margin-top: -5px;
  }
  .dayscard.center {
    text-align: center;
  }
  .w-col-tiny-6.text-right {
    text-align: right !important;
  }
  .card-meta-wrapper.flex-center {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .tag-item {
    display: block;
    padding: 5px 10px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #d5a478;
    color: #d5a478;
    margin: 0 5px;
  }
  .tiyanjin-drag-shadow {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .tiyanjin-drag-wrapper {
    width:400px;
    height: 400px;
    background: url('https://wechat-pics.fangpinduo.com/website/tiyanjin/tiyanjin-drag-v3.png') no-repeat center center;
    background-size: contain;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  .fade-leave-active {
    animation: fade-out 0.5s 0.5s fade;
  }
  @keyframes fade-out {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .wire-transfer-section.invest {
    background: linear-gradient(#242424, #43484F)
  }
  .tianjin-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .days._1 {
    color: #333;
  }
</style>