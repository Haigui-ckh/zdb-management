<template>
  <div class="app-container">
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

    <!-- 站长信息 -->
    <el-row :gutter="20">
      <el-col :xs="24" :md="12" :lg="6">
        <el-card class="infocard">
          <div class="text item"> 站长姓名：{{masterInfo.name}}</div> 
          <div class="text item"> 
            站长手机：{{masterInfo.tel}}
            <span class="modifyTel">修改</span>
          </div> 
          <div class="text item"> 站长QQ：{{masterInfo.qq}}</div> 
          <div class="text item"> 
            原始密码：{{masterInfo.pwd}}
            <span class="modifyTel">修改</span>
          </div> 
          <div class="text item"> 
            微信绑定：
            <span class="modifyTel">修改</span>
          </div> 
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
      arealist: undefined

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
</style>