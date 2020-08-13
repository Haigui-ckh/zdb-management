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

      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.gender" placeholder="性别" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in genderOptions" :key="item" :label="item" :value="item" />
      </el-select>     
      <el-input v-model="listQuery.id" placeholder="骑手ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" /> 
      <el-input v-model="listQuery.tel" placeholder="骑手电话" style="width: 110px;" 
                class="filter-item" @keyup.enter.native="handleFilter" type="tel"/>
      <el-input v-model="listQuery.qq" placeholder="QQ" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.wechat" placeholder="微信" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.education" placeholder="学历" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in educationOptions" :key="item" :label="item" :value="item" />
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
      <el-table-column label="类别" prop="type" sortable="custom" align="center" width="80">
        <template slot-scope="{}">
          <!-- <span>{{ row.id }}</span> -->
          <span>快递</span>
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
    // dateclick() {
    //   console.log(this.date)
    // },
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