import Vue from 'vue'
import Vuex from 'vuex'
import CityModule from './module/CityModule'
import CinemaModule from './module/CinemaModule'
import TabbarModule from './module/TabbarModule'
import createpersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// store "全局"的对象
export default new Vuex.Store({
  // vuex 持久化  第三方插件
  plugins: [createpersistedState()], // storage: window.sessionStroage
  // 公共状态
  state: {

  },
  // 集中式修改状态
  mutations: {

  },
  // 异步
  actions: {

  },
  // 各个模块-火车组装
  modules: {
    CityModule,
    CinemaModule,
    TabbarModule
  }
})
