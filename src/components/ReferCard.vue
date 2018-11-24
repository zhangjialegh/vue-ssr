<template>
  <div class="card-scroll-wrapper">
      <div class="div-block-32"><img :src="referItem.avatar" width="80"></div>
      <div class="card">
        <div class="card-info-wrapper _2">
          <p class="client _1">{{referItem.desc}}</p>
          <p class="client _2">{{referItem.title}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name:'ReferCard',
  props: {
		referItem : {
      type: Object,
      default: function () {
        return {}
      }
    },
	}
}
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
}
.client._1 {
  min-height: 111px;
}
.card-scroll-wrapper:hover {
  margin-top: 0 !important;
}
</style>
