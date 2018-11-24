<template>
<div>
  <banner-model :bgImg="'https://wechat-pics.fangpinduo.com/wehome/website/banner/wehome-banner.jpg'">
    <h2 class="banner-title-global">How it Works</h2>
  </banner-model>
  <div class="data-section hiw-section">
    <h1 class="hiw-title"><strong>{{$t('只需3步即可获得投资收益')}}</strong></h1>
    <div class="hiw-step-container">
      <div class="hie-step-line-start"></div>
      <div class="hiw-step-circle">1</div>
      <div class="hiw-step-wrapper w-row">
        <div class="hiw-step-col-left w-col w-col-6">
          <div class="hiw-step-bg"></div>
        </div>
        <div class="column-126 hiw-step-col-right w-col w-col-6">
          <h3 class="hiw-step-title"><span class="mob-only">1. </span>{{$t('项目认购')}}</h3>
          <p class="hiw-step-p">{{$t('您有两种方式参与房产股权投资')}}</p>
          <ul class="hiw-step-list">
            <li class="hiw-step-list-item">
              <div class="hiw-step-list-item-title"><strong>{{$t('项目认购期投资')}}</strong></div>
              <p class="hiw-step-list-item-p">{{$t('在认购期投资')}}</p>
            </li>
            <li class="hiw-step-list-item">
              <div class="hiw-step-list-item-title"><strong>{{$t('转售市场认购')}}</strong></div>
              <p class="hiw-step-list-item-p">{{$t('您也可以在转售市场认购房产股份')}}</p>
            </li>
          </ul><router-link to="/invest" class="hiw-step-spec-btn w-button"><strong>{{$t('马上投资')}}</strong></router-link></div>
      </div>
    </div>
    <div class="hiw-step-container">
      <div class="hiw-step-wrapper step-2 w-row">
        <div class="hiw-step-col-right w-col w-col-6">
          <h3 class="hiw-step-title"><span class="mob-only">2. </span>{{$t('租金分红')}}</h3>
          <p class="hiw-step-list-item-p">{{$t('WeHome负责房屋的租赁管理和维护')}}</p>
        </div>
        <div class="hiw-step-col-left w-col w-col-6">
          <div class="hiw-step-bg step-2"></div>
        </div>
      </div>
      <div class="hie-step-line-start line-all"></div>
      <div class="hiw-step-circle">2<br>‍</div>
    </div>
    <div class="hiw-step-container">
      <div class="hie-step-line-start line-end"></div>
      <div class="hiw-step-circle">3</div>
      <div class="hiw-step-wrapper w-row">
        <div class="hiw-step-col-left w-col w-col-6">
          <div class="hiw-step-bg step-3"></div>
        </div>
        <div class="column-126 hiw-step-col-right w-col w-col-6">
          <h3 class="hiw-step-title"><span class="mob-only">3. </span>{{$t('项目退出')}}</h3>
          <p class="hiw-step-p">{{$t('您有两种方式退出项目')}}</p>
          <ul class="hiw-step-list">
            <li class="hiw-step-list-item">
              <div class="hiw-step-list-item-title"><strong>{{$t('房产股权转售市场')}}</strong></div>
              <p class="hiw-step-list-item-p">{{$t('独立的权威机构获取最新房屋估值')}}</p>
            </li>
            <li class="hiw-step-list-item">
              <div class="hiw-step-list-item-title">{{$t('项目到期退出')}}</div>
              <p class="hiw-step-list-item-p">{{$t('项目锁定期为3年或5年')}}</p>
              <ul class="hiw-step-p-list">
                <li class="hiw-step-item-list-p p-list">{{$t('以确定项目每股的市场价值')}}</li>
                <li class="hiw-step-item-list-p p-list">{{$t('预计退出的投资者股份')}}</li>
                <li class="hiw-step-item-list-p p-list">{{$t('如果以上认购没有顺利完成')}}</li>
                <li class="hiw-step-item-list-p p-list">{{$t('退出并获得房屋')}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="section-5-new">
        <div class="container-37 w-container">
          <h1 class="heading-75">只需3步，即可获得投资收益<br></h1>
          <div class="div-block-146">
            <div class="div-block-142">
              <p class="paragraph-72">STEP</p>
              <div class="div-block-144"><img src="@/assets/images/step1.png" width="27" class="image-62"></div>
              <h1 class="heading-76"><strong>项目认购</strong><br></h1>
              <p>开户入金，投资房产股权项目</p>
            </div><img src="@/assets/images/steparrow.png" width="40" height="70" class="image-64">
            <div class="div-block-142">
              <p class="paragraph-72">STEP</p>
              <div class="div-block-144"><img src="@/assets/images/step2.png" width="50" class="image-62"></div>
              <h1 class="heading-76"><strong>租金分红</strong><br></h1>
              <p>每月分红，即时查看资产运营财报</p>
            </div><img src="@/assets/images/steparrow.png" width="40" height="70" class="image-65">
            <div class="div-block-142">
              <p class="paragraph-72">STEP</p>
              <div class="div-block-144"><img src="@/assets/images/step3.png" width="50" class="image-62"></div>
              <h1 class="heading-76"><strong>项目退出</strong><br></h1>
              <p>转售市场随时出售房产股权<br>或在项目3-5年锁定期后退出</p>
            </div>
          </div><router-link to="/wiretransfer" class="buttons step w-button"><strong class="bold-text-12">立即入金投资</strong></router-link></div>
      </div> -->
  </div>
</div>
  
</template>

<script>

export default {
  name: 'howitwork'
}
</script>

<style lang="scss" scoped>
.hiw-step-title {
  .mob-only {
    display: none;
    @media (max-width: 767px) {
      display: inline;
    }
  }
}
</style>