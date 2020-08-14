<template>
  <div class="app-container">
    <!-- 筛选器，搜索条件 -->
    <div class="filter-container">
      <el-select v-model="listQuery.storeType" placeholder="店铺类型" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in storeTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="listQuery.id" placeholder="店铺ID" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.storeName" placeholder="店铺名称" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.uploadStatus" placeholder="营业执照" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in uploadStatusOptions" :key="item" :label="item" :value="item" />
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
      <el-table-column label="店铺类型" prop="storeType" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="店铺ID" prop="id" sortable="custom" align="center" width="110" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="店铺名称" prop="storeName" align="center" min-width="110">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="绑定店长" prop="storeMaster" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="催单客服电话" prop="merchantTel" align="center" width="130">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="营业执照" prop="license" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.merchantsname }}</span>
          <img :src="row.image_uri" alt=""  width="50px" height="30px" @click="ViewLarger(row)">
        </template>
      </el-table-column> 
      <el-table-column label="审核" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.status=='untreated'" size="mini" type="success" @click="handleModifyStatus(row,'passed')">
            提交
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

    </el-table>

    <el-dialog
    title="查看大图"
    :visible.sync="dialogVisible">
      <img :src="tempimg">
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
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
      storeTypeOptions: ['商品店铺','外卖店铺'],
      uploadStatusOptions: ['营业执照','未上传营业执照/经营许可','只上传营业执照','只上传经营许可证'],
      dialogVisible: false,
      tempimg: ''

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
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    ViewLarger(row) {
      this.tempimg = row.image_uri
      this.dialogVisible = true
    }
  }

}
</script>

<style scoped>
</style>