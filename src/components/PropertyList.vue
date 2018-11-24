<template>
  <div class="home-properties-section" v-if="show">
    <div class="w-container">
      <div class="home-section-title">{{category.name}}</div>
      <div class="card-scroll-container-wrapper">
        <swiper class="card-scroll-container" :options="swiperOption" ref="mySwiper">
          <swiper-slide class="card-scroll-wrapper" v-for="(item, index) in category.list" :key="item.title+item.zipcode+index">
            <PropertyCard v-if="category.list.length > 0" :category-item="item"/>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import PropertyCard from './PropertyCard.vue'

export default {
  name: 'PropertyList',
  props: {
		category : {
      type: Object,
      default: function () {
        return {}
      }
    },
    effect: {
      type: String,
      default: function () {
        return 'slide'
      }
    }
	},
  components: { PropertyCard },
  data () { 
    return {
    show: true,
    swiperOption: {
          effect: this.effect,
          slidesPerView: 'auto',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        }
  } },
  methods: {
    getCategory: function () {
      const that = this
      if(this.isWeixin) {
        wx.miniProgram.getEnv(function(res) {
          if(res.miniprogram) {
            that.show = false
          } else {
            that.show = true
          }
        })
      } else {
        that.show = true
      }
    }
  },
  computed: {
    isWeixin() {
      return this.$store.state.base.isWeixin
    }
  },
  created() {
    this.getCategory()
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
