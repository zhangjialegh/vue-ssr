<template>
  <div class="order-section">
    <div class="order-contaiiner w-container">
      <div class="detail-title">{{$t('银行账户信息')}}</div>
      <div class="order-section-top small-bottom-margin">
        <div class="order-person-info-notice"></div>
        <div class="w-form">
          <div class="w-row">
            <div class="w-col w-col-6">
              <label for="name-5" class="form-label">
                {{$t('账户名称')}} <span class="text-red">*</span>
              </label>
              <input type="text" class="input w-input" :class="{'input-error':accountEr}" maxlength="256" name="name-5" data-name="Name 5" :placeholder="$t('本人收款账户名称')" v-model="account">
            </div>

            <div class="w-col w-col-6">
              <label for="name-5" class="form-label">
                {{$t('银行名')}} <span class="text-red">*</span>
              </label>
              <input type="text" class="input w-input" :class="{'input-error':bankEr}" maxlength="256" name="name-5" data-name="Name 5" :placeholder="$t('收款银行名称')" v-model="bank">
            </div>
          </div>

          <div class="w-row">
            <div class="w-col w-col-6">
              <label for="name-5" class="form-label">
                {{$t('银行地址')}} <span class="text-red">*</span>
              </label>
              <input type="text" class="input w-input" :class="{'input-error':bankaddrEr}" maxlength="256" name="name-5" data-name="Name 5" :placeholder="$t('收款银行开户详情地址')" v-model="bankaddr">
            </div>

            <div class="w-col w-col-6">
              <label for="name-5" class="form-label">
                {{$t('账号')}} <span class="text-red">*</span>
              </label>
              <input type="text" class="input w-input" :class="{'input-error':accountnumEr}" maxlength="256" name="name-5" data-name="Name 5" :placeholder="$t('账号')" v-model="accountnum">
            </div>
          </div>

          <div class="w-row">
            <div class="w-col w-col-6">
              <label for="name-5" class="form-label flex">
                <select id="field" name="field" class="select-field-3 verification-code w-select" @input="selectOption">
                  <option :value="op.value" v-for="(op,index) in options" :key="op.value+index" :selected="op.value===optionNumber">{{op.name}}</option>
                </select><span class="text-red">*</span>
              </label>
              <input type="text" class="input w-input" :class="{'input-error':optionNumberEr}" maxlength="256" name="name-5" data-name="Name 5" :placeholder="optionNumberHolder" v-model="optionValue">
            </div>

            <div class="w-col w-col-6">
              <label for="name-5" class="form-label">
                Recipient Address <span class="text-red">*</span>
              </label>
              <input type="text" class="input w-input" :class="{'input-error':recipientaddrEr}" maxlength="256" name="name-5" data-name="Name 5" :placeholder="$t('收件人通讯地址')" v-model="recipientaddr">
            </div>

            <!-- <div class="w-col w-col-6">
              <label for="name-5" class="form-label">
                Swift Code <span class="text-red">*</span>
              </label>
              <input type="text" class="input w-input" :class="{'input-error':swiftcodeEr}" maxlength="256" name="name-5" data-name="Name 5" placeholder="提现到非美国银行收款账号需信息" v-model="swiftcode">
            </div> -->
          </div>
        </div>
        <div class="w-container">
          <div class="div-block-2">
            <h6>{{$t('上传投资者护照带有照片和个人信息页面')}}</h6>
            <div class="div-block-21" id="upload" :style="{ backgroundImage: `url(${imgUrl})`}"><img :src="imgUrl?'':'https://wechat-pics.fangpinduo.com/website/upload/cloud.png'" width="50" class="image-9"></div>
          </div>
        </div>
      </div>
      
      <div class="payorder-button-container">
        <!-- <a class="button order-button w-button blue">￥1000</a> -->
        <a class="button order-button w-button" @click="sumbitBankInfo">{{$t('保存')}}</a>
      </div>
    </div>
  <pop-box :show-tip="showTip" :tip="tip">
    <div class="w-row">
      <div class="column-55 w-col w-col-6 single-btn"><a class="button-14 w-button" @click="closePopTip">{{$t('知道了')}}</a></div>
    </div>
  </pop-box>
  </div>
</template>

<script>
import {
  GET_UPLOAD_KEY_ACTION,
  GET_USER_ACCOUNT_EDIT_ACTION,
  GET_USER_ACCOUNT_GET_ACTION
} from '@/scenes/mine/modules'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: "bankinfo",
  data() {
    return {
      account: '',
      accountEr: false,
      bank: '',
      bankEr: false,
      bankaddr: '',
      bankaddrEr: false,
      accountnum: '',
      accountnumEr: false,
      optionNumber: 'swift_code',
      optionValue: '',
      optionNumberEr: false,
      recipientaddr: '',
      recipientaddrEr: false,
      


      showTip: false,
      
      tip: '',
      uploadClass: null, //上传实例
      imgUrl: '',
      uploadImage: '', //上传之后的图片链接

      options: [{
        value: 'routing_num',
        name: 'Routing Number',
        placeHolder: this.$t('提现到美国银行收款账号需信息')
      },{
        value: 'swift_code',
        name: 'Swift Code',
        placeHolder: this.$t('提现到非美国银行收款账号需信息')
      }]
    };
  },
  methods: {
    selectOption(e) {
      this.optionNumber = e.target.value
    },
    clearEr: function() {
      this.accountEr = this.bankEr = this.bankaddrEr = this.accountnumEr = this.optionNumberEr = this.recipientaddrEr = false;
      const { account, bank, bankaddr, accountnum, optionValue, recipientaddr, uploadImage } = this
      if (!account) {
        this.tip = this.$t('请输入账户名称');
        this.showTip = true
        this.accountEr = true;
        return false
      } else if (!bank) {
        this.tip = this.$t('请输入银行名称');
        this.showTip = true
        this.bankEr = true;
        return false
      } else if (!bankaddr) {
        this.tip = this.$t('请输入银行地址');
        this.showTip = true
        this.bankaddrEr = true;
        return false
      } else if (!accountnum) {
        this.tip = this.$t('请输入账号');
        this.showTip = true
        this.accountnumEr = true;
        return false
      } else if (!optionValue) {
        this.tip = this.$t('请输入optname',{msg: this.optionName});
        this.showTip = true
        this.optionNumberEr = true;
        return false
      } else if (!recipientaddr) {
        this.tip = this.$t('请输入RecipientAddress');
        this.showTip = true
        this.recipientaddrEr = true
        return false
      } else if (!uploadImage) {
        this.tip = this.$t('请上传投资者护照带有照片和个人信息页面');
        this.showTip = true
      } else {
        return true
      }
    },
    popTip: function (tips) {
      if (tips) {
        this.showTip = true
        this.tip = tips
      }
    },
    // @track(after(function () {
    //   Track.eventTrack(this.$store,{
    //     category: 'order-close-over-tip-popup',
    //     action: 'click',
    //     optLabel: 'popup',
    //     page: this.$route.name,
    //     optValue: {
    //       tip: this.tip,
    //       payMethod: this.payMethod,
    //       errorTip: this.errorTip,
    //       amount: this.amount,
    //       name: this.name,
    //       id_type: this.idType,
    //       id_num: this.idNumber,
    //       phone: this.phone,
    //       country: this.phoneType,
    //       projectId: Number.parseInt(this.houseDetail.project_id)
    //     }
    //   })
    // }))
    closePopTip : function () {
      this.showTip = false
      this.showErrorTip = false
      if(this.needReview) {
        this.$router.push({
          path: '/invest',
        })
      }
    },
    sumbitBankInfo: function() {
      if(this.$options.methods.clearEr.call(this)){
        this.$options.methods.submitUserProof.call(this)
      }
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
              auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
              init: {
                FilesAdded: function(up, files) {
                  var img = new o.Image();
                  img.onload = function() {
                    const src = this.getAsDataURL();
                    that.imgUrl = src;
                  };
                  img.load(files[0].getSource());
                  // 开始上传按钮
                  that.uploadClass = up
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
                  that.uploadImage = sourceLink
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
    },
    submitUserProof: function() {
      const { account, bank, bankaddr, accountnum, optionValue, optionNumber, recipientaddr, uploadImage } = this
      const bankId = Number(this.$route.query.account_id)
      const that = this;
      let params = {
          account_name: account,
          bank_name: bank,
          bank_address: bankaddr,
          account_no: accountnum,
          recipient_address: recipientaddr,
          idcard_url: uploadImage
      }
      if(bankId) {
        params['account_id'] = bankId
      }
      params[optionNumber] = optionValue
      this.$store.dispatch(GET_USER_ACCOUNT_EDIT_ACTION,params)
      .then((res)=>{
        // 提交成功，跳转账户列表页并选中该账户
        if(res.success) {
          that.$router.push({
            path: '/withdraw/banklist',
            query: {
              account_id: bankId ? bankId : 0
            }
          })
        } else {
          that.tip = that.$t('信息提交错误')
          that.showTip = true
        }
      }).catch((err)=>{
        that.tip = that.$t('信息提交错误')
        that.showTip = true
      })
    },
    loadBankInfo: function() {
      const { account, bank, bankaddr, accountnum, optionValue, optionNumber, recipientaddr } = this
      const that = this
      const bankId = Number(this.$route.query.account_id)
      if(bankId) {
        this.$store.dispatch(GET_USER_ACCOUNT_GET_ACTION,{
          account_id: bankId
        }).then((res)=>{
          const info = res.data
          that.account = info.account_name
          that.bank = info.bank_name
          that.bankaddr = info.bank_address
          that.accountnum = info.account_no
          that.recipientaddr = info.recipient_address
          if(info.routing_num) {
            that.optionNumber = 'routing_num'
            that.optionValue = info.routing_num
          } else if (info.swift_code) {
            that.optionNumber = 'swift_code'
            that.optionValue = info.swift_code
          }
        }).catch((err)=>{
          that.tip = that.$t('信息提交错误')
          that.showTip = true
        })
      } else {
        that.account = ''
        that.bank = ''
        that.bankaddr = ''
        that.accountnum = ''
        that.optionNumber = 'swift_code'
        that.optionValue = ''
        that.recipientaddr = ''
      }
    }
  },
  created() {
    this.loadBankInfo()
  },
  mounted() {
    this.getTokenUrl()
  },
  computed: {
    optionNumberHolder() {
      const that = this
      const list = this.options
      let holder = that.$t('请输入必填信息')
      list.forEach((item) => {
        if(item.value === that.optionNumber) {
          holder = item.placeHolder
        }
      })
      return holder
    },
    optionName() {
      const that = this
      const list = this.options
      let name = 'Routing Number'
      list.forEach((item) => {
        if(item.value === that.optionNumber) {
          name = item.name
        }
      })
      return name
    }
  }
};
</script>

<style lang="scss" scoped>
.div-block-21 {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.input-error {
  border: 1px solid #ff5000 !important;
}
.payorder-button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.form-label.flex {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -5px;
}
.select-field-3.verification-code.w-select {
    padding: 0;
    height: 25px;
    width: 120px;
    font-size: 12px;
  }
@media (max-width: 479px) {
  .order-section-top {
    padding-top: 0;
  }
  .detail-title {
    margin-top: 30px;
  }
  .order-section-top {
    border-bottom: none;
  }
  .payorder-button-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    .button.order-button {
      border-radius: 0;
    }
  }
}
.order-person-info-notice {
  color: #FF5000;
  margin-bottom: 20px;
}
</style>
