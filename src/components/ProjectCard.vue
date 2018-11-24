<template>
    <router-link :to="{path:'/property',query: {project_id: categoryItem.id}}" class="card-scroll-wrapper">
      <div class="card">
        <div class="card-img-wrapper"><img v-lazy="categoryItem.cover_pic_uris[0]" sizes="(max-width: 767px) 300px, (max-width: 991px) 230.125px, 300.09375px"></div>
        <div class="card-info-wrapper">
          <div class="card-title">{{categoryItem.title}}</div>
          <div class="card-return-row w-row">
            <div class="no-margin w-col w-col-4">
              <p class="days _1">{{((categoryItem.appreciation_rate_one_year_forecast + categoryItem.rental_return_rate_net) * 100).toFixed(2)}}%</p>
              <p class="dayscard">{{$t('年化收益')}}</p>
            </div>
            <div class="no-margin w-col w-col-4">
              <p class="days">{{categoryItem.fundraising_duration}}</p>
              <p class="dayscard center">{{$t('募集周期')}}</p>
            </div>
            <div class="column-31 w-col w-col-4">
              <div class="div-block-47">
                <div class="card-number">{{categoryItem.score}}</div>
                <div class="text-block-20" :class="{'diamond':categoryItem.score>=90,'gold':categoryItem.score>=80 && categoryItem.score<90,'silver':categoryItem.score>=70 && categoryItem.score<80,'bronze':categoryItem.score<70}"></div>
              </div>
              <p class="paragraph-48 right">{{$t('WeHome评分')}}</p>
            </div>
          </div>

          <div class="card-return-row w-row">
            <i class="cube-arrow-top"></i>
            <div class="no-margin w-col w-col-4 w-col-small-4 w-col-tiny-4">
              <div class="days _1">{{(( categoryItem.rental_return_rate_net) * 100).toFixed(2)}}%</div>
              <div class="card-label text-left">{{$t('租金收益率')}}</div>
            </div>

            <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4 ratio-plus-center-wrapper">
              <i class="ratio-plus-center">+</i>
            </div>

            <div class="no-margin w-col w-col-4 w-col-small-4 w-col-tiny-4 text-right">
              <div class="card-number text-right">{{((categoryItem.appreciation_rate_one_year_forecast) * 100).toFixed(2)}}%</div>
              <p class="paragraph-48 right">{{$t('增值收益率')}}</p>
            </div>
          </div>

          <div class="card-return-row w-row">
            <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <avatars-list :house-detail="categoryItem" class="avatar-wrapper"></avatars-list>
              <div class="card-label text-left">{{$t('人参与合投',{msg: categoryItem.investor_count})}}</div>
            </div>
            <div class="no-margin w-col w-col-6 w-col-small-6 w-col-tiny-6 text-right">
              <div class="card-number text-right">${{Number.parseInt(categoryItem.amount_count).toLocaleString('en-US')}}</div>
              <div class="card-label text-right">{{$t('募集金额')}}</div>
            </div>
          </div>
          <div class="card-meta-wrapper">{{categoryItem.bed}}{{$t('室')}}  <span class="card-meta-vert-line">|</span>  {{categoryItem.bath}}{{$t('卫')}} <span class="card-meta-vert-line">|</span> {{Number.parseInt((categoryItem.size)).toLocaleString('en-US')}}sqft <span class="card-meta-vert-line">|</span> {{$t('建于',{msg: categoryItem.built_year})}}</div>
        </div>
      </div>
  </router-link>
</template>

<script>

export default {
  name: "ProjectCard",
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
.days._3 {
  text-align: right;;
}
.dayscard.center {
  text-align: center;
}
.paragraph-48.right {
  text-align: right;
}
.text-right {
  text-align: right !important;
}
.avatar-wrapper {
  text-align: left;
}
.days._1 {
  color: #333;
}
</style>
