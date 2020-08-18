<template>
  <div id="Service">
    <back-nav destination="/home"></back-nav>
    <tab-control  class="order-tabcontrol"
                  :titles="['代取快递','代取文件','跑腿代购','代寄快递']" 
                  @tabClick="tabClick"/>
    
    <scroll class="service-content">
      <!-- 传入地址列表信息 -->
      <router-view :addrData="addData" />
    </scroll>
  </div>
</template>

<script>
  import TabControl from "components/content/tabcontrol/TabControl";
  import Scroll from "components/common/scroll/Scroll"

  import BackNav from 'components/content/backnav/BackNav'
  import OnePageScroll from 'components/content/onepagescroll/OnePageScroll'
  
  export default {
    name: "Service",
    components: {
      TabControl,
      BackNav,
      Scroll,
      OnePageScroll
    },
    data() {
      return{
        jumpPath: ['/service/takedelivery','/service/takefile','/service/purchaseagent','/service/senddelivery'],
        activeid: 0,
        addData:[
          {
            address: '竹园',
            name: '曹凯晖',
            tel: 1452148454,
          },
          {
            address: '李园',
            name: '张三',
            tel: 1452148454,
          },
          {
            address: '桃园',
            name: '李四',
            tel: 1452148454,
          },
        ],
      }
    },
    methods: {
      tabClick(index) {
        this.$router.push(this.jumpPath[index])
      }
    }
  }
</script>

<style scoped>
  .service-content {
    position: absolute;
    height: 100%;
    top: 84px;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 9;
  }
  .order-tabcontrol {
    background-color: white;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
  }
  .filling {
    height: 40px;
  }
</style>