<template>
  <div class="app-container">
    <!-- 楼栋添加 -->
    <el-card class="add-address">
      <!-- 地址添加表单 -->
      <el-form ref="form" :model="address" label-width="80px">
        <el-form-item label="楼栋名称">
          <el-input v-model="address.name"></el-input>
        </el-form-item>
        <el-form-item label="性别选择">
          <el-radio-group v-model="address.gender">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
            <el-radio-button label="不限"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAddress">增加地址</el-button>
        </el-form-item>
              
      </el-form>
      <!-- 折叠面板存放已存在的地址 -->
      <el-collapse>
        <el-collapse-item title="点击查看已有地址">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="address">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-card>
      <el-button @click="handleSpecs">规格管理</el-button>
      <el-button @click="handleSpecial">特殊服务</el-button>
    </el-card>
    <el-dialog :visible.sync="specsDialogVisible" width="400px" >

      <div class="specs-head">
        <el-input v-model="specsTemp.name" :placeholder="specsIptText" style="width:170px"></el-input>
        <el-input v-model="specsTemp.price" placeholder="价格" style="width:80px"></el-input>
        <el-button type="success" style="margin-left:23px" @click="confirmSpecs">确定</el-button>
      </div>

      <!-- 弹出框下显示的已存在的规格或特殊服务列表 -->
      <ul class="specs-list">
        <li v-for="(item,index) in listTemp" :key="index">
          <div class="specs-list-head">{{item.name}}</div>
          <div class="specs-list-content"> <span>{{item.price}}</span> </div>
          <div class="specs-list-tail"> <el-button type="danger" size="mini" @click="deleteSpecsItem(index)">删除</el-button> </div>
        </li>
      </ul>

      

    </el-dialog>

    <!-- 站长信息 -->
    <el-row :gutter="20">
      <el-col :xs="24" :md="12" :lg="6">
        <el-card class="infocard">
          <el-form ref="form" :model="masterInfo" label-width="80px" size="mini">
            <el-form-item label="站长姓名">{{masterInfo.name}}</el-form-item>
            <el-form-item label="站长手机">{{masterInfo.tel}}</el-form-item>
            <el-form-item label="站长QQ">{{masterInfo.qq}}</el-form-item>
            <el-form-item label="原始密码">
              {{masterInfo.pwd}}
              <span class="modifyTel">修改</span>
            </el-form-item>
            <el-form-item label="微信绑定">
              <span class="modifyTel">修改</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col  :xs="24" :md="12" :lg="6">
        <el-card class="infocard ">
            <el-form ref="form" :model="masterInfo" label-width="80px" size="mini">
              <el-form-item label="性别">
                <el-radio-group v-model="masterInfo.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="masterInfo.email"></el-input>
              </el-form-item>
              <el-form-item label="入学">
                  <el-select v-model="masterInfo.admissionDate">
                    <el-option
                      v-for="(item,index) in yearOptions" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="学历">
                  <el-select v-model="masterInfo.education">
                    <el-option v-for="(item,index) in educationOptions" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>

                  <el-select v-model="masterInfo.educationGrade">
                    <el-option
                      v-for="(item,index) in gradeOptions" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="学号">
                <span>{{masterInfo.schoolNum}}</span>
              </el-form-item>
              <el-form-item label="区域">
                  <el-select v-model="masterInfo.province" class="areaChoose" @change="provicenChoose($event)">
                    <el-option
                      v-for="(item,index) in arealist" :key="index" :label="item.province" :value="index">
                    </el-option>
                  </el-select>
                  <el-select v-model="masterInfo.city" class="areaChoose">
                    <el-option
                      v-for="(item,index) in cityOptions" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                  <el-select v-model="masterInfo.county" class="areaChoose">
                    <el-option
                      v-for="(item,index) in countyOptions" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col  :xs="24" :md="12" :lg="6">
        <el-card class="infocard">
          <el-form ref="form" :model="masterInfo" label-width="80px" size="mini">
            <el-form-item label="地址">
              <span>{{masterInfo.address}}</span>
            </el-form-item>
            <el-form-item label="身份证">
              <span>{{masterInfo.IDcard}}</span>
            </el-form-item>
            <el-form-item label="支付宝">
              <span>{{masterInfo.zfb}}</span>
            </el-form-item>
            <el-form-item label="微信号">
              <span>{{masterInfo.wechat}}</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col  :xs="24" :md="12" :lg="6">
        <el-card class="infocard">

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import area from "@/assets/common/citylist.js"

export default {
  name: "StationInfoSetting",
  data() {
    return {
      address: {
        name: '',
        gender: ''
      },
      tableData: [{
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      masterInfo: {
        name: '向桂林',
        tel: '14587459654',
        qq: '147852369',
        pwd: '******',
        email:'',
        admissionDate: '',
        education: '',
        educationGrade: '',
        schoolNum: '124578964',
        province: '',
        city: '',
        county: '',
        address: '重庆市江北区',
        IDcard: '548965412321457748',
        zfb: '154785426987',
        wechat: 'cf14574854',
      },
      yearOptions: ['2017','2018','2019','2020'],
      educationOptions: ['中专','大专','本科','硕士研究生','博士研究生'],
      gradeOptions: ['一年级','二年级','三年级','四年级'],
      cityOptions: [],
      countyOptions: undefined,
      arealist: undefined,
      specsDialogVisible: false,
      specsTemp: {
        name: '',
        price: ''
      },
      specifications: [
        { id: 1, name: '1~5kg', price: 3 },
        { id: 2, name: '10kg~20kg', price: 6 },
        { id: 3, name: '电子产品', price: 0 },
        { id: 4, name: '体积较大', price: 0 },
      ],
      specialservice: [
        { id: 1, name: '加急', price: 2},
        { id: 1, name: '托管', price: 1},
        { id: 1, name: '超级加急', price: 4},
      ],
      listTemp: undefined,
      addSpec: '',
      updateObject: '',
      specsIptText: ''

    }
  },
  created() {
    this.arealist = area.cityList
  },
  methods: {
    addAddress() {
      // 提交地址信息
    },
    // select省市联动方法
    provicenChoose(index) {
      console.log(index)
      this.cityOptions = this.arealist[index].city
    },
    confirmSpecs() {
      let temp = Object.assign({},this.specsTemp)
      // this.listTemp.push(temp)

      if (this.updateObject = 'specs') {
        this.specifications.push(temp)
      } else if (this.updateObject = 'special') {
        this.specialservice.push(temp)
      }

      /*
      *   上传到服务器
      */

     this.specsTemp = {
       name: '',
       price: ''
     }
    },
    handleSpecs() {
      this.updateObject = 'specs'
      // 指针
      this.listTemp = this.specifications
      this.specsIptText = '请输入规格'
      this.specsDialogVisible = true
    },
    handleSpecial() {
      this.updateObject = 'special'
      // 指针
      this.listTemp = this.specialservice
      this.specsIptText = '请输入特殊服务名'
      this.specsDialogVisible = true
    },
    deleteSpecsItem(index) {
      this.listTemp.splice(index,1)
      /*
      *   提交更改
      */
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-address {
    width: 500px;
    margin-bottom: 20px;
  }
  .masterinfo {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    .infocard {
      width: 400px;
    }
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 10px;
  }
  .modifyTel {
    cursor: pointer;
    color:coral;
  }
  .el-form-item__label {
    padding: 0;
  }
  .specs-head {
    margin-bottom: 10px;
  }
  .specs-list {
    list-style-type: none;
    padding: 0;
  }
  .specs-list li{
    height: 80px;
    line-height: 80px;
    display: flex;
    /* background-color: orange; */
  }
  .specs-list-head{
    height: 80px;
    width: 190px;
    overflow: hidden;
  }
  .specs-list-content{
    width: 80px;
    padding-left: 10px;
  }
  .specs-list-tail {
    margin: 0 auto;
  }
</style>