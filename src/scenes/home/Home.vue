<template>
  <div>
    <div v-if="locale==GLOBAL.ZH_CN">
    <swiper :options="swiperOption">
      <swiper-slide key="1">
        <div class="section new-home-bg banner-index" :class="{'isWeixin': isWeiXin}">
          <div class="w-container new-home">
            <div class="div-block-5 new-home">
              <h2 class="heading-10-new"><strong>{{$t('投资房产何必整套')}}</strong><br></h2>
              <p class="paragraph-25-new"><strong class="bold-text-10">{{$t('美国房产股权投资平台')}}</strong><br></p>
              <div class="row-76 w-row">
                <div class="column-114 w-col w-col-4">
                  <h1 class="heading-69" v-html="$t('租金收入资产增值收益一项不落')"></h1>
                </div>
                <div class="column-114 w-col w-col-4">
                  <h1 class="heading-69" v-html="$t('无中间商赚差价全流程透明')"></h1>
                </div>
                <div class="column-114 w-col w-col-4 last">
                  <h1 class="heading-69" v-html="$t('同样资金投更多优质房产')"></h1>
                </div>
              </div>
              <!-- <router-link :to="{path:'/deposit'}" class="buttons w-button"><strong class="bold-text-11">{{$t('立即入金')}}</strong></router-link> -->
              <div class="bottom-yindao">
                <div class="div-block-129" @click="showVideo"><img src="@/assets/images/play.png" width="20" height="20" class="image-58">
                  <p class="paragraph-67">{{$t('什么是房产股权投资')}}</p>
                </div>
                <!-- <img src="@/assets/images/downarrow.png"> -->
              </div>
              </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide key="5">
        <div class="section new-home-bg banner-touming">
          <div class="w-container new-home">
            <div class="div-block-5 new-home others">
              <h2 class="heading-10-new"><strong>{{$t('WeHome运作模式全揭密')}}</strong><br></h2>
              <p class="paragraph-25-new"><strong class="bold-text-10">{{$t('从底层资产到分红退出')}}</strong><br></p>
              <router-link :to="{path:'/outward', query: {'project_id': crowfundProject}}" class="buttons w-button"><strong class="bold-text-11">{{$t('了解更多')}}</strong></router-link>
              <div class="bottom-yindao">
                <div class="div-block-129" @click="showVideo"><img src="@/assets/images/play.png" width="20" height="20" class="image-58">
                  <p class="paragraph-67">{{$t('什么是房产股权投资')}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide key="2">
        <div class="section new-home-bg banner-pintuan" :class="{'isWeixin': isWeiXin}">
          <div class="w-container new-home">
            <div class="div-block-5 new-home others">
              <h2 class="heading-10-new"><strong>{{$t('拼团一起投')}}<span class="pc-only">  </span><div class="mob-only"></div>{{$t('分红赚更多')}}</strong><br></h2>
              <p class="paragraph-25-new"><strong class="bold-text-10">{{$t('邀请好友组团参与美国房产合投')}}<span class="pc-only">, </span><div class="mob-only"></div>{{$t('共同分享额外收益')}}</strong><br></p>
              <router-link :to="{path:'/property', query: {'project_id': crowfundProject}}" class="buttons w-button"><strong class="bold-text-11">{{$t('立即拼团')}}</strong></router-link>
              <div class="bottom-yindao">
                <div class="div-block-129" @click="showVideo"><img src="@/assets/images/play.png" width="20" height="20" class="image-58">
                  <p class="paragraph-67">{{$t('什么是房产股权投资')}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide key="3">
        <div class="section new-home-bg banner-expgold" :class="{'isWeixin': isWeiXin}">
          <div class="w-container new-home">
            <div class="div-block-5 new-home others">
              <h2 class="heading-10-new"><strong>{{$t('我出资你赚钱')}}</strong><br></h2>
              <p class="paragraph-25-new"><strong class="bold-text-10">{{showGold?$t('新用户专享5000美元赢取美国房产投资分红'):$t('马上邀请好友参与平分100美金')}}</strong><br></p>
              <router-link :to="{path:'/experiencegold'}" class="buttons w-button"><strong class="bold-text-11">{{!showGold?$t('马上邀请'):$t('马上领取')}}</strong></router-link>
              <div class="bottom-yindao">
                <div class="div-block-129" @click="showVideo"><img src="@/assets/images/play.png" width="20" height="20" class="image-58">
                  <p class="paragraph-67">{{$t('什么是房产股权投资')}}</p>
                </div>
                <!-- <img src="@/assets/images/downarrow.png"> -->
              </div>
              
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide key="4" v-if="locale==GLOBAL.ZH_CN">
        <div class="section new-home-bg banner-huamei" :class="{'isWeixin': isWeiXin}">
          <div class="w-container new-home">
            <div class="div-block-5 new-home others">
              <h2 class="heading-10-new"><strong>{{$t('美国银行账户')}}<span class="pc-only">, </span><div class="mob-only"></div>{{$t('你值得拥有')}}</strong><br></h2>
              <p class="paragraph-25-new"><strong class="bold-text-10">{{$t('参与WeHome房产合投')}}<span class="pc-only">, </span><div class="mob-only"></div>{{$t('免费开通美国银行账户')}}</strong><br></p>
              <router-link :to="{path:'/bank'}" class="buttons w-button"><strong class="bold-text-11">{{$t('立即开户')}}</strong></router-link>
              <div class="bottom-yindao">
                <div class="div-block-129" @click="showVideo"><img src="@/assets/images/play.png" width="20" height="20" class="image-58">
                  <p class="paragraph-67">{{$t('什么是房产股权投资')}}</p>
                </div>
                <!-- <img src="@/assets/images/downarrow.png"> -->
              </div>
              
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="section-2">
        <div class="container-3 w-container"><img src="@/assets/images/icon6.png" width="100" class="image-2"><img src="@/assets/images/icon5.png" width="100" class="image-2"><img src="@/assets/images/icon4.png" width="100" class="image-2"><img src="@/assets/images/icon3.png" width="100" class="image-2"><img src="@/assets/images/icon2.png" width="50" class="image-2"><img src="@/assets/images/icon1.png" width="100" class="image-2"><img src="@/assets/images/icon7.png" width="50" class="image-2"></div>
      </div>
      <div class="section-25">
        <div class="container-34 w-container">
          <div class="row-77 w-row">
            <div class="w-col w-col-6">
              <h4 class="heading-70">{{$t('为什么在WeHome投资房产股权')}}</h4>
            </div>
            <div class="column-117 w-col w-col-6">
              <div class="div-block-152" @click="showCompareShadow">
                <p class="paragraph-68">{{$t('与其他美元投资产品对比')}}</p><img src="@/assets/images/arrow.png" width="8" height="10" class="image-59"></div>
            </div>
          </div>
          <div class="div-block-136">
            <div class="div-block-134">
              <div class="div-block-135"><img src="@/assets/images/icon-1.png" width="43" class="image-3"></div>
              <h5 class="heading-16"><strong>{{$t('资产直投')}}</strong><br></h5>
              <p class="paragraph-17-new" v-html="$t('直投优质底层资产')"></p>
            </div>
            <div class="div-block-133">
              <div class="div-block-135"><img src="@/assets/images/icon-2.png" width="32" class="image-3"></div>
              <h5 class="heading-16">{{$t('极度透明')}}</h5>
              <p class="paragraph-17-new" v-html="$t('IPO级别资产信息披露')"></p>
            </div>
            <div class="div-block-132">
              <div class="div-block-135"><img src="@/assets/images/icon-3.png" width="43" class="image-3"></div>
              <h5 class="heading-16">{{$t('严格监管')}}</h5>
              <p class="paragraph-17-new">{{$t('严格符合当地法律')}}<br><a class="color-gold link" href="https://www.sec.gov/rules/final/33-7505.htm" target="_blank">（SEC Regulation-S）</a></p>
            </div>
            <div class="div-block-131">
              <div class="div-block-135"><img src="@/assets/images/icon-4.png" width="43" class="image-3"></div>
              <h5 class="heading-16">{{$t('退出灵活')}}</h5>
              <p class="paragraph-17-new" v-html="$t('股权转售市场')"></p>
            </div>
            <div class="div-block-130">
              <div class="div-block-135"><img src="@/assets/images/icon-5.png" width="39" class="image-3"></div>
              <h5 class="heading-16">{{$t('大佬背书')}}</h5>
              <p class="paragraph-17-new" v-html="$t('腾讯创始人曾李青投资背书')"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="section-26">
        <div class="w-container">
          <div class="w-row">
            <div class="column-124 w-col w-col-6">
              <div class="div-block-137">
                <div><img :src="locale==GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/wehome/website/static/image/return.png':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/estimated.png'" sizes="100vw"></div>
              </div>
            </div>
            <div class="column-121 w-col w-col-6">
              <h1 class="heading-71">{{$t('层层过滤严格把关优选与运营底层资产')}}</h1>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70"><strong class="bold-text-13">{{$t('深耕美国')}}</strong><br/>{{$t('房源底层资产同时对接公有市场与私有市场')}}<span class="color-gold">{{$t('保障实时优质的资产来源')}}</span>；<br></p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70"><strong class="bold-text-13">{{$t('量化模型')}}</strong><br/>{{$t('立足于海量深度多维的美国房产')}}<span class="color-gold">{{$t('数据挖掘')}}</span>{{$t('与MIT康奈尔Housecanary等第三方权威机构联合研发投资')}}<span class="color-gold">{{$t('量化模型')}}</span>{{$t('对资产的收益成本做出精准评估')}}<br></p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70"><strong class="bold-text-13">{{$t('三方评估')}}</strong><br/>{{$t('结合第三方勘察公司对底层资产进行')}}<span      
                class="color-gold">{{$t('全方位评估与检查确保资产状态优良')}}</span>；<br></p>
              </div>
              <div class="div-block-138"><img src="@/assets/images/triangle.png" width="10" class="image-60">
                <p class="paragraph-70"><strong class="bold-text-13">{{$t('协同网络')}}</strong><br/>{{$t('WeHome优选当地的资源方与供应商建立独家的行业协同网络确保')}}<span class="color-gold">{{$t("高效与低成本运营底层资产")}}</span><br></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-4-new">
        <div class="w-container">
          <div class="div-block-6-new">
            <div>
              <div class="row-77 w-row">
                <div class="w-col w-col-6">
                  <h4 class="heading-70">{{$t('WeHome投资品类')}}<br></h4>
                </div>
                <router-link to="/invest" class="column-117 w-col w-col-6">
                  <p class="paragraph-68"><strong>{{$t('查看房源')}}</strong></p><img src="@/assets/images/arrow.png" width="8" height="10" class="image-59"></router-link>
              </div>
            </div>
            <div class="row-78 w-row">
              <div class="column-120 w-col w-col-4"><img :src="($i18n.locale == GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/wehome/website/static/image/card1.png':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/1.png')+'?imageView2/2/w/500'" sizes="100vw"></div>
              <div class="column-118 w-col w-col-4"><img :src="($i18n.locale == GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/wehome/website/static/image/card2.png':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/2.png')+'?imageView2/2/w/500'" sizes="100vw"></div>
              <div class="column-119 w-col w-col-4"><img :src="($i18n.locale == GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/wehome/website/static/image/card3.png':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/3.png')+'?imageView2/2/w/500'" sizes="100vw"></div>
            </div>
            <p class="paragraph-18" v-html="$t('房地产投资包含风险')"></p>
          </div>
        </div>
        <div class="container-38 w-container">
          <h1 class="heading-73">{{$t('以客户资产安全为首要任务')}}</h1>
          <div class="table-container">
            <div class="row-79">
              <div class="div-block-139">
                <img src="@/assets/images/safe1.png" width="60">
                <p class="paragraph-71" v-html="$t('客户资产隔离托管')"></p>
              </div>
              <div class="div-block-139">
                <img src="@/assets/images/safe2.png" width="60">
                <p class="paragraph-71" v-html="$t('每个资产独立SPV')"></p>
              </div>

              <div class="div-block-139">
                <img src="@/assets/images/safe3.png" width="60">
                <p class="paragraph-71" v-html="$t('账户受SEC美国')"></p>
              </div>

              <div class="div-block-139">
                <img src="@/assets/images/safe4.png" width="60">
                <p class="paragraph-71" v-html="$t('第三方审计')"></p>
              </div>


              <!-- <div class="column-122 w-col w-col-3">
                <div class="div-block-139">
                  <img src="@/assets/images/safe1.png" width="60">
                  <p class="paragraph-71" v-html="$t('客户资产隔离托管')"></p>
                </div>
              </div>
              <div class="w-col w-col-3">
                <div class="div-block-139">
                  <img src="@/assets/images/safe2.png" width="60">
                  <p class="paragraph-71" v-html="$t('每个资产独立SPV')"></p>
                </div>
              </div>
              <div class="w-col w-col-3">
                <div class="div-block-139"><img src="@/assets/images/safe3.png" width="60">
                  <p class="paragraph-71" v-html="$t('账户受SEC美国')"></p>
                </div>
              </div>
              <div class="w-col w-col-3">
                <div class="div-block-139"><img src="@/assets/images/safe4.png" width="60">
                  <p class="paragraph-71" v-html="$t('第三方审计')"></p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="section-28">
        <div class="container-36 w-container">
          <h1 class="heading-74">{{$t('这些公司的员工都在用')}}<br></h1>
          <div class="div-block-141"><img src="@/assets/images/company1.png" width="90" class="image-61"><img src="@/assets/images/company10.png" width="90" class="image-61"><img src="@/assets/images/company6.png" width="90" class="image-61"><img src="@/assets/images/company2.png" width="90" class="image-61"><img src="@/assets/images/company9.png" width="90" class="image-61"><img src="@/assets/images/company8.png" width="80" class="image-61"></div>
          <div class="div-block-140"><img src="@/assets/images/company7.png" width="90" class="image-61"><img src="@/assets/images/company3.png" width="100" class="image-61"><img src="@/assets/images/company11.png" width="100" class="image-61"><img src="@/assets/images/company5.png" width="90" class="image-61"></div>
        </div>
      </div>
      <div class="section-5-new">
        <div class="container-37 w-container">
          <h1 class="heading-75">{{$t('只需3步即可获得投资收益')}}<br></h1>
          <div class="div-block-146">
            <div class="div-block-142">
              <p class="paragraph-72">STEP</p>
              <div class="div-block-144"><img src="@/assets/images/step1.png" width="27" class="image-62"></div>
              <h1 class="heading-76"><strong>{{$t('项目认购')}}</strong><br></h1>
              <p>{{$t('开户入金投资房产股权项目')}}</p>
            </div><img src="@/assets/images/steparrow.png" width="40" height="70" class="image-64">
            <div class="div-block-142">
              <p class="paragraph-72">STEP</p>
              <div class="div-block-144"><img src="@/assets/images/step2.png" width="50" class="image-62"></div>
              <h1 class="heading-76"><strong>{{$t('租金分红')}}</strong><br></h1>
              <p>{{$t('每月分红即时查看资产运营财报')}}</p>
            </div><img src="@/assets/images/steparrow.png" width="40" height="70" class="image-65">
            <div class="div-block-142">
              <p class="paragraph-72">STEP</p>
              <div class="div-block-144"><img src="@/assets/images/step3.png" width="50" class="image-62"></div>
              <h1 class="heading-76"><strong>{{$t('项目退出')}}</strong><br></h1>
              <p v-html="$t('转售市场随时出售房产股权')"></p>
            </div>
          </div><router-link to="/outward" class="buttons step w-button"><strong class="bold-text-12">{{$t('查看详情')}}</strong></router-link></div>
      </div>
      <div class="section-16 _1-new">
        <div class="container-6-new w-container">
          <h1 class="heading-73">{{$t('投资人与顾问')}}</h1>
          <div class="row-80 w-row">
            <div class="column-123 w-col w-col-4">
              <div class="div-block-148">
                <div class="div-block-32"><img src="https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-guxin.png" width="100"></div>
                <div class="card-new">
                  <div class="card-info-wrapper _2-new new-wrapper">
                    <p class="paragraph-73">{{$t('谷懿')}}<br></p>
                    <p class="client _1-new">{{$t('跨境投资者进入美国房产市场的最优通道')}}</p>
                    <p class="client _3" v-html="$t('和米资本')"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-col w-col-4">
              <div class="div-block-149">
                <div class="div-block-32"><img src="https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-zengliqing.png" width="100"></div>
                <div class="card-new">
                  <div class="card-info-wrapper _2-new new-wrapper">
                    <p class="paragraph-73">{{$t('曾李青')}}<br></p>
                    <p class="client _1-new middle">{{$t('WeHome是通过大数据和技术帮助中国投资者提升全球资产配置效率用科技改变金融投资模式')}}</p>
                    <p class="client _3 middle" v-html="$t('腾讯联合创始人')"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-col w-col-4">
              <div class="div-block-150">
                <div class="div-block-32"><img src="https://wechat-pics.fangpinduo.com/wehome/website/avatar/i-xusiqing.png" width="100"></div>
                <div class="card-new">
                  <div class="card-info-wrapper _2-new new-wrapper">
                    <p class="paragraph-73">{{$t('许四清')}}<br></p>
                    <p class="client _1-new">{{$t('WeHome拥有创新性的美国房产股权投资模式丰富的行业经验强大的数据与技术研发能力')}}</p>
                    <p class="client _3" v-html="$t('阿尔法公社创始合伙人')"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-29" :class="{'isWeixin': isWeiXin}" v-if="false">
        <div class="w-container">
          <h1 class="heading-75">{{$t('媒体报道')}}<br></h1>
          <router-link :to="{path: '/mediaReport'}" class="div-block-147">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-renminwang.png" width="100" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-sinacaijing.gif" width="100" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-caijingwang.png" width="100" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-ifeng.jpeg" width="100" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-zgribaowang.png" width="100" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-wangyifc.png" width="100" class="image-63">
            <img src="https://wechat-pics.fangpinduo.com/wehome/website/static/image/media-chuangyebang.png" width="100" class="image-63">
          </router-link>
        </div>
      </div>
      <div class="div-block-151" :class="{'isWeixin': isWeiXin}" v-if="showBar && locale==GLOBAL.ZH_CN">
        <div class="container-39 w-container">
          <div class="row-81 w-row">
            <div class="w-col w-col-6">
              <h1 class="heading-77">{{$t('我出资你赚钱')}}，{{showGold?$t('注册马上领取5000投资体验金'):$t('与好友平分100美金')}}!</h1>
            </div>
            <div class="column-125 w-col w-col-6"><router-link :to="{path:'/experiencegold'}" class="link-7 w-button"><strong class="bold-text-15">{{showGold?$t('马上领取'):$t('马上邀请')}}</strong><br></router-link></div>
          </div>
          <div class="invitation-card-close home-bar-close" @click="closeBar"></div>
        </div>
        <div class="container-39 w-container mob-only">
          <div class="row-81 w-row">
            <div class="column-125 w-col w-col-6"><router-link :to="{path:'/experiencegold'}" class="link-7 w-button"><strong class="bold-text-15">{{showGold?$t('马上领取5000体验金'):$t('马上邀请好友平分100美金')}}</strong><br></router-link></div>
          </div>
        </div>
      </div>
      <div class="div-block-151" :class="{'isWeixin': isWeiXin}" v-if="!$store.state.auth.auth.isLoggedIn && showBar && locale!==GLOBAL.ZH_CN">
        <div class="container-39 w-container">
          <div class="row-81 w-row">
            <div class="w-col w-col-6">
              <h1 class="heading-77">{{$t('了解WeHome')}}!</h1>
            </div>
            <div class="column-125 w-col w-col-6"><router-link :to="{path:'/login'}" class="link-7 w-button"><strong class="bold-text-15">{{$t('了解更多')}}</strong><br></router-link></div>
          </div>
          <div class="invitation-card-close home-bar-close" @click="closeBar"></div>
        </div>
        <div class="container-39 w-container mob-only">
          <div class="row-81 w-row">
            <div class="column-125 w-col w-col-6"><router-link :to="{path:'/login'}" class="link-7 w-button"><strong class="bold-text-15">{{$t('了解WeHome')}}</strong><br></router-link></div>
          </div>
        </div>
      </div>
      <transition-box :show="showCompare">
        <div v-show="showCompare">
          <div class="home-popup home _1">
            <div class="invitation-card-close home-compare-close" @click="closeCompare"></div>
            <img :src="locale==GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/wehome/website/static/image/comparison.png':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/other2.png'" width="600" sizes="100vw" class="image-66"></div>
          <div class="home-popup home _2">
            <div class="invitation-card-close home-compare-close" @click="closeCompare"></div>
            <img :src="locale==GLOBAL.ZH_CN?'https://wechat-pics.fangpinduo.com/wehome/website/static/image/comparison2.jpg':'https://wechat-pics.fangpinduo.com/wehome/website/static/image/eng/other.jpg'" width="600" sizes="100vw" class="image-67">
          </div>
        </div>
      </transition-box>
    <video-model :show="showVideoModel" @closeVideo="closeVideo"></video-model>
  </div>
  <eng-home v-else/>
  </div>
</template>

<script>
  import {CHECK_QUALIFICATION_ACTION,GET_RCMD_PROJECT_ACTION} from './modules.js'
  import { track, after } from 'trackpoint-tools'
  import Track from '@/track'
  import EngHome from './EngHome.vue'
  
  export default {
    name: 'home',
    components: { EngHome },
    data () {
      return {
        showCompare: false,
        showBar: false,
        showVideoModel: Boolean(this.$route.query.video),
        locale: this.$i18n.locale,
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        swiperList: []
      }
    },
    methods: {
      checkQualification: function () {
        const that = this
        this.$store.dispatch(CHECK_QUALIFICATION_ACTION,{type: 'money_exp'})
      },
      @track(after(function () {
        Track.eventTrack(this.$store,{
          category: 'new-home-show-video-popup',
          action: 'click',
          optLabel: 'popup',
          page: this.$route.name,
          optValue: {
          }
        })
      }))
      showVideo() {
        this.showVideoModel = true
      },
      closeVideo(msg) {
        this.showVideoModel = msg
      },
      @track(after(function () {
        Track.eventTrack(this.$store,{
          category: 'new-home-show-compare-popup',
          action: 'click',
          optLabel: 'popup',
          page: this.$route.name,
          optValue: {
          }
        })
      }))
      showCompareShadow () {
        this.showCompare = true
      },
      closeCompare () {
        this.showCompare = false
      },
      getRcmdProject: function () {
        const that = this
        this.$store.dispatch(GET_RCMD_PROJECT_ACTION)
      },
      closeBar: function () {
        this.showBar = false
        localStorage.setItem("show_bar", new Date().getTime());
      }
    },
    computed: {
      isWeiXin() {
        return this.$store.state.base.isWeixin
      },
      showGold() {
        return this.$store.state.home.showGold
      },
      auth() {
        return this.$store.state.auth.auth
      },
      crowfundProject() {
        return this.$store.state.home.rcmd_project_id
      }
    },
    mounted () {
      this.getRcmdProject()
      if(this.auth.isLoggedIn) {
        this.checkQualification()
      }
      const timeStamp = localStorage.getItem('show_bar')
      if (timeStamp) {
        const deltaTime = (new Date().getTime() - timeStamp) / 1000 / 60 / 60;
        if (deltaTime >= 24) {
          this.showBar = true
        } else {
          this.showBar = false
        }
      } else {
        this.showBar = true
      }
    }
  }
</script>

<style lang="scss" scoped>
.table-container {
  display: table;
  border-spacing: 10px;
  width: 100%;
  @media (max-width: 767px) {
    display: block;
  }
  .row-79 {
    display: table-row;
    @media (max-width: 767px) {
      display: block;
    }
    .div-block-139 {
      display: table-cell;
      width: 25%;
      @media (max-width: 767px) {
        display: flex;
        width: 100%;
      }
      p {
        padding: 0 5px;
      }
      img {
        display: block;
        margin: 0 auto;
      }
    }
  }
}
 .invitation-card-close.home-compare-close {
  width: 20px;
  height: 20px;
  top: 15px;
  right: 15px;
  background-size: 80% 80%;
}
.container-39.mob-only {
  display: none;
}
.bottom-yindao {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 479px) {
    bottom: 35px;
  }
}
.div-block-5.others {
  padding-top: 90px;
}
.new-home {
  height: 100%;
}
.invitation-card-close.home-bar-close {
  top: 16px;
  right: 26px;
  height: 20px;
  width: 20px;
}
.div-block-5.new-home {
  .mob-only {
    display: none;
  }
}
.color-gold {
  color: #d5a478;
  &.link {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
  }
}
.swiper-container-horizontal>.swiper-pagination-bullets  {
  bottom: 30px;
  height: 0;
}
@media (max-width: 479px) {
  .container-39.mob-only {
    display: block; 
    .column-125 {
      text-align: center;
    }
    .link-7 {
      width: calc(100% - 20px);
    }
  }
  .div-block-151.isWeixin {
    top: 0;
  }
  .section.new-home-bg.isWeixin {
    padding-top: 70px;
  }
  .section-29.isWeixin {
    margin-bottom: 50px;
  }
  .div-block-129 {
    margin: 0;
  }
  .div-block-5.others {
    padding-top: 120px;
  }
  .div-block-5.new-home {
    .mob-only {
      display: block;
    }
    .pc-only {
      display: none;
    }
  }
}

</style>