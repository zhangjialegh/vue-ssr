<template>
  <div class="row-74 w-row" v-if="['home', 'invest', 'information', 'wxmine'].indexOf($route.name) > -1">
    <router-link to="/" class="column-112 w-col w-col-3">
      <div class="image-54 size wx-index" :class="{'active':$route.name=='home'}"></div>
      <h6 class="heading-60" v-bind:class="{'active':$route.name=='home'}">首页</h6>
    </router-link>
    <router-link to="/invest" class="column-112 w-col w-col-3">
      <div class="image-54 size wx-invest" :class="{'active':$route.name=='invest'}"></div>
      <h6 class="heading-60" v-bind:class="{'active':$route.name=='invest'}">合投项目</h6>
    </router-link>
    <router-link to="/information" class="column-112 w-col w-col-3">
      <div class="image-54 size wx-course" :class="{'active':$route.name=='information'}"></div>
      <h6 class="heading-60" v-bind:class="{'active':$route.name=='information'}">市场洞察</h6>
    </router-link>
    <router-link to="/wxmine" class="column-112 w-col w-col-3">
      <div class="notice-dot" v-if="notice && notice.count"></div>
      <div class="image-54 size wx-account" :class="{'active':$route.name=='wxmine'}"></div>
      <h6 class="heading-60" v-bind:class="{'active':$route.name=='wxmine'}">我的</h6>
    </router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      notice: function () {
        return this.$store.state.user.notes
      }
    }
  };

</script>

<style lang="scss" scoped>
  @media (max-width: 479px) {
    .row-74 {
      position: fixed;
      background: #fff;
      z-index: 9999999999;
    }

    .heading-60 {
      font-size: 12px;
      transform: scale(0.9)
    }

    .heading-60.active {
      color: #d5a478;
    }

    .notice-dot {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: red;
      top: 5px;
      left: 60%;
    }

    .image-54.size {
      width: 26px;
      height: 26px;
    }
  }

</style>
