<template>
  <div class="app-container">
    <!-- 筛选器，搜索条件 -->
    <div class="filter-container">
      <el-input v-model="listQuery.tel" placeholder="用户手机号" style="width: 170px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-input v-model="listQuery.id" placeholder="用户ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-input v-model="listQuery.qq" placeholder="用户QQ" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-select v-model="listQuery.followStatus" placeholder="状态" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in followStatusOptions" :key="item" :label="item" :value="item" />
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
      <el-table-column label="姓名" prop="name" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>       
      <el-table-column label="性别" prop="gender" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.gender }}</span>
        </template>
      </el-table-column>  
      <el-table-column label="用户头像" prop="profilepicture" align="center" width="100">
        <template slot-scope="{row}">
          <img :src="row.image_uri" alt=""  width="50px" height="30px" @click="ViewLarger(row)">
        </template>
      </el-table-column>      
      <el-table-column label="公众号" prop="follow" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.gender }}</span>
        </template>
      </el-table-column>       
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="电话" prop="merchantTel" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="QQ" prop="qq" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="微信" prop="wechat" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="省——市——区" prop="address" align="center" width="180">
        <template slot-scope="{}">
        </template>
      </el-table-column>
      <el-table-column label="详细地址" prop="addressDetail" align="center" min-width="150">
        <template slot-scope="{}">
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="registerTime" align="center" min-width="150">
        <template slot-scope="{}">
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
  name: "UserManagement",
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
      followStatus: ['未知','已关注','未关注'],
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
      date: '',
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