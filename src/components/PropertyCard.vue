<template>
  <router-link :to="{path:'/property',query: {property_id: categoryItem.id}}">
    <div class="card">
      <div class="card-img-wrapper"><img v-lazy="categoryItem.cover_pic_uris[0]" sizes="(max-width: 767px) 300px, (max-width: 991px) 230.125px, 300.09375px"></div>
      <div class="card-info-wrapper">
        <div class="card-title">{{categoryItem.title}}</div>
        <div class="div-block-50">
          <div class="div-block-48">
            <div class="card-meta-wrapper text-bold">${{Number.parseInt((categoryItem.price)).toLocaleString('en-US')}}({{$t('约',{msg:Number.parseInt((categoryItem.price*categoryItem.rate))})}}）</div>
            <div class="avatar-list property-card">
              <template v-for="(item,index) in categoryItem.collected_by_user_avatar_uris" >
                <div class="avatar property-card-item" :class="{'avatar-last':index==(categoryItem.collected_by_user_avatar_uris.length-1)}" v-if="index < 3" v-lazy:background-image="item"></div>
                <div class="avatar last" v-if="index==3"></div>
              </template>
              <div class="text-block-21" v-if="categoryItem.collected_by_user_avatar_uris.length > 0">{{$t('感兴趣')}}</div>
            </div>
          </div>
          <div class="card-meta-wrapper">{{categoryItem.bed}}{{$t('室')}} <span class="card-meta-vert-line">|</span>  {{categoryItem.bath}}{{$t('卫')}} <span class="card-meta-vert-line">|</span> {{Number.parseInt((categoryItem.size)).toLocaleString('en-US')}}sqft <span class="card-meta-vert-line">|</span> {{$t('建于',{msg:categoryItem.built_year})}}</div>
        </div>
        <div class="card-return-row w-row">
          <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right">
            <div class="card-number"><span class="text-red">{{(categoryItem.rental_return_rate * 100).toFixed(2)}}%</span> ${{Number.parseInt((categoryItem.rental_return_annual)).toLocaleString('en-US')}}</div>
            <div class="card-label text-left">{{$t('年租金回报')}}</div>
          </div>
          <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right">
            <div class="card-number text-right"><span class="text-red">{{(categoryItem.appreciation_rate_one_year_forecast * 100).toFixed(2)}}%</span> ${{Number.parseInt((categoryItem.appreciation_annual)).toLocaleString('en-US')}}</div>
            <div class="card-label text-right">{{$t('年增值回报')}}</div>
          </div>
        </div>
        <div class="card-return-row no-border w-row">
          <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
            <div class="card-number">${{Number.parseInt((categoryItem.five_year_total_return)).toLocaleString('en-US')}} / 5{{$t('年')}}</div>
            <div class="card-label text-left">{{$t('总体回报')}}</div>
          </div>
          <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
            <div class="div-block-47">
              <div class="card-number">{{categoryItem.score}}</div>
              <div class="text-block-20" :class="{'diamond':categoryItem.score>=90,'gold':categoryItem.score>=80 && categoryItem.score<90,'silver':categoryItem.score>=70 && categoryItem.score<80,'bronze':categoryItem.score<70}"></div>
            </div>
            <div class="card-label text-right">{{$t('WeHome评分')}}</div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "PropertyCard",
  props: {
    categoryItem: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-img-wrapper {
  height: 170px;
}

.card-img-wrapper > img {
  height: 100%;
  width: 100%;
}
.card {
  overflow: hidden;
}
.avatar-last {
  margin-right: 0;
}
.no-margin.text-right {
  text-align: right !important;
}
</style>
