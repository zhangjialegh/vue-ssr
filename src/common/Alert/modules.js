export const SHOW_POP_BOX = 'SHOW_POP_BOX'
export const HIDE_POP_BOX = 'HIDE_POP_BOX'

const alert = {
  state: {
    showTip: false,
    tip: ''
  },
  mutations: {
    [SHOW_POP_BOX](state, payload) {
      state.showTip = true
      state.tip = payload
    },
    [HIDE_POP_BOX](state) {
      state.showTip = false
      state.tip = ''
    }
  }
}

export default alert
