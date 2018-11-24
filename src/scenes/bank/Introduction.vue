<template>
    <div class="page-bg">
        <div class="w-container">
            <h1 class="page-title">
                <span>美国银行账户，你值得拥有</span><br/>
                <span>参与WeHome房产合投免费开通美国银行账户</span>
            </h1>
            <div class="paper">
                <div class="liner">
                    简单4步，免费拥有美国银行账户
                </div>
                <div class="step-img">
                    <img class="hidden-small" src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/bank-step.png" draggable="false" alt="">
                    <img class="hidden-medium" src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/bank-step-vert.png" draggable="false" alt="">
                </div>
                <div class="liner">
                    规则说明
                </div>
                <h4>华美银行开户所需资料</h4>
                <p>护照首页电子扫描件（无需签证），无需资产证明，无需地址证明，填写下页信息轻松办理。</p>
                <h4>见证开户流程</h4>
                <ol>
                    <li>银行验证电话可能为美国拨出，会在北京时间21点后，全程中文请注意接听。</li>
                    <li>客户根据银行指引，携带护照到指定城市办事处进行面签确认。</li>
                    <li>见证开户地点：<b>上海</b>、<b>北京</b>、<b>广州</b>、<b>深圳</b>、<b>汕头</b>、<b>重庆</b>、<b>厦门</b>、<b>香港</b>、<b>台北</b>。</li>
                    <li>见证开户通过后，需要向账号汇款激活。预存$1600免除账户账户管理费<br>
                    （账户余额小于$1500，银行收取手续费 $5/月）。成功激活后根据邮件提示开通网银即可正常使用。</li>
                </ol>
                <h4>注意事项</h4>
                <ol>
                    <li>开户默认为电子银行账号，如需要美国银行实体卡，可向华美银行客户经理申请，卡片可寄回国内地址。</li>
                    <li>跨境支付银行和中间行均会收取电汇费用，请在转账时预留好手续费部分。</li>
                    <li>华美银行专属客户经理会为您提供转账及账户使用的说明。</li>
                </ol>

                <div class="btn-warp">
                    <router-link to="/bank/apply?from=bank" class="button-6 w-button">立即预约</router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>  
.page-bg{
    background: url(../../assets/images/bank-bg.jpg) no-repeat center center;
    background-size: cover;
}
.page-title{
    color: #fff;
    text-align: center;
    margin: 100px 0 80px 0;
    font-size: 30px;
    font-weight: normal;
    @media (max-width: 479px) {
        font-size: 24px;
    }
    span:nth-of-type(2) {
        font-size: 22px;
        @media (max-width: 479px) {
          font-size: 16px;
          display: inline-block;
          padding: 10px 20px 0;
          line-height: 20px;
        }
    }
}
.paper{
    background: #fff;
    padding: 30px;
    margin-bottom: 100px;
    p{
        font-size: 14px;
        color:#666;
    }
    h4{
        font-size: 14px;
        font-weight: normal;
        color: #C89669;
    }
    b{
        color:#333;
    }
}
.liner{
    margin: 10px 0;
    display: table;
    white-space: nowrap;
    height: auto;
    line-height: 1;
    width:100%;
   &::before,&::after{
        content:' ';
        display: table-cell;
        position: relative;
        top: 50%;
        width: 50%;
        background-repeat: no-repeat;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC);
        background-position: right 1em top 50%;
   }
    &::after{
        background-position: left 1em top 50%;
    }
    
}
.step-img{
    text-align:center;
    img{
        margin: 20px auto;
    }
}
@media screen and (max-width: 479px) {
  .hidden-small {
    display: none;
  }
  .hidden-medium{
      display: block;
  }
}
@media screen and (min-width: 480px) {
  .hidden-small {
    display: block;
  }
  .hidden-medium{
      display: none;
  }
}

.btn-warp{
    text-align: center;
    margin-top: 30px;
    a{
        padding:10px 20px;
    }
}

</style>            

