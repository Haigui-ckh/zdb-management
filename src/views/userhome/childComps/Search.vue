<template>
<div id="search">
  <div class="jd_header">
      <input type="search" 
              class="header_search" id="searchInput" 
              placeholder="输入关键字搜索">
      <i class="header_glass"></i>
  </div>
</div>
</template>

<script>
  export default {
    name: "Search"
  }
</script>

<style scoped>
    .jd_header {
        box-sizing: border-box;
        position: relative;
        height: 33px;
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        overflow: hidden;
        z-index: 50;
        margin-bottom: 10px;
        
    }

    .jd_header .header_search {
        box-sizing: border-box;
        padding-left: 10px;
        width: 100%;
        height: 25px;
        margin-top: 4px;
        border-radius: 17px;
        background: rgba(255,255,255,0.9);
        font-size: 14px;
        color: #999;
        border: none;
        border: 1px solid orange;
    }
    .jd_header .header_glass {
        display: inline-block;
        position: absolute;
        right: 36px;
        top: 8px;
        width: 20px;
        height: 20px;
        background: url('~assets/img/home/homefind.png')no-repeat;
        background-size: 16px 16px;
    }
</style>