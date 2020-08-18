<template>
  <div id="store-list">

    <div class="store-list-name">全部店铺</div>

    <div class="store-list-item" v-for="(store,index) in stores" :key="index"
    @click="storelistClick(index)" :class="{active: index === isClick}">
      <div class="store-list-item-img">
        <img :src="store.imgUrl">
      </div>
      <!-- storeName,monthlySalesVolume,deliveryTime,deliverDistance,startFee,deliveryFee -->
      <table class="store-list-table" >
        <tr>
          <td colspan="4" class="store-list-item-name">{{store.name}}</td>
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
  </div>
</template>

<script>
export default {
  name: "StoreList",
  props: {
    stores: {
      type: Array,
      default: []
    }
  },
  data() {
    return{
      isClick: -1
    }
  },
  methods: {
    storelistClick(index) {
      this.isClick = index;
      //此处暂时传入数组下标作为标识
      this.$router.push(
        {
          path: '/Store',
          query: {storeid: index}
        }
      )
    }
  }
}
</script>

<style scoped>
  .store-list-name {
    text-align: center;
    margin-bottom: 10px;
  }
  .store-list-item {
    display: flex;
    padding-bottom: 20px;
  }
  .store-list-item-img {
    width: 30%;
    text-align: center;
    padding-top: 5px;
  }
  .active {
    background-color:snow;
  }
  .store-list-item-img img {
    width: 80%;
    border-radius: 10px;
  }
  .store-list-table {
    font-size: 12px;
    color:slategrey;
    width: 70%;
  }
  .store-list-item-name {
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