<template>
  <div id="home-swiper">
    <swiper>
      <swiper-item v-for="(item,index) in swiperImgList" :key="index">
        <a :href="item.link">
          <img :src="item.imgUrl" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      swiperImgList: Array
    }
  }
</script>

<style scoped>
  #home-swiper {
    width: 100%;
  }
</style>