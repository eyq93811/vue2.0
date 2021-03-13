<template>
  <div>
    <film-swiper>
        <div class="swiper-slide" v-for="(data,index) in imgList" :key="index">
          <div :style=" {backgroundImage:'url('+data+')'} "
            style="height:200px;background-size:cover;background-position:center;"
          ></div>
        </div>
    </film-swiper>
    <!-- 只有再vue 中， 组件上写的class, style 会自动传到组件的根节点上 -->
    <film-header style="position:sticky;top:0px;background:white;z-index:100"></film-header>
    <!-- /film/nowplaying Nowplaying
    /film/comingsoon Comingsoon -->
     <router-view></router-view>
  </div>
</template>
<script>
import filmHeader from './film/FilmHeader'
import filmSwiper from './film/FilmSwiper'
export default {
  data () {
    return {
      imgList: [
        'https://pic.maizuo.com/usr/movie/57cb9b5889ea70e6ec5da639e1452583.jpg?x-oss-process=image/quality,Q_70', 'https://pic.maizuo.com/usr/movie/6655766a79fd9ac6b41715cf9a1f3aad.jpg?x-oss-process=image/quality,Q_70',
        'https://pic.maizuo.com/usr/movie/5607daea349314f6e67004348fd49e6c.jpg?x-oss-process=image/quality,Q_70']
    }
  },

  components: {
    filmHeader,
    filmSwiper
  }
}
</script>
