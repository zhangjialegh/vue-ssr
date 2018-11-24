<template>
 <div class="guide_dream_wrapper">
   <div class="div-block-151" :class="{'is-weixin': isWeixin}">
    <div class="container-39 w-container mob-only">
      <div class="row-81 w-row">
        <div class="column-125 w-col w-col-6"><router-link :to="{path:'/invest'}" class="link-7 w-button"><strong class="bold-text-15">一键查看投资项目</strong><br></router-link></div>
      </div>
    </div>
  </div>


   <img src="https://wechat-pics.fangpinduo.com/image/guide/image-guide-dream1-2.png" alt="guidedream">  
   <img src="https://wechat-pics.fangpinduo.com/image/guide/image-guide-dream2-2.png" alt="guidedream"> 
   <img src="https://wechat-pics.fangpinduo.com/image/guide/image-guide-dream3-2.png" alt="guidedream"> 
   <img src="https://wechat-pics.fangpinduo.com/image/guide/image-guide-dream4-2.png" alt="guidedream"> 
   <router-link :to="{path:'/invest'}" class="click_zone_wrapper">
     <img src="https://wechat-pics.fangpinduo.com/image/guide/guide-dream-no-avatar-6.png" alt="guidedream" />
     <div v-if="registerTotal.register_avatar" class="user_avatar_wrapper">
       <p>{{registerTotal.register_count}}人都觉得好</p>
       <ul>
         <li v-for="(item,index) in registerTotal.register_avatar" :key="item+index"><img :src="item"/></li>
       </ul>
     </div>
   </router-link>
 </div>
</template>
<script>
import {GET_USER_SHOW_WELCOME_ACTION} from './modules.js'

  export default {
    name: 'guideDream',
    data () {
      return {
        registerTotal: {}
      }
    },
    methods: {
      loadShowGuideDream: function () {
        const that = this
        this.$store.dispatch(GET_USER_SHOW_WELCOME_ACTION)
        .then((res)=>{
          that.registerTotal = res
        })
      }
    },
    computed:{
      isWeixin() {
        return this.$store.state.base.isWeixin
      }
    },
    created() {
      this.loadShowGuideDream()
    }
  }
</script>

<style lang="scss" scoped>
.div-block-151 {
  &.is-weixin {
    top: 0;
  }
}
.container-39.mob-only {
  display: block;
  .column-125 {
    text-align: center;
  }
  .link-7 {
    width: calc(100% - 20px);
  }
}
.guide_dream_wrapper {
  width: 100%;
  img {
    width: 100%;
  }
}
.click_zone_wrapper {
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  .user_avatar_wrapper {
    position: absolute;
    width: 100%;
    bottom: 170px;
    left: 0;
    p {
      color: #000;
      font-size: 18px;
      text-align: center;
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      li {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 2px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

