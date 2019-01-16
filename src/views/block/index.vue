<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!--搜索框-->
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="employeeName"
                v-model="listQuery.employeeName"></el-input>
      <!--搜索按钮-->
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">search</el-button>

      <!--添加按钮-->
      <el-button class="filter-item" v-if="blockManager_btn_add" style="margin-left: 10px;" @click="handleCreate"
                 type="primary" icon="edit">add
      </el-button>
    </div>

    <!--列表-->
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="no" width="60">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="roomNum">
        <template scope="scope">
          <span>{{scope.row.roomNum}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="blockComment">
        <template scope="scope">
          <span>{{scope.row.blockComment}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="lineNum">
        <template scope="scope">
          <span>{{scope.row.lineNum}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="totalSize">
        <template scope="scope">
          <span>{{scope.row.totalSize}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="mLeft">
        <template scope="scope">
          <span>{{scope.row.mleft}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="mTop">
        <template scope="scope">
          <span>{{scope.row.mtop}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="mWidth">
        <template scope="scope">
          <span>{{scope.row.mwidth}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="mHeight">
        <template scope="scope">
          <span>{{scope.row.mheight}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="intervalHeight">
        <template scope="scope">
          <span>{{scope.row.intervalHeight}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="intervalWidth">
        <template scope="scope">
          <span>{{scope.row.intervalWidth}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operator" width="250">
        <template scope="scope">
          <el-button v-if="blockManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="blockManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--分页-->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

    <!--创建修改新区域dialog-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="roomNum" prop="roomNum">
          <el-input v-if="dialogStatus == 'create'" v-model="form.roomNum" placeholder="input roomNum"></el-input>
          <el-input v-else v-model="form.roomNum" placeholder="input roomNum"></el-input>
        </el-form-item>
        <el-form-item label="blockComment" prop="blockComment">
          <el-input v-if="dialogStatus == 'create'" v-model="form.blockComment" placeholder="input blockComment"></el-input>
          <el-input v-else v-model="form.blockComment" placeholder="input blockComment" ></el-input>
        </el-form-item>
        <el-form-item label="lineNum" prop="lineNum">
          <el-input v-if="dialogStatus == 'create'" v-model="form.lineNum" placeholder="input lineNum"></el-input>
          <el-input v-else v-model="form.lineNum" placeholder="input lineNum" ></el-input>
        </el-form-item>
        <el-form-item label="totalSize" prop="totalSize">
          <el-input v-if="dialogStatus == 'create'" v-model="form.totalSize" placeholder="input lineNum"></el-input>
          <el-input v-else v-model="form.totalSize" placeholder="input lineNum" ></el-input>
        </el-form-item>
        <el-form-item label="mLeft" prop="mLeft">
          <el-input v-if="dialogStatus == 'create'" v-model="form.mleft" placeholder="input left"></el-input>
          <el-input v-else v-model="form.mleft" placeholder="input left" ></el-input>
        </el-form-item>
        <el-form-item label="mTop" prop="mTop">
          <el-input v-if="dialogStatus == 'create'" v-model="form.mtop" placeholder="input top"></el-input>
          <el-input v-else v-model="form.mtop" placeholder="input top" ></el-input>
        </el-form-item>
        <el-form-item label="mWidth" prop="mWidth">
          <el-input v-if="dialogStatus == 'create'" v-model="form.mwidth" placeholder="input width"></el-input>
          <el-input v-else v-model="form.mwidth" placeholder="input width" ></el-input>
        </el-form-item>
        <el-form-item label="mHeight" prop="mHeight">
          <el-input v-if="dialogStatus == 'create'" v-model="form.mheight" placeholder="input height"></el-input>
          <el-input v-else v-model="form.mheight" placeholder="input height" ></el-input>
        </el-form-item>
        <el-form-item label="intervalHeight" prop="intervalHeight">
          <el-input v-if="dialogStatus == 'create'" v-model="form.intervalHeight" placeholder="input intervalHeight"></el-input>
          <el-input v-else v-model="form.intervalHeight" placeholder="input intervalHeight" ></el-input>
        </el-form-item>
        <el-form-item label="intervalWidth" prop="intervalWidth">
          <el-input v-if="dialogStatus == 'create'" v-model="form.intervalWidth" placeholder="input intervalWidth"></el-input>
          <el-input v-else v-model="form.intervalWidth" placeholder="input intervalWidth" ></el-input>
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
  } from 'src/api/asset/block/index';
  import {mapGetters} from 'vuex';

  export default {
    name: 'user',
    data() {
      return {
        form: {
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
          employeeName: undefined
        },
        sexOptions: ['one', 'two'],
        employeeClassOptions: ['北京直招', '人力直招','GES','业务外包','项目伙伴'],
        dialogFormVisible: false,
        dialogStatus: '',
        blockManager_btn_edit: false,
        blockManager_btn_edit: false,
        blockManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        imageUrl: ''
      }
    },
    created() {
      this.getList();
      this.blockManager_btn_edit = this.elements['blockManager:btn_edit'];
      this.blockManager_btn_del = this.elements['blockManager:btn_del'];
      this.blockManager_btn_add = this.elements['blockManager:btn_add'];
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

      handleRecord(row) {
        this.$router.push({
          name: 'record',
          params: {
            employeeId: row.employeeId
          },
        })
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
        };
      },
    }
  }
</script>

<style>

</style>
