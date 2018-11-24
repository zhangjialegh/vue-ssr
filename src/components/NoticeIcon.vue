<template>
  <div>
    <div class="div-block-29" v-if="notice && notice.count">
      <p class="paragraph-46">{{notice.count}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "NoticeIcon",
  computed:{
    notice: function () {
      return this.$store.state.user.notes
    }
  }
};
</script>

<style lang="scss" scoped>
.paragraph-46 {
  line-height: 1.5;
}
@media (min-width: 991px){
  .bell {
    display: block;
  }
  .notice-mobile {
    display: none;
  }
  .div-block-29 {
    margin-top: 25px;
    margin-right: -15px;
  }
  .dropdown-toggle-3.navlist-onle-pc {
    display: none !important;
  }
}
@media (max-width: 991px) {
  .notice-mobile {
    display: inline-block;
  }
}
@media (max-width: 479px) {
  .div-block-29 {
    display: none;
  }
}
</style>
