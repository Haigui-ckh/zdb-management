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
      <el-input v-model="listQuery.schoolname" placeholder="学校名称" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.operateStatus" placeholder="操作状态" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in operateOptions" :key="item" :label="item" :value="item" />
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
      <el-table-column label="类型" prop="type" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column>   
      <el-table-column label="订单号" prop="orderID" sortable="custom" align="center" width="90" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="店名" prop="sname" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="变动额" prop="changes" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="变后余额" prop="balance" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="创建时间" prop="createTime" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="发布时间" prop="issueTime" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="备注" prop="remarks" align="center" min-width="200">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
          <img src="~@/assets/404_images/404.png" alt=""  width="50px" height="30px">
        </template>
      </el-table-column> 
      <el-table-column label="操作状态" prop="operateStatus" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
          <img src="~@/assets/404_images/404.png" alt=""  width="50px" height="30px">
        </template>
      </el-table-column> 
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/content/Pagination'

export default {
  name: "StoreSummary",
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
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      provinceOptions: ['北京','上海','重庆','广东'],
      cityOptions: ['大理','丽江','长沙','昆明'],
      countyOptions: ['永川','北碚','江北','渝北'],
      typeOptions: ['收益入账','发薪出账'],
      operateOptions: ['未完成','已完成','提现驳回'],
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