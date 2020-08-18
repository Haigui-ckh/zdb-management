<template>
  <div id="store">
    <nav-bar class="nav-bar">
      <div slot="left" @click="backClick"><img src="~assets/img/common/back.svg"></div>
    </nav-bar>
    <store-info></store-info>
    
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import StoreInfo from './childComps/StoreInfo'

  export default {
    name: "Store",
    components: {
      NavBar,
      StoreInfo
    },
    data() {
      return{
        sid: null,      //单个商家item对应id
      }
    },
    created() {
      this.sid = this.$route.query.storeid;   
    },
    methods: {
      backClick() {
        this.$router.go(-1);
      }
    }

  }
</script>

<style scoped>
  #store {
    position: relative;
    z-index: n;
    background-color: #fff;
  }
  .nav-bar {
    text-align: center;
  }
  .nav-bar img{
    width: 35%;
    margin-top: 10px ;
  }
</style>