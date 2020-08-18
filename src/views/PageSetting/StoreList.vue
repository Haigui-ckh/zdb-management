<template>
  <div class="app-container">
    <div class="grid">

      <el-card class="newList-card" @click.native="handleCreate">
        <img src="~@/assets/common/add.svg">
        <span>构建新集合</span>
      </el-card>
      <!-- 所有集合 -->
      <el-card v-for="(item,index) in storeAssembles" :key="index"  class="List-card">
        <div class="List-card-title">{{item.name}}</div>
        <div class="List-card-content">
          <span>  {{item.storeNum}}家店  </span>
          <a @click="handleUpdate(index)">管理</a>
          <a class="List-card-content-link" @click="showAssembleLink(index)">链接</a>
        </div>
      </el-card>

    </div>


    <!-- 集合管理的弹出框 -->
    <el-dialog :visible.sync="assembleDialogVisible" width="400px" >

      <div class="assemble-head">
        <el-input v-model="assembleTemp.name" placeholder="输入集合名字" style="width:250px"></el-input>
        <el-button type="success" style="margin-left:23px" @click="confirmAssemble">确定</el-button>
      </div>

      <!-- 所有店铺列表 -->
      <el-select v-model="addStore" style="width:250px">
        <el-option v-for="(item,index) in storeList" :key="index"
                  :label="item.name" :value="index">
        </el-option>
      </el-select>
      <el-button style="margin-left:23px" @click="updateAssemble">添加</el-button>
      
      <!-- 弹出框下显示的已存在此集合中的商铺列表 storeAssembles.storeList-->
      <ul class="assemble-store-list">
        <li v-for="(item,index) in assembleTemp.storeList" :key="index">
          <div class="assemble-store-list-head"> <img :src="item.imgUrl"> </div>
          <div class="assemble-store-list-content"> <span>{{item.name}}</span> </div>
          <div class="assemble-store-list-tail"> <el-button type="danger" size="mini" @click="deleteAssembleItem(index)">删除</el-button> </div>
        </li>
      </ul>

      

    </el-dialog>

    <el-dialog :visible.sync="linkDialogVisible" width="400px">
      <!-- <el-input v-model="currentAssembleLink" disabled></el-input> -->
      <span>{{currentAssembleLink}}</span>
    </el-dialog>

    

  </div>
</template>

<script>
import store from '@/store'
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
        { name:'零食', storeNum: '7', link:'qwwersas', storeList: [{ name: '古茗', imgUrl: 'img/s3.jpg' },{ name: '小龙坎火锅', imgUrl: 'img/s2.jpg' },] },
        { name:'商家', storeNum: '14', link:'eewqe', storeList: [{ name: '重庆鸡公煲', imgUrl: 'img/s1.png' },{ name: '小龙坎火锅', imgUrl: 'img/s2.jpg' },] },
        { name:'饮品', storeNum: '4', link:'eweq', storeList: [{ name: '重庆鸡公煲', imgUrl: 'img/s1.png' },{ name: '古茗', imgUrl: 'img/s3.jpg' },] }
      ],
      addStore: '',
      assembleDialogVisible: false,
      linkDialogVisible: false,
      assembleDialogStatus: '',
      currentAssembleIndex: undefined,
      currentAssembleLink: undefined,
      assembleTemp: { name:'', storeNum: '', storeList: [] }
    }
  },
  methods: {
    showAssembleLink(index) {
      this.currentAssembleLink = this.storeAssembles[index].link
      this.linkDialogVisible = true
    },
    handleUpdate(index) {
      this.assembleDialogVisible = true
      this.assembleDialogStatus = 'update'
      this.currentAssembleIndex = index
      this.assembleTemp =  Object.assign({}, this.storeAssembles[index])
    },
    handleCreate() {
      this.assembleDialogVisible = true
      this.assembleDialogStatus = 'create'
      resetTemp()
    },
    resetTemp() {
      this.assembleTemp = {
        name: '',
        storeNum: '',
        storeList: []
      }
    },
    updateAssemble() {
      console.log('添加')
      this.assembleTemp.storeList.push(this.storeList[this.addStore])
    },
    deleteAssembleItem(index) {
      this.assembleTemp.storeList.splice(index,1)
    },
    confirmAssemble() {
      if(this.assembleDialogStatus === 'update'){
        this.assembleTemp.storeNum = this.assembleTemp.storeList.length
        this.storeAssembles[this.currentAssembleIndex] = Object.assign({},this.assembleTemp)
      }else{
        this.assembleTemp.storeNum = this.assembleTemp.storeList.length
        let temp = Object.assign({},this.assembleTemp)
        this.storeAssembles.push(temp)
      }
      this.assembleDialogVisible = false
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
  cursor: pointer;
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

.assemble-head {
  margin-bottom: 10px;
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