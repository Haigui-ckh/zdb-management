<template>
  <div class="app-container">
    <!-- 筛选器，搜索条件 -->
    <div class="filter-container">
      <el-select v-model="listQuery.address" placeholder="地址" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in addressOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in takeouttypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.userid" placeholder="用户ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.orderid" placeholder="订单号" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.merchantid" placeholder="店主ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.usertel" placeholder="客户电话" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.paytype" placeholder="支付状态" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in payTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.ordertype" placeholder="受理状态" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in orderTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <DateChoose @dateChoose="dateChoose"></DateChoose>
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
      <el-table-column label="类型" prop="type" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="方式" prop="method" align="center" width="130">
        <template slot-scope="{}">
          <span>配送上门</span>
        </template>
      </el-table-column> 
      <el-table-column label="订单号" prop="orderid" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{row.id}}</span>
        </template>
      </el-table-column> 
      <el-table-column label="店主ID" prop="merchantid" sortable="custom" align="center" width="90" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="用户ID" prop="userid" sortable="custom" align="center" width="90" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="订单详情" prop="orderDetails" align="center" min-width="150">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="客户电话" prop="userTel" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="详细地址" prop="address" align="center" min-width="150">
        <template slot-scope="{}">
          <!-- <span>{{ row.id }}</span> -->
        </template>
      </el-table-column> 
      <el-table-column label="支付" prop="payWay" align="center" width="100">
        <template slot-scope="{}">
          <span>在线支付</span>
        </template>
      </el-table-column> 
      <el-table-column label="受理" prop="orderStatus" align="center" width="100">
        <template slot-scope="{}">
          <span></span>
        </template>
      </el-table-column> 
      <el-table-column label="下单时间" prop="orderTime" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column> 

    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/content/Pagination'
import DateChoose from '@/components/content/DateChoose'

export default {
  name: "StoreSummary",
  components: {
    Pagination,
    DateChoose
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
        date: undefined,
        userid: undefined,
        orderid: undefined,
        merchantid: undefined,
        type: undefined,
        tel: undefined,
        ordertype: undefined,
        sort: '+id'
      },
      takeouttypeOptions: ['外卖'],
      orderTypeOptions: ['已受理','取单中','配送中','已完成','已撤销'],
      payTypeOptions: ['已支付','未支付']

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
    dateChoose(date) {
      this.listQuery.date = date
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