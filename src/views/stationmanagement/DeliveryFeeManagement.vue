<template>
  <div class="app-container">
    <!-- 筛选器，搜索条件 -->
    <div class="filter-container">
      <el-select v-model="listQuery.type" placeholder="类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in takeouttypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.storeid" placeholder="店铺ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.storename" placeholder="店铺名称" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />

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
      <el-table-column label="店铺ID" prop="storeid" sortable="custom" align="center" width="90" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="店铺名称" prop="storename" align="center" width="150" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="平台来单扣费" prop="storename" align="center" min-width="400" :class-name="getSortClass('id')">
        <template slot-scope="{}">
          <!-- <span>{{ row.id }}</span> -->
          每单定额:<el-input v-model="stationfee.amount" size="mini" class="feeipt" type="number"></el-input>￥
          每单比例:<el-input v-model="stationfee.rate" size="mini" class="feeipt" type="number"></el-input>%
          <el-button size="mini" class="feebtn" type="primary" @click="setFeeClick">设置</el-button>
        </template>
      </el-table-column> 

    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/content/Pagination'

export default {
  name: "DeliveryFeeManagement",
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
      payTypeOptions: ['已支付','未支付'],
      stationfee: {
        rate: undefined,
        amount: undefined
      }

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
    setFeeClick() {
      // 提交设置的金额或比例
    }
  }

}
</script>

<style scoped>
.feeipt {
  width: 80px;
  margin: 0 7px;
}
.feebtn {
  margin-left: 10px;
}
</style>