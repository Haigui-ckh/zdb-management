<template>
  <div class="app-container">
    <!-- 筛选器 -->
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

      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.gender" placeholder="性别" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in genderOptions" :key="item" :label="item" :value="item" />
      </el-select>     
      <el-input v-model="listQuery.id" placeholder="站长ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-input v-model="listQuery.tel" placeholder="站长电话" style="width: 110px;" 
                class="filter-item" @keyup.enter.native="handleFilter" type="tel"/>
      <el-input v-model="listQuery.qq" placeholder="站长QQ" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.wechat" placeholder="站长微信" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.education" placeholder="学历" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in educationOptions" :key="item" :label="item" :value="item" />
      </el-select> 
      <el-select v-model="listQuery.auditStatus" placeholder="审查状态" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in auditStatusOptions" :key="item" :label="item" :value="item" />
      </el-select>   
      <DateChoose @dateChoose="dateChoose"></DateChoose>
      <!-- <button @click="dateclick">日期test</button> -->
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
      <el-table-column label="审核" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.status=='untreated'" size="mini" type="success" @click="handleModifyStatus(row,'passed')">
            通过
          </el-button>
          <el-button v-if="row.status=='passed'" size="mini"  disabled>
            已通过
          </el-button>
          <el-button v-if="row.status =='passed'" type="danger" size="mini" @click="handleModifyStatus(row,'rejected')">
            复驳
          </el-button>
          <el-button v-if="row.status =='untreated'" type="danger" size="mini" @click="handleModifyStatus(row,'rejected')">
            驳回
          </el-button>
          <el-button v-if="row.status =='rejected'" type="danger" size="mini" disabled>
            已驳回
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="站点平台" prop="site" align="center" width="120">
        <template slot-scope="{}">
          <a href="#">进入网点平台</a>
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
      auditStatusOptions: ['通过','驳回','复驳'],
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
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
  }
}
</script>

<style scoped>
</style>