<template>
  <div class="app-container">
    <!-- 筛选器，搜索条件 -->
    <div class="filter-container">
      <!-- <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select> -->
      <el-select v-model="listQuery.province" placeholder="省份" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in provinceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.city" placeholder="城市" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in cityOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.county" placeholder="区县" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in countyOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.storeType" placeholder="店铺类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in storeTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.id" placeholder="店铺ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.storeName" placeholder="店铺名称" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.auditStatus" placeholder="审查状态" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in auditStatusOptions" :key="item" :label="item" :value="item" />
      </el-select>
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
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="店名" prop="sname" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="店铺类型" prop="storeType" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="姓名" prop="merchantName" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="电话" prop="merchantTel" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="证照" prop="license" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
          <img src="~@/assets/404_images/404.png" alt=""  width="50px" height="30px">
        </template>
      </el-table-column> 
      <el-table-column label="审核" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            通过
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            已通过
          </el-button>
          <el-button type="danger" v-if="row.status!='published'" size="mini">
            驳回
          </el-button>
          <el-button type="danger" v-if="row.status!='draft'" size="mini">
            复驳
          </el-button>

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
      storeTypeOptions: ['商品店铺','外卖店铺'],
      auditStatusOptions: ['通过','驳回']

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
        // console.log(this.list)
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