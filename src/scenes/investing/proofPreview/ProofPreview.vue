<template>
  <div class="wire-transfer-section">
    <div class="w-container" v-if="orderFile">
      <div class="wire-transfer-title _2">{{$t('项目协议及证书')}}</div>
      <div class="row-24 w-row">
        <div class="w-col w-col-6">
          <div class="div-block-33">
            <preview-image :src="orderFile.certificate">
              <img :src="orderFile.certificate" width="209" sizes="(max-width: 479px) 100vw, 209px">
            </preview-image>
          </div>
        </div>
        <div class="column-34 w-col w-col-6" v-if="orderFile.file.length > 0">
          <a :href="item.url" @click="downloadFile(item.url)" target="_blank" class="button-12 _1 w-button" v-for="(item, index) in orderFile.file" :key="item.url+index">{{item.title}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {GET_ORDER_FILES_ACTION} from '../modules'
import { track, after } from 'trackpoint-tools'
import Track from '@/track'

export default {
  name: 'proofPreview',
  data () { return {
    orderFile: null,
    url: ''
  } },
  methods: {
    @track(
      after(function() {
        Track.eventTrack(this.$store,{
          category: "proof-preview-download",
          action: "click",
          optLabel: "download",
          page: this.$route.name,
          optValue: {
            url: this.url
          }
        });
      })
    )
    downloadFile: function (url) {
      this.url = url
    },
    getOrderFile: function () {
      var that = this
      this.$store.dispatch(GET_ORDER_FILES_ACTION,{order_id: this.orderId}).then((result)=>{
        that.orderFile = result
      })
    },
  },
  computed:{
    orderId() {
      return this.$route.query.order_id 
    }
  },
  created () {
    this.getOrderFile()
  }
}
</script>

<style lang="scss" scoped>
.wire-transfer-section {
  margin-top: 0 !important;
  padding-top: 100px !important;
  min-height: 69vh;
}
</style>
