<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Class"
                v-model="listQuery.assetType"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
      <!--<el-button class="filter-item" v-if="userManager_btn_add" style="margin-left: 10px;" @click="handleCreate"-->
                 <!--type="primary" icon="edit">添加-->
      <!--</el-button>-->
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="No" width="65">
        <template scope="scope">
          <span>{{scope.row.recordId}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="employeeName">
        <template scope="scope">
          <span>{{scope.row.employeeName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="roomNum">
        <template scope="scope">
          <span>{{scope.row.roomNum}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="serialNumber">
        <template scope="scope">
          <span>{{scope.row.serialNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="borrowedDate">
        <template scope="scope">
          <span>{{scope.row.borrowedDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="returnDate">
        <template scope="scope">
          <span>{{scope.row.returnDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="assetType">
        <template scope="scope">
          <span>{{scope.row.assetType}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="operatorTime">
        <template scope="scope">
          <span>{{scope.row.operatorTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="operatorType">
        <template scope="scope">
          <span>{{scope.row.operatorType}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="operatorPeople">
        <template scope="scope">
          <span>{{scope.row.operatorPeople}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="isReturned">
        <template scope="scope">
          <span v-if="scope.row.isReturned===0">No</span>
          <span v-if="scope.row.isReturned===1">Yes</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账户" prop="username">
          <el-input v-if="dialogStatus == 'create'" v-model="form.username" placeholder="请输入账户"></el-input>
          <el-input v-else v-model="form.username" placeholder="请输入账户" readonly></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" label="密码" placeholder="请输入密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select class="filter-item" v-model="form.sex" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容"
                    v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
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
  } from 'src/api/asset/record/index';
  import {mapGetters} from 'vuex';

  export default {
    name: 'user',
    data() {
      return {
        form: {
          username: undefined,
          name: undefined,
          sex: '男',
          password: undefined,
          description: undefined
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
          username: [
            {
              required: true,
              message: '请输入账户',
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
          name: undefined,
          serialNumber: undefined,
          employeeId: undefined,
          assetType: undefined
        },
        sexOptions: ['男', '女'],
        dialogFormVisible: false,
        dialogStatus: '',
        userManager_btn_edit: false,
        userManager_btn_del: false,
        userManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted: function () {
      if (this.$route.params.serialNumber !== undefined) {
        this.listQuery.serialNumber = this.$route.params.serialNumber;
        page(this.listQuery)
      }
      if (this.$route.params.employeeId !== undefined) {
        this.listQuery.employeeId = this.$route.params.employeeId;
        page(this.listQuery)
      }
    },
    created() {
      this.getList();
      this.userManager_btn_edit = this.elements['userManager:btn_edit'];
      this.userManager_btn_del = this.elements['userManager:btn_del'];
      this.userManager_btn_add = this.elements['userManager:btn_add'];
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
        getObj(row.id)
          .then(response => {
            this.form = response.data;
            this.dialogFormVisible = true;
            this.dialogStatus = 'update';
          });
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            delObj(row.id)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
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
                  title: '成功',
                  message: '创建成功',
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
                title: '成功',
                message: '创建成功',
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
          username: undefined,
          name: undefined,
          sex: '男',
          password: undefined,
          description: undefined
        };
      }
    }
  }
</script>
