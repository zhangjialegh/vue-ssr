<template>
  <div class="container-23 w-container">
    <div class="div-block-36" @click="toggleBar">
      <div class="row-25 w-row">
        <div class="column-49 w-col w-col-11">
          <p class="paragraph-49 no-padding no-padding-bottom"></p>{{$t('问')}}{{title}}</p>
        </div>
        <div class="column-52 w-clearfix w-col w-col-1"><img src="@/assets/images/Chevron.png" width="36" class="image-20" :class="{'rotate-180': show}"></div>
      </div>
      <transition>
        <p class="paragraph-50" v-show="show" v-html="$t('答')+content"></p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToggleBar",
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    toggleBar() {
      this.show = !this.show
    }
  }
};
</script>

<style lang="scss" scoped>
.container-23.w-container {
  margin-bottom: 10px;
  border: none;
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
}
.paragraph-50 {
  white-space: pre-wrap;
  line-height: 22px;
  font-weight: normal;
  color: #999;
  font-size: 14px;
  text-indent: -26px;
  padding-left: 46px;
  @media (max-width: 479px) {
    text-indent: -22px;
    padding-left: 24px;
    font-size: 13px;
  }
}
.paragraph-49.no-padding.no-padding-bottom {
  padding-bottom: 0;
  color: #333;
  font-weight: 600;
  font-size: 15px;
  width: 100%;
}
.image-20 {
    padding: 0 !important;
    height: 7px;
    width: 12px;
    margin: 0 15px !important;
    transition: all 0.5s;
    transform: rotate(180deg)
  }
.image-20.rotate-180 {
    transform: rotate(0);
    display: block;
    position: relative;
  }
@keyframes identifier {
 from {
   height: 0;
   padding-top: 0;
   opacity: 0;
 }
 to {
   height: auto;
   padding-top: 10px;
   opacity: 1;
 }
}
@keyframes against {
 from {
   height: auto;
   padding-top: 10px;
   opacity: 1;
 }
 to {
   height: 0;
   padding-top: 0;
   opacity: 0;
 }
}
.toTop-enter-active {
  animation: identifier 2s;
}
.toTop-leave-active {
  animation: against 2s ;
}
@media (max-width: 479px) {
  .column-49 {
    padding-left: 10px;
    p {
      margin: 0;
    }
  }
}
</style>
