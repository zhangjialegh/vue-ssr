<template>
    <div class="w-container page">
        <div class="w-row">
           <div class="media">
                <div class="media-left">
                    <a href="#">
                    <img class="media-object" src="https://wechat-pics.fangpinduo.com/wehome/icon/icon_success.png" alt="success">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">{{$t('您的订单已支付')}}</h4>
                    <p>
                        &nbsp;
                    </p>
                    <p>
                        {{$t('接下来')}}:
                    </p>
                    <p>
                        <a href="/mine?active=0" class="w-button">{{$t('查看订单详情')}}</a>
                    </p>
                    <p>
                        <img src="https://wechat-pics.fangpinduo.com/website/wehome/tiyanjin-wechat-service-qrcode.png" class="tiyanjin-service-img">
                        <br/>
                        {{$t('长按或扫码关注')}}{{$t('及时查收分红到账信息')}}
                    </p>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
  name: "paysuccess"
};
</script>

<style scoped>
.page {
  padding: 100px 20px;
}
.media {
  margin-top: 15px;
  display: -webkit-flex;
  display: flex;
}
.media:first-child {
  margin-top: 0;
}
.media,
.media-body {
  flex: 1;
  padding: 20px;
}
.media-body {
  width: 10000px;
}
.media-object {
  display: block;
  width: 100px;
  height: 100px;
}
.media-left,
.media-right {
  display: flex;
  vertical-align: top;
}

.media-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.media-list {
  padding-left: 0;
  list-style: none;
}

@media (max-width: 479px) {
  .page {
    padding: 30px 20px;
  }
  .media {
    flex-direction: column;
  }
  .media-left,
  .media-right {
    justify-content: center;
  }
  .media-body {
    padding: 20px 0;
    width: auto;
    text-align: center;
  }
}
</style>
