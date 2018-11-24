<template>
<transition-box :show="show">
  <div class="invitation-wrapper" v-show="show">
    <div class="invitation-card-header"><img src="@/assets/images/black_logo.png" width="100" height="16"></div>
    <div class="invitation-card-outer">
      <div class="invitation-card-inner">
        <h4 class="heading-68">美国房产投资，从未如此简单<br></h4>
        <p class="paragraph-65">一起去美国合投一套房，5000美金享受年化10%-16%收益<br></p>
        <p class="paragraph-66"><strong>{{$t('分享朋友圈')}}</strong></p>
      </div>
    </div>
    <div class="invitation-qr-wrapper">
      <canvas ref="invite" width="150" height="150"></canvas>
    </div>
    <div class="invitation-card-close" @click="closeShareShadow"></div>
  </div>
</transition-box>
  
</template>

<script>
import QRCode from "qrcode"
export default {
  name: "InvitationCityPartner",
  props: {
    slink: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    from: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {};
  },

  methods: {
    generateQrcode: function () {
      const url = this.GLOBAL.H5_URL+'/invitation?slink='+this.slink+'&invitedSource='+this.from
      const canvas = this.$refs.invite
      QRCode.toCanvas(canvas, url, { width: 150, margin: 0 })
    },
    closeShareShadow: function () {
      this.$emit('closeShareShadow', false)
    }
  },
  mounted() {
    if(this.slink!='') {
      this.generateQrcode()
    }
  },
  watch: {
    slink: function(newq, oldq) {
      if (newq != '') {
        this.generateQrcode()
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
