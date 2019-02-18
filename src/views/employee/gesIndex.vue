<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!--搜索框-->
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="employeeName"
                v-model="listQuery.employeeName"></el-input>
      <!--搜索按钮-->
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">search</el-button>

      <!--添加按钮-->
      <el-button class="filter-item" v-if="employeeManager_btn_add" style="margin-left: 10px;" @click="handleCreate"
                 type="primary" icon="edit">add
      </el-button>

      <!--<el-button class="filter-item"  style="margin-left: 10px;" type="primary" ><a href="http://172.30.1.81:8763/download/contact">下载</a></el-button>-->
    </div>

    <!--列表-->
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="no" width="60">
        <template scope="scope">
          <span>{{scope.row.employeeId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="90" align="center" label="photo">
        <template scope="scope">
          <!--<span>{{scope.row.employeeUuid}}</span>-->
          <!--<img :src="'http://172.30.1.81:8765/api/asset/employee/employeeUrl?employeeUrl='+scope.row.employeeUrl" style="width: 50px;height: 50px"/>-->
          <img :src="'http://172.30.1.81:8765/api/asset/employee/employeeUrl?employeeUrl='+scope.row.employeeUrl"
               style="width: 50px;height: 50px"/>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="employeeName">
        <template scope="scope">
          <span>{{scope.row.employeeName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140" align="center" label="department">
        <template scope="scope">
          <span>{{scope.row.department}}</span>
        </template>
      </el-table-column>
      <el-table-column width="250" align="center" label="emailAddress">
        <template scope="scope">
          <span>{{scope.row.emailAddress}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="roomNum">
        <template scope="scope">
          <span>{{scope.row.roomNum}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="internalNo">
        <template scope="scope">
          <span>{{scope.row.internalNo}}</span>
        </template>
      </el-table-column>
      <el-table-column width="250" align="center" label="beijingNo">
        <template scope="scope">
          <span>{{scope.row.beijingNo}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="dubaiNo">
        <template scope="scope">
          <span>{{scope.row.dubaiNo}}</span>
        </template>
      </el-table-column>
      <el-table-column width="220" align="center" label="dubaiMobileNo">
        <template scope="scope">
          <span>{{scope.row.dubaiMobileNo}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operator" width="250">
        <template scope="scope">
          <el-button v-if="employeeManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">edit
          </el-button>
          <!--<el-button size="small" type="success" @click="handleRecord(scope.row)">record</el-button>-->
          <el-button v-if="employeeManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

    <!--创建员工dialog-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="photo" prop="photo">
          <!--<el-input v-model="form.photo" placeholder="请输入姓名"></el-input>-->
          <el-upload
            class="avatar-uploader"
            action="http://172.30.1.81:8765/api/asset/employee/uploadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="department">
          <el-select class="filter-item" v-model="form.department" placeholder="please select department">
            <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="employeeClass">-->
          <!--<el-select class="filter-item" v-model="form.employeeClass" placeholder="please select employeeClass">-->
            <!--<el-option v-for="item in  employeeClassOptions" :key="item" :label="item" :value="item"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="employeeName" prop="employeeName">
          <el-input v-model="form.employeeName" placeholder="please input employeeName"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" label="emailAddress" placeholder="please input emailAddress" prop="emailAddress">
          <el-input v-model="form.emailAddress"></el-input>
        </el-form-item>
        <el-form-item label="internalNo" prop="internalNo">
          <el-input v-if="dialogStatus == 'create'" v-model="form.internalNo" placeholder="please input internalNo"></el-input>
          <el-input v-else v-model="form.internalNo" placeholder="please input internalNo" ></el-input>
        </el-form-item>
        <el-form-item label="beijingNo" prop="beijingNo">
          <el-input v-if="dialogStatus == 'create'" v-model="form.beijingNo" placeholder="please input beijingNo"></el-input>
          <el-input v-else v-model="form.beijingNo" placeholder="please input beijingNo" ></el-input>
        </el-form-item>
        <el-form-item label="dubaiNo" prop="dubaiNo">
          <el-input v-if="dialogStatus == 'create'" v-model="form.dubaiNo" placeholder="please input dubaiNo"></el-input>
          <el-input v-else v-model="form.dubaiNo" placeholder="please input dubaiNo" ></el-input>
        </el-form-item>
        <el-form-item label="dubaiMobileNo" prop="dubaiMobileNo">
          <el-input v-if="dialogStatus == 'create'" v-model="form.dubaiMobileNo" placeholder="please input dubaiMobileNo"></el-input>
          <el-input v-else v-model="form.dubaiMobileNo" placeholder="please input dubaiMobileNo" ></el-input>
        </el-form-item>

        <el-form-item label="priority" prop="priority">
          <el-input v-if="dialogStatus == 'create'" v-model="form.priority" placeholder="please input priority"></el-input>
          <el-input v-else v-model="form.priority" placeholder="please input priority" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">cancel</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">confire</el-button>
        <el-button v-else type="primary" @click="update('form')">confire</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    // page   addObj   getObj delObj putObj
    // 分页查询 添加asset 获取    删除   局部修改
    page,
    addObj,
    getObj,
    delObj,
    putObj
  } from 'src/api/asset/employee/index';
  import {mapGetters} from 'vuex';

  export default {
    name: 'user',
    data() {
      return {
        form: {
          photo: undefined,
          priority: undefined,
          employeeName: undefined,
          department: 'Top Management',
          employeeClass: 'GES',
          emailAddress: undefined,
          internalNo: undefined,
          beijingNo: undefined,
          dubaiNo: undefined,
          dubaiMobileNo: undefined,
          employeeUrl: ''
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入用户',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          emailAddress: [
            {
              required: true,
              message: 'please input emailAddress',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          employeeClass: 'GES',
          employeeName: undefined
        },
        sexOptions: ['Top Management', 'Administration','Human Resource','Finance',
          'Business Development','Project Execution ','Project Control','Quality & Standards','Engineering Department'],
        // employeeClassOptions: ['BJ_DG_ZZ', 'BJ_MISSION','GES','THRID-PARTY'],
        dialogFormVisible: false,
        dialogStatus: '',
        employeeManager_btn_edit: false,
        employeeManager_btn_del: false,
        employeeManager_btn_add: false,
        textMap: {
          update: 'Edit ',
          create: 'Create'
        },
        tableKey: 0,
        imageUrl: ''
      }
    },
    created() {
      this.getList();
      this.employeeManager_btn_edit = this.elements['employeeManager:btn_edit'];
      this.employeeManager_btn_del = this.elements['employeeManager:btn_del'];
      this.employeeManager_btn_add = this.elements['employeeManager:btn_add'];
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {
      getList() {
        this.listLoading = true;
        page(this.listQuery)
          .then(response => {
            this.list = response.data.rows;
            this.total = response.data.total;
            this.listLoading = false;
          })
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        getObj(row.employeeId)
          .then(response => {
            this.form = response.data;
            this.dialogFormVisible = true;
            this.dialogStatus = 'update';
          });
      },

      handleRecord(row) {
        this.$router.push({
          name: 'record',
          params: {
            employeeId: row.employeeId
          },
        })
      },

      handleDelete(row) {
        this.$confirm('This data will be deleted.Do you want to continue?', 'reminder', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
          .then(() => {
            delObj(row.employeeId)
              .then(() => {
                this.$notify({
                  title: 'Delete',
                  message: 'Deleted successfully',
                  type: 'success',
                  duration: 2000
                });
                const index = this.list.indexOf(row);
                this.list.splice(index, 1);
              });
          });
      },
      create(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false;
                this.getList();
                this.$notify({
                  title: 'Created',
                  message: 'Created successfully',
                  type: 'success',
                  duration: 2000
                });
              })
          } else {
            return false;
          }
        });
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
      },
      update(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            this.form.password = undefined;
            putObj(this.form.id, this.form).then(() => {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: 'Update',
                message: 'Updated successfully',
                type: 'success',
                duration: 2000
              });
            });
          } else {
            return false;
          }
        });
      },
      resetTemp() {
        this.form = {
          photo: undefined,
          employeeName: undefined,
          department: 'Top Management',
          emailAddress: undefined,
          internalNo: undefined,
          beijingNo: undefined,
          dubaiNo: undefined,
          dubaiMobileNo: undefined,
          employeeUrl: ''
        };
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file.raw)
        this.form.employeeUrl = res;
        console.log(this.form.employeeUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      download: function(){
        axios({
          method: "get",
          url: "http://172.30.1.81:8763/api/asset/download/contact",
          responseType: "arraybuffer"
        })
          .then(
            function(response) {
              let filename = "poiImport.xlsx";
              this.fileDownload(response.data, filename);
            }.bind(this)
          )
          .catch(
            function(error) {
              alert("网络请求出错");
            }.bind(this)
          );
      },
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
