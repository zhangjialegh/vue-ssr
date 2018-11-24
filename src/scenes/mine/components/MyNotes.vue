<template>
   <div>
      <div class="mine-title" v-show="noteLists.length > 0">{{$t('我的消息')}}</div>
      <div class="notification" v-for="(item, index) in noteLists.slice(0,loadingNum)" :key="item.content+index">
        <div class="notification-titile">
          <div class="info-card-title no-margin inline-block">{{item.title}}</div>
        </div>
        <div class="notification-content-notes">
          <p class="paragraph-44" v-if="strMatch(item.content).length == 1">{{item.content}}</p>
          <p class="paragraph-44" v-if="strMatch(item.content).length > 1">{{strMatch(item.content)[0]}}<a class="notification-link" @click="windowHref(strMatch(item.content)[1])">{{$t('立即查看')}}>></a></p>
          <p class="paragraph-45">{{item.created_at}}</p>
        </div>
      </div>
      <div class="div-block-71" v-if="noteLists.length < 1"><img src="@/assets/images/kong-notice.svg" class="image-30">
        <div class="text-block-29">{{$t('暂无消息')}}</div>
      </div>
      <loading-more 
      v-if="noteLists.length > 0"
      :list-arr="noteLists" 
      :loading-num="loadingNum"
      @loading="loadingMore"></loading-more>
    </div>
</template>

<script>
import {
  GET_USER_NOTICE_LIST_ACTION,
  GET_USER_NOTICE_MARKALL_ACTION
} from '@/scenes/mine/modules'

export default {
  name: 'myNotes',
  data () { return {
    noteLists: [],
    loadingNum: 6
  } },
  methods: {
    loadingMore(msg) {
      this.loadingNum = msg
    },
    strMatch: function (s) {
      const str = s.match(/<link>(\S*)<\/link>/)
      if(str) {
        const strPrev = s.match(/(\S*)<link>/)[1]
        return [strPrev, str[1]]
      } else {
        return [str]
      }
    },
    windowHref: function (href) {
      location.href = href
    },
    getNoticeList: function () {
      const that = this
      this.$store.dispatch(GET_USER_NOTICE_LIST_ACTION)
      .then((data)=>{
        that.noteLists = data
      })
    },
    markAllNotice: function () {
      const that = this
      this.$store.dispatch(GET_USER_NOTICE_MARKALL_ACTION)
    }
  },
  mounted: function () {
    if(this.$store.state.auth.auth.isLoggedIn) {
      this.markAllNotice()
      this.getNoticeList()
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-link {
  color: #d5a478;
  cursor: pointer;
}
</style>
