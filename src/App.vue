<template>
  <div>
    <tabbar v-show="isTabbarShow"></tabbar>
    <!-- 路由容器 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from './components/Tabbar'
import { mapState } from 'vuex' // export {mapState}
// import axios from 'axios'
// ES6 模块导出
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('TabbarModule', ['isTabbarShow'])
  },
  mounted () {
    // console.log(mapState("TabbarModule", ["isTabbarShow"]));
  },
  components: {
    tabbar
  }
  // mounted() {
  // 1- 后端配置好 cors
  // axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5').then(res => {
  //   console.log(res.data)
  // })
  // 2- maoyan
  // axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=43388C403C4911EABDC9998C784A573A4F64A16AA5A34184BADE807E506D749E&optimus_risk_level=71&optimus_code=10').then(res => {
  //   console.log(res.data)
  // })
  // 3- maizuo
  // axios({
  //   url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=136082',
  //   headers: {
  //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596502176387264316178433","bc":"310100"}',
  //     'X-Host': 'mall.film-ticket.film.list'
  //   }
  //   // method:"get"
  // }).then(res => {
  //   console.log(res.data)
  // })
  // },
}
</script>

<style>
li {
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
  touch-action: manipulation; /**  解决300ms问题 */
}

html,
body {
  height: 100%;
}

section {
  margin-bottom: 50px;
}
</style>
