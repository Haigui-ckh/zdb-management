<template>
  <div class="app-container">
    <!-- 功能展示 -->
    <div class="grid">
      <el-card class="appplus">
        <span>添加新功能</span>
        <img src="~@/assets/common/plus.png"  @click="handleCreate">
      </el-card>

      <el-card v-for="(item,index) in cardlist" :key="index" class="appitem">
        <img :src="item.image_uri" >
        <p> {{item.appname}}</p>
        <el-button size="mini" type="success" @click="handleUpdate(item)">
          修改
        </el-button>
      </el-card>
    </div>

    <!-- 添加和修改的弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="margin-left:50px;">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <div>上传图片</div>
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

        </el-upload>

        <el-form-item label="功能名" prop="name">
          <el-input v-model="temp.appname" />
        </el-form-item>
        <el-form-item label="功能链接" prop="url">
          <el-input v-model="temp.appurl" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="将相关链接粘贴到此处" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <DateChoose @dateChoose="dateChoose"></DateChoose>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import DateChoose from '@/components/content/DateChoose'

export default {
  name: "AppMall",
  components: {
    DateChoose
  },
  data() {
    return {
      cardlist: [],
      dialogFormVisible:false,
      dialogStatus: '',
      temp: {
        appname: '',
        appurl: '',
        image_uri: ''
      },
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        content: [{ required: true, message: 'content is required', trigger: 'blur' }]
      },
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id',
        date: undefined
      },
      imageUrl: '',
      
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        this.cardlist = response.data.items
        setTimeout(() => {
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        name: '',
        url: '',
        imgurl: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    dateChoose(date) {
      this.listQuery.date = date
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  
  }
  .appitem {
    height: 170px;
    text-align: center;

    img {
      width: 80%;
      margin: 0 auto;
      margin-bottom: 10px;
    }

    p {
      padding: 0;
      margin: 0;
      margin-bottom: 10px;
    }
  }

  
  .appplus{
    text-align: center;
   
    img{
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    }
  }
  .avatar-uploader {
    margin-bottom: 15px;
    line-height: 100px;

    div {
      width: 90px;
      float: left;
      // margin-top: 70px;
      font-weight: bold;
      text-align: left;
    }
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #D9E2E9;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>