<template>
  <pop-box :show-tip="showTip" :tip="tip">
    <div class="w-row">
      <div class="column-55 w-col w-col-6 single-btn">
        <a class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a>
      </div>
    </div>
  </pop-box>
</template>

<script>
import {HIDE_POP_BOX} from './modules.js'
import {WECHATLOGIN_URL_ACTION} from '@/scenes/login/modules'
export default {
  name: "Alert",
  props: {
    showTip: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    tip: {
      type: String,
      default: function() {
        return '';
      }
    }
  },
  methods: {
    closePopTip() {
      this.$store.commit(HIDE_POP_BOX)
      const path = this.$route.fullPath
      if(this.isWeixin) {
        this.$store.dispatch(WECHATLOGIN_URL_ACTION,path)
      } else {
        this.$router.push({
          path: '/login',
          query: {
            redirect: path
          }
        })
      }
    }
  },
  computed: {
    isWeixin() {
      return this.$store.state.base.isWeixin
    }
  }
};
</script>
