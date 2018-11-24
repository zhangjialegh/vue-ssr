<template>
  <transition-box :show="show">
    <div class="video-wrapper" v-show="show">
      <div class="invitation-card-close video-box-close" @click="closeVideoModel"></div>
      <video preload="none" autoplay controls v-if="show">
        <source type="video/ogg" :src="$i18n.locale==GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/website/banner/video/wehome-website-investing-what.ogg':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/en_what_invest.ogg'">
        <source type="video/mp4" :src="$i18n.locale==GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/website/banner/video/wehome-website-investing-what.mp4':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/en_what_invest.mp4'">
      </video>
    </div>
  </transition-box>
</template>

<script>

export default {
  name: "VideoModel",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeVideoModel() {
      this.$emit('closeVideo', false)
    }
  }
};
</script>

<style lang="scss" scoped>
.video-wrapper {
  display: block;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -379px;
  margin-top: -224px;
  padding: 9px;
  width: 758px;
  height: 448px;
  background-color: #fff;
  @media (max-width: 479px) {
    margin-left: -150px;
    margin-top: -90px;
    padding: 5px;
    width: 300px;
    height: 180px;
  }
  video {
    width: 740px;
    height: 430px;
    @media (max-width: 479px) {
      width: 290px;
      height: 170px;
    }
  }
}
.invitation-card-close.video-box-close {
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: -20px;
  width: 36px;
  height: 35px;
  border-radius: 50%;
  background-size: 16px 16px;
  background-color: #fff;
  z-index: 119001;
  @media (max-width: 479px) {
    right: -9px;
    top: -12px;
    width: 24px;
    height: 24px;
    background-size: 10px 10px;
  }
}
</style>
