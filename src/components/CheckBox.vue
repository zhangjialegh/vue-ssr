<template>
  <div>
    <img v-if="checked" src="@/assets/images/checkbox-s.png" :width="size?size:24">
    <img v-else src="@/assets/images/checkbox.png" :width="size?size:24">
  </div>
</template>
<script>
export default {
  name:"CheckBox",
  props: {
      checked: {
        type: Boolean
      },
      size:{
        type: Number
      }
    }
}
</script>