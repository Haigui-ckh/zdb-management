<template>
  <div id="recommend-store">
    <comps-title>推荐店铺</comps-title>
    <div class="rec-store-item" 
        v-for="(item,index) in merchants" :key="index">
      <img :src="item.imgUrl" alt="">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  import CompsTitle from './common/CompsTitle'

  export default {
    name: "RecommendStore",
    components: {
      CompsTitle
    },
    props: {
      merchants: {
        type: Array
      }
    }

  }
</script>

<style scoped>
  #recommend-store {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .rec-store-item {
    width: 46%;
    margin: 5px auto;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-radius:5px;
    border: 1px solid #f6f6f6;
    /* background-color:turquoise ; */
    font-size: 14px;
    
  }
  .rec-store-item span {
    margin-left: 10% ;
    
  }
  .rec-store-item img {
    width:100%;
    border-radius: 5px 5px 0 0;
  }
</style>