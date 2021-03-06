<template>
  <div class="app-container">
    <!-- 筛选条件 -->
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
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.gender" placeholder="性别" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in genderOptions" :key="item" :label="item" :value="item" />
      </el-select>     
      <el-input v-model="listQuery.id" placeholder="用户ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-input v-model="listQuery.tel" placeholder="用户电话" style="width: 110px;" 
                class="filter-item" @keyup.enter.native="handleFilter" type="tel"/>
      <el-input v-model="listQuery.qq" placeholder="用户QQ" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.wechat" placeholder="用户微信" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.education" placeholder="学历" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in educationOptions" :key="item" :label="item" :value="item" />
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
      <el-table-column label="学历" prop="education" align="center" width="90">
        <template slot-scope="{row}">
          <span>{{ row.education }}</span>
        </template>
      </el-table-column> 
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { getList, handleFilter } from '@/utils/list.js'
import Pagination from '@/components/content/Pagination'
import DateChoose from '@/components/content/DateChoose'

export default {
  name: "SiteSummary",
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
        province: undefined,
        city: undefined,
        county: undefined,
        address: undefined,
        name: undefined,
        gender: undefined,
        tel: undefined,
        qq: undefined,
        wechat: undefined,
        education: undefined,
        sort: '+id'
      },
      provinceOptions: ['北京','上海','重庆','广东'],
      cityOptions: ['大理','丽江','长沙','昆明'],
      countyOptions: ['永川','北碚','江北','渝北'],
      genderOptions: ['男','女'],
      educationOptions: ['高中','大专','本科','硕士研究生','博士研究生'],
      addressOptions: ['永川','北碚','江北','渝北'],
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