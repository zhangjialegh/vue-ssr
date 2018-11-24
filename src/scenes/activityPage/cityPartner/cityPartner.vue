<template>
  <div>
    <div class="section-3">
      <div class="w-container">
        <div class="city_partner_title">
          <strong>WeHome合伙人<br/></strong>轻松赚美金
        </div>
        <div class="row-6 w-row">
          <div class="w-col w-col-4">
            <div class="div-block-39"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/city_partner_1.svg" width="43" class="image-3"></div>
            <h5 class="heading-16">更低门槛</h5>
            <p class="paragraph-17">在全美范围内投资优质房产，<br>坐享投资红利，分散投资风险更低</p>
          </div>
          <div class="column-44 w-col w-col-4">
            <div class="div-block-38"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/city_partner_2.svg" width="50" class="image-4"></div>
            <h5 class="heading-17">最优回报</h5>
            <p class="paragraph-16">租金月月分红，房产稳定增值。大数据驱动慧眼识房，远超市场平均回报水平</p>
          </div>
          <div class="column-43 w-col w-col-4">
            <div class="div-block-37"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/city_partner_3.svg" width="44" class="image-5"></div>
            <h5 class="heading-18">稳健增值</h5>
            <p class="paragraph-15">解决买卖、出租海外房产过程中的所有麻烦，股权的可交易性使房产流动性大增</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section-4 city_partner_section2">
      <div class="w-container">
        <h1 class="outward-title">为什么选择成为WeHome合伙人?</h1>
        <ul>
          <li>
            <strong>投资房产，何必整套?</strong>
            <p>开启全新房产投资模式，成为身边人的海外投资意见领袖</p>
          </li>
          <li>
            <strong>提供全程客服支持</strong>
            <p>新手指南、投资工具、合伙人资料包，360度助力</p>
          </li>
          <li>
            <strong>自由灵活，赚取美金!</strong>
            <p>结算简单透明，美金随时到账</p>
          </li>
        </ul>
      </div>
    </div>



    <div class="data-section hiw-section">
    <h1 class="outward-title city_partner">简单3步与WeHome一起赚钱</h1>
    <div class="outward-container w-container first">
      <div class="outward-col w-row">
        <div class="outward-col-item-div">
          <h5 class="outward-col-item-title"><p class="step">Step1</p>申请成为<br/>WeHome合伙人</h5>
          <div class="outward-col-item-icon step1"></div>
        </div>
        <div class="city_step_icon_bar"></div>
        <div class="outward-col-item-div">
          <h5 class="outward-col-item-title"><p class="step">Step1</p>将WeHome<br/>推荐给好友</h5>
          <div class="outward-col-item-icon step2">
          </div>
        </div>
        <div class="city_step_icon_bar"></div>
        <div class="outward-col-item-div last">
          <h5 class="outward-col-item-title"><p class="step">Step1</p>好友注册并投资<br/>即刻获得美金奖励</h5>
          <div class="outward-col-item-icon step3">
          </div>
        </div>
      </div>
      <router-link to="/citypartnerform" class="buttons step w-button city_partner_btn">
        <strong class="bold-text-12">立即申请</strong>
      </router-link>
    </div>

    
    
  </div>
  </div>
</template>

<style lang="scss" scoped>
  .city_partner_title {
    width: 100%;
    text-align: center;
    font-size: 34px;
    color: #000;
    font-weight: 300;
    line-height: 40px;
    padding-bottom: 40px;
    @media (max-width: 479px) {
      font-size: 26px;
    }
  }
  .city_partner_btn {
    display: block;
    margin: 0 auto;
    @media (max-width: 479px) {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      border-radius: 0;
    }
  }
  .city_partner_section2 {
    background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/city_partner_why_bg_1.png');
    ul {
      width: 100%;
      text-align: center;
      list-style: none;
      padding: 0;
      li {
        width: 100%;
        padding-bottom: 30px;
        strong {
          color: #666;
          font-size: 15px;
          display: inline-block;
          margin: 0 auto;
          border-bottom: 1px solid #666;
          margin-bottom: 8px;
        }
      }
    }
  }
  .city_step_icon_bar {
    display: table-cell;
    border-top: 1px dashed #666;
    width: 60px;
    @media (max-width: 767px) {
      display: none;
    }
  }
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
  .outward-col-item-ul.last {
    margin-top: 30px;
  }
  .hiw-step-wrapper {
    background-color: #FAFAFA;
    &.outward {
      min-height: 220px;
    }
  }
  .outward-container.first {
    padding-bottom: 40px;
    display: table;
    border-spacing: 10px;
    @media (max-width: 479px) {
      padding: 0 15px;
    }
  }
  .outward-title {
    padding: 30px 0;
    font-size: 18px;
    text-align: center;
    &.city_partner {
      margin-top: 0;
      padding-top: 60px;
    }
    @media (max-width: 479px) {
      margin: 0;
      padding: 20px 0;
    }
  }
  .outward-col.w-row.first {
    @media (max-width: 479px) {
      border-top: 1px solid #E9E9E9;
    }
  }
  .hiw-step-list {
    @media (max-width: 479px) {
      padding-left: 20px;
    }
  }
  .outward-col-item-div {
    display: table-cell;
    width: 25%;
    background: none;
    @media (max-width: 767px) {
      display: block;
      width: 100%;
    }
    @media (max-width: 479px) {
      min-height: 100px;
      &::after {
      content: '';
      display: block;
      width: 1px;
      height: calc(100% - 70px);
      border-left: 1px dashed #E9E9E9;
      position: absolute;
      top: 65px;
      left: 27px;
    }
    &.last::after {
      display: none;
    }
    }
  }
  .outward-col-item-title {
    padding-top: 45px;
    white-space: nowrap;
    position: relative;
    @media (max-width: 479px) {
      padding-top: 30px;
    }
    .step {
      display: none;
      position: absolute;
      top: 0px;
      font-weight: 300;
      @media (max-width: 767px) {
        display: block;
      }
    }
  }
  .outward-col-item-icon {
    width: 65px;
    height: 65px;
    @media (max-width: 479px) {
      width: 54px;
      height: 54px;
    }
    &.step1 {
      background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/city_partner_step1.svg')
    }
    &.step2 {
      background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/city_partner_step2.svg')
    }
    &.step3 {
      background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/city_partner_step3.svg')
    }
  }
  .column-126 {
    min-height: 250px;
    @media (max-width: 479px) {
      min-height: 160px;
    }
  }
  .hiw-step-title {
    font-size: 15px;
    .mob-only {
      display: none;
      @media (max-width: 767px) {
        display: inline;
      }
    }
  }
  .hiw-step-list-item {
    font-size: 13px;
  }
  .data-section.hiw-section {
    background: #0C111A;
    color: #fff;
    &.step {
      background: #fff;
    }
    &.table {
      background: #fff;
    }
  }
</style>