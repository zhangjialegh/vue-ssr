<template>
  <div>
  <banner-model :bgImg="'https://wechat-pics.fangpinduo.com/wehome/website/banner/wehome-banner.jpg'">
    <h2 class="banner-title-global">{{$t('公司介绍')}}</h2>
  </banner-model>
  <div class="section-9">
    <div class="container-4 w-container">
      <div>
        <h4>{{$t('公司概述')}}</h4>
      </div>
      <p class="paragraph-29">{{companyInfo.overview}}</p>
      <!-- <div>
        <h4>核心价值</h4>
      </div>
      <p class="paragraph-29">{{companyInfo.value}}</p>
      <div>
        <h4>团队概述</h4>
      </div>
      <p class="paragraph-29">{{companyInfo.team_overview}}</p> -->
      <div>
        <h4>WeHome Data Lab</h4>
      </div>
      <p class="paragraph-29">{{$t('动态以及对')}}</p>
      <div>
        <h4>{{$t('WeHome美国房产股权投资项目')}}</h4>
      </div>
      <p class="paragraph-29">{{$t('管理经验我们推出')}}</p>
      <div>
        <h4>{{$t('管理团队')}}</h4>
      </div>
      <div class="company-team-wrapper">
        <div class="company-team-item">
          <div class="company-team-avatar-wrapper" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-yupeng.png'"></div>
          <div class="company-team-avatar-name">{{$t('余鹏')}}</div>
          <div class="company-team-avatar-job"><strong class="bold-text-16">CEO, Founder</strong></div>
          <div class="company-team-avatar-desc" v-html="$t('全球首位华人产品经')"></div>
        </div>
        <div class="company-team-item">
          <div class="company-team-avatar-wrapper" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-wenhang.png'"></div>
          <div class="company-team-avatar-name">{{$t('文航')}}</div>
          <div class="company-team-avatar-job"><strong class="bold-text-16">CTO, Cofounder</strong></div>
          <div class="company-team-avatar-desc" v-html="$t('中国风控负责人')"></div>
        </div>
        <div class="company-team-item">
          <div class="company-team-avatar-wrapper" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-yinxiaoyao.png'"></div>
          <div class="company-team-avatar-name">{{$t('尹骁尧')}}</div>
          <div class="company-team-avatar-job"><strong class="bold-text-16">Outside General Counsel</strong></div>
          <div class="company-team-avatar-desc" v-html="$t('科律律师事务所合伙人')"></div>
        </div>
      </div>
      <div>
        <h4>{{$t('顾问及投资人')}}</h4>
      </div>
      <div class="company-invest-wrapper">
        <div class="company-invest-item">
          <div class="company-invest-avatar-wrapper" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-guxin.png'"></div>
          <div class="company-invest-avatar-name">{{$t('谷懿')}}</div>
          <div class="company-invest-avatar-job" v-html="$t('和米资本合伙人')"></div>
        </div>
        <div class="company-invest-item">
          <div class="company-invest-avatar-wrapper" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-xusiqing.png'"></div>
          <div class="company-invest-avatar-name">{{$t('许四清')}}</div>
          <div class="company-invest-avatar-job" v-html="$t('阿尔法公社')"></div>
        </div>
        <div class="company-invest-item">
          <div class="company-invest-avatar-wrapper" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-zengliqing.png'"></div>
          <div class="company-invest-avatar-name">{{$t('曾李青')}}</div>
          <div class="company-invest-avatar-job" v-html="$t('腾讯')"></div>
        </div>
        <div class="company-invest-item">
          <div class="company-invest-avatar-wrapper" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-liupeng.png'"></div>
          <div class="company-invest-avatar-name">{{$t('刘鹏')}}</div>
          <div class="company-invest-avatar-job" v-html="$t('康奈尔大学教授')"></div>
        </div>
        <div class="company-invest-item">
          <div class="company-invest-avatar-wrapper" v-lazy:background-image="'https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-oraha.png'"></div>
          <div class="company-invest-avatar-name">Gil Oraha</div>
          <div class="company-invest-avatar-job" v-html="$t('资深房产顾问')"></div>
        </div>
      </div>
      
      <div>
        <h4>{{$t('合作伙伴')}}</h4>
      </div>
      <div class="section-29">
        <div class="w-container">
          <a class="div-block-147">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/6FYPJttmRLxkYIlrILx37QMqiqT04Jn8MW4mIT_6JIw.png" width="120" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/1200px-Carnegie_Mellon_University_seal.svg.png" width="70" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/BHHS-Seal.png" width="70" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/century.png" width="120" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/ColdwellBanker-01.png" width="120" class="image-63">
            </a>
            <a class="div-block-147">
              
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/East West Bank.png" width="120" class="image-63">
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/logo.png" width="120" class="image-63">
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/Magstone.png" width="120" class="image-63">
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/partner/MIT_Seal.svg.png" width="70" class="image-63">
              <img src="" width="180" class="image-63">
            </a>
        </div>
      </div>

      <div class="w-row">
        <div class="w-col w-col-6">
          <p class="paragraph-28" v-html="$t('如果有任何疑问')"></p>
        </div>
        <div class="w-col w-col-2">
          <h5 class="heading-11">{{$t('电子邮箱')}}</h5>
          <p class="paragraph-30">{{companyInfo.email}}</p>
          <h5 class="heading-11">{{$t('联系电话')}}</h5>
          <p class="paragraph-30">{{companyInfo.phone}}</p>
          <h5 class="heading-11">{{$t('微信')}}</h5>
          <p class="paragraph-30">{{companyInfo.wechat}}</p>
        </div>
        <div class="w-col w-col-4">
          <h5 class="heading-11">{{$t('公司地址')}}</h5>
          <p class="paragraph-30"><span style="white-space:pre;">{{companyInfo.address}}</span></p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'wehome',
  computed: {
    companyInfo() {
      return this.$store.state.about.companyInfo
    }
  }
}
</script>
<style lang="scss" scoped>
.container-4 {
  display: block;
  padding-top: 60px;
}
.paragraph-29 {
  color: #333;
  white-space: pre-wrap;
  font-size: 14px;
  line-height: 26px;
  font-weight: normal;
  color: #888;
}
.paragraph-30 {
  font-weight: normal;
  color: #888;
}
.div-block-147 {
  margin-bottom: 30px;
}
@media (max-width: 479px) {
  .div-block-147 {
    margin-bottom: 0;
  }
  .image-63 {
    margin-bottom: 20px;
  }
}
</style>