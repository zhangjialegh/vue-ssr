<template>
<div class="mine-section">
    <div class="w-container">
      <div class="w-row">
        <div class="w-col w-col-10">
          <div class="column-92 w-col w-col-10">
            <div class="mine-title">城市白皮书</div>
            <div class="row-73 mobile-row w-row">
              <router-link :to="{path:'/city',query: {id: cityItem.id}}" class="column-1 w-col w-col-4" v-for="(cityItem,idx) in cityList" :key="cityItem.title+idx">
              <div class="card-wrapper-property-2">
                  <div class="card property-2">
                     <div class="card-img-wrapper">
                    <img v-lazy="cityItem.cover_pic_uri" sizes="(max-width: 767px) 300px, (max-width: 991px) 230.125px, 300.09375px">
                    <div class="card-img-text _2">
                      <div class="div-block-46">
                        <template v-for="(item, index) in stars" >
                          <div class="div-block-45" v-if="cityItem.star>=(index+1)"></div>
                          <div class="div-block-45 half-star" v-if="cityItem.star>(index+1) && cityItem.star<(index+2)"></div>
                        </template>
                      </div>
                      <div class="text-block-19">{{cityItem.num_collected_by}}人正在关注</div>
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
                        <div class="card-label">中间价格</div>
                      </div>
                      <div class="text-center w-col w-col-6 w-col-small-6 w-col-tiny-6">
                        <div class="card-number medium">{{(cityItem.average_return_rate * 100).toFixed(2)}}%</div>
                        <div class="card-label">平均收益率</div>
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
               </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
  
</template>
<script>
  import {GET_CITY_LIST_ACTION} from '@/scenes/investing/modules'

  export default {
    data () {
      return {
        cityList: [],
        stars: [0,2,4,6,8]
      }
    },
    methods: {
      getCityList: function () {
        const that = this
        this.$store.dispatch(GET_CITY_LIST_ACTION,{
          showDetail: 0,
          showHidden: 0
        }).then((res)=>{
          that.cityList = res
        })
      },
    },
    created() {
      this.getCityList()
    }
  }
</script>

<style lang="scss" scoped>
@media (max-width: 479px) {
  .mine-section {
    padding-top: 0;
    margin-top: 20px;
  }
  .card-img-wrapper {
    width: 100%;
  }
  .card-img-wrapper > img {
    width: 100%;
  }
  .card-info-wrapper {
    width: 100%;
  }
}
</style>

