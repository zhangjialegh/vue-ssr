<template>
  <div class="wire-transfer-section tiyanjin new-bird">
    <div class="w-container"><img src="@/assets/images/nav-logo.png" class="new-bird-logo">
      <div class="tianjin-wrapper new-bird">
        <div class="tiyanjin-header-wrapper-v2 new-bird">
          <div class="tiyanjin-header new-bird-header"></div>
        </div><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/gift-card-title.png" class="new-bird-title">
        <div class="new-bird-card-wrapper">
          <div class="new-bird-card-item"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/new-bird-card-l1.png" class="new-bird-card-l">
            <router-link to="/experiencegold" class="new-bird-card-btn">马上抢</router-link>
          </div>
          <div class="new-bird-card-item"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/new-bird-card-l2.png" class="new-bird-card-l">
            <router-link to="/bank" class="new-bird-card-btn">立即开</router-link>
          </div>
          <div class="new-bird-card-item"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/new-bird-card-l3.png" class="new-bird-card-l">
            <div class="new-bird-card-btn" @click="newBirdLecture">现在学</div>
          </div>
        </div>
        <h4 class="new-bird-rule-title">活动说明</h4>
        <ul class="new-bird-rule-wrapper">
          <li class="new-bird-rule-item">使用体验金后并成功参与合投的用户，可享受收益到账提现权益</li>
          <li class="new-bird-rule-item">WeHome与美国华美银行特约合作，为用户提供0门槛VIP通道开户</li>
          <li class="new-bird-rule-item">美国房产股权投资课程由WeHome学院出品，WeHome享有独家版权</li>
          <li class="new-bird-rule-item">高阶课程赠送，可添加WeHome客服Maggie（微信号onmywehome）</li>
          <li class="new-bird-rule-sm">*本活动解释权归WeHome所有</li>
        </ul>
      </div>
    </div>
    <transition-box :show="showQr">
      <div class="new-gift-wrapper" v-show="showQr">
        <div class="qr-wrappper">
          <div class="micro-program" @click="closeQr">
            <img src="https://wechat-pics.fangpinduo.com/website/wechat/wehome_lecture2.png" alt="">
          </div>
          <p class="invitation-code-scan">长按或扫码领取投资课程</p>
        </div>
        <div class="invitation-card-close" @click="closeQr"></div>
      </div>
    </transition-box>
  </div>
</template>

<script>
import { track, after } from "trackpoint-tools";
import Track from "@/track";

export default {
  name: "newusergift",
  data() {
    return {
      showQr: false
    };
  },
  methods: {
    @track(
      after(function() {
        Track.eventTrack({
          category: "newusergift-qrcode-show-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    newBirdLecture: function() {
      this.showQr = true
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "newusergift-qrcode-close-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    closeQr () {
      this.showQr = false
    },
  }
};
</script>

<style lang="scss" scoped>
.tianjin-wrapper.new-bird {
  margin: 0 auto;
  max-width: 550px;
  @media (max-width: 767px) {
    max-width: 400px;
  }
  @media (max-width: 479px) {
    max-width: 100%;
  }
}
.new-gift-wrapper {
  position: relative;
  width: 95%;
  max-width: 450px;
  background: #fff;
  .qr-wrappper {
    padding: 50px;
    .micro-program {
      padding: 30px;
    }
  }
}
.invitation-code-scan {
  width: 100%;
  text-align: center;
  font-size: 14px;
}
</style>
