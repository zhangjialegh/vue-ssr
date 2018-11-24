<template>
  <div>
    <slot>
      <div class="card">
        <div class="card-img-wrapper shimmer-animation">
        </div>
        <div class="card-info-wrapper">
          <div class="w-row">
            <div class="border-right text-center w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <div class="card-number medium shimmer-animation">13.16%</div>
              <div class="card-label">收益周期</div>
            </div>
            <div class="text-center w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <div class="card-number medium shimmer-animation">13.16%</div>
              <div class="card-label">收益周期</div>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CityCardSlot'
}
</script>

<style lang="scss" scoped>
.shimmer-animation {
  background: #F1F1F1;
  background-image: linear-gradient(to right, #F1F1F1 0%, rgba(224,224,224,0.5) 50%, #F1F1F1 100%);
  background-repeat: no-repeat;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
}   

.card div{
  color: transparent !important;
  border: none !important;
}

.card-img-wrapper {
  height: 220px;
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
