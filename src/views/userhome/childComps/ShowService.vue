<template>
  <div id="showservice">
    <div class="showservice-item" @click="selectService(0)"> 
      <div>
        <img src="~assets/img/showservice/b.png" width="47px" height="47px">
      </div>
      <div>代取快递</div>
    </div>
    <div class="showservice-item" @click="selectService(1)">
      <div>
        <img src="~assets/img/showservice/a.png" width="47px" height="47px">
      </div>
      <div>代取文件</div>
    </div>
    <div class="showservice-item" @click="selectService(2)">
      <div>
        <img src="~assets/img/showservice/c.png" width="47px" height="47px">
      </div>
      <div>跑腿代购</div>
    </div>
    <div class="showservice-item" @click="selectService(3)">
      <div>
        <img src="~assets/img/showservice/d.png" width="47px" height="47px">
      </div>
      <div>寄出快递</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShowService",
    data() {
      return{
        jumpPath: ['/service/takedelivery','/service/takefile','/service/purchaseagent','/service/senddelivery']
      }
    },
    methods: {
      selectService(num) {
        this.$router.push({
          path: this.jumpPath[num],
          query: {'serviceid' : num}
        });

      }
  }
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