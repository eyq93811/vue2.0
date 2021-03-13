<template>
  <div>
    <van-index-bar
      :index-list="computedCityList"
      @select="handleSelect"
      class="city"
    >
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in data.list"
          :key="index"
          @click="handleChangePage(item.name, item.cityId)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, Toast } from 'vant'
import http from '@/util/http'
import { mapMutations } from 'vuex'
Vue.use(IndexBar).use(Cell)
Vue.use(IndexAnchor)

export default {
  data () {
    return {
      cityList: []
    }
  },

  computed: {
    computedCityList () {
      return this.cityList.map((item) => item.type)
    }
  },
  mounted () {
    http({
      url: '/gateway?k=2323064',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      // console.log(res.data.data.cities)
      this.cityList = this.handleCityData(res.data.data.cities)
    })
  },
  methods: {
    ...mapMutations('CityModule', ['changeCityName', 'changeCityId']),
    handleCityData (cities) {
      // 输入原始数据， 输出的是 目标数据

      const letterArr = []
      const newCities = []
      for (let code = 65; code < 91; code++) {
        // console.log(String.fromCharCode(code))
        letterArr.push(String.fromCharCode(code))
      }
      // console.log(letterArr)
      letterArr.forEach((letter) => {
        const list = cities.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )

        if (list.length > 0) {
          newCities.push({
            type: letter,
            list: list
          })
        }
      })

      // console.log(newCities);
      return newCities
    },

    handleSelect (index) {
      Toast({
        message: index
      })
    },
    handleChangePage (name, id) {
      // cityId, cityName  记录下来
      // this.$store.state.cityName = name;
      // this.$store.commit("changeCityName", name);
      // this.$store.commit("changeCityId", id);
      this.changeCityName(name)
      this.changeCityId(id)
      this.$router.back()
    }
  }
}
</script>
