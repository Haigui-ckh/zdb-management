<template>
  <div class="app-container">
    <div class="grid">

      <el-card class="newList-card">
        <img src="~@/assets/common/add.svg">
        <span>构建新集合</span>
      </el-card>
      <!-- 所有集合 -->
      <el-card class="List-card">
        <div class="List-card-title">集合名字</div>
        <div class="List-card-content">
          <span>  25家店  </span>
          <a @click="handleupdate">管理</a>
          <a class="List-card-content-link">链接</a>
        </div>
      </el-card>

    </div>


    <!-- 集合管理的弹出框 -->
    <el-dialog :visible.sync="assembleDialogVisible" width="400px" >

      <el-select v-model="addStore" style="width:250px">
        <el-option v-for="(item,index) in storeList" :key="index"
                  :label="item.name" :value="index">
        </el-option>
      </el-select>
      <el-button style="margin-left:23px" @click="updateAssemble">添加</el-button>
      
      <!-- 弹出框下显示的已存在集合中的商铺列表 -->
      <ul class="assemble-store-list">
        <li>
          <div class="assemble-store-list-head"> <img src="~assets/img/common/star-on.png"> </div>
          <div class="assemble-store-list-content"> <span>店铺名字</span> </div>
          <div class="assemble-store-list-tail"> <el-button type="danger" size="mini" @click="deleteAssembleItem">删除</el-button> </div>
        </li>
        <li>
          <div class="assemble-store-list-head"> <img src="~assets/img/common/star-on.png"> </div>
          <div class="assemble-store-list-content"> <span>店铺名字</span> </div>
          <div class="assemble-store-list-tail"> <el-button type="danger" size="mini">删除</el-button> </div>
        </li>
        <li>
          <div class="assemble-store-list-head"> <img src="img/s1.png"> </div>
          <div class="assemble-store-list-content"> <span>店铺名字</span> </div>
          <div class="assemble-store-list-tail"> <el-button type="danger" size="mini">删除</el-button> </div>
        </li>
        <li>
          <div class="assemble-store-list-head"> <img src="img/s1.png"> </div>
          <div class="assemble-store-list-content"> <span>店铺名字</span> </div>
          <div class="assemble-store-list-tail"> <el-button type="danger" size="mini">删除</el-button> </div>
        </li>
      </ul>

    </el-dialog>

    

  </div>
</template>

<script>
export default {
  name: "StoreList",
  data () {
    return {
      // 所有商铺列表
      storeList:[
        { name: '重庆鸡公煲', imgUrl: 'img/s1.png' },
        { name: '小龙坎火锅', imgUrl: 'img/s2.jpg' }, 
        { name: '古茗', imgUrl: 'img/s3.jpg' }
      ],
      // 商铺集合    
      storeAssembles:[
        { name:'', storeNum: '', storeList: [] }
      ],
      addStore: '',
      assembleDialogVisible: false
    }
  },
  methods: {
    handleupdate() {
      this.assembleDialogVisible = true
    },
    updateAssemble() {
      console.log('添加')
    },
    deleteAssembleItem() {
      // 消去集合list中的这一项，可以传入v-for的index
    }
  }
}
</script>

<style scoped>
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}
.newList-card {
  height: 80px;
  line-height: 40px;
}
.newList-card img {
  height: 22px;
  vertical-align: middle;;
  margin-right: 5px;
}
.List-card { 
   font-size: 14px;
   padding: 0;
}
.List-card-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.List-card-content span {
  margin-right: 10px;
}
.List-card-content a {
  color: orange;
  font-size: 12px;
}
.List-card-content a:hover {
  color: orange;
  text-decoration-line: underline;
}
.List-card-content-link {
  float: right;
}

.assemble-store-list {
  list-style-type: none;
  padding: 0;
}
.assemble-store-list li{
  height: 80px;
  line-height: 80px;
  display: flex;
  /* background-color: orange; */
}
.assemble-store-list-head{
  height: 80px;
  width: 80px;
  overflow: hidden;
}
.assemble-store-list-head img{
  /* height: 60px; */
  width: 75%;
  /* margin-top: 10px;
  margin-left: 10px; */
  margin-left: 10px;
  vertical-align: middle;
}
.assemble-store-list-content{
  width: 190px;
  padding-left: 10px;
}
.assemble-store-list-tail {
  margin: 0 auto;
}
</style>