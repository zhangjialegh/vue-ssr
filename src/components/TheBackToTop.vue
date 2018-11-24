<template>
  <div>
    <div class="back-top small" @click="backTop" v-show="backTopShow"></div>
  </div>
</template>

<script>
export default {
  name: "TheBackToTop",
  data() {
      return {
        backTopShow: false,
        initialTop: 500,
        backSpeed: 20,
        perTime: 16 //ms
      }
    },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    backTop() {
      let speed = this.backSpeed;
      let timer = setInterval(() => {
        this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if(this.scrollTop>0){
              this.scrollTop = (this.scrollTop - speed >0) ? (this.scrollTop - speed) : 0;
              speed += this.backSpeed;
              window.scrollTo(0,this.scrollTop);
            }else{
              clearInterval(timer);
            }
      }, this.perTime);
    },
    handleScroll(){
      this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (this.scrollTop > this.initialTop) {
        this.backTopShow=true;
      }
      else {
        this.backTopShow=false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.back-top {
    position: fixed;
    right: 30px;
    bottom: 120px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: url('https://wechat-pics.fangpinduo.com/wehome/website/top.svg') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    z-index: 900;
  }
</style>
