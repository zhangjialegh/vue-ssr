<template>
  <div>
    <slot>
      <div class="card highlight-card">
        <div class="home-highlight-img shimmer-animation"><div class="card-tag"></div></div>
        <div class="w-row">
          <div class="w-col w-col-8"></div>
          <div class="highlight-info-wrapper w-col w-col-4">
            <div class="card-title highlight shimmer-animation">奥兰多独栋住宅产权投资项目</div>
            <div class="card-return-row highlight w-row">
              <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
                <div class="card-number red shimmer-animation">13.16%</div>
                <div class="card-label text-left">年化收益</div>
              </div>
              <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
                <div class="card-number text-center shimmer-animation">13.16%</div>
                <div class="card-label _1">收益周期</div>
              </div>
              <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
                <div class="card-number text-right shimmer-animation">13.16%</div>
                <div class="card-label _2">房屋总价</div>
              </div>
            </div>
            <div class="card-return-row highlight w-row">
              <div class="text-left w-col w-col-4 w-col-small-4 w-col-tiny-4">
                <div class="card-number red shimmer-animation">13.16%</div>
                <div class="card-label text-left">租金收益率</div>
              </div>
              <div class="text-center w-col w-col-4 w-col-small-4 w-col-tiny-4">
                <div class="card-number text-center shimmer-animation">13.16%</div>
                <div class="card-label _1">首年加息</div>
              </div>
              <div class="text-right w-col w-col-4 w-col-small-4 w-col-tiny-4">
                <div class="card-number text-right shimmer-animation">13.16%</div>
                <div class="card-label _2">房屋总价</div>
              </div>
            </div>
            <div class="card-progress-wrapper">
              <div class="w-row">
                <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="text-block-14 shimmer-animation">60%</div>
                </div>
                <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="avatar-list">
                  </div>
                </div>
              </div>
              <div class="card-progress-bar-base shimmer-animation">
              </div>
              <div class="w-row">
                <div class="text-left w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="card-number left shimmer-animation">$89,000</div>
                  <div class="card-label text-left">可认购额</div>
                </div>
                <div class="text-right w-col w-col-6 w-col-small-6 w-col-tiny-6">
                  <div class="card-number right shimmer-animation">11 天</div>
                  <div class="card-label _2">距离结束</div>
                </div>
              </div><a class="button card-button w-button shimmer-animation">立即参与合投</a></div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
  export default {
    name: 'InvestSlot'
  }
</script>
<style lang="scss" scoped>
.shimmer-animation {
  background: #F1F1F1 !important;
  background-image: linear-gradient(to right, #F1F1F1 0%, rgba(224,224,224,0.5) 50%, #F1F1F1 100%) !important;
  background-repeat: no-repeat;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
}   

.highlight-card div, .highlight-card a{
  color: transparent !important;
  border: none !important;
}

@keyframes shimmer {
  0% {
      background-position: -960px 0;
  }

  100% {
      background-position: 960px 0;
  }
}

</style>
