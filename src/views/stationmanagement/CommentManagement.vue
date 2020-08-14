<template>
  <div class="app-container">
    <!-- 筛选器，搜索条件 -->
    <div class="filter-container">
      <el-select v-model="listQuery.type" placeholder="类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in commentTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.id" placeholder="店铺ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-input v-model="listQuery.id" placeholder="用户ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-select v-model="listQuery.commentStatus" placeholder="状态" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in commentStatusOptions" :key="item" :label="item" :value="item" />
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

           
      <el-table-column label="类型" prop="type" align="center" width="80">
        <template slot-scope="{}">
          <!-- <span>{{ row.id }}</span> -->
          <span>快递</span>
        </template>
      </el-table-column> 
      <el-table-column label="店铺ID" prop="id" sortable="custom" align="center" width="120" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="用户ID" prop="id" sortable="custom" align="center" width="120" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="匿名" prop="anonymous" align="center" width="100">
        <template slot-scope="{}">
          <span>是</span>
        </template>
      </el-table-column>  
      <el-table-column label="评论内容" prop="content" align="center" min-width="150">
        <template slot-scope="{}">
          <!-- <span>{{ row.id }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" width="100">
        <template slot-scope="{}">
          <span>是</span>
        </template>
      </el-table-column>  
      <el-table-column label="点赞" prop="good" align="center" width="100">
        <template slot-scope="{}">
          <span></span>
        </template>
      </el-table-column> 
      <el-table-column label="聊天记录" prop="chatrecord" align="center" width="130">
        <template slot-scope="{}">
          <a @click="dialogVisible = true">点击查看</a>
        </template>
      </el-table-column> 
      <el-table-column label="状态" prop="workStatus" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 

    </el-table>

    <el-dialog
    title="查看聊天记录"
    :visible.sync="dialogVisible">
      <img :src="tempimg">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/content/Pagination'
import DateChoose from '@/components/content/DateChoose'

export default {
  name: "riderSummary",
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
        name: undefined,
        tel: undefined,
        sort: '+id',
        workStatus: undefined
      },
      commentTypeOptions: ['快递','外卖'],
      commentStatusOptions: ['正常','删除'],
      dialogVisible: false
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