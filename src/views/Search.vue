<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @cancel="handleCancel()"
    />
    <van-list>
      <van-cell v-for="data in computedCinemaList" :key="data.cinemaId">
        <div>{{ data.name }}</div>
        <div class="address">{{ data.address }}</div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import vue from 'vue'
import { Search, List, Cell } from 'vant'
import { mapState, mapActions } from 'vuex'
vue.use(Search).use(List).use(Cell)
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('CityModule', ['cityId']),
    computedCinemaList () {
      if (this.value === '') return []
      return this.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      )
    }
  },
  mounted () {
    if (this.cinemaList.length === 0) {
      // vuex 异步流程
      this.getCinemaList(this.cityId)
    } else {
      console.log('缓存')
    }
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaList']),
    handleCancel () {
      // push, back, replace 替换
      this.$router.replace('/cinema')
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  padding: 5px;
  .address {
    font-size: 12px;
    color: gray;
  }
}
</style>
