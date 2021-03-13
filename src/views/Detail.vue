<template>
  <v-touch @swiperight="onSwiperight">
    <div v-if="filminfo">
      <detail-header v-top :title="filminfo.name"></detail-header>
      <div
        :style="{ backgroundImage: 'url(' + filminfo.poster + ')' }"
        style="
          height: 200px;
          background-size: cover;
          background-position: center;
        "
      ></div>

      <h3>{{ filminfo.name }}-{{ filminfo.filmType.name }}</h3>

      <div>
        {{ filminfo.category }}
      </div>
      <div>
        {{ filminfo.premiereAt | dateFilter }}
      </div>
      <div>{{ filminfo.nation }}|{{ filminfo.runtime }}分钟</div>

      <div :class="isShow ? '' : 'synopsis'">{{ filminfo.synopsis }}</div>
      <div style="text-align: center">
        <i
          class="iconfont"
          :class="isShow ? 'icon-less' : 'icon-moreunfold'"
          @click="isShow = !isShow"
        ></i>
      </div>
      <h3>演职人员</h3>
      <detail-swiper :perslide="3" swiperclass="swiper-actors">
        <div
          class="swiper-slide"
          v-for="(data, index) in filminfo.actors"
          :key="index"
        >
          <img :src="data.avatarAddress" />
          <div style="text-align: center">
            <div>{{ data.name }}</div>
            <div>{{ data.role }}</div>
          </div>
        </div>
      </detail-swiper>
      <h3>剧照</h3>
      <detail-swiper :perslide="2" swiperclass="swiper-photos">
        <div
          class="swiper-slide"
          v-for="(data, index) in filminfo.photos"
          :key="index"
        >
          <div
            :style="{ backgroundImage: 'url(' + data + ')' }"
            style="
              height: 100px;
              background-size: cover;
              background-position: center;
            "
            @click="handlePreview(index)"
          ></div>
        </div>
      </detail-swiper>
    </div>
  </v-touch>
</template>
<script>
import Vue from 'vue'
import http from '@/util/http' // 别名 @ ==> src的绝对路径
import moment from 'moment'
import detailSwiper from './detail/DetailSwiper'
import detailHeader from './detail/DetailHeader'
// var VueTouch = require('vue-touch')
import VueTouch from 'vue-touch'

import { mapMutations } from 'vuex'
import { ImagePreview } from 'vant'
Vue.use(VueTouch, { name: 'v-touch' })

Vue.filter('dateFilter', (date) => {
  // 日期处理函数 - moment
  return moment(date * 1000).format('YYYY-MM-DD')
})

// 定义指令
Vue.directive('top', {
  inserted (el) {
    // console.log(el)
    el.style.display = 'none'
    window.onscroll = () => {
      // console.log('11111111111111111')
      if (
        (document.body.scrollTop || document.documentElement.scrollTop) > 50
      ) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  data () {
    return {
      filminfo: null,
      isShow: false
    }
  },
  components: {
    detailSwiper,
    detailHeader
  },
  methods: {
    ...mapMutations('TabbarModule', ['show', 'hide']),
    handlePreview (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    },
    onSwiperight () {
      // console.log("right");
      this.$router.back()
    }
  },
  mounted () {
    // this.$route 当前匹配的路由对象信息
    // console.log('利用获取的id ，ajax请求后端接口', this.$route.params.myid)
    // console.log('利用获取的id ，ajax请求后端接口', this.$route.query.id)

    // 隐藏 Tabbar组件
    // this.$store.commit("hide");
    this.hide()
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=6951879`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      // console.log(res.data.data.film)
      this.filminfo = res.data.data.film
    })
  },
  beforeDestroy () {
    // 显示  触发matutions
    // this.$store.commit("show");
    this.show()
  }
}
</script>
<style lang="scss" scoped>
.synopsis {
  height: 50px;
  overflow: hidden;
}
</style>
