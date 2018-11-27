<template>
  <div>
    <banner-model :bg-img="'https://wechat-pics.fangpinduo.com/wehome/website/banner/media-banner.jpeg'">
      <h2 class="banner-title-global">{{$t('媒体报道')}}</h2>
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
      
    <div class="w-container" v-if="$i18n.locale == GLOBAL.ZH_CN">
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
    <div class="w-container" v-else>
        <div class="media-container">
          <div class="media-title-wrapper">
            <div class="media-img-wrapper">
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-sina-v2.png" alt="">
            </div>
            <div class="media-title-container">
              <h4>WeHome receives tens of millions of Pre-A rounds of financing</h4>
              <p><strong>Sina </strong><span> 2018-3-28</span></p>
            </div>
          </div>
          <p>
            WeHome recently announced that it has received tens of millions of funds from Decent Capital, founded by Tencent co-founder Jason Zeng, in the Pre-A round of financing. WeHome is a marketplace for people to(list), discover and invest U.S. home equity with a secondary exchange.
            <br/><br/>
            WeHome founder and CEO Roc (Yu Peng)said: "Round financing will be used for WeHome to continue to upgrade the unique real estate data quantification model, optimize post-investment management, and provide users with more precise investment options.
            <br/><br/>
            Jason Zeng said that WeHome is based on the good development of the US real estate market and the Growth of Chinese overseas investors. WeHome continues to innovate, using big data, industry synergy network, blockchain technology to promote the liquidity of fixed assets.
          </p>
          <p>
            On WeHome platform, users can choose different types of real estate equity products (including small-scale equity investment and premium services) according to their investment preferences. They can also use WeHome Big Data to help deciding the investment.
            <br/><br/>
            WeHome has innovatively created a way to invest in real estate starting with just $5000. WeHome set up a SPV, a special purpose entity for each property, therefore allowing investors to purchase shares and become shareholders of the SPV. This structure enables users to profit from both the rental and appreciation of the property, and offers the most comprehensive protection for users.
            <br/><br/>
            In mainland China, Hong Kong and the global Chinese community, WeHome's small-scale equity investment products (starting from $5,000) are welcomed by the new middle class and have attracted the attention of tens of thousands of users and investors. 
            <br/><br/>
            WeHome was founded by veterans from Airbnb, Amazon, Alibaba and etc. WeHome has offices in Beijing, Hong Kong and San Francisco. Their consultants and partners come from Blackstone, Coldwell Banker, Alibaba, Amazon, UC Berkley, M.I.T, Cornell University and more.
          </p>
        </div>
        <div class="media-container">
          <div class="media-title-wrapper">
            <div class="media-img-wrapper black">
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/media-en-jiemian.png" alt="">
            </div>
            <div class="media-title-container">
              <h4>This platform wants to help you invest in overseas real estate</h4>
              <p><strong>Jiemian.com </strong><span> 2018-3-30</span></p>
            </div>
          </div>
          <p>
            Decent Capital, founded by Tencent co-founder Jason Zeng, in the Pre-A round of financing. WeHome is a marketplace for people to(list), discover and invest U.S. home equity with a secondary exchange.
            <br><br>
            In the WeChat applet launched by WeHome, you can see such a product, starting at $5,000, with a return rate of 10%, and WeHome is responsible for all operations management.
            <br><br>
            WeHome was founded by veterans from Airbnb, Amazon, Alibaba and etc.  Founder& CEO Roc Yu and CTO Tony Wen have worked for Airbnb. WeHome hopes to increase the investment motivation of ordinary people and lower the investment threshold with big data and simple process.
          </p>
          <h5>Data engine  “Eagle Eye”</h5>
          <p>
            The core data engine independently developed by WeHome is called “Eagle Eye”, which can monitor the dynamics of more than 42 million suites in the United States in real time. Smart is the top 10% investment property with investment potential in the United States. 
            <br/><br/>
            In the entire decision-making process of real estate investors, WeHome’s data system can provide omnibearing support in data granularity. Data granularity ranges from states, regions, counties, cities, to neighborhoods, Zipcode, and specific housing, a full coverage has been achieved. 
            <br/><br/>
            WeHome has also worked closely with four law firms, including MagStone Law, the leading law firm in China and the US, to design a legal process and investment framework to ensure compliance with both Chinese and American legal provisions.
          </p>
          <h5>Real estate equity investment</h5>
          <p>
            On WeHome platform, users can choose different types of real estate equity products (including small-scale equity investment and premium services) according to their investment preferences. They can also use WeHome Big Data to help deciding the investment.
            <br/><br/>
            Roc said that the different from the traditional way, on WeHome platform, investors share all the benefits, including property appreciation and rental income, and share all costs. 
            <br/><br/>
            In mainland China, Hong Kong and the global Chinese community, WeHome's small-scale equity investment products (starting from $5,000) are welcomed by the new middle class and have attracted the attention of tens of thousands of users and investors. 
            <br/><br/>
            WeHome's property investment structure is in line with the US SEC Regulation-S.
          </p>
        </div>

        <div class="media-container">
          <div class="media-title-wrapper">
            <div class="media-img-wrapper">
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/media-en-daily.png" alt="">
            </div>
            <div class="media-title-container">
              <h4>WeHome founder Roc attends GrowingIO 2018</h4>
              <p><strong>CHINADAILY </strong><span> 2018-7-3</span></p>
            </div>
          </div>
          <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/zgrb1.png" class="chart-img" alt="">
          <p>
            On June 30th, the “GrowingIO 2018 Growth Conference” was held in Shenzhen, China.WeHome founder and CEO Roc Yu attended the conference and shared the topic of “How to quickly find a product marketing fit”, against the user growth issues in early projects.
            <br/><br/>
            Roc specializes in Growth hacking. In his past experience, he used multi-dimensional strategy analysis such as product personality shaping, user experience, and business operations to help companies find and explore business opportunities in data and achieve rapid business growth.
            <br/><br/>
            Roc shared the "Dual Element Deduction" model he summed up, which is Taking "time and space" and "person" as the core dimension, to Discover market phenomena and risks, and finally find the essence of the problem. At the same time, guided by the relationship between supply and demand, entrepreneurs are clearing the relationship between the market and products.
          </p>
          <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/zgrb2.png" class="chart-img" alt="">
          <p>
            In the matter of starting a business，Roc said that it’s hard to find early users, the only effective way is Constant high-frequency communication and get feedback quickly. Quick trial and error is a capability, and the winner always is the fastest one.
          </p>
        </div>

        <div class="media-container">
          <div class="media-title-wrapper">
            <div class="media-img-wrapper">
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/media-en-ifeng.png" alt="">
            </div>
            <div class="media-title-container">
              <h4>Property equity investment platform WeHome Becomes a New Favorite</h4>
              <p><strong>IFENG.COM </strong><span> 22018-7-10</span></p>
            </div>
          </div>
          <p>
            The latest HPI (House Price Index Report) released by CoreLogic shows that the house price index of the US housing market in December 2017 increased by 0.5% from November, and the house price index rose by 6.6% year-on-year.
            <br/><br/>
            In mainland China, Hong Kong and the global Chinese community, WeHome's small-scale equity investment products (starting from $5,000) are welcomed by the new middle class and have attracted the attention of tens of thousands of users and investors. Because on WeHome, users can easily understand and participate US dollar investments, especially in the US real estate equity investment field.
            <br/><br/>
            On WeHome platform, users can choose different types of real estate equity products (including small-scale equity investment and premium services) according to their investment preferences. They can also use WeHome Big Data to help deciding the investment.
            <br/><br/>
            The different from the traditional way, on WeHome platform, investors share all the benefits, including property appreciation and rental income, and share all costs. 
            <br/><br/>
            The most important is, WeHome solves two major problems of housing selection and asset operation.
            <br/><br/>
            The two major benefits of real estate investment come from rent and value added. WeHome set up a SPV, a special purpose entity for each property, therefore allowing investors to purchase shares and become shareholders of the SPV. 
            <br/><br/>
            The core data engine independently developed by WeHome is called “Eagle Eye”, which can monitor the dynamics of more than 42 million suites in the United States in real time. Smart is the top 10% investment property with investment potential in the United States. 
            <br/><br/>
            “Eagle Eye” can score the house through multi-dimensional data, such as Listing location, city, demographics, local income, market cycle, crime rate, school district score, historical price.It can effective investment advice for the  investors on WeHome.
            <br/><br/>
            WeHome has established in-depth relationships with senior brokers, asset management companies and legal institutions across the United States. 
          </p>
        </div>

        <div class="media-container last">
          <div class="media-title-wrapper">
            <div class="media-img-wrapper">
              <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/media-en-caijing.png" alt="">
            </div>
            <div class="media-title-container">
              <h4>WeHome held investment trend sharing meeting in Beijing</h4>
              <p><strong>CAIJING.COM </strong><span> 2018-8-7</span></p>
            </div>
          </div>
          <p>
            On August 4th,  “Talk about 2018 Investment Trend Sharing Conference” held in Beijing. WeHome founder and CEO Roc, co-founder and CTO Toney ,Financial Planner Meng Meng, and WeHome’s users Sharing and discussing the international market investment environment and the global  investment strategies.
            <br/><br/>
            WeHome is geared towards the global asset allocation needs of the new middle class.
            <br/><br/>
            "Forbes: China's Volkswagen affluent wealth management trend report" shows that by 2017, the number of Chinese investment in the amount of 1 million to 5 million yuan has reached 20.92 million, this number will continue to increase, is expected to exceed 3000 by 2020. Ten thousand people.
            <br/><br/>
            WeHome has created a data engine “Eagle Eye”, that tracks more than 500 cities in the United States and 42 million suites in real time. Smart is the top 10% of the property with investment potential.
            <br/><br/>
            At the same time, WeHome regularly publishes industry research results such as macro market observation reports and overseas fixed asset allocation observation reports.
            <br/><br/>
            WeHome has innovatively created a way to invest in real estate starting with just $5000. WeHome set up a SPV, a special purpose entity for each property, therefore allowing investors to purchase shares and become shareholders of the SPV. This structure enables users to profit from both the rental and appreciation of the property, and offers the most comprehensive protection for users.
            <br/><br/>
            WeHome was founded by veterans from Airbnb, Amazon, Alibaba and etc. WeHome has offices in Beijing, Hong Kong and San Francisco. Their consultants and partners come from Blackstone, Coldwell Banker, Alibaba, Amazon, UC Berkley, M.I.T, Cornell University and more.
          </p>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'mediareport',
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
.media-container {
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  &.last {
    border-bottom: none;
  }
}
.chart-img {
  margin: 10px 0 20px;
  @media (max-width: 479px) {
    margin-top: 30px;
  }
}
.media-title-wrapper {
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 479px) {
    flex-direction: column;
    justify-content: center;
  }
  .media-img-wrapper {
    margin-right: 10px;
    // width: 170px;
    height: 60px;
    // padding-right: 30px;
    // padding-left: 30px;
    // background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      max-height: 100%;
    }
  }
  .media-title-container {
    width: calc(100% - 50px);
    @media (max-width: 479px) {
      width: 100%;
    }
  }
}
</style>