import Vue from 'vue'
import Vuex from 'vuex'
import http from '@util/http'

Vue.use(Vuex)
// store "全局"的对象
export default new Vuex.Store({
  state: {
    cityId: '310100',
    cityName: '上海',
    isTabbarShow: true,

    cinemaList: []
  },
  // 集中式修改状态-被监控了？？？
  mutations: {
    changeCityName (state, name) {
      state.cityName = name
    },
    changeCityId (state, id) {
      state.cityId = id
    },
    hide (state) {
      state.isTabbarShow = false
    },
    show (state) {
      state.isTabbarShow = true
    },
    setCinemaList (state, cinemaList) {
      state.cinemaList = cinemaList
    },
    clearCinemaList (state) {
      state.cinemaList = []
    }
  },
  // 做异步请求
  actions: {
    getCinemaList (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=2500238`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('setCinemaList', res.data.data.cinemas)
      })
    }
  },
  modules: {

  }
})
