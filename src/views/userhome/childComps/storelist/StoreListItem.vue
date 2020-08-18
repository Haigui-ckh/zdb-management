<template>
  <div class="store-list-item">
    <div class="store-list-item-img">
      <img src="~assets/img/store/s1.png">
    </div>
     <!-- storeName,monthlySalesVolume,deliveryTime,deliverDistance,startFee,deliveryFee -->
    <table class="store-list-table" >
      <tr>
        <td colspan="4" class="store-list-name">重庆鸡公煲</td>
      </tr>
      <tr>
        <td width="70%" colspan="2">月销100</td>
        <td width="18%">30分钟</td>
        <td>1.0km</td>
      </tr>
      <tr>
        <td width="28%">起送￥15元</td>
        <td>配送￥2元</td>
        <td colspan="2" class="zdb-tag"><span>整点巴专送</span></td>
      </tr>
    </table>   
  </div>  
</template>

<script>
export default {
  name: "StoreListItem",
  props: {
    // 店铺图片，店铺名字，月销量，派送时间、派送距离、起送费、配送费
  }
}
</script>

<style scoped>
  .store-list-item {
    /* font-size: 1; */
    display: flex;
    /* background-color: whitesmoke; */
    margin-bottom: 20px;
  }

  .store-list-item-img {
    width: 30%;
    text-align: center;
    padding-top: 5px;
  }
  .store-list-item-img img {
    width: 80%;
    border-radius: 10px;
    /* margin: auto; */
  }
  .store-list-table {
    /* font-size: 12px; */
    font-size: 12px;
    color:slategrey;
    width: 70%;
  }
  .store-list-name {
    font-weight: bold;
    font-size: 14px;
    color: black;
    height: 20px;
  }
  .zdb-tag {
    font-size: 8px;
    text-align: right;
  }
  .zdb-tag span {
    background-color: orange;
    color: white;
    border-radius: 5px 0;

  }
</style>