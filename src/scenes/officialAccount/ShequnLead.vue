<template>
 <div class="sheque-lead">
   <banner-model :bgImg="'https://wechat-pics.fangpinduo.com/wehome/website/static/image/bmjl/wyzspy.png'" style="background-size: contain">
     <h2 class="banner-title-global">唯有知识让我们免于平庸</h2>
   </banner-model>
   <div class="shequn-lead-tab">
     <h5>为什么加入WeHome社群</h5>
     <ul>
       <li>
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/shequn-lead-1.png" alt="">
         <span>财经大V</span>
         <span>投资观点解读</span>
       </li>
       <li>
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/shequn-lead-2.png" alt="">
         <span>美国房产</span>
         <span>投资宝典分享</span>
       </li>
       <li>
         <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/shequn-lead-3.png" alt="">
         <span>与志同道合者</span>
         <span>一起学习</span>
       </li>
     </ul>
   </div>

   <div class="shequn-lead-desc">
     <p>
       加入WeHome房产合投学院<br/>周周更新精彩文章<br/>先他人一步解锁美元投资新姿势
     </p>

     <img :src="src" alt="">

     <span>截图扫码，加入社区。如有问题请联系客服</span>
   </div>
 </div>
</template>
<script>
import {GET_CONTENT_FOLLOW_ACTION} from '@/scenes/officialAccount/modules'

  export default {
    name: 'shequnlead',
    data () {
      return {
        src:"https://wechat-pics.fangpinduo.com/wehome/website/static/image/bmjl/code.JPG"
      }
    },
    created() {
      this.$store.dispatch(GET_CONTENT_FOLLOW_ACTION)
      .then((res)=>{
        that.src = res.url
      })
    }
  }
</script>

<style lang="scss" scoped>
.sheque-lead {
  color: #000;
}
.shequn-lead-tab {
  h5 {
    text-align: center;
    margin: 2rem 0;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;
      img{
        width: 3.5rem;
        margin-bottom: 0.4rem;
      }
      span {
        font-size: 0.7rem;
      }
    }
  }
}
.shequn-lead-desc {
  margin: 3rem 0;
  p {
    font-size: 0.8rem;
    text-align: center;
    line-height: 2;
  }
  img {
    width: 55%;
    display: block;
    margin: 0 auto;
  }
  span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 0.7rem;
    margin-top: 1rem;
  }
}
</style>

