<template>
<div>
  <banner-model :bgImg="'https://wechat-pics.fangpinduo.com/wehome/website/static/image/outward-banner-bg.png'">
    <h2 class="banner-title-global">{{$t('Wehome产品出炉全揭密')}}</h2>
    <p class="dz-banner-p">{{$t('从底层资产到分红退出')}}</p>
  </banner-model>
  <div class="data-section hiw-section">
    <h1 class="outward-title">{{$t('WeHome项目运营全流程')}}</h1>
    <div class="outward-container w-container first">
      <div class="outward-col w-row first">
        <div class="outward-col-item-div">
            <h5 class="outward-col-item-title">{{$t('选房')}}</h5>
            <ul class="outward-col-item-ul">
              <li class="outward-col-item-li">{{$t('通过自主研发的智能鹰眼系统')}}</li>
              <li class="outward-col-item-li">{{$t('从宏观区域环境')}}</li>
              <li class="outward-col-item-li">{{$t('对资产进行实地勘察')}}</li>
            </ul>
            <div class="outward-col-item-icon step1">
              <h5 class="outward-col-item-icon-title">Step 1</h5>
            </div>
          </div>
          <div class="outward-col-item-div">
            <h5 class="outward-col-item-title">{{$t('资产转股')}}</h5>
            <ul class="outward-col-item-ul">
              <li class="outward-col-item-li">{{$t('注册SPV')}}</li>
              <li class="outward-col-item-li">{{$t('房屋购买及过户')}}</li>
              <li class="outward-col-item-li" v-html="$t('资产股份化')"></li>
            </ul>
            <div class="outward-col-item-icon step2">
              <h5 class="outward-col-item-icon-title">Step 2</h5>
            </div>
          </div>
          <div class="outward-col-item-div">
            <h5 class="outward-col-item-title">{{$t('资产运营')}}</h5>
            <ul class="outward-col-item-ul">
              <li class="outward-col-item-li">{{$t('房产股权项目')}}</li>
              <li class="outward-col-item-li">{{$t('每月进行租金分红')}}</li>
              <li class="outward-col-item-li">{{$t('联合全美协同网络')}}</li>
            </ul>
            <div class="outward-col-item-icon step3">
              <h5 class="outward-col-item-icon-title">Step 3</h5>
            </div>
          </div>
          <div class="outward-col-item-div last">
            <h5 class="outward-col-item-title">{{$t('退出')}}</h5>
            <ul class="outward-col-item-ul last">
              <li class="outward-col-item-li">{{$t('提供公开市场给')}}</li>
              <li class="outward-col-item-li">{{$t('提供转售市场成交价')}}</li>
            </ul>
            <div class="outward-col-item-icon step4">
              <h5 class="outward-col-item-icon-title">Step 4</h5>
            </div>
          </div>
      </div>
    </div>
  </div>
  <div class="data-section hiw-section step">
    <h1 class="outward-title">{{$t('即可获得投资收益')}}</h1>
    <div class="hiw-step-container">
      <div class="hiw-step-wrapper w-row outward">
        <div class="hiw-step-col-left w-col w-col-6">
          <div class="hiw-step-bg"></div>
        </div>
        <div class="column-126 hiw-step-col-right w-col w-col-6">
          <h3 class="hiw-step-title">{{$t('投资前')}}</h3>
          <ul class="hiw-step-list">
            <li class="hiw-step-list-item">{{$t('房产成本收益分析')}}</li>
            <li class="hiw-step-list-item">{{$t('公司注册信息')}}</li>
            <li class="hiw-step-list-item">{{$t('房屋估价报告')}}</li>
            <li class="hiw-step-list-item">{{$t('房产购买合同')}}</li>
            <li class="hiw-step-list-item">{{$t('房屋检查报告')}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="hiw-step-container">
      <div class="hiw-step-wrapper step-2 w-row outward">
        <div class="hiw-step-col-right w-col w-col-6">
          <h3 class="hiw-step-title">{{$t('投资时')}}</h3>
          <ul class="hiw-step-list">
            <li class="hiw-step-list-item">{{$t('组合管理备忘录')}}</li>
            <li class="hiw-step-list-item">{{$t('认购协议书')}}</li>
            <li class="hiw-step-list-item">{{$t('投资附属协议')}}</li>
          </ul>
        </div>
        <div class="hiw-step-col-left w-col w-col-6">
          <div class="hiw-step-bg step-2"></div>
        </div>
      </div>
    </div>


    <div class="hiw-step-container">
      <div class="hiw-step-wrapper w-row outward">
        <div class="hiw-step-col-left w-col w-col-6">
          <div class="hiw-step-bg step-3"></div>
        </div>
        <div class="column-126 hiw-step-col-right w-col w-col-6">
          <h3 class="hiw-step-title">{{$t('投资后')}}</h3>
          <ul class="hiw-step-list">
            <li class="hiw-step-list-item">{{$t('房屋托管费')}}</li>
            <li class="hiw-step-list-item">{{$t('保险费')}}</li>
            <li class="hiw-step-list-item">{{$t('物业费')}}</li>
            <li class="hiw-step-list-item">{{$t('房产税')}}</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
  <div class="data-section hiw-section table">
    <div class="w-container table">
      <h1 class="outward-title">{{$t('平台收费规则')}}</h1>
      <table border="1">
        <tr>
          <th>{{$t('名称')}}</th>
          <th>{{$t('收费费率')}}</th>
          <th>{{$t('描述')}}</th>
        </tr>
        <tr>
          <td>{{$t('平台认购费')}}</td>
          <td class="text-center">2%</td>
          <td>{{$t('合投项目金额')}}</td>
        </tr>
        <tr>
          <td>{{$t('平台服务费')}}</td>
          <td class="text-center">1.5%</td>
          <td>{{$t('投资年限内')}}</td>
        </tr>
        <tr>
          <td>{{$t('项目收益分成')}}</td>
          <td class="text-center">20%</td>
          <td>{{$t('投资年限到期')}}</td>
        </tr>
        <tr>
          <td>{{$t('转售股权手续费')}}</td>
          <td class="text-center">2%</td>
          <td>{{$t('按照买入金额')}}</td>
        </tr>
      </table>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'outward'
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
.hiw-step-bg {
  background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/outward-pic1.png');
  &.step-2 {
    background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/outward-pic2.png');
  }
  &.step-3 {
    background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/outward-pic3.png');
  }
}
.outward-title {
  padding: 30px 0;
  font-size: 18px;
  text-align: center;
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
    top: 70px;
    left: 20px;
  }
   &.last::after {
     display: none;
   }
  }
}
.outward-col-item-icon {
  &.step1 {
    background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/outward-step1.svg')
  }
  &.step2 {
    background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/outward-step2.svg')
  }
  &.step3 {
    background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/outward-step3.svg')
  }
  &.step4 {
    background-image: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/outward-step4.png')
  }
}
.hiw-step-bg {
  height: 250px;
  @media (max-width: 479px) {
    height: 200px;
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
  &.step {
    background: #fff;
  }
  &.table {
    background: #fff;
  }
}
.w-container.table {
  padding-bottom: 70px;
}
table {
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  background: #fff;
  border: 1px solid #E9E9E9;
  margin: 0 auto;
  color: #000;
  @media (max-width: 479px) {
    font-size: 12px;
  }
  th {
    background: #F8F8F8;
    padding: 10px 15px;
  }
  td {
    padding: 10px 15px; 
  }
}
</style>