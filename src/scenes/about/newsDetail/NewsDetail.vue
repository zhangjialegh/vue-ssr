<template>
  <div>
  <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/information-banner.jpeg'">
    <h2 class="banner-title-global">{{$t('我们相信')}}<span class="banner-pc-only"></span><div class="banner-mob-only"></div>{{$t('每个人都应该享受到房产投资的红利')}}</h2>
  </banner-model>
  <div class="data-section">
    <div class="container-31 w-container">
      <h4 class="blog-title">{{newsDetail.title}}</h4>
      <p class="paragraph-59" style="white-space:pre-wrap;">{{newsDetail.summary}}</p>
    </div>
  </div>
  </div>
</template>

<script>
import {GET_NEWS_DETAIL_ACTION} from '../modules'

export default {
  name: 'newsDetail',
  data () { return {
    newsDetail: {}
  } },
  methods: {
   loadNewsDetail: function () {
      // load navigation bar data (knowledge categories)
      const that = this
      this.$store.dispatch(GET_NEWS_DETAIL_ACTION,{id: this.id})
      .then((data)=>{
        that.newsDetail = data.news
      })
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created () {
    this.loadNewsDetail()
  }
}
</script>

<style lang="scss" scoped>

</style>