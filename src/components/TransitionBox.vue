<template>
 <transition name="fade">
   <div class="div-block-59 div-block-61" v-show="show">
    <transition name="bounce">
      <slot></slot>
    </transition>
  </div>
 </transition>
</template>

<script>
export default {
  name: "TransitionBox",
  props: {
    show: {
        type: Boolean,
        required: false
      },
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity .3s;
}
.fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-out .3s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>
