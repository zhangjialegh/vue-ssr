<template>
  <div>
    <!-- <div class="section-18" :class="{'isWeixin': isWeixin} ">
      <div class="container-30 w-container">
        <h4 class="heading-28">海外房产数据专家</h4>
        <h2 class="heading-10 lab">WeHome Data Lab</h2>
      </div>
    </div> -->
    <banner-model :bg-img="bgImage">
      <h4 class="heading-28">{{$t('海外房产数据专家')}}</h4>
      <h2 class="heading-10 lab">WeHome Data Lab</h2>
    </banner-model>
    <div class="data-section _1">
      <div class="container-4 w-container">
        <div>
          <div id="target1" class="row-31 w-row">
            <div class="column-57 w-col w-col-6">
              <p class="title">{{$t('海量的数据')}}</p>
              <p class="content" v-html="$t('产数据实时监控全美')"></p>
            </div>
            <div class="w-col w-col-6"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/data-global.gif" class="image-31"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-section _2">
      <div class="container-4 w-container">
        <div>
          <div id="target2" class="row-31 w-row">
            <div class="column-57 w-col w-col-6"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/data-lidu.gif" class="image-34"></div>
            <div class="column-58 w-col w-col-6">
              <p class="title">{{$t('精细的粒度')}}</p>
              <p class="content">{{$t('资者的整个决策过')}}</p><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/data-lidu.gif" class="image-33"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-section _1">
      <div class="container-4 w-container">
        <div>
          <div id="target3" class="row-31 w-row">
            <div class="column-57 w-col w-col-6">
              <p class="title">{{$t('丰富的维度')}}</p>
              <p class="content">{{$t('市场周期犯罪率学')}}</p>
            </div>
            <div class="w-col w-col-6"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/data-weidu.gif" width="800" class="image-32"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-section _2">
      <div class="container-4 w-container">
        <div>
          <div id="target4" class="row-31 w-row">
            <div class="column-57 w-col w-col-6"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/data-moxing.gif" class="image-37"></div>
            <div class="column-59 w-col w-col-6">
              <p class="title">{{$t('不断进化的机器学习模型')}}</p>
              <p class="content">{{$t('据机器学习模型为每一')}}</p><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/data-moxing.gif"
                class="image-37 _2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-section _1">
      <div id="target5" class="container-29 w-container">
        <p class="title _2">{{$t('产品')}}</p>
        <div class="div-block-73">
          <div class="data-lab-prodcut-box">
            <p class="data-lab-product" v-html="$t('小程序')"></p>
          </div>
          <div class="data-lab-prodcut-box">
            <p class="data-lab-product" v-html="$t('智能评估插件')"></p>
          </div>
          <div class="data-lab-prodcut-box">
            <p class="data-lab-product">Market Insight <br>dashboard</p>
          </div>
          <div class="data-lab-prodcut-box">
            <p class="data-lab-product" v-html="$t('第三方API')"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'datalab',
    data () {
      return {
        idArr: ['target1', 'target2', 'target3', 'target4', 'target5'],
        idBool: [false, false, false, false, false],
        bgImage: 'linear-gradient(0deg, rgba(68, 84, 102, .31), rgba(5, 5, 5, .52) 100%, rgba(36, 36, 36, .52)), url(https://wechat-pics.fangpinduo.com/wehome/website/banner/data-banner.png)'
      }
    },
    methods: {
      startTimer: function (obj, timer) {
        const that = this
        let opa = Number.parseInt(obj.style.opacity)
        clearInterval(this[timer])
        this[timer] = setInterval(() => {
          if (opa >= 1) {
            clearInterval(that[timer])
            obj.style.opacity = 1
            return
          }
          obj.style.opacity = opa
          opa += 0.2
        }, 100)
      },
      onScrollTop: function () {
        const boolArr = this.idBool
        const that = this
        this.idArr.forEach((item, index) => {
          const objTop = document.getElementById(item).offsetTop
          const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          const windowH = document.documentElement.offsetHeight || document.body.offsetHeight
          const windowHgt = 0.8 * windowH
          if (!this.idBool[index] && windowHgt + scrollTop >= objTop) {
            boolArr[index] = true
            this.idBool = boolArr
            this.$options.methods.startTimer.call(that, document.getElementById(item), 'timer' + index)
          }
        })
      }
    },
    computed: {
      isWeixin() {
        return this.$store.state.base.isWeixin
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>


