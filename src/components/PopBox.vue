<template>
  <transition-box :show="showTip">
    <div class="div-block-60" v-show="showTip">
      <h5 class="pop-box-title">{{popTitle?popTitle:title}}</h5>
      <p class="paragraph-51 white-pre">{{tip}}</p>
      <slot></slot>
    </div>
  </transition-box>
</template>
<script>
  export default {
    name: 'PopBox',
    data() {
      return {  
        title: this.$t('温馨提示')
      }
    },
    props: {
      popTitle: {
        type: String
      },
      showTip: {
        type: Boolean,
        required: true
      },
      tip: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="scss" scoped>
.white-pre {
  white-space: pre-wrap;
}
.pop-box-title {
  width: 85%;
  margin: 0 auto 20px;
  // background: url('https://wechat-pics.fangpinduo.com/website/popbox/pop-box-title-bg.png') no-repeat center center;
  background-size: contain;
  text-align: center;
  font-size: 18px;
}
</style>
