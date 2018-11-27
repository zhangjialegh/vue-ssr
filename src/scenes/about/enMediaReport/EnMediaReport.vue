<template>
  <div>
    <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/media-banner.jpeg'">
      <h2 class="banner-title-global">媒体报道</h2>
    </banner-model>
    <!-- <div class="section-3 white-bg">
      <div class="w-container">
        <div class="row-6 w-row">
          <div class="w-col w-col-4">
            <div class="div-block-39">
              <img src="@/assets/images/zichangeli.png" width="50" srcset="@/assets/images/zichangeli.png 500w, @/assets/images/zichangeli.png 512w" sizes="(max-width: 479px) 67vw, 50px" class="image-4">
            </div>
            <h5 class="heading-16">资产托管隔离</h5>
            <p class="paragraph-17">客户资产托管于华美银行的机构银行账户，严格按照监管部门要求执行</p>
          </div>
          <div class="column-44 w-col w-col-4">
            <div class="div-block-38"><img src="@/assets/images/mgzj.png" width="50" srcset="@/assets/images/mgzj.png 500w, @/assets/images/mgzj.png 512w" sizes="(max-width: 479px) 67vw, 50px" class="image-4"></div>
            <h5 class="heading-17">美国证监监管</h5>
            <p class="paragraph-16">客户账户和投资资产受美国证券交易监督委员会(SEC) Regulation-S、德拉华州政府以及资产所在地政府监管</p>
          </div>
          <div class="column-43 w-col w-col-4">
            <div class="div-block-37">
              <img src="@/assets/images/spvts.png" width="50" srcset="@/assets/images/spvts.png 500w, @/assets/images/spvts.png 512w" sizes="(max-width: 479px) 67vw, 50px" class="image-4">
            </div>
            <h5 class="heading-18">特殊目的公司</h5>
            <p class="paragraph-15">特殊目的公司与WeHome平台资产隔离，银行账户独立管理</p>
          </div>
        </div>
      </div>
    </div> -->
    <div class="data-section">
      
    <div class="w-container">
        <div class="w-col w-col-4" @click="surfHref('http://industry.caijing.com.cn/20180730/4493212.shtml')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-caijingwang.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">财经网<br></h5>
            <a class="safe-media-text">国际市场房产投资标准渐明 WeHome房产股权投资更具优势<br></a>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://caijing.chinadaily.com.cn/chanye/2018-08/21/content_36798702.htm')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-zgribaowang.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">中国日报网<br></h5>
            <a class="safe-media-text">房租暴涨时代 WeHome助力新中产突围<br></a>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://info.finance.hc360.com/2018/08/151219416303.shtml')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-huicongwang.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">慧聪网<br></h5>
            <a class="safe-media-text">全球瑞资投资挑战赛落幕 WeHome 创始人Roc出任决赛评委<br></a>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://industry.caijing.com.cn/20180807/4497490.shtml')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-caijingwang.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">财经网<br></h5>
            <a class="safe-media-text">2018 WeHome投资趋势分享会：如何以稳健的全球资产配置规避投资风险<br></a>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('https://biz.ifeng.com/a/20180730/45090667_0.shtml')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-ifeng.jpeg" class="safe-media-img"></div>
            <h5 class="safe-media-title">凤凰网商业</h5>
            <div class="safe-media-text">对标国外房产众筹参考 WeHome重塑房产投资模式备受认可<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://house.people.com.cn/GB/n1/2018/0725/c164220-30169941.html')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-renminwang.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">人民网<br></h5>
            <a class="safe-media-text">海外房产“拼多多” WeHome降门槛引领海外投资新趋势<br></a>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('https://tech.china.com/article/20180718/kejiyuan0718168106.html')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-zgshangye.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">中国商业观察网<br></h5>
            <a class="safe-media-text">2018互联网企业境外上市热潮 WeHome房产股权投资成资产配置新热<br></a>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://finance.youth.cn/finance_cyxfgsxw/201806/t20180622_11649903.htm')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-youth.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">中国青年网</h5>
            <div class="safe-media-text">游学带动海外房产投资热，WeHome新模式受追捧<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://it.cri.cn/20180626/49d47b6c-dcc2-9915-685b-a4784be4da3e.html')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-online.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">国际在线<br></h5>
            <div class="safe-media-text">海外房产投资新模式 WeHome大数据寻找投资洼地<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://tech.chinadaily.com.cn/2018-07/03/content_36503058.htm')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-zgribaowang.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">中国日报网</h5>
            <div class="safe-media-text">WeHome创始人Roc出席GrowingIO 2018 帮助创业公司快速寻找产品市场契合点<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://biz.ifeng.com/a/20180710/45056481_0.shtml')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-ifeng.jpeg" class="safe-media-img"></div>
            <h5 class="safe-media-title">凤凰网商业</h5>
            <div class="safe-media-text">中美贸易战下美国房产新趋势 WeHome海外房产股权投资平台获新宠<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://house.163.com/18/0329/18/DE397RKG000782A6.html')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-wangyifc.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">网易房产<br></h5>
            <div class="safe-media-text">国内首家大数据驱动海外房产投资新模式企业 WeHome获数千万Pre-A轮融资<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://www.cyzone.cn/a/20180327/327554.html')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-chuangyebang.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">创业邦</h5>
            <div class="safe-media-text">大数据房产投资平台WeHome获数千万Pre-A轮融资，合作4家中美房产投资领域律所，实时监测美国市场2100＋万套房源<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://www.funxun.com/news/34/2018329113203.html')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-fangxun.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">房讯网</h5>
            <div class="safe-media-text">大数据驱动海外房产投资新模式 WeHome获千万Pre-A轮融资<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('https://www.pencilnews.cn/p/18408.html')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-qibidao.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">铅笔道</h5>
            <div class="safe-media-text">海外房产合投平台“WeHome”获Pre-A轮投资<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://cj.sina.com.cn/articles/view/6502505917/183945dbd001005m85')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-sinacaijing.gif" class="safe-media-img"></div>
            <h5 class="safe-media-title">新浪财经</h5>
            <div class="safe-media-text">数据驱动海外房产投资获青睐WeHome获数千万Pre-A轮融资<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://finance.stockstar.com/JC2018032900000090.shtml')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-zhengquanzhixing.gif" class="safe-media-img"></div>
            <h5 class="safe-media-title">证券之星</h5>
            <div class="safe-media-text">WeHome 获数千万元Pre-A轮融资<br></div>
          </div>
        </div>
        <div class="w-col w-col-4" @click="surfHref('http://www.jiemian.com/article/2024364.html')">
          <div class="safe-media-item-wrapper">
            <div class="safe-media-pic dark"><img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-jiemian.png" class="safe-media-img"></div>
            <h5 class="safe-media-title">界面新闻</h5>
            <div class="safe-media-text">从中产需求里发掘新机会 这个平台想帮你去海外投资房产<br></div>
          </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'enmediareport',
  data () { return {
    mediaPoint: {}
  } },
  methods: {
    @track(after(function () {
      Track.eventTrack(this.$store,{
        category: 'media-item-href',
        action: 'click',
        optLabel: 'href',
        page: this.$route.name,
        optValue: this.mediaPoint
      })
    }))
    surfHref: function (link) {
      this.mediaPoint = {
        link
      }
      window.open(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-3.white-bg {
  background: #ffffff;
}
.safe-media-pic.dark {
  background: #333;
}
.safe-media-text:hover {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>