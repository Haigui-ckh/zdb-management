<template>
  <div class="app-container">
    <!-- 筛选器，搜索条件 -->
    <div class="filter-container">
      <el-select v-model="listQuery.province" placeholder="省份" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in provinceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.city" placeholder="城市" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in cityOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.county" placeholder="区县" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in countyOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.address" placeholder="地址" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in addressOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in deliveryTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.station" placeholder="快递点" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in deliveryStationOptions" :key="item" :label="item" :value="item" />
      </el-select>  
      <el-input v-model="listQuery.tel" placeholder="客户电话" style="width: 110px;" 
                class="filter-item" @keyup.enter.native="handleFilter" type="tel"/>
      <el-input v-model="listQuery.id" placeholder="快递员ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-input v-model="listQuery.tel" placeholder="快递员电话" style="width: 110px;" 
                class="filter-item" @keyup.enter.native="handleFilter" type="tel"/>
      <el-select v-model="listQuery.ordertype" placeholder="订单状态" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in orderTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-date-picker
        v-model="date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        style="margin-left:10px">
      </el-date-picker>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <!-- 翻页条 -->
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  
    <!-- 表格主体 -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      max-height="600px"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="省份" prop="province" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.province }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="城市" prop="city" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="区县" prop="county" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.county }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="地址" prop="address" align="center" min-width="150">
        <template slot-scope="{}">
          <!-- <span>{{ row.id }}</span> -->
        </template>
      </el-table-column>
           
      <el-table-column label="类别" prop="type" sortable="custom" align="center" width="80">
        <template slot-scope="{}">
          <!-- <span>{{ row.id }}</span> -->
          <span>快递</span>
        </template>
      </el-table-column> 
      <el-table-column label="快递点" prop="station" sortable="custom" align="center" width="80">
        <template slot-scope="{}">
          <!-- <span>{{ row.id }}</span> -->
          <span>圆通</span>
        </template>
      </el-table-column> 
      <el-table-column label="用户ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="用户姓名" prop="name" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>  
      <el-table-column label="用户电话" prop="merchantTel" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="取件短信/寄出地址" prop="info" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="备注" prop="remarks" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="代取规格/跑腿规格/寄出规格" prop="specifications" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="寄出电话" prop="sendTel" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="特殊服务" prop="extendService" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="转单" prop="extendService" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="单量" prop="orderNums" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="小费+追加" prop="tips" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="总计" prop="sum" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="提交时间" prop="submitTime" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="支付状态" prop="payStatus" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="快递员ID+电话" prop="riderIdAndTel" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="订单状态" prop="orderStatus" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 


    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/content/Pagination'

export default {
  name: "riderSummary",
  components: {
    Pagination
  },
  data() {
    return{
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        province: undefined,
        city: undefined,
        county: undefined,
        name: undefined,
        tel: undefined,
        qq: undefined,
        wechat: undefined,
        education: undefined,
        sort: '+id'
      },
      provinceOptions: ['北京','上海','重庆','广东'],
      cityOptions: ['大理','丽江','长沙','昆明'],
      countyOptions: ['永川','北碚','江北','渝北'],
      deliveryTypeOptions: ['代取快递','代取文件','跑腿代购','代寄快递'],
      deliveryStationOptions: ['圆通','中通','申通','韵达'],
      orderTypeOptions: ['待支付','待取单','取单中','送单中','已完成','已撤销'],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, 
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, 
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      date: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '已通过',
        type: 'success'
      })
      row.status = status
    },
  }

}
</script>

<style scoped>
</style>