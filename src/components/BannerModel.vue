<template>
  <div class="section-8 invest-bg banner-model" :class="{isWeixin: isWeixin}" :style="{backgroundImage: imgType(bgImg)}">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "BannerModel",
  props: {
    bgImg: {
      type: String,
      default: 'https://wechat-pics.fangpinduo.com/wehome/website/marketplace-bg-v4.png'
    }
  },
  methods: {
    imgType(img){
      if(img.indexOf('url')>-1) {
        return img
      } else {
        return `url(${img})`
      }
    }
  },
  computed:{
    isWeixin(){
      return this.$store.state.base.isWeixin
    }
  }
};
</script>

<style lang="scss" scoped>
.section-8.invest-bg.banner-model {
  background-repeat: no-repeat;
  background-size: 100% 400px;
  background-attachment: fixed;
  background-position: top center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 0px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  background-color: #000;
  flex-direction: column;
  height: 260px;
  padding-top: 60px;
  &.isWeixin {
    height: 200px;
    padding-top: 0;
  }
}
@media (max-width: 479px) {
  .section-8.invest-bg.banner-model {
    height: 210px;
    background-size: 100% 210px;
    &.isWeixin {
      height: 150px;
    }
  }
}
</style>
