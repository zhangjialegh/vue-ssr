<template>
  <div>
    <div class="wire-transfer-section">
    <div class="w-container">
      <div class="wire-transfer-title">{{$t('收款账户信息')}}</div>
      <div class="wire-transfer-title red">{{$t('仅支持通过线下转账')}}<br/><span class="skr" @click="showHuikuanShadow">{{$t('查看银行汇款手续费')}}>></span></div>
      <div class="div-block-2">
        <div class="row-3 w-row" :class="{'last': index == tipsArr.length - 1}" v-for="(item, index) in tipsArr" :key="item.key+index">
          <div class="w-col w-col-6">
            <p class="paragraph-2" v-tooltip.bottom.start="{ content: item.desc, class: 'tooltip-custom tooltip-other-custom'}">{{item.title}} <img src="@/assets/images/info.png" width="12" height="12" class="image-50"></p>
          </div>
          <div class="w-col w-col-6">
            <p class="paragraph">{{bankInfo[item.key]}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-container">
      <div class="div-block-2">
        <h6>{{$t('上传凭证')}}</h6>
        <div class="div-block-21" id="upload" :style="{ backgroundImage: `url(${imgUrl})`}"><img :src="imgUrl?'':'https://wechat-pics.fangpinduo.com/website/upload/cloud.png'" width="50" class="image-9"></div>
      </div>
    </div>
    <div class="w-container">
      <div class="div-block-22">
        <h6>{{$t('转账银行名称')}}：</h6>
        <div class="form-block w-form">
          <form name="email-form" data-name="Email Form">
            <input type="text" class="text-field-2 w-input" name="name" data-name="name" :placeholder="$t('转出银行名称')" v-model="bank">
          </form>
        </div>
      </div>
      <div class="div-block-22">
        <h6>{{$t('转账账户姓名')}}：</h6>
        <div class="form-block w-form">
          <form name="email-form" data-name="Email Form">
            <input type="text" class="text-field-2 w-input" name="name" data-name="name" :placeholder="$t('银行卡持有人姓名')" v-model="name">
          </form>
        </div>
      </div>
      <div class="div-block-22">
        <h6>{{$t('转账汇款金额')}}：</h6>
        <div class="form-block w-form">
          <form name="email-form" data-name="Email Form">
            <input type="number" class="text-field-2 w-input" name="amount" data-name="amount" :placeholder="$t('输入汇款金额')" v-model="amount">
          </form>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="container-2 w-container" id="start">
      <a class="button-5 w-button" @click="submitVoucherBefore">{{$t('通知WeHome入账')}}</a>
    </div>
  </div>

  <pop-box :show-tip="showTip" :tip="tip" :pop-title="popTitle">
    <div class="w-row">
      <div class="column-55 w-col w-col-6 float-right single-btn">
        <a href="javascript:;" class="button-14 w-button" @click="closePopTip">{{$t('确定')}}</a></div>
    </div>
  </pop-box>
  <transition-box :show="showHuikuan">
    <div class="bank-huikuan-wrapper" v-show="showHuikuan">
      <div class="bank-huikuan-close" @click="closeHuikuan"></div>
      <table>
        <tr>
          <th>{{$t('银行名称')}}</th>
          <th>{{$t('网上银行国际汇款手续费')}}</th>
          <th>电报费{{$t('上传凭证')}}</th>
          <th class="last">{{$t('中转行费用')}}</th>
        </tr>
        <tr>
          <td>{{$t('香港招行一卡通')}}</td>
          <td>20{{$t('美元笔')}}</td>
          <td>{{$t('无')}}</td>
          <td class="last">20-30{{$t('美元')}}</td>
        </tr>
        <tr>
          <td>{{$t('香港民生银行')}}</td>
          <td>20{{$t('美元笔')}}</td>
          <td>{{$t('无')}}</td>
          <td class="last">20-30{{$t('美元')}}</td>
        </tr>
        <tr>
          <td>{{$t('香港永隆银行')}}</td>
          <td>100{{$t('美元笔')}}</td>
          <td>{{$t('无')}}</td>
          <td class="last">20-30{{$t('美元')}}</td>
        </tr>
        <tr>
          <td>{{$t('工银亚洲')}}</td>
          <td>140{{$t('美元笔')}}</td>
          <td>{{$t('无')}}</td>
          <td class="last">20-30{{$t('美元')}}</td>
        </tr>
      </table>
      <p>{{$t('收费以银行为准')}}</p>
    </div>
  </transition-box>
  <transition-box :show="showIncomeDesc">
    <div class="income-desc-wrapper" v-show="showIncomeDesc">
      <div class="income-desc-title">{{$t('WeHome汇款流程')}}</div>
      <img class="income-desc-flow" src="https://wechat-pics.fangpinduo.com/wehome/website/income-desc-flow.png" alt="加载失败">
      <div class="tiyanjin-step-wrapper">
        <ul class="tiyanjin-shuoming-wrapper">
          <li class="tiyanjin-shuoming-item">{{$t('针对所有用户在')}}<br></li>
          <li class="tiyanjin-shuoming-item">{{$t('因跨境汇款比较繁琐')}}<br></li>
          <li class="tiyanjin-shuoming-item">{{$t('资金汇款存入到余额账户')}}<br></li>
        </ul>
      </div>
      <div class="income-desc-btn" @click="closeIncomeFlow">{{$t('知道了')}}</div>
    </div>
  </transition-box>
  </div>
</template>

<script>
import { track, after } from "trackpoint-tools"
import Track from "@/track"
import {
  GET_USER_PAYMENT_INFO_ACTION,
  GET_USER_ORDER_TRANSFERINFO_ACTION,
  GET_USER_PAYMENT_NOTIFY_ACTION,
  GET_USER_ORDER_TRANSFER_NOTIFY_ACTION,
  GET_UPLOAD_KEY_ACTION
} from '@/scenes/mine/modules'

export default {
  name: 'wiretransfer',
  data () { return {
    bankInfo: {},
    tip: '',
    popTitle: '',
    showTip: false,
    transferInfo: {},
    imgUrl: "",
    sourceUrl: "",
    bank: "",
    name: "",
    amount: "",
    showIncomeDesc: false,
    showHuikuan: false,
    transfer: false,
    turnRouter: false,
    tipsArr:[
      {
        key: 'account_name',
        title:  this.$t('账号名称'),
        desc: this.$t('账号名称解释')
      },
      {
        key: 'bank_name',
        title: this.$t('银行名'),
        desc: this.$t('银行名解释')
      },
      {
        key: 'bank_address',
        title: this.$t('银行地址'),
        desc: this.$t('银行地址解释')
      },
      {
        key: 'bank_city',
        title: this.$t('收款行城市'),
        desc: this.$t('收款行城市解释')
      },
      {
        key: 'account_no',
        title: this.$t('账号'),
        desc: this.$t('账号解释')
      },
      {
        key: 'routing_num',
        title: 'Routing Number',
        desc: this.$t('解释Routing')
      },
      {
        key: 'swift_code',
        title: 'Swift Code',
        desc: this.$t('解释Swift')
      },
      {
        key: 'recipient_address',
        title: 'Recipient Address',
        desc: this.$t('解释Recipient')
      }
    ]
  } },
  methods: {
    popTip: function (tips) {
      if(tips) {
        this.showTip = true
        this.tip = tips
      }
    },
    closePopTip : function () {
      this.showTip = false
      if (this.turnRouter) {
        if(this.transfer) {
          this.$router.push({ path: "/mine", query: {active: 1, addbalance: true} });
        } else {
          this.$router.push({ path: "/mine", query: {active: 0} });
        }
      }
    },
    getUserTransfer: function () {
      const that = this
      this.$store.dispatch(GET_USER_PAYMENT_INFO_ACTION)
      .then((result)=>{
        that.bankInfo = result.content
      })
    },
    getOrderTransfer: function () {
      const that = this
      this.$store.dispatch(GET_USER_ORDER_TRANSFERINFO_ACTION,{
        order_id: this.$route.query.order_id
      }).then((result)=>{
        that.bankInfo = result
      })
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "recharge-income-flow-close-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    closeIncomeFlow: function () {
      this.showIncomeDesc = false
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "recharge-huikuan-close-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    closeHuikuan: function () {
      this.showHuikuan = false
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "recharge-huikuan-show-button",
          action: "click",
          optLabel: "button",
          page: this.$route.name,
          optValue: {
          }
        });
      })
    )
    showHuikuanShadow: function () {
      this.showHuikuan = true
    },
    @track(
      after(function() {
        Track.eventTrack({
          category: "upload-proof-submit",
          action: "click",
          optLabel: "submit",
          page: this.$route.name,
          optValue: {
            transfer_account: this.name,
            transfer_amount: this.amount,
            transfer_proof: this.src
          }
        });
      })
    )
    submitVoucherBefore() {
      if(!this.imgUrl) {
        const tip = this.$t('请上传汇款凭证')
        this.$options.methods.popTip.call(this, tip)
      }
    },
    submitVoucher(up) {
      if (!up.start) {
        return;
      }
      const { amount, name, imgUrl, bank } = this;
      if (!bank) {
        const tip = this.$t('请填写转账银行名称')
        this.$options.methods.popTip.call(this, tip)
      } else if (!name) {
        const tip = this.$t('请填写转账账户姓名')
        this.$options.methods.popTip.call(this, tip)
      } else if (!amount) {
        const tip = this.$t('请填写转账汇款金额')
        this.$options.methods.popTip.call(this, tip)
      } else {
        up.start();
      }
    },
    submitProof: function(src) {
      if(this.$route.query.order_id) {
        this.$options.methods.submitOrderProof.call(this, src)
      } else {
        this.$options.methods.submitUserProof.call(this, src)
      }
    },
    submitUserProof: function(src) {
      const { amount, name, bank } = this;
      const that = this;
      this.$store.dispatch(GET_USER_PAYMENT_NOTIFY_ACTION,{
        transfer_bank: bank,
        transfer_account: name,
        transfer_amount: amount,
        transfer_proof: src
      }).then((result)=>{
        that.transfer = true
        that.turnRouter = true
        that.popTitle = that.$t('提交成功')
        const tip = that.$t('由于需要人工核对')
        that.$options.methods.popTip.call(that, tip)
      }).catch((err)=>{
        const tip = that.$t('信息提交错误')
        that.$options.methods.popTip.call(that, tip)
      })
    },
    submitOrderProof: function(src) {
      const { amount, name, bank } = this;
      const that = this;
      this.$store.dispatch(GET_USER_ORDER_TRANSFER_NOTIFY_ACTION,{
        order_id: Number.parseInt(this.$route.query.order_id),
        transfer_bank: bank,
        transfer_account: name,
        transfer_amount: amount,
        transfer_proof: [src]  //这里由于小程序接口必须上传一个Array
      }).then((result)=>{
        that.transfer = false
        that.turnRouter = true
        that.popTitle = that.$t('提交成功')
        const tip = that.$t('由于需要人工核对')
        that.$options.methods.popTip.call(that, tip)
      }).catch((err)=>{
        const tip = that.$t('信息提交错误')
        that.$options.methods.popTip.call(that, tip)
      })
    },
    getTokenUrl: function() {
      const that = this;
      this.$store.dispatch(GET_UPLOAD_KEY_ACTION)
      .then((result)=>{
        Qiniu.uploader({
          runtimes: "html5,flash,html4", //上传模式,依次退化
          browse_button: "upload", //上传选择的点选按钮，**必需**
          // uptoken_url: 'https://wechat.fangpinduo.com/api/upload_key',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
          uptoken: result.uptoken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
          // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
          // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
          domain: "https://wechat-pics.fangpinduo.com", //bucket 域名，下载资源时用到，**必需**
          get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
          // container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
          max_file_size: "100mb", //最大文件体积限制
          // flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
          max_retries: 3, //上传失败最大重试次数
          dragdrop: true, //开启可拖曳上传
          drop_element: "container", //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: "4mb", //分块上传时，每片的体积
          auto_start: false, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
          init: {
            FilesAdded: function(up, files) {
              var img = new o.Image();
              img.onload = function() {
                const src = this.getAsDataURL();
                that.imgUrl = src;
              };
              img.load(files[0].getSource());
              // 开始上传按钮
              document
                .getElementById("start")
                .addEventListener(
                  "click",
                  that.submitVoucher.bind(that, up)
                );
              // document.getElementById('start').onclick = function () {
              //     console.log(up);
              //     up.start();

              // }
              plupload.each(files, function(file) {
                img.loading = true;
              });
            },
            BeforeUpload: function(up, file) {
              // 每个文件上传前,处理相关的事情
            },
            UploadProgress: function(up, file) {
              // 每个文件上传时,处理相关的事情
            },
            FileUploaded: function(up, file, info) {
              var domain = up.getOption("domain");
              var res = JSON.parse(info);
              var sourceLink = domain + '/' +res.key; //获取上传成功后的文件的Url
              
              that.sourceUrl = sourceLink
              that.$options.methods.submitProof.call(that, sourceLink);
            },
            Error: function(up, err, errTip) {
              //上传出错时,处理相关的事情
              const tip = that.$t('图片上传失败')
              that.$options.methods.popTip.call(that, tip)
            },
            UploadComplete: function() {
              //队列文件处理完毕后,处理相关的事情
            },
            Key: function(up, file) {
              var key = "test" + "/" + file.name;
              // do something with key here
              return key;
            }
          }
        });
      })
    }
  },
  mounted () {
    this.getTokenUrl();
    if(this.$route.query.order_id) {
      this.getOrderTransfer()
      this.showIncomeDesc = false
    } else {
      this.getUserTransfer()
      this.showIncomeDesc = true
    }
  }
}
</script>

<style lang="scss" scoped>
.w-row.last {
  border: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.paragraph-2 {
  display: inline-flex;
}
.div-block-21 {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.income-desc-wrapper {
  width: 90%;
  max-width: 560px;
  max-height: calc(100vh - 120px);
  padding: 30px 40px;
  position: relative;
  background: #fff;
  overflow-y: auto;
}
.income-desc-flow {
  display: block;
  width: 90%;
  margin: 20px auto;
}
.income-desc-title {
  color: #1f304e;
  font-size: 15px;
}
.income-desc-btn {
  max-width: 200px;
  height: 40px;
  border-radius: 2px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: #C89669;
  font-size: 12px;
  margin: 20px auto 0;
  cursor: pointer;
}
.bank-huikuan-close {
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 15px;
  right: 15px;
  background: url('https://wechat-pics.fangpinduo.com/wehome/website/usual/close.svg') no-repeat center center;
  background-size: 80% 80%;
}
.bank-huikuan-wrapper {
  position: relative;
  width: 90%;
  max-width: 560px;
  background-color: #fff;
  padding: 50px 40px 30px;
  table {
    width: 100%;
    border: 1px solid rgba(217, 217, 217, 0.5);
    th {
      padding: 10px 0;
      text-align: center;
      border-bottom: 1px solid rgba(217, 217, 217, 0.5);
      border-right: 1px solid rgba(217, 217, 217, 0.5);
      &.last {
        border-right: none;
      }
    }
    td {
      padding: 8px 0;
      text-align: center;
      border-right: 1px solid rgba(217, 217, 217, 0.5);
      &.last {
        border-right: none;
      }
    }
  }
  p {
    color: #272B2E;
    font-size: 12px;
    padding-top: 20px;
  }
}
.skr {
  color: #C89669;
  cursor: pointer;
}
.div-block-22 {
  h6 {
    min-width: 110px;
  }
}
.form-block {
  width: 100%;
  form {
    width: 100%;
    .text-field-2.w-input {
      width: 100%;
    }
  }
}
@media (max-width: 479px) {
  .income-desc-wrapper {
    padding: 20px;
  }
  .tiyanjin-shuoming-wrapper {
    padding-left: 20px;
  }
  .income-desc-title {
    font-size: 13px;
  }
  .tiyanjin-shuoming-item {
    padding-bottom: 10px;
    font-size: 12px;
  }
  .income-desc-flow {
    width: 100%;
    margin: 8px auto;
  }
  .income-desc-btn {
    width: 80%;
    height: 36px;
    line-height: 36px;
    max-width: 30000px;
  }
  .bank-huikuan-wrapper {
    padding: 50px 10px 10px;
    width: 100%;
  }
  table {
    th {
      font-size: 12px;
    }
    td {
      font-size: 12px;
    }
  }
}
</style>
