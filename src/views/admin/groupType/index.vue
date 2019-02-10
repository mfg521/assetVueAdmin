<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="Type of name" v-model="listQuery.name"> </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
    <el-button class="filter-item" v-if="groupTypeManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">Add</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="id" width="65"> <template scope="scope">
                  <span>
                    {{scope.row.id}}
                  </span>
</template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="code(编码)">
<template scope="scope">
<span>{{scope.row.code}}</span>
</template>

    </el-table-column>
        <el-table-column width="200px" align="center" label="typeName"><template scope="scope">
  <span>
                {{scope.row.name}}</span>
</template>

    </el-table-column>
    <el-table-column width="200px" align="center" label="description">
<template scope="scope">
<span>
                {{scope.row.description}}
              </span>
</template>

    </el-table-column>
        <el-table-column width="200px" align="center" label="updateTime"><template scope="scope">
  <span>
                {{scope.row.updTime}}</span>
</template>

    </el-table-column>
        <el-table-column width="200px" align="center" label="updateTime"><template scope="scope">
  <span>
                {{scope.row.updName}}</span>
</template>

    </el-table-column>
        <el-table-column width="200px" align="center" label="updateHost"><template scope="scope">
  <span>
                {{scope.row.updHost}}</span>
</template>

    </el-table-column>
    <el-table-column align="center" label="operatoin" width="150"><template scope="scope">
  <el-button v-if="groupTypeManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">
    Edit
  </el-button>
  <el-button v-if="groupTypeManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">Delete
  </el-button>
</template>
    </el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="编码(code)" prop="code">
        <el-input v-model="form.code" placeholder="Please input code"></el-input>
      </el-form-item>
      <el-form-item label="typeName" prop="name">
        <el-input v-model="form.name" placeholder="Please input typeName"></el-input>
      </el-form-item>
      <el-form-item label="description" prop="description">
        <el-input v-model="form.description" placeholder="Please input description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">Cancel</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">Create</el-button>
      <el-button v-else type="primary" @click="update('form')">Update</el-button>
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
} from 'api/admin/groupType/index';
import { mapGetters } from 'vuex';
export default {
  name: 'groupType',
  data() {
    return {
      form: {
        code: undefined,
        name: undefined,
        description: undefined
      },
      rules: {
        code: [{
          required: true,
          message: '请输入编码',
          trigger: 'blur'
        }, {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入类型名称',
          trigger: 'blur'
        }, {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入描述',
          trigger: 'blur'
        }, {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      groupTypeManager_btn_edit: false,
      groupTypeManager_btn_del: false,
      groupTypeManager_btn_add: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      tableKey: 0
    }
  },
  created() {
    this.getList();
    this.groupTypeManager_btn_edit = this.elements['groupTypeManager:btn_edit'];
    this.groupTypeManager_btn_del = this.elements['groupTypeManager:btn_del'];
    this.groupTypeManager_btn_add = this.elements['groupTypeManager:btn_add'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
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
      getObj(row.id).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
      });
    },
    handleDelete(row) {
      this.$confirm('This data will be permanently deleted, Are you sure to continue', 'reminder', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: 'Delete',
            message: 'Successful Delete',
            type: 'success',
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      });
    },
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: 'Create',
              message: 'Successful Created',
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
              message: 'Successful Update',
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
