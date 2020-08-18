<template>
  <div id="daily-special">
    <comps-title>天天特价</comps-title>
    <div class="daily-special-item" v-for="item in specialGoods" :key="item.name">
      <img src="~assets/img/advs/best1.png">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  import CompsTitle from './common/CompsTitle'  
  export default {
    name: "DailySpecial",
    components: {
      CompsTitle
    },
    props: {
      specialGoods: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  #daily-special {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
  }
  .daily-special-item {
    width: 22%;
    margin:0 auto;
    text-align: center;
    font-size: small;
    background-color: whitesmoke;
  }
  .daily-special-item img{
    width: 100%;
  }
</style>