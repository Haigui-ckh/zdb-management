<template>
  <div id="function-list">
    <div v-for="(item,index) in functionList" :key="index" class="function-list-item">
      <a :href="item.link"> 
        <img :src="item.imgUrl">
        <div>{{item.name}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FunctionList",
    props: {
      functionList: Array
    }  
  }
</script>

<style scoped>
  #function-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5%;
  }

  .function-list-item {
    width: 20%;
    text-align: center;
  }

  .function-list-item img {
    width:80%;
  }
</style>