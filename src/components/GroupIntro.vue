<template>
  <transition-box :show="show">
    <div class="group-invest-wrapper" v-if="show">
      <div>
        <h4 class="group-new-rule-title">{{$t('拼团一起投分红赚更多')}}</h4>
        <p class="group-new-rule-p">{{$t('邀请好友组团')}}</p>
      </div>
      <div class="group-invest-rule">
        <h5 class="group-new-sec-title">{{$t('三人投')}}</h5>
        <p class="group-new-rule-p">{{$t('成功邀请2人参团')}}</p>
        <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/sanrentou.svg" alt="" class="group-new-rule-img">
        <h5 class="group-new-sec-title">{{$t('双人投')}}</h5>
        <p class="group-new-rule-p">{{$t('成功邀请1人参团')}}</p>
        <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/shuangrentou.svg" alt="" class="group-new-rule-img">
        <h5 class="group-new-sec-title text-gold">{{$t('规则说明')}}</h5>
        <ul class="group-new-list-rule">
          <li v-html="$t('三人投规则')"></li>
          <li v-html="$t('双人投规则')"></li>
          <li v-html="$t('单独投规则')"></li>
        </ul>
        <h5 class="group-new-sec-title text-gold">{{$t('规则解释')}}</h5>
        <ul class="group-new-list-rule">
          <li v-html="$t('参与项目成功')"></li>
          <li v-html="$t('组团成功')"></li>
          <li v-html="$t('收益确认发放')"></li>
          <li>{{$t('邀请新用户参与项目')}}</li>
        </ul>
        <h5 class="group-new-sec-title text-gold">{{$t('举例说明')}}</h5>
        <p class="group-new-last-p first">{{$t('Andy点击')}}</p>
        <p class="group-new-last-p">{{$t('Kevin是新用户')}}</p>

        <span class="group-new-notice">{{$t('最终解释权')}}</span>
      </div>
      <div class="group-invest-btn-wrapper">
        <slot></slot>
      </div>
    </div>
  </transition-box>
</template>
<script>
  export default {
    name: 'GroupIntro',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    watch:{
      show(newValue,oldValue) {
        if(newValue && ['order', 'property'].indexOf(this.$route.name) > -1) {
          document.getElementById('app').classList.add('forbid-pierce')
        } else {
          document.getElementById('app').classList.remove('forbid-pierce')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.group-invest-wrapper {
  padding-left: 0;
  padding-right: 0;
  padding-top: 10px;
}
.group-new-rule-title {
  text-align: center;
  color: #000;
}
.group-new-rule-p {
  text-align: center;
}
.group-new-sec-title {
  width: 100%;
  color: #000;
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/static/image/two-gang.png') no-repeat center center;
  background-size: cover;
  text-align: center;
  font-weight: normal;
  &.text-gold{
    color: #C89669;
  }
}
.group-new-rule-img {
  display: block;
  margin: 0 auto;
}
.group-new-list-rule {
  margin: 30px 0;
  padding-left: 30px;
  li {
    padding: 10px 0;
    line-height: 24px;
  }
}
.group-new-last-p {
  line-height: 24px;
  padding: 8px 15px;
  &.first {
    padding-top: 30px;
  }
}
.group-new-notice {
  display: inline-block;
  padding: 0 15px;
  color: #999;
}
</style>
