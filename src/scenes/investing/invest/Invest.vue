<template>
  <div>
    <banner-model>
      <h2 class="banner-title-global">{{$t('千万套在售房源')}}<span class="banner-pc-only">，</span><div class="banner-mob-only"></div>{{$t('筛选10钻石级好房')}}</h2>
    </banner-model>
    <div class="home-highlight-section">
      <invest-component></invest-component>
      <!-- 暂时隐藏掉 -->
      <!-- <income-entry></income-entry> -->
    </div>
    <div class="home-properties-section" v-show="marketLen && displayMarket">
      <div class="w-container">
        <div class="home-section-title">{{$t('转售市场')}}</div>
        <div class="form-block-3 w-form">
        </div>
        <market-list @getmarket="getMarketLen"/>
      </div>
    </div>
    <city-component />
    <!-- <property-list v-if="categoryList.length > 0" v-for="(category, idx) in categoryList" :category="category" :key="category.name+idx"/> -->
  </div>
</template>

<script>
import {GET_CITY_CATEGORY_ACTION} from '../modules'

export default {
  name: '',
  data () {
    return {
      categoryList: [],
      marketLen: 0,
      displayMarket: true
    }
  },
  methods: {
    getMarketLen(msg) {
      this.marketLen = msg
    },
    getCategoryList: function () {
      const that = this
      this.$store.dispatch(GET_CITY_CATEGORY_ACTION).then((res) => {
        that.categoryList = res.data
      })
    },
  },
  mounted () {
    this.getCategoryList()
  }
}
</script>

<style lang="scss">
.home-highlight-section {
  position: relative;
}
@media (max-width: 479px) {
  .home-highlight-section {
    padding-bottom: 40px;
  }
}
</style>
