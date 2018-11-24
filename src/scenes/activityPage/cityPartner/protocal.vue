<template>
<div @click="closeTocal">
  <div class="city_protocal_shadow" v-show="show"></div>
  <div class="city_protocal_wrapper" :class="{'pop': show}">
    <div class="w-container city_protocal_box">
      <div class="city_partner_protocal">
        <h4>WeHome合伙人项目协议</h4>
        <p>《WeHome合伙人项目协议》（以下简称本协议）由北京迦罗瓦科技有限公司（以下简称WeHome）和您签订。</p>

        <h5>一、声明与承诺</h5>
        <ul>
          <li>您确认，在您申请加入WeHome合伙人项目前，您已充分阅读、理解并接受本协议的全部内容，一旦您正式加入项目，即表示您同意遵循本协议之所有约定。</li>
          <li>您同意，WeHome有权随时对本协议内容进行单方面的变更，并以在本网站公告的方式予以公布，无需另行单独通知您；若您不同意修改后的协议内容，您应立即退出WeHome合伙人项目。</li>
          <li>您保证，在您同意接受本协议并正式成为WeHome合伙人前，您已经年满16周岁，或者您是合法开展经营活动或其他业务的法人或其他组织；本协议内容不受您所属国家或地区法律的排斥。不具备前述条件的，您应立即主动退出合伙人项目。</li>
        </ul>

        <h5>二、合伙人项目说明</h5>
        <ul>
          <li>您与WeHome均是独立自主、自负盈亏的独立法律主体，双方不存在雇佣关系。</li>
          <li>在您通过申请审核，正式成为WeHome合伙人后，您可以获得WeHome合伙人项目支持，包含但不限于投资工具和资料包、合伙人社区、专业客服、平台数据支持。</li>
          <li>您同意并接受合伙人项目的奖励机制，本公司有权奖励机制进行单方面的变更，并在本网站予以公布，无需另行单独通知您。但奖励机制的变更，不影响变更生效之前的实际奖励获取。</li>
          <li>您的奖励将实时结算到您在WeHome的余额账户，您可以随时对您的余额账户申请提现。由于转账产生的银行手续费由您自行承担。您按平台要求提供正确的账户信息，由于账户信息错误导致的一切后果，均应由您自行承担。</li>
          <li>WeHome.io和WeHome投房小程序是在WeHome参与投资的唯一投资入口，所有投资必须在WeHome官方入口完成，否则WeHome将不承担任何风险。</li>
        </ul>

        <h5>三、权利和义务</h5>
        <ul>
          <li>WeHome深知个人隐私安全保护的重要性。在您访问及使用WeHome公司旗下产品，我们可能会收集您的个人信息，WeHome将按照法律法规要求，采取相应安全保护措施，尽力保护您的个人信息和因私。我们希望通过《WeHome隐私政策》向您说明我们在您使用我们的产品与/或服务时如何收集、使用、保存、共享和转让这些信息，以及我们为您提供的访问、更新、删除和保护这些信息的方式。</li>
          <li>WeHome有义务为您提供相关支持，保证您合伙人业务的顺利进行。</li>
          <li>您需要如实描述WeHome产品，不得有欺诈、虚假描述、过度承诺等不恰当行为误导投资者。您需要承担由此不恰当行为产生的投资、纠纷等责任。</li>
          <li>在未得到WeHome授权情况下，您不能擅自转载、复制、截取、再造与WeHome相关的内容。</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'protocal',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    },
    methods: {
      closeTocal() {
        this.$emit('close', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
.city_protocal_shadow {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0,0,0,0.4);
    overflow: hidden;
}
.city_protocal_wrapper {
  height: 85vh;
  position: fixed;
  left: 0;
  bottom: -85vh;
  width: 100%;
  background-color: #fff;
  z-index: 9;
  transition: all 0.3s;
  &.pop {
    bottom: 0;
  }
}
.city_protocal_box {
  height: 100%;
  padding-top: 30px;
  overflow-y: scroll;
}
.city_partner_protocal {
  padding: 0 30px;
  height: auto;
  color: #000;
  h4 {
    text-align: center;
  }
  ul {
    list-style-type: decimal;
    font-size: 13px;
  }
}
</style>