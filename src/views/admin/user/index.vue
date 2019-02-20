<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="name or account" v-model="listQuery.name"> </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
    <el-button class="filter-item"  v-if="userManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">Add</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="No" width="65"> <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template> </el-table-column>
      <el-table-column width="200" align="center" label="userName"> <template scope="scope">
        <span>{{scope.row.name}}</span>
      </template> </el-table-column>
    <el-table-column width="110" align="center" label="account"> <template scope="scope">
            <span>{{scope.row.username}}</span>
          </template> </el-table-column>
    <el-table-column width="110" align="center" label="genders"> <template scope="scope">
            <span>{{scope.row.sex}}</span>
          </template> </el-table-column>
    <el-table-column width="300" align="center" label="remarks"> <template scope="scope">
            <span>{{scope.row.description}}</span>
          </template> </el-table-column>
    <el-table-column width="180" align="center" label="final time"> <template scope="scope">
          <span>{{scope.row.updTime}}</span>
        </template> </el-table-column>
    <el-table-column width="200" align="center" label="last reviser"> <template scope="scope">
            <span>{{scope.row.updName}}</span>
          </template> </el-table-column>
    <el-table-column align="center" label="opertion" width="150"> <template scope="scope">
        <el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">Edit
        </el-button>
        <el-button v-if="userManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">Delete
        </el-button>
      </template> </el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="userName" prop="name">
        <el-input v-model="form.name" placeholder="Please input userName"></el-input>
      </el-form-item>
      <el-form-item label="account" prop="username">
        <el-input v-if="dialogStatus == 'create'" v-model="form.username" placeholder="Please input account"></el-input>
        <el-input v-else v-model="form.username" placeholder="Please input account" readonly></el-input>
      </el-form-item>
      <el-form-item v-if="dialogStatus == 'create'" label="password" placeholder="Please input password" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="genders">
        <el-select class="filter-item" v-model="form.sex" placeholder="Please Select">
          <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="description">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="Please input contents" v-model="form.description"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">Cancel</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">Confirm</el-button>
      <el-button v-else type="primary" @click="update('form')">Confirm</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from 'api/admin/user/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    return {
      form: {
        username: undefined,
        name: undefined,
        sex: 'male',
        password: undefined,
        description: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input userName',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: 'The length is between 5 and 20 characters',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: 'Please input account',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: 'The length is between 5 and 20 characters',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: 'The length is between 5 and 20 characters',
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
        name: undefined
      },
      sexOptions: ['male', 'female'],
      dialogFormVisible: false,
      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: 'update',
        create: 'create'
      },
      tableKey: 0
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
      this.$confirm('The data will be deleted.Do you want to continue?', 'reminder', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: 'Delete',
                message: 'Successful delete',
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
                title: 'Create',
                message: 'Successful create',
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
              message: 'Successful update',
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
        sex: 'male',
        password: undefined,
        description: undefined
      };
    }
  }
}
</script>
