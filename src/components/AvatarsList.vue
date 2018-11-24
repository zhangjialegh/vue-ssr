<template>
  <div class="avatar-list">
    <div class="avatar" v-for="avatar in houseDetail.investor_avatar?houseDetail.investor_avatar:houseDetail.collected_by_user_avatar_uris" v-bind:style="{ backgroundImage: `url(${avatar})`}" :key="avatar"></div>
    <div class="avatar last"></div>
  </div>
</template>

<script>
export default {
  name: "AvatarsList",
  props: {
    houseDetail: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
