<template>
  <div>
    <van-nav-bar
      title="标题"
      @click-left="handleLeft()"
      @click-right="handleRight()"
    >
      <template #left>
        {{ cityName }}<van-icon name="arrow-down" color="black" />
      </template>
      <template #right>
        <van-icon name="search" size="23" color="black" />
      </template>
    </van-nav-bar>

    <div class="cinema" :style="{ height: height }">
      <van-list>
        <van-cell v-for="data in cinemaList" :key="data.cinemaId">
          <div>{{ data.name }}</div>
          <div class="address">{{ data.address }}</div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, List, Cell } from 'vant'
import BetterScroll from 'better-scroll'
import { mapState, mapActions, mapMutations } from 'vuex'
Vue.use(NavBar).use(Icon).use(List).use(Cell)

export default {
  data () {
    return {
      // cinemaList: [],
      height: 0
    }
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaList']),
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    handleLeft () {
      // 清空cinemaList
      this.clearCinemaList()
      this.$router.push('/city')
    },
    handleRight () {
      this.$router.push('/cinema/search')
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('CityModule', ['cityId', 'cityName'])
  },
  mounted () {
    // 访问cityName, cityId
    this.height = document.documentElement.clientHeight - 100 + 'px'
    if (this.cinemaList.length === 0) {
      // vuex 异步流程
      this.getCinemaList(this.cityId).then((res) => {
        // 状态立即更改， 但是dom异步渲染
        this.$nextTick(() => {
          new BetterScroll('.cinema', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      console.log('缓存')
      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.cinema {
  height: 300px;
  overflow: hidden;
  position: relative; //修正滚动条的位置
  li {
    padding: 5px;
    .address {
      font-size: 12px;
      color: gray;
    }
  }
}
</style>
