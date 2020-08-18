<template>
  <div class="app-container">

    <el-card class="salary">
      <div slot="header">薪资发放</div>
      <div class="salary-container">
        <el-row>
          <el-col :span="6">
            <el-form size="mini">
              <el-form-item label="人员选择">
                <el-select v-model="salary.staff" placeholder="人员选择" clearable style="width: 120px">
                  <el-option v-for="item in staffOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="总单">
                <el-input  v-model="salary.orderNum" style="width: 90px;"></el-input>
              </el-form-item>
              <el-form-item label="等级">
                <el-select v-model="salary.grade" placeholder="等级选择" clearable style="width: 120px" class="filter-item">
                  <el-option v-for="item in staffGradeOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item v-model="salary.salary" label="薪资">
                <el-input style="width: 90px;"></el-input>
              </el-form-item>            
              <el-form-item label="全勤">
                <el-input  v-model="salary.fullaAttendance" style="width: 90px;"></el-input>
              </el-form-item>     
            </el-form>       
          </el-col>
          <el-col :span="6">
            <el-form size="mini">
              <el-form-item label="工龄">
                <el-input  v-model="salary.workYears" style="width: 90px;"></el-input>
              </el-form-item>
              <el-form-item label="好评率">
                <el-input  v-model="salary.praiseRate" style="width: 90px;"></el-input>
              </el-form-item>
              <el-form-item label="超单">
                <el-input  v-model="salary.superOrder" style="width: 90px;"></el-input>
              </el-form-item>
              <el-form-item label="维护客服数量">
                <el-input  v-model="salary.maintainServiceNum" style="width: 90px;"></el-input>
              </el-form-item>
              <el-form-item label="坐班">
                <el-input  v-model="salary.keepWorking" style="width: 90px;"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <el-form size="mini">
              <el-form-item label="送水补贴">
                <el-input  v-model="salary.waterSubsidy" style="width: 90px;"></el-input>
              </el-form-item>
              <el-form-item label="奖金">
                <el-input  v-model="salary.bonus" style="width: 90px;"></el-input>
              </el-form-item>
              <el-form-item label="总计">
                <el-input  v-model="salary.total" style="width: 90px;"></el-input>
              </el-form-item>
              <el-form-item label="站长授权码">
                <el-input  v-model="salary.authorizeCode" style="width: 90px;"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <el-form>
              <el-form-item label="输入金额">
                <el-input  v-model="salary.finalSalary" style="width: 90px;"></el-input>
              </el-form-item>
              <el-button style="margin-left: 10px;" type="success">
                下发薪资
              </el-button>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 筛选器，搜索条件 -->
    <div class="filter-container">
      <el-select v-model="listQuery.type" placeholder="类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.operateStatus" placeholder="操作状态" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in operateOptions" :key="item" :label="item" :value="item" />
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
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column>   
      <el-table-column label="订单号" prop="orderID" sortable="custom" align="center" width="140" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="第三方订单号" prop="orderID" sortable="custom" align="center" width="160" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
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
  name: "Journal",
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
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      salary: {
        staff: undefined,
        orderNum: undefined,
        grade: undefined,
        salary: undefined,
        fullaAttendance: undefined,
        workYears: undefined,
        praiseRate: undefined,
        superOrder: undefined,
        maintainServiceNum: undefined,
        keepWorking: undefined,
        waterSubsidy: undefined,
        bonus: undefined,
        total: undefined,
        authorizeCode: undefined,
        finalSalary: undefined
      },
      staffGradeOptions: ['无','二级','一级'],
      // 传入员工名单
      staffOptions: ['张三','李四'],
      typeOptions: ['发薪出账','消耗出账','充值入账','收益入账'],
      operateOptions: ['已完成','已驳回']
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
    dateChoose(date) {
      this.listQuery.date = date
    },
  }

}
</script>

<style lang="scss" scoped>
.salary {
  margin-bottom: 20px;

  .salary-container {
    height: 200px;
    // line-height: 200px;
  }
  .symbol {
    font-size: 20px;
    margin-right: 10px;
  }

}
</style>