<template>
    <div class="card">
    <div class="row">
        <div class="col card-col card-primary">
            <h3 class="top-3-amount c-title" v-if="asset.total_asset">${{toThousandFix(asset.total_asset)}}</h3>
            <h3 class="top-3-amount c-title" v-else>暂无资产</h3>
            <div class="card-txt">当前总资产(美元)</div>
        </div>
    </div>
    <div class="row">
        <div class="col card-col">
            <router-link :to="{path:'/mine', query: {'active': 1}}" class="balance-wrapper">
            <div class="top-3-amount c-subtitle" v-if="asset.current_balance">${{toThousandFix(asset.current_balance)}}</div>
            <div class="top-3-amount c-subtitle" v-else>$0</div>
            <span v-if="asset.freeze_balance" class="tiyanjin-balance">+ ${{toThousandFix(asset.freeze_balance)}}(冻结)</span>
            <div class="card-txt">账户余额(可提现)</div>
            </router-link>
        </div>
        <div class="col card-col">
            <router-link :to="{path:'/sharelist'}" class="balance-wrapper">
            <div class="top-3-amount c-subtitle" v-if="asset.project_asset">${{toThousandFix(asset.project_asset)}}</div>
            <div class="top-3-amount c-subtitle" v-else>$0</div>
            <span v-if="expBalance" class="tiyanjin-balance">+${{toThousandFix(expBalance)}}(体验金)</span>
            <div class="card-txt">资产价值</div>
            </router-link>  
        </div>
    </div>
    </div>
       
</template>

<script>

import {
  toThousandFix,
  toThousandPrt
} from "@/utils/utils";

export default {
  name: "asset",
  props: {
    asset:{
        type: Object,
        default: function () {
            return {}
        }
    },
    expBalance: {
        type: Number,
        default: 0
    }
  },
  methods: {
    toThousandFix: toThousandFix,
    toThousandPrt: toThousandPrt
  }
};
</script>


<style lang="scss" scoped>
    .card{
        margin: 16px;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        background-color: #282c34;
        border-radius: 5px;
        padding: 10px 0;
    }
    .row{
        display: flex;
    }
    .col{
        flex-grow: 1;
        text-align: center;
        color: #ddd;
    }
    .balance-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .card-col{
        margin: 12px;
        width: 50%;
    }
    .card-txt{
        font-size: 10px;
        color: #999;
    }
    .card-primary{
        padding-bottom: 16px;
        border-bottom: 1px solid #444;
        margin-bottom: 0;
    }
    .c-title{
        font-size: 32px;
    }
    .c-subtitle{
        font-size: 18px;
    }
    .tiyanjin-balance {
        font-size: 13px;
    }
</style>
