<template>
  <div class="section-16 _1">
    <div class="container-6 w-container">
      <h4 class="heading-6">{{$t('历史成功项目')}}</h4>
      <div class="card-scroll-container-wrapper">
        <swiper :options="swiperOption" ref="mySwiper" class="card-scroll-container">
          <swiper-slide class="card-scroll-wrapper" v-for="(item, index) in categoryList" v-if="item.project_status==5" :key="item.title+index">
            <ProjectCard :category-item="item" />
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue'
import {GET_PROJECT_ONSALE_ACTION} from '@/scenes/investing/modules'

export default {
  name: 'ProjectList',
  props: {
		category : {
      type: Object,
      default: function () {
        return {}
      }
    },
    type : {
      type: Number,
      default: function () {
        return 1
      }
    }
	},
  components: { ProjectCard },
  data () { 
    return {
    categoryList: [],
    swiperOption: {
          slidesPerView: 'auto',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }
  } },
  methods: {
    getOnSale: function () {
      const that = this
      this.$store.dispatch(GET_PROJECT_ONSALE_ACTION,{}).then((result)=>{
        that.categoryList = result.onsale
      })
    },
  },
  computed: {
    id () {
      return this.category.id
    },
    swiper() {
        return this.$refs.mySwiper.swiper
      }
  },
  mounted () {  
    this.getOnSale() 
  }
}
</script>

<style lang="scss" scoped>
.card-scroll-wrapper {
  width: 310px;
}
.card-scroll-container {
  padding: 10px 0;
}
</style>
