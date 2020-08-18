<template>
  <div id="UserHomeSetting">
    <!-- <router-link to="www.baidu.com"> 点击跳转</router-link> -->
    <!-- <iframe src="http://192.168.0.104:8080/" class="userIframe"></iframe> -->
    <!-- <router-view class="userIframe"></router-view> -->

    <Home class="userIframe" :homeData="userHomeData"></Home>

    <div class="settingWindow">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- tab1 -->
        <el-tab-pane label="页面元素" name="first">
          <!-- 分类导航，管理框 -->
          <el-card class="sortNav">
            <div slot="header" class="clearfix">
              <span>分类导航</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">新增</el-button> -->
            </div>
            <el-form :inline="true" size="mini">
              <!-- 新增项目 -->
              <div>
                <el-avatar size="small" :src="funcTemp.imgUrl" class="avater" @click.native="avaCreate"></el-avatar>
                <el-form-item>
                  <el-input v-model="funcTemp.name" placeholder="列表名" style="width:80px;margin-right:5px"></el-input>
                  <el-input v-model="funcTemp.link" placeholder="链接" style="width:140px;margin-right:5px"></el-input>
                  <el-button type="primary" @click="addFunc">新增</el-button>
                </el-form-item>
              </div>
              <!-- 已存在 -->
              <div v-for="(item,index) in userHomeData.funcList" :key="index">
                <el-avatar size="small" :src="item.imgUrl" class="avater" @click.native="avaUpdate(index)"></el-avatar>
                <el-form-item>
                  <el-input v-model="item.name" placeholder="列表名" style="width:80px;margin-right:5px"></el-input>
                  <el-input v-model="item.link" placeholder="链接" style="width:140px"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </el-card>
          <!-- 图标选择弹窗 -->
          <el-dialog title="图标选择" :visible.sync="avaDialogVisible" width="40%">
            <!-- <span>这里是图标</span> -->
            <img v-for="(avater,index) in avaList" :key="index" :src="avater" class="avaDialogItem" @click="avaItemClick(avater)">
            
          </el-dialog>
        </el-tab-pane>


        <!-- tab2 -->
        <el-tab-pane label="店铺配置" name="second">
          <!-- 推荐店铺卡片 -->
          <el-card class="recommendStoreManage">
            <div slot="header" class="clearfix">
              <span>推荐店铺</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="recommendStoreAdd">添加</el-button>
            </div>
            <div v-for="(item,index) in userHomeData.recommendStoreList" :key="index" class="rsitem">
              <span>{{item.name}}</span>
              <el-button type="danger"  class="rsDelBtn" size="mini" @click="recommendStoreDelete(index)">删除</el-button>
            </div>
          </el-card>

          <!-- 新增店铺弹窗 -->
          <el-dialog title="选择店铺" :visible.sync="rsDialogVisible" width="40%">
            <el-select v-model="rsAddIndex" placeholder="请选择店铺">
              <el-option
                v-for="(item,index) in userHomeData.storeList"
                :key="index"
                :label="item.name"
                :value="index">
              </el-option>
            </el-select>
            <el-button type="primary" style="float: right; margin-right: 3px" @click="rsAddConfirm">确定</el-button>
          </el-dialog>
        </el-tab-pane>


        <!-- tab3 -->
        <el-tab-pane label="营销配置" name="third">营销配置</el-tab-pane>
      </el-tabs>
    </div>
    
  </div>
</template>

<script>
import Home from '@/views/userhome/Home'

export default {
  name: "UserHomeSetting",
  components: {
    Home
  },
  data() {
    return {
      activeName: 'second',
      userHomeData: {
        funcList:[
          { 
            imgUrl: 'img/f1.svg',
            name: '功能1',
            link: ''
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能2',
            link: ''
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能3',
            link: '' 
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能4',
            link: '' 
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能5',
            link: '' 
          },
          { 
            imgUrl: 'img/f1.svg',
            name: '功能6',
            link: '' 
          },
        ],
        recommendStoreList: [
          { name: '日本料理', imgUrl: 'https://p0.meituan.net/bbia/f58fafc0be2bc3a69dfcac20260888c2201000.jpg@267w_150h_1e_1c', sid: ''},
          { name: '华莱士', imgUrl: 'https://p1.meituan.net/bbia/062a186c23cfb9ebe34e95ca235ff660535199.jpg@267w_150h_1e_1c', sid: ''},
          { name: '芋泥奶茶', imgUrl: 'https://p0.meituan.net/bbia/619dd92fdffa550698a1e3d1d8bfe577392434.jpg@267w_150h_1e_1c', sid: ''},
          { name: '清汤拉面', imgUrl: 'https://p1.meituan.net/mogu/cb6e5ed585e058d2862811174636e092223079.jpg@267w_150h_1e_1c', sid: ''},
          { name: '清汤拉面', imgUrl: 'https://p1.meituan.net/mogu/cb6e5ed585e058d2862811174636e092223079.jpg@267w_150h_1e_1c', sid: ''},
          { name: '清汤拉面', imgUrl: 'https://p1.meituan.net/mogu/cb6e5ed585e058d2862811174636e092223079.jpg@267w_150h_1e_1c', sid: ''},
        ],
        storeList:[
          { name: '重庆鸡公煲', imgUrl: 'img/s1.png' },
          { name: '小龙坎火锅', imgUrl: 'img/s2.jpg' }, 
          { name: '古茗', imgUrl: 'img/s3.jpg' }
        ],
      },
      funcTemp: {
        imgUrl: '',
        name: '',
        link: ''
      },
      avaDialogStatus: undefined,
      avaDialogVisible: false,
      avaList: [
        'ava/1.svg', 
        'ava/2.svg', 
        'ava/3.svg', 
        'ava/4.svg', 
        'ava/5.svg', 
        'ava/6.svg', 
      ],
      rsDialogVisible: false,
      // 要添加到 推荐店铺 的 店铺下标
      rsAddIndex: undefined,
      rsTemp: {
        name: '',
        imgUrl: ''
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    resetFuncTemp() {
      this.funcTemp = {
        name: '',
        link: '',
        imgurl: ''
      }
    },
    addFunc() {
      let temp =  Object.assign({}, this.funcTemp)
      this.userHomeData.funcList.push(temp)
      this.resetFuncTemp()
    },
    avaCreate() {
      this.avaDialogStatus = -1
      this.avaDialogVisible = true
    },
    avaUpdate(index) {
      this.avaDialogStatus = index
      this.avaDialogVisible = true
    },
    avaItemClick(avaSrc) {
      if(this.avaDialogStatus === -1) {
        this.funcTemp.imgUrl = avaSrc
      }
      else {
        this.userHomeData.funcList[this.avaDialogStatus].imgUrl = avaSrc
      }
      
      this.avaDialogVisible = false
    },
    recommendStoreAdd() {
      this.rsDialogVisible = true
    },
    recommendStoreDelete(index) {
      this.userHomeData.recommendStoreList.splice(index,1)
    },
    rsAddConfirm() {
      // 通过下标获取storelist里的数据
      let temp =  Object.assign({}, this.userHomeData.storeList[this.rsAddIndex])
      this.userHomeData.recommendStoreList.push(temp)
      this.rsDialogVisible = false
      this.rsAddIndex = ''
    }

  }
}
</script>

<style scoped>
#UserHomeSetting {
  display: flex;
} 
.sortNav {
  width: 400px;
  height: 600px;
  overflow: auto;
}
.userIframe {
  height: 600px;
  min-width: 400px;
  position: relative;
  margin-top: 20px;
  border: 1px solid black;
}
.settingWindow {
  height: 600px;
  width: 800px;
  margin-left: 50px;
  margin-top: 20px;
  /* border: 1px solid black; */
}

.avater {
  margin-right: 10px;
  cursor: pointer;
  background-color: #f2f2f2;
}
.avaDialogItem {
  width:36px;
  margin-right: 10px;
  cursor: pointer;
}

.recommendStoreManage {
  width: 400px;
  height: 600px;
  overflow: auto;
}
.recommendStoreManage .rsitem {
  height: 40px;
  line-height: 40px;
  /* background-color: #E4E7ED; */
  border: 1px solid #EBEEF5;
  border-radius: 5px ;
  margin-bottom: 5px;
  padding-left: 5px;
  font-size: 14px;
}
.recommendStoreManage .rsDelBtn {
  float: right;
  margin-top:5px;
  margin-right: 5px; 
}
</style>