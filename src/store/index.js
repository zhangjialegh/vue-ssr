import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/scenes/login/modules'
import home from '@/scenes/home/modules'
import about from '@/scenes/about/modules'
import invest from '@/scenes/investing/modules'
import base from './modules'
import user from '@/scenes/mine/modules'
import alert from '@/common/Alert/module'
import bank from '@/scenes/bank/modules'
import activity from '@/scenes/activityPage/modules'
import epart from '@/scenes/officialAccount/modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    base,
    auth,
    home,
    invest,
    user,
    alert,
    about,
    bank,
    activity,
    epart
  }
})

export default function createStore() {
  return store
}
