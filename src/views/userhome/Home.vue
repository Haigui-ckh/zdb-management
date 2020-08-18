<template>

  <div id="home">
    <!-- 顶部navbar -->
    <nav-bar class="home-navbar">
      <div slot="center">整点巴</div>
      <div slot="right" @click="goMessage">
        <img class="message" src="~assets/img/home/message.svg">
      </div>
    </nav-bar>

    <!-- 可滚动的内容区域 -->
    <scroll class="home-scroll" :pull-up-load="true" @pullingUp="loadmore">
      <search class="home-search" />
      <home-swiper :swiperImgList="swiperList"/>
      <show-service />          <!-- 营销配置，快递服务等 -->             
      <function-list :functionList="homeData.funcList" />       <!-- 功能区 --><!-- 项目需求中要求可自由增添或删减 -->    
      <advs :advsList="advsList"/>                          <!-- 广告条部分 -->   
      <daily-special  :specialGoods="dailyGoodsList"/>   <!-- 天天特价 -->
      <recommend-store :merchants="homeData.recommendStoreList" />    <!-- 推荐店铺 -->
      <store-list :stores="storeList"/>

      <ul style="color:white">
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
        <li>zdb</li>
      </ul>
    </scroll>


  </div>


</template>

<script>
  // 公共组件
  import NavBar from '@/components/common/navbar/NavBar'
  import Scroll from '@/components/common/scroll/Scroll'

  // home内部子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import Search from './childComps/Search'
  import ShowService from './childComps/ShowService'
  import Advs from './childComps/Advs'
  import DailySpecial from './childComps/DailySpecial'
  import RecommendStore from './childComps/RecommendStore'
  import FunctionList from './childComps/FunctionList'
  import StoreListItem from './childComps/storelist/StoreListItem'
  import StoreList from './childComps/storelist/StoreList'


  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      Search,
      HomeSwiper,
      ShowService,
      Advs,
      DailySpecial, 
      RecommendStore, 
      FunctionList,
      StoreListItem,
      StoreList,
    },
    props: {
      homeData: Object
    },
    data() {
      return {
        funcList:[
          { 
            imgUrl: 'img/f1.svg',
            name: '功能1',
            link: ''
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能2',
            link: ''
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能3',
            link: '' 
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能4',
            link: '' 
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能5',
            link: '' 
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能6',
            link: '' 
          },
        ],
        // 除名字图片外需要的字段：storeName,monthlySalesVolume,deliveryTime,deliverDistance,startFee,deliveryFee 
        storeList:[
          { name: '重庆鸡公煲', imgUrl: 'img/s1.png' },
          { name: '小龙坎火锅', imgUrl: 'img/s2.jpg' }, 
          { name: '古茗', imgUrl: 'img/s3.jpg' }
        ],
        recommendStoreList: [
          { title: '日本料理', img: 'https://p0.meituan.net/bbia/f58fafc0be2bc3a69dfcac20260888c2201000.jpg@267w_150h_1e_1c'},
          { title: '华莱士', img: 'https://p1.meituan.net/bbia/062a186c23cfb9ebe34e95ca235ff660535199.jpg@267w_150h_1e_1c'},
          { title: '芋泥奶茶', img: 'https://p0.meituan.net/bbia/619dd92fdffa550698a1e3d1d8bfe577392434.jpg@267w_150h_1e_1c'},
          { title: '清汤拉面', img: 'https://p1.meituan.net/mogu/cb6e5ed585e058d2862811174636e092223079.jpg@267w_150h_1e_1c'}
        ],
        dailyGoodsList: [
          { name: '西瓜' },
          { name: '可乐' },
          { name: '酸辣粉' },
          { name: '奶茶' }
        ],
        swiperList: [
          { imgUrl:'img/b1.png', link: ''},
          { imgUrl:'img/b2.jpg', link: ''},
          { imgUrl:'img/b3.jpg', link: ''},
        ],
        advsList: [
          { imgUrl:'img/campus1.png', link: ''},
          { imgUrl:'img/campus1.png', link: ''},
        ]
      }
    },
    methods:{
      loadmore() {
        // 下拉加载更多
        console.log("加载")
      },
      goMessage() {
        this.$router.push('/message')
      }
    }
  }
</script>

<style scoped>
  #home {
    width: 400px;
  }
  .home-navbar {
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 60;
  }
  .home-search {
    margin-top: 44px;
  }
  .home-scroll {
    position: absolute;
    /* height: 300px; */
    top: 44px;
    bottom: 0;
    overflow: hidden;
  }
  .message {
    width: 40%;
    margin-top: 15% ;
  }
</style>