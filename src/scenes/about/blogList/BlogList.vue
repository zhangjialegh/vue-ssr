<template>
  <div>
    <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/information-banner.jpeg'">
      <h2 class="banner-title-global">{{$t('我们相信')}}<span class="banner-pc-only"></span><div class="banner-mob-only"></div>{{$t('每个人都应该享受到房产投资的红利')}}</h2>
    </banner-model>
    <div class="w-container container-add">
      <h4 class="blog-title">{{$t('最新文章')}}</h4>
      <a :href="item.link.replace('https://wehome.io/','/')" class="div-block-80" @click="surfHref(item.link, 'bloglist')" v-for="item in blogList.slice(0, loadingNum)" v-bind:key="item.title">
        <div class="div-block-85" v-lazy:background-image="item.picture"></div>
        <div class="div-block-81">
          <h5 class="heading-29">{{item.title}}</h5>
          <p class="blog-content">{{item.content.slice(0,70)}}...</p>
          <div class="row-36 _1 w-row">
            <div class="column-66 w-col w-col-6">
              <p class="blog-content bottom">{{item.issued_at.split(' ')[0]}}</p>
              <p class="blog-content bottom _2">| {{item.author}}</p>
            </div>
            <div class="column-65 w-col w-col-3">
              <p class="blog-content bottom _1">{{$t('阅读次数')}}</p>
              <p class="blog-content bottom _2">{{item.read_count}}</p>
            </div>
            <div class="column-67 w-col w-col-3"><img src="images/avatar.png" width="20" class="blog-content bottom _1">
              <p class="blog-content bottom _2">{{$t('分钟前阅读',{msg:5})}}</p>
            </div>
          </div>
          <div class="row-36 _2 bottom w-row">
            <div class="column-66 w-col w-col-5">
              <p class="blog-content bottom">{{item.post_datetime}}</p>
              <p class="blog-content bottom _2">| {{item.author}}</p>
            </div>
            <div class="column-65 w-col w-col-7">
              <p class="blog-content bottom _1">{{$t('人已阅读',{msg: item.read_count})}}</p>
            </div>
          </div>
        </div>
      </a>
      <loading-more 
      v-if="blogList.length > 0"
      :list-arr="blogList" 
      :loading-num="loadingNum"
      @loading="loadingMore"></loading-more>
    </div>
  </div>
</template>

<script>
import { track, after } from "trackpoint-tools";
import Track from "@/track";
import { formatHouseDate } from '@/utils/utils'

export default {
  name: "bloglist",
  data() {
    return {
      link: '',
      source: '',
      loadingNum: 6
    };
  },
  methods: {
    loadingMore(msg) {
      this.loadingNum = msg
    },
    /**
     * 获取blog list
     */
    @track(
      after(function() {
        Track.eventTrack({
          category: "blog-item-href",
          action: "click",
          optLabel: "href",
          page: this.$route.name,
          optValue: {
            link: this.link,
            source: this.source
          }
        });
      })
    )
    surfHref: function(link, source) {
      this.link = link
      this.source = source
    }
  },
  computed: {
    isWeixin () {
      return this.$store.state.base.isWeixin
    },
    blogList () {
      return this.$store.state.about.blogList.map((item)=>{
        item.post_datetime = item.issued_at.split(' ')[0]
        return item
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.w-container.container-add {
  padding: 30px 0;
}

.section-23 {
  min-height: calc(100vh - 350px);
}

.div-block-80 {
  transition: all ease-out 0.2s;
}

.div-block-80:hover {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
}
@media (max-width: 479px) {
  .div-block-85 {
    height: 200px;
    width: 100%;
  }
  .column-65 {
    justify-content: flex-end;
  }
  .section-23.is-weixin {
    padding-top: 40px;
  }
}
.blog-content.bottom._1 {
  padding: 10px 0;
}
</style>