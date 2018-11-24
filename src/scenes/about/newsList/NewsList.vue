<template>
  <div>
    <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/information-banner.jpeg'">
      <h2 class="banner-title-global">{{$t('我们相信')}}<span class="banner-pc-only"></span><div class="banner-mob-only"></div>{{$t('每个人都应该享受到房产投资的红利')}}</h2>
    </banner-model>
    <div class="w-container container-add">
      <h4 class="blog-title">{{$t('房产资讯')}}</h4>
      <router-link class="div-block-100" :to="{path:'/newsDetail',query:{id:item.id}}" v-for="(item,index) in newsList.slice(0, loadingNum)" :key="item.title+index">
        <h5 class="heading-50">{{item.title}}</h5>
        <ul class="news-list-wrapper">
          <li class="blog-content" v-for="(news,idx) in item.bullets" :key="news+idx">{{news}}</li>
        </ul>
        <div class="time-logo-wrapper">
          <p class="blog-content bottom _1">{{item.post_datetime}}</p>
          <p class="blog-content bottom _1">{{$t('人已阅读',{msg:item.readCount})}}</p>
        </div>

        <img class="artical-logo" :src="item.source_logo_uri" :height="item.source_logo_height/8"/>
        
      </router-link>
      <loading-more 
      v-if="newsList.length > 0"
      :list-arr="newsList" 
      :loading-num="loadingNum"
      @loading="loadingMore"></loading-more>
    </div>
  </div>
</template>

<script>
import {GET_NEWS_FEATURED_ACTION} from '../modules'
import {formatHouseDate} from '@/utils/utils'

export default {
  name: 'newslist',
  data () { return {
    newsList: [],
    loadingNum: 6
  } },
  methods: {
    loadingMore(msg) {
      this.loadingNum = msg
    },
    /**
     * 获取blog list
     */
    loadNewsList: function() {
      var that = this
      this.$store.dispatch(GET_NEWS_FEATURED_ACTION)
      .then((data)=>{
        var news = data.news
        for (var i = 0; i < news.length; i++) {
          news[i].post_datetime = formatHouseDate(news[i].post_datetime)
        }
        that.newsList = news
      })
    },
  },
  computed: {
    isWeixin () {
      return this.$store.state.base.isWeixin
    }
  },
  created () {
    this.loadNewsList()
  }
}
</script>

<style lang="scss" scoped>
.w-container.container-add {
  padding: 30px 0;
}
.div-block-100 {
  display: block;
}
.section-23 {
  min-height: calc(100vh - 350px);
}
ul,li{
  padding: 0;
  margin: 0;
}
ul {
  margin: 10px 15px 20px;
}

.blog-content.bottom._1 {
  margin-right: 20px;
}
.time-logo-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.artical-logo {
  margin: 5px 0;
}
@media (max-width: 479px) {
  .section-23.is-weixin {
    padding-top: 40px;
  }
}
</style>