<template>
  <div>
  <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/privacy-banner.png'">
    <h2 class="banner-title-global">{{$t('WeHome隐私声明')}}</h2>
  </banner-model>
  <div class="section-9">
    <div class="container-4 w-container">
      <div>
        <h4>{{$t('引言')}}</h4>
      </div>
      <p class="paragraph-29 paragraph-ys">{{$t('WeHome深知个人隐私安全保护的重要性')}}</p>
      <div>
        <h4>{{$t('WeHome可能收集的您的个人信息和收集方式')}}</h4>
        <h5 class="heading-26">1. {{$t('与个人身份无关的信息')}}：</h5>
        <p class="paragraph-29 little-padding paragraph-ys">{{$t('当您使用WeHome产品时')}}</p>
        <h5 class="heading-26">2. {{$t('引言')}}</h5>
        <ul class="unordered-list">
          <li class="paragraph-list-item">{{$t('注册登录')}}：</li>
        </ul>
        <p class="paragraph-29 little-padding paragraph-ys">{{$t('当您需要使用会员权限时')}}</p>
        <ul class="unordered-list">
          <li class="paragraph-list-item">{{$t('注册登录使用wehome的产品服务')}}</li>
        </ul>
        <p class="paragraph-29 little-padding paragraph-ys">{{$t('当您需要使用WeHome的服务时')}}</p>
        <h5 class="heading-26">3. {{$t('在法律法规允许的范围内')}}</h5>
        <ul class="unordered-list-2 last">
          <li class="paragraph-list-item">{{$t('依照国家法律法规相关的规定')}}</li>
          <li class="paragraph-list-item">{{$t('依照公检法等执')}}</li>
          <li class="paragraph-list-item">{{$t('部门上级监管')}}</li>
          <li class="paragraph-list-item">{{$t('公共利益保护')}}</li>
        </ul>
      </div>
      <div>
        <h4>{{$t('的手段收集您的个')}}</h4>
        <h5 class="heading-26">1. Cookie</h5>
        <p class="paragraph-29 little-padding paragraph-ys">{{$t('通过使用Cooki')}}</p>
        <h5 class="heading-26">2. 问卷{{$t('引言')}}</h5>
      </div>
      <p class="paragraph-29 paragraph-ys">{{$t('供服务WeHome')}}</p>
      <div>
        <h4>{{$t('WeHome如何使用个人信息')}}</h4>
        <h5 class="heading-27">{{$t('行保密会在以')}}</h5>
        <h5 class="heading-26">1. {{$t('前提下为顺利')}}</h5>
        <h5 class="heading-26">2. {{$t('产品信息您可通过')}}</h5>
        <h5 class="heading-26">3. {{$t('正当性安全性必要性')}}</h5>
        <ul class="ol-bottom">
          <li class="paragraph-list-item">{{$t('经过您的明确授权或同意的')}}</li>
          <li class="paragraph-list-item">{{$t('或争议需要与银行或')}}</li>
          <li class="paragraph-list-item">{{$t('查询采集您个')}}</li>
        </ul>
        <h5 class="heading-26">4. {{$t('授权或同意我们不会')}}</h5>
        <h5 class="paragraph-last heading-26">5. {{$t('其它用途时我们')}}</h5>
      </div>
      <div>
        <h4>{{$t('WeHome如何保护您的个人信息')}}</h4>
        <h5 class="heading-25">{{$t('为防止您信息的泄露')}}</h5>
        <ol class="ol-bottom">
          <li class="paragraph-list-item">{{$t('信息加密传输')}}</li>
          <li class="paragraph-list-item">{{$t('信息加密存储')}}</li>
          <li class="paragraph-list-item">{{$t('数据中心进行严格访问控制')}}</li>
          <li class="paragraph-list-item">{{$t('使用专用网络通道及网络代理')}}</li>
          <li class="paragraph-list-item">{{$t('理制度对能够')}}</li>
          <li class="paragraph-list-item">{{$t('您个人信息的行为进行监控')}}</li>
          <li class="paragraph-list-item">{{$t('法规隐私安全要求')}}</li>
        </ol>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'privacystate'
}
</script>

<style lang="scss" scoped>
.ol-bottom {
  padding-left: 15px;
}
.container-4 {
  display: block;
  padding-top: 60px;
}
</style>