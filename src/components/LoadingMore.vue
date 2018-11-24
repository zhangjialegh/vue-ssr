<template>
  <div class="loading-more" :class="{'disable': !showLoading}" @click="loadingMoreInfo">
    <img src="@/assets/images/loading.svg" alt="加载..." class="loading-image" v-if="loading">{{loading?$t('加载中'):showLoading?$t('点击加载更多'):$t('没有更多了')}}
  </div>
</template>

<script>
export default {
  name: "LoadingMore",
  props: {
    listArr: {
      type: Array,
      default: function() {
        return [];
      }
    },
    loadingNum: {
      type: Number,
      default: function() {
        return this.GLOBAL.loadInitNum;
      }
    }
  },
  data() {
    return {
      loadingStep: this.GLOBAL.loadPerStep,
      loading: false,
      loadingNumState: this.loadingNum
    };
  },
  computed: {
    showLoading () {
      if(this.loadingNumState >= this.listArr.length) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    loadingMoreInfo: function () {
      if(!this.showLoading) return;
      this.loading = true
      setTimeout(()=>{
        this.loading = false
        this.loadingNumState += this.loadingStep
        this.$emit('loading', this.loadingNumState)
      },800)
    },
  }
};
</script>

<style lang="scss" scoped>
.loading-more {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #d5a478;
  margin-top: 10px;
  cursor: pointer;
}
.loading-more.disable {
  color: #cccccc;
}
.loading-image {
  height: 26px;
  margin-right: 15px;
}
</style>
