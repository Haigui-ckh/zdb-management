<template> 
  <div id="advs">

    <comps-title>{{containerTitle}}</comps-title>

    <div class="advs-item" v-for="(item,index) in advsList" :key="index">
      <a :href="item.link">
        <img :src="item.imgUrl">
      </a>
    </div>
  </div>
</template>

<script>
  import CompsTitle from './common/CompsTitle'
  export default {
    name: "Advs",
    components: {
      CompsTitle
    },
    props: {
      advsList: Array,
      containerTitle: String
    }
  }
</script>

<style scoped>
  #advs{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  #advs span{
    border-top:3px solid orange;
    padding: 5px;
    margin-left:  10px;
    font-size: 14px;
  }
  .advs-item img{
    width: 100%;
  }
</style>