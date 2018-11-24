<template>
<div class="mine-section">
    <div class="w-container">
      <div class="w-row">
        <div class="w-col w-col-10">
          <div class="column-92 w-col w-col-10">
            <div class="mine-title">历史成功项目</div>
            <div class="row-73 mobile-row w-row">
              <router-link :to="{path:'/property',query: {project_id: categoryItem.id}}" class="column-1 w-col w-col-4" v-for="(categoryItem,index) in categoryList" :key="categoryItem.title+index">
                <div class="card-wrapper-property-2">
                  <div class="card property-2">
                    <div class="card-img-wrapper property-2" v-lazy:background-image="categoryItem.cover_pic_uris[0]">
                    </div>
                    <div class="card-info-wrapper property-2">
                      <div class="card-title property-2">{{categoryItem.title}}</div>
                      <div class="card-return-row w-row">
                    <div class="no-margin w-col w-col-4">
                      <p class="days _1">{{((categoryItem.appreciation_rate_one_year_forecast + categoryItem.rental_return_rate_net) * 100).toFixed(2)}}%</p>
                      <p class="dayscard">年化收益</p>
                    </div>
                    <div class="no-margin w-col w-col-4">
                      <p class="days">{{categoryItem.fundraising_duration}}</p>
                      <p class="dayscard text-center">募集周期</p>
                    </div>
                    <div class="column-31 w-col w-col-4">
                      <div class="div-block-47">
                        <div class="card-number">{{categoryItem.score}}</div>
                        <div class="text-block-20" :class="{'diamond':categoryItem.score>=90,'gold':categoryItem.score>=80 && categoryItem.score<90,'silver':categoryItem.score>=70 && categoryItem.score<80,'bronze':categoryItem.score<70}"></div>
                      </div>
                      <p class="paragraph-48 right">WeHome评分</p>
                    </div>
                  </div>
                  <div class="card-return-row w-row">
                    <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
                      <div class="avatar-list _1">
                        <div class="avatar" v-for="avatar in categoryItem.investor_avatar" v-lazy:background-image="avatar" :key="avatar"></div>
                        <div class="avatar last"></div>
                      </div>
                      <div class="card-label text-left">{{categoryItem.investor_count}}人参与合投</div>
                    </div>
                    <div class="w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right">
                      <div class="card-number text-right">${{Number.parseInt(categoryItem.amount_count).toLocaleString('en-US')}}</div>
                      <div class="card-label text-right">募集金额</div>
                    </div>
                  </div>
                  <div class="card-meta-wrapper">{{categoryItem.bed}}室  <span class="card-meta-vert-line">|</span>  {{categoryItem.bath}}卫 <span class="card-meta-vert-line">|</span> {{Number.parseInt((categoryItem.size)).toLocaleString('en-US')}}sqft <span class="card-meta-vert-line">|</span> 建于{{categoryItem.built_year}}年</div>
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
  import {GET_PROJECT_ONSALE_ACTION} from '@/scenes/investing/modules'

  export default {
    data () {
      return {
        categoryList: []
      }
    },
    methods: {
      getOnSale: function () {
        const that = this
        this.$store.dispatch(GET_PROJECT_ONSALE_ACTION)
        .then((result)=>{
          that.categoryList = result.onsale.filter((item) => {
            return item.project_status==5
          })
        })
      },
    },
    created() {
      this.getOnSale()
    }
  }
</script>

<style lang="scss" scoped>
@media (max-width: 479px) {
  .mine-section {
    padding-top: 0;
    margin-top: 20px;
  }
  .card-info-wrapper.property-2 {
    width: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  .card-title.property-2 {
    padding-left: 0;
  }
  .card-return-row {
    padding-bottom: 0;
  }
  .card-meta-wrapper {
    margin-bottom: 9px;
  }
}
</style>

