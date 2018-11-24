<template>
  <div>
    <div class="income-entry-container" :class="{'is-fixed': isFixed}" ref="header" v-if="showIncome">
      <div class="income-entry-close" @click="closeIncomeEntry"></div>
      <p class="income-entry-para">{{$t('低门槛100美金开始投资美国房产')}}</p>
      <router-link to="/wiretransfer" class="income-entry-btn">{{$t('马上入金')}}</router-link>
    </div>
    <router-link to="/wiretransfer" class="income-entry-mob" v-if="showIncome"></router-link>
  </div>
</template>

<script>
export default {
  name: "IncomeEntry",
  data() {
    return {
      isFixed: false,
      showIncome: true
    };
  },
  methods: {
    closeIncomeEntry: function() {
      window.removeEventListener('scroll', this.handleScroll);
      this.showIncome = false;
      localStorage.setItem("income_key", new Date().getTime());
    },
    handleScroll () {  
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;  
        let headerTop = this.$refs.header.offsetTop;
        let parentTop = this.$refs.header.parentNode.parentNode.offsetTop;
        if (scrollTop > parentTop) {  
            this.isFixed = true;  
        } else {  
            this.isFixed = false;  
        }  
    }
  },
  computed: {
    timeStamp(){
      return this.$store.state.base.cookies['income_key']
    }
  },
  mounted() {
    const {timeStamp} = this
    if (timeStamp) {
      const deltaTime = (new Date().getTime() - timeStamp) / 1000 / 60 / 60;
      if (deltaTime >= 24) {
        this.showIncome = true;
        this.handleScroll()
      } else {
        this.showIncome = false;
      }
    }
    if (!this.showIncome) return;
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.income-entry-container {
  width: 160px;
  height: 290px;
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/incomeentry-card.png') no-repeat center center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 800;
  position: absolute;
  top: 88px;
  right: 20px;
}
.income-entry-container.is-fixed {
  position: fixed;
}
.income-entry-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
}
.income-entry-para {
  padding: 0 20px;
  font-size: 22px;
  line-height: 31px;
  text-align: center;
  color: #fff;
}
.income-entry-btn {
  width: 102px;
  height: 30px;
  border-radius: 2px;
  border: 1px solid #fff;
  font-size: 12px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  color: #fff;
  background-color: #FF5000;
  line-height: 30px;
  margin-top: 40px;
  text-align: center;
}
.income-entry-mob {
  display: none;
  position: fixed;
  right: 20px;
  bottom: 60px;
  width: 60px;
  height: 64px;
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/income-entry-mob-v2.png') no-repeat center center;
  background-size: contain;
  z-index: 99999;
}
@media (max-width: 479px) {
  .income-entry-container {
    display: none;
  }
  .income-entry-mob {
    display: block;
  }
}
</style>
