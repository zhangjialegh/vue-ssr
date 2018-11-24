<template>
<div>
  <banner-model :bgImg="'https://wechat-pics.fangpinduo.com/wehome/website/banner/banner-personaltailor.png'">
    <h2 class="banner-title-global">{{$t('高额投资服务')}}</h2>
    <p class="dz-banner-p">{{$t('顶级的智能投资服务')}}</p>
  </banner-model>
    <div class="data-section dz-section-1">
      <div class="dz-container w-container">
        <div class="dz-intro-wrapper">
          <div class="dz-intro-container w-row">
            <div class="dz-intro-item w-col w-col-4">
              <div class="dz-intro-item-block">
                <div class="dz-intro-item-head-pic intro1"></div>
                <div class="dz-intro-item-body">
                  <div class="dz-intro-item-icon intro1"></div>
                  <h5 class="dz-intro-item-title">{{$t('私密小团')}}</h5>
                  <p class="dz-intro-item-p" v-html="$t('与你的好友')"></p>
                  <div class="dz-intro-item-line"></div>
                  <div class="dz-intro-item-desc"><strong class="bold-text-17">{{$t('起投50000')}}</strong></div>
                  <div class="dz-intro-item-text">{{$t('联系客服2')}}</div>
                </div>
              </div>
            </div>
            <div class="dz-intro-item w-col w-col-4">
              <div class="dz-intro-item-block">
                <div class="dz-intro-item-head-pic intro2"></div>
                <div class="dz-intro-item-body">
                  <div class="dz-intro-item-icon intro2"></div>
                  <h5 class="dz-intro-item-title">{{$t('独栋投资')}}</h5>
                  <p class="dz-intro-item-p" v-html="$t('个人股份化的方式')"></p>
                  <div class="dz-intro-item-line"></div>
                  <div class="dz-intro-item-desc"><strong class="bold-text-17">{{$t('起投150000')}}</strong></div>
                  <div class="dz-intro-item-text">{{$t('私人顾问')}}</div>
                </div>
              </div>
            </div>
            <div class="dz-intro-item w-col w-col-4">
              <div class="dz-intro-item-block">
                <div class="dz-intro-item-head-pic intro3"></div>
                <div class="dz-intro-item-body">
                  <div class="dz-intro-item-icon intro3"></div>
                  <h5 class="dz-intro-item-title">{{$t('机构投资')}}</h5>
                  <p class="dz-intro-item-p" v-html="$t('大额资金的股份化方式方散投资')"></p>
                  <div class="dz-intro-item-line"></div>
                  <div class="dz-intro-item-desc"><strong class="bold-text-17">{{$t('起投10000000')}}</strong></div>
                  <div class="dz-intro-item-text">{{$t('顾问上门服务')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-section dz-section-2">
      <div class="dz-step-container w-container">
        <div class="dz-step-wrapper w-row">
          <div class="dz-step-item-left w-col w-col-6">
            <div class="dz-step-item-block">
              <h4 class="dz-step-item-title"><strong>{{$t('提供的服务')}}</strong></h4>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70">{{$t('大数据与智能量化模型')}}<br></p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70">{{$t('协助成立SPV')}}</p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70">{{$t('全程托管')}}</p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70">{{$t('随时支持资产进入')}}</p>
              </div>
            </div>
          </div>
          <div class="dz-step-item-right w-col w-col-6">
            <div class="dz-step-item-right-block step1"></div>
          </div>
        </div>
        <div class="dz-step-wrapper reverse w-row">
          <div class="dz-step-item-left w-col w-col-6">
            <div class="dz-step-item-block">
              <h4 class="dz-step-item-title"><strong>{{$t('为什么要做股份化投资')}}</strong></h4>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70">{{$t('具有风险隔离属性')}}</p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70">{{$t('股权变更更容易')}}</p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70">{{$t('代扣税款')}}</p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70">{{$t('级别资产信息披露')}}</p>
              </div>
            </div>
          </div>
          <div class="dz-step-item-right w-col w-col-6">
            <div class="dz-step-item-right-block step2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-4-new">
        <div class="w-container">
          <h1 class="heading-73">{{$t('投资流程')}}</h1>
          <div class="row-79 w-row">
            <div class="w-col w-col-3">
              <div class="dz-invest-num">1</div>
              <div class="div-block-139"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/dz-invest-1.png" width="60">
                <p class="paragraph-71" v-html="$t('联系WeHome')"></p>
              </div>
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/dz-invest-arrow.png" alt="" class="dz-invest-arrow">
            </div>
            <div class="w-col w-col-3">
              <div class="dz-invest-num">2</div>
              <div class="div-block-139"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/dz-invest-2.png" width="60">
                <p class="paragraph-71" v-html="$t('WeHome定制化选房')"></p>
              </div>
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/dz-invest-arrow.png" alt="" class="dz-invest-arrow">
            </div>
            <div class="w-col w-col-3">
              <div class="dz-invest-num">3</div>
              <div class="div-block-139"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/dz-invest-3.png" width="60">
                <p class="paragraph-71" v-html="$t('全程托管运营')"></p>
              </div>
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/dz-invest-arrow.png" alt="" class="dz-invest-arrow">
            </div>
            <div class="w-col w-col-3">
              <div class="dz-invest-num">4</div>
              <div class="div-block-139"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/dz-invest-4.png" width="60">
                <p class="paragraph-71" v-html="$t('灵活退出')"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</template>

<script>
export default {
  name: 'personaltailor'
}
</script>

<style lang="scss" scoped>
.dz-banner-p {
  font-size: 17px;
  color: #fff;
  font-weight: 300;
  line-height: 24px;
  padding: 10px 30px 0;
  text-align: center;
  @media (max-width: 479px) {
    font-size: 15px;
  }
}
.div-block-139 {
  min-height: 240px;
}
.dz-invest-num {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  color: #4a4a4a;
  font-size: 16px;
  font-weight: 600;
  line-height: 35px;
  text-align: center;
}
.div-block-139 {
  padding: 20px 0;
}
.paragraph-71 {
  font-size: 13px;
}
.section-4-new {
  padding: 40px 0;
}
.dz-invest-arrow {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translate(100%, -50%);
  @media (max-width: 767px) {
    display: none;
  }
}
.w-col.w-col-3 {
  padding: 0 16px;
}
</style>