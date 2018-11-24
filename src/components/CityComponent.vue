<template>
  <div class="home-cities-section">
    <div class="w-container">
      <div class="home-section-title">{{$t('城市白皮书')}}</div>
      <div class="card-scroll-container-wrapper">
        <city-card-slot>
          <swiper class="card-scroll-container" :options="swiperOption" ref="mySwiper" v-if="cityList.length > 0">
            <swiper-slide class="card-scroll-wrapper" v-for="cityItem in cityList" :key="cityItem.title">
              <router-link :to="{path:'/city',query: {id: cityItem.id}}" class="city-crad-wrapper">
                  <div class="card-img-wrapper">
                    <img v-lazy="cityItem.cover_pic_uri" sizes="(max-width: 767px) 300px, (max-width: 991px) 230.125px, 300.09375px">
                    <div class="card-img-text _2">
                      <div class="div-block-46">
                        <template v-for="(item, index) in stars" >
                          <div class="div-block-45" v-if="cityItem.star>=(index+1)" :key="$t('全')+cityItem.title+index"></div>
                          <div class="div-block-45 half-star" v-if="cityItem.star>(index+1) && cityItem.star<(index+2)" :key="$t('半')+cityItem.title+index"></div>
                        </template>
                      </div>
                      <div class="text-block-19">{{$t('人正在关注',{msg:cityItem.num_collected_by})}}</div>
                    </div>
                    <div class="card-img-text">
                      <div class="card-img-text-large">{{cityItem.title}}</div>
                      <div>{{cityItem.display_name}}</div>
                    </div>
                  </div>
                  <div class="card-info-wrapper">
                    <div class="w-row">
                      <div class="border-right text-center w-col w-col-6 w-col-small-6 w-col-tiny-6">
                        <div class="card-number medium">{{Number.parseInt(cityItem.average_purchase_price).toLocaleString('en-US')}}</div>
                        <div class="card-label">{{$t('中间价格')}}</div>
                      </div>
                      <div class="text-center w-col w-col-6 w-col-small-6 w-col-tiny-6">
                        <div class="card-number medium">{{(cityItem.average_return_rate * 100).toFixed(2)}}%</div>
                        <div class="card-label">{{$t('平均收益率')}}</div>
                      </div>
                    </div>
                  </div>
              </router-link>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div> 
          </swiper>
        </city-card-slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityComponent',
  data () { 
		return {
      swiperOption: {
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      stars: [0,0,0,0,0]
		} 
  },
  props: {
    cityList: { type: Array, required: true }
  }
}
</script>

<style lang="scss" scoped>
.card-scroll-wrapper {
  width: 310px;
}
.city-crad-wrapper {
  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  display: block;
}
.card {
  overflow: hidden;
}
.card-img-wrapper {
  height: 220px;
}
.card-img-wrapper > img{
  height: 100%;
  width: 100%;
}
.card-scroll-container {
  padding: 5px 0;
}
</style>
