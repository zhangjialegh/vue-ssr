<template>
  <div class="init-img-wrapper" @click="previewImage">
    <slot></slot>
    <transition-box :show="showPreview">
      <div class="preview-image-wrapper" v-show="showPreview" @click.prevent.stop="closePreview">
        <div class="invitation-card-close home-compare-close" @click.prevent.stop="closePreview"></div>
        <img :src="src" class="image-preview">
      </div>
    </transition-box>
  </div>
</template>
<script>
export default {
  name: "PreviewImage",
  props: {
    src: {
      type: [String,Array],
      default: ''
    }
  },
  data() {
    return {
      showPreview: false
    };
  },
  methods: {
    previewImage() {
      if(this.isWeixin) {
        wx.previewImage({
            current: this.src, // 当前显示图片的http链接
            urls: this.src // 需要预览的图片http链接列表
        });
      } else {
        this.showPreview = true
      }
    },
    closePreview() {
      this.showPreview = false
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
.init-img-wrapper {
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
}
.preview-image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .image-preview {
    max-width: 700px;
    max-height: calc(100vh - 120px);
  }
}
</style>
