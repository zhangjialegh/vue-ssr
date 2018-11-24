<template>
  <div>
    <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/information-banner.jpeg'">
      <h2 class="banner-title-global">{{$t('我们相信')}}<span class="banner-pc-only"></span><div class="banner-mob-only"></div>{{$t('每个人都应该享受到房产投资的红利')}}</h2>
    </banner-model>
    <div class="data-section">
      <div class="container-31 w-container">
        <h4 class="blog-title">{{$t('热门文章')}}</h4>
        <div class="row-32 w-row">
          <a :href="item.link.replace('https://wehome.io/','/')" @click="surfHref(item.link, 'hot')" class="column-61 w-col w-col-4" v-for="(item,index) in blogHotList" v-if="index<3" :key="item.title+index">
            <div class="blog-wrapper">
              <div class="div-block-86" v-lazy:background-image="item.picture+'?imageView2/2/w/375'"></div>
              <div class="div-block-88">
                <h4 class="heading-33">{{item.title}}</h4>
                <p class="paragraph-58">{{item.content.slice(0,60)}}...</p>
                <div class="row-38 w-row">
                  <div class="column-71 w-col w-col-6">
                    <p class="blog-content bottom">{{item.issued_at.split(' ')[0]}}</p>
                    <p class="blog-content bottom _2">| {{item.author}}</p>
                  </div>
                  <!-- <div class="column-72 w-col w-col-6"><img src="@/assets/images/avatar.png" width="20" height="20">
                    <p class="blog-content bottom _1">5分钟前阅读</p>
                  </div> -->
                  <div class="column-72 w-col w-col-6">
                    <p class="blog-content bottom _1">{{$t('人已阅读',{msg:item.read_count})}}</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="section-lecture">
      <div class="w-container">
        <div class="div-block-83" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/lecture-xuanchuan-banner.png'"></div>
      </div>
    </div>
    <div class="section-21">
      <div class="w-container">
        <div class="w-row">
          <div class="w-col w-col-9">
            <h4 class="blog-title">{{$t('最新文章')}}
              <router-link to="/bloglist" class="more-info">{{$t('更多')}}>></router-link>
            </h4>
            <a :href="item.link" target="_blank" @click="surfHref(item.link, 'new')" class="div-block-80" v-for="(item,index) in blogList" v-if="index<5" :key="item.title+index">
              <div class="div-block-85" v-lazy:background-image="item.picture+'?imageView2/2/w/375'"></div>
              <div class="div-block-81">
                <h5 class="heading-29">{{item.title}}</h5>
                <p class="blog-content">{{item.content.slice(0,60)}}...</p>
                <div class="row-36 _2 bottom w-row">
                  <div class="column-66 w-col w-col-5">
                    <p class="blog-content bottom">{{item.issued_at.split(' ')[0]}}</p>
                    <p class="blog-content bottom _2">| {{item.author}}</p>
                  </div>
                  <div class="column-65 w-col w-col-7">
                    <p class="blog-content bottom _1">{{$t('人已阅读',{msg:item.read_count})}}</p>
                    <!-- <div class="avatar-list blog">
                      <div class="avatar"></div>
                      <div class="avatar"></div>
                      <div class="avatar"></div>
                      <div class="avatar last"></div>
                    </div> -->
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="column-64 w-col w-col-3">
            <h4 class="blog-title">{{$t('房产资讯')}}
              <router-link to="/newslist" class="more-info">{{$t('更多')}}>></router-link>
            </h4>
            <router-link :to="{path:'/newsDetail',query:{id:item.id}}" class="row--34 w-row news" v-for="(item,index) in newsList" v-if="index<3" :key="item.title+index">
              <div class="column-73 w-col w-col-2 w-nopadding">
                <h3 class="heading-30">{{index+1}}</h3>
              </div>
              <div class="column-74 w-col w-col-10">
                <h4 class="heading-31">{{item.title}}</h4>
                <ul class="news-list-wrapper">
                  <li class="paragraph-57" v-for="news in item.bullets" :key="news">{{news}}</li>
                </ul>
                <img v-lazy="item.source_logo_uri" :height="item.source_logo_height/8" />
                <div class="time-logo-wrapper">
                  <p class="paragraph-57 bottom_1">{{item.post_datetime}}</p>
                  <p class="paragraph-57 bottom_1">{{$t('人已阅读',{msg:item.readCount})}}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="section-22">
      <div class="container-33 w-container">
        <h4 class="blog-title">{{$t('投资工具')}}</h4>
        <div class="row-35 w-row">
          <router-link :to="{path:'/investmentTool',query: {id: index}}" class="w-col w-col-4" v-for="(item,index) in tabArray" v-if="index<3" :key="item.name+index">
            <div class="div-block-82"><img :src="imageArray[index]" width="20" height="20" class="image-46">
              <h5 class="heading-32">{{item.name}}</h5>
            </div>
          </router-link>
        </div>
        <div class="row-35 w-row">
          <router-link :to="{path:'/investmentTool',query: {id: index}}" class="w-col w-col-4" v-for="(item,index) in tabArray" v-if="index>2&&index<5" :key="item.name+index">
            <div class="div-block-82"><img :src="imageArray[index]" width="20">
              <h5 class="heading-32">{{item.name}}</h5>
            </div>
          </router-link>
          <router-link :to="{path:'/investmentTool'}" class="w-col w-col-4">
            <div class="div-block-82"><img src="https://wechat-pics.fangpinduo.com/website/information/Combined-Shape.png" width="20">
              <h5 class="heading-32">{{$t('更多内容')}}</h5>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    GET_KNOWLEDGE_CATEGORIES_ACTION,
    GET_KNOWLEDGE_DETAIL_ACTION,
    GET_NEWS_FEATURED_ACTION
  } from '../modules.js'
  import {
    formatHouseDate
  } from '@/utils/utils'
  import { track, after } from 'trackpoint-tools'
  import Track from '@/track'
  
  export default {
    name: 'information',
    data () {
      return {
        newsList:[],
        catDetailArr:[],
        tabArray: [],
        imageArray: ['https://wechat-pics.fangpinduo.com/website/information/money-bag.png', 'https://wechat-pics.fangpinduo.com/website/information/balance.png', 'https://wechat-pics.fangpinduo.com/website/information/bank.png', 'https://wechat-pics.fangpinduo.com/website/information/credit-card.png', 'https://wechat-pics.fangpinduo.com/website/information/piggy-bank.png', 'https://wechat-pics.fangpinduo.com/website/information/Combined-Shape.png'],
        blogPoint: {
          link: '',
          source: ''
        }
      }
    },
    methods: {
      @track(after(function () {
        Track.eventTrack({
          category: 'blog-item-href',
          action: 'click',
          optLabel: 'href',
          page: this.$route.name,
          optValue: this.blogPoint
        })
      }))
      surfHref: function (link, source) {
        this.blogPoint = {
          link,
          source
        }
      },
      loadKownledge: function () {
        // load navigation bar data (knowledge categories)
        const that = this
        this.$store.dispatch(GET_KNOWLEDGE_CATEGORIES_ACTION)
        .then((res)=>{
          const cats = res.data.categories
          that.tabArray = cats
          for (var i = 0; i < cats.length; i++) {
            var id = cats[i].id
            that.$options.methods.loadCatDetail.call(that, id, i)
          }
        })
      },
  
      loadCatDetail: function (id, navIndex) {
        var that = this
        this.$store.dispatch(GET_KNOWLEDGE_DETAIL_ACTION,{id})
        .then((res)=>{
          const catDetailArr = that.catDetailArr
          catDetailArr[navIndex] = res
          that.catDetailArr = catDetailArr
        })
      },
      loadNewsList: function () {
        var that = this
        this.$store.dispatch(GET_NEWS_FEATURED_ACTION)
        .then((data)=>{
          var news = data.news
          for (var i = 0; i < news.length; i++) {
            news[i].post_datetime = formatHouseDate(news[i].post_datetime)
          }
          that.newsList = news
        })
      }
    },
    computed: {
      isWeixin () {
          return this.$store.state.base.isWeixin
        },
      blogList () {
        return this.$store.state.about.blogList
      },
      blogHotList () {
        return this.$store.state.about.hotBlogList
      }
    },
    created () {
      this.loadKownledge()
      this.loadNewsList()
    }
  }
</script>

<style lang="scss" scoped>
.data-section {
  padding-top: 0;
}
.paragraph-57.bottom_1 {
  color: #d5a478;
  font-weight: 400;
}

.row--34 {
  display: block;
  padding: 40px 0 0 0;
}

ul,
li {
  margin: 0;
  padding: 0;
}

@media (max-width: 479px) {
  .section-lecture {
    display: none;
  }
  .column-65 {
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .row--34 {
    display: block;
    padding: 10px 30px;
  }
  ul {
    margin-left: 15px;
    margin-top: 10px;
  }
  .heading-30 {
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
  }
  .div-block-85 {
    width: 100%;
    height: 200px;
  }
  .div-block-24.is-weixin {
    top: 140px;
  }
}

.w-nopadding {
  padding: 0;
}

@media (min-width: 479px) {
  .heading-33 {
    min-height: 48px;
  }
}

.div-block-88 {
  padding: 0 10px;
}

.heading-30 {
  padding: 0 10px;
}

.blog-wrapper,
.div-block-80,
.row--34 {
  transition: all ease-out .2s;
}

.blog-wrapper:hover {
  box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.1);
}

.div-block-80:hover {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
}

.more-info {
  float: right;
  color: #d5a478;
  font-size: 14px;
}

.blog-content.bottom._1 {
  padding: 10px 0;
}

.time-logo-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.news-list-wrapper {
  margin: 10px 0 17px;
}
</style>