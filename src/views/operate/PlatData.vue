<template>
  <div class="dashboard-editor-container">
    <el-row class="summary-row">
      <el-col :span="8">累计用户:<span>1000</span></el-col>
      <el-col :span="8">商城单量:<span>10000</span></el-col>
      <el-col :span="8">快递服务:<span>10000</span></el-col>
    </el-row>
    <el-row class="time-summary-row">
      <el-col :span="6">新增用户:<span>1000</span></el-col>
      <el-col :span="6">商城单量:<span>1000</span></el-col>
      <el-col :span="6">快递服务:<span>1000</span></el-col>
      <el-col :span="6">兼职登记:<span>1000</span></el-col>
    </el-row>
    <el-row class="timechoose-row">
      <!-- <el-radio v-model="timequantum" label="7" border>7天</el-radio>
      <el-radio v-model="timequantum" label="15" border>15天</el-radio>
      <el-radio v-model="timequantum" label="30" border>30天</el-radio>
      <el-radio v-model="timequantum" label="90" border>90天</el-radio> -->
      <el-radio-group v-model="timequantum" change="clickradio">
        <el-radio-button label="7">7天</el-radio-button>
        <el-radio-button label="10">10天</el-radio-button>
        <el-radio-button label="15">15天</el-radio-button>
        <el-radio-button label="30">30天</el-radio-button>
        <el-radio-button label="90">90天</el-radio-button>
      </el-radio-group>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="daterange">
      </el-date-picker>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />  
    </el-row>

    <el-row class="station-summary-row" :gutter="20">
      <el-col :span="6" class="station-summary-col">
        <ul>
          <li class="li-title">昨日 新增用户 前10网点</li>
          <li v-for="(item,index) in tableData" :key="index" :class="{ active: index % 2 === 0}">
            {{item.name}}
          </li>
        </ul>
      </el-col>

      <!-- <el-col :span="6">
        <ul>
          <li class="li-title">昨日 新增用户 前10网点</li>
          <li v-for="(item,index) in tableData" :key="index">
            {{item.name}}
          </li>
        </ul>  
      </el-col>
      <el-col :span="6">
        <ul>
          <li class="li-title">昨日 新增用户 前10网点</li>
          <li v-for="(item,index) in tableData" :key="index">
            {{item.name}}
          </li>
        </ul>
      </el-col>
      <el-col :span="6">
        <ul>
          <li class="li-title">昨日 新增用户 前10网点</li>
          <li v-for="(item,index) in tableData" :key="index">
            {{item.name}}
          </li>
        </ul>
      </el-col> -->

    </el-row>

  </div>
</template>

<script>
import LineChart from './components/LineChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: "PlatData",
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      date: '',
      timequantum: '',
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '李小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '赵小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '钱小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]    
    }
  },
  created() {
  },
  methods: {
    clickradio() {
      console.log(this)
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .summary-row {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}


.time-summary-row {
  text-align: center;
  margin-bottom: 10px;
}

.timechoose-row {
  margin-bottom: 10px;
    
  .daterange {
  margin-left: 10px;
  }
}


.active {
  background-color: #FFCC99;
}

.station-summary-row {
  
  .station-summary-col {
    height: 200px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    font-size: 14px;
    background-color:white;
    border: 1px solid #D9E2E9;
    border-radius: 5px;
    height: 191px;
  }
  ul li {
    height: 18px;
  }
  .li-title {
    text-align: center;
  }
}



@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>