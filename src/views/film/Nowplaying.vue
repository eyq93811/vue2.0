<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是底线的"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleClick(data.filmId)"
      >
        <img :src="data.poster" />
        <h3>{{ data.name }}</h3>
        <p
          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
        >
          主演:{{ data.actors | actorFilter }}
        </p>
        <p>{{ data.nation }} | {{ data.runtime }} 分钟</p>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import http from '@/util/http'
import Vue from 'vue'
import { mapState } from 'vuex'
import { List, Cell } from 'vant'
Vue.use(List).use(Cell) // 全局注册

Vue.filter('actorFilter', (actors) => {
  if (actors === undefined) return '暂无主演'
  return actors.map((item) => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false, // 是否正在加载中,防止多次触发
      finished: false,
      current: 1, // 记录第几页
      total: 0 // 总数据长度
    }
  },

  mounted () {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=136082`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
      // method:"get"
    }).then((res) => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  computed: {
    ...mapState('CityModule', ['cityId'])
  },
  methods: {
    onLoad () {
      if (this.datalist.length === this.total && this.datalist.length !== 0) {
        this.finished = true
        return
      }

      // console.log('到底了')
      // 1. ajax请求新页面的数据，
      // 2. 合并新数据到老数据
      // 3. this.loading=false

      this.current++
      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=136082`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
        // method:"get"
      }).then((res) => {
        // console.log(res.data.data.films)
        this.datalist = [...this.datalist, ...res.data.data.films]

        this.loading = false
      })
    },
    handleClick (id) {
      // console.log(id)
      // location.href = '#/center'

      // 1- 路径
      this.$router.push(`/detail/${id}`) // 编程式导航

      // 2-路由名字
      // this.$router.push({
      //   name: 'kerwinDetail',
      //   params: {
      //     myid: id
      //   }
      // })

      // 3- query方式跳转详情

      // this.$router.push(`/detail?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  overflow: hidden;
  padding: 10px;
  img {
    float: left;
    width: 100px;
  }
}
</style>
