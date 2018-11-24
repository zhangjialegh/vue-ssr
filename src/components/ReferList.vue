<template>
  <div class="section-16 _2">
    <div class="container-6 w-container">
      <h4 class="heading-6">用户推荐</h4>
      <div class="card-scroll-container-wrapper">
        <swiper class="card-scroll-container" :options="swiperOption" ref="mySwiper">
          <swiper-slide class="card-scroll-wrapper" v-for="(item, index) in referList" :key="item.title+index">
            <refer-card :refer-item="item"/>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div> 
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import ReferCard from './ReferCard.vue'
import {GET_LANDING_INFO_ACTION} from "@/scenes/investing/modules";

export default {
  name: 'ReferList',
  components: { ReferCard },
  data () { 
		return {
      swiperOption: {
          slidesPerView: 'auto',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
      referList: []
		} 
  },
  computed: {
    swiper() {
        return this.$refs.mySwiper.swiper
      }
  },
  methods: {
    getLanding: function () {
      var that = this
      this.$store.dispatch(GET_LANDING_INFO_ACTION,{}).then((res)=>{
        that.referList = res.indorsers_more
      })
    },
  },
  mounted() {
    this.getLanding()
  }
}
</script>

<style lang="scss" scoped>
.card-scroll-wrapper {
  width: 310px;
}
.card-scroll-container {
  padding: 5px 0;
}
</style>
