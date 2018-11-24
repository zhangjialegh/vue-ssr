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
                    <h4 class="media-heading">您的资料已提交,我们会在接到通知后的第一时间对您的资料进行审核. </h4>
                    <p>
                        资料审核通过后,您会收到短信通知,请确保手机保持畅通.
                    </p>
                    <p>
                        接下来,您可以:
                    </p>
                    <p>
                        <a href="/mine?active=1" class="w-button">查看订单详情</a>
                        <a href="/invest?source=n" class="w-button">查看合投项目</a>
                    </p>

                    <p style="margin-top:30px;">
                        见证开户流程:
                    </p>
                        <ol><li>银行验证电话可能为美国拨出，会在北京时间21点后，全程中文请注意接听。</li> 
                        <li>客户根据银行指引，携带护照到指定城市办事处进行面签确认。</li> 
                        <li>见证开户地点：<b>上海</b>、<b>北京</b>、<b>广州</b>、<b >深圳</b>、<b >汕头</b>、<b >重庆</b>、<b >厦门</b>、<b >香港</b>、<b >台北</b>。</li> 
                        <li >见证开户通过后，需要向账号汇款激活。预存$1600免除账户账户管理费<br >
                （账户余额小于$1500，银行收取手续费 $5/月）。成功激活后根据邮件提示开通网银即可正常使用。</li></ol>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
    export default {
        name: 'banksuccess'
    }
</script>

<style scoped>
.page{
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
.media-right
{
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
    .page{
        padding: 30px 20px;
    }
  .media{
      flex-direction: column;
  }
  .media-left,
  .media-right{
      justify-content: center;
  }
  .media-body{
      padding: 20px 0;
      width:auto;
  }

}
</style>
