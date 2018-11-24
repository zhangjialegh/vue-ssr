<template>
  <!-- 里程碑 -->
  <div class="info-card detail" v-if="!orderBool&&houseDetail.milestones">
    <div class="text-block-37 lichengbei">{{$t('项目里程碑')}}</div>
    <div class="div-block-112" v-for="(item, index) in houseDetail.milestones" :key="item.title+index">
      <div class="text-block-41">{{item.title}}</div><br/>
      <div class="text-block-42">{{item.time}}</div>
      <div class="div-block-114"></div>
      <div class="div-block-116" v-if="index != houseDetail.milestones.length-1"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'milestones',
  props: {
    houseDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    orderBool: {
      type:Boolean,
      default: function () {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-block-37.lichengbei {
  margin-bottom: 20px;
}
</style>
