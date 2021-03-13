const module = {
  namespaced: true, // 命名空间
  state: {
    isTabbarShow: true
  },
  mutations: {
    hide (state) {
      state.isTabbarShow = false
    },
    show (state) {
      state.isTabbarShow = true
    }
  },
  actions: {

  }
}

export default module
