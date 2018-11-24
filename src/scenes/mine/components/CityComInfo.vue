<template>
   <div>
    <div class="mine-title">业务资料</div>
    <p class="city_com_info_desc">发动你的人脉，开始赚美金。以下为WeHome合伙人业务资料<span> (如有业务需要或任何问题，请联系Maggie)</span></p>
    <ul class="city_com_info_ul">
      <li v-for="(item,index) in documentList" :key="item.name+index">
        <a :href="item.url" target="_blank">
          <span>{{item.name}}</span><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/download1.svg" alt="">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {GET_USER_PARTNER_DOCUMENT_ACTION} from '@/scenes/mine/modules'

export default {
  name: 'cityInvite',
  data () { return {
    documentList: []
  } },
  methods: {
    getCityPartnerComInfo() {
      const that = this
      this.$store.dispatch(GET_USER_PARTNER_DOCUMENT_ACTION)
      .then((res)=>{
        if(res.success) {
          that.documentList = res.data
        }
      })
    },
  },
  created: function () {
    this.getCityPartnerComInfo()
  }
}
</script>

<style lang="scss" scoped>
.city_com_info_desc {
  margin-bottom: 0;
  color: #000;
  font-size: 13px;
  span {
    color: #9b9b9b;
    font-weight: 300;
    white-space: nowrap;
  }
}
.city_com_info_ul {
  margin-bottom: 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
  li {
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid #E9E9E9;
    padding: 10px;
    background-color: #fff;
    & > a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        white-space: nowrap;
      }
      img {
        width: 15px;
        margin-left: 10px;
      }
    }
    
  }
}
</style>
