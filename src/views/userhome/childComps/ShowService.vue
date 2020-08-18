<template>
  <div id="showservice">
    <div class="showservice-item"> 
      <div>
        <img src="~assets/img/showservice/b.png" width="47px" height="47px">
      </div>
      <div>代取快递</div>
    </div>
    <div class="showservice-item">
      <div>
        <img src="~assets/img/showservice/a.png" width="47px" height="47px">
      </div>
      <div>代取文件</div>
    </div>
    <div class="showservice-item">
      <div>
        <img src="~assets/img/showservice/c.png" width="47px" height="47px">
      </div>
      <div>跑腿代购</div>
    </div>
    <div class="showservice-item">
      <div>
        <img src="~assets/img/showservice/d.png" width="47px" height="47px">
      </div>
      <div>寄出快递</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShowService"
  }
</script>

<style scoped>
  #showservice{
    display: flex;
    flex-wrap:wrap;
    margin: 0 5%;
  }
  .showservice-item{
    width: 49%;
    height: 5.5rem;
    display: flex;
    line-height: 5rem;
    color: orange;
  }

  .showservice-item img{
    margin: 1rem;
    /* width: 35%; */
  }
</style>