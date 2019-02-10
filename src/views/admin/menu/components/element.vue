<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="resource name" v-model="listQuery.name"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">Search</el-button>
      <el-button class="filter-item" v-if="menuManager_btn_element_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">Add</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="id" width="65">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" label="resourceCode"><template scope="scope">
  <span>
    {{scope.row.code}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" label="resourceType"><template scope="scope">
  <span>
    {{scope.row.type}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" label="resourceName"><template scope="scope">
  <span>
    {{scope.row.name}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" label="resourceAddress"><template scope="scope">
  <span>
    {{scope.row.uri}}</span>
</template>
</el-table-column>
    <el-table-column width="200px" align="center" label="requestType"><template scope="scope">
  <span>
    {{scope.row.method}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" label="description"><template scope="scope">
  <span>
    {{scope.row.description}}</span>
</template>

</el-table-column>
    <el-table-column fixed="right" align="center" label="operation" width="150"><template scope="scope">
  <el-button v-if="menuManager_btn_element_edit" size="small" type="success" @click="handleUpdate(scope.row)">
    Edit
  </el-button>
  <el-button v-if="menuManager_btn_element_del" size="small" type="danger" @click="handleDelete(scope.row)">Delete
  </el-button>
</template>

</el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="140px">
      <el-form-item label="resourceCode" prop="code">
        <el-input v-model="form.code" placeholder="Please input resource code"></el-input>
      </el-form-item>
      <el-form-item label="resourceType" prop="type">
         <el-select class="filter-item" v-model="form.type" placeholder="resource type">
          <el-option v-for="item in  typeOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="resourceName" prop="name">
        <el-input v-model="form.name" placeholder="Please input resource name"></el-input>
      </el-form-item>
      <el-form-item label="resourceAddress" prop="uri">
        <el-input v-model="form.uri" placeholder="Please input resource address"></el-input>
      </el-form-item>
      <el-form-item label="requestType" prop="method">
        <el-select class="filter-item" v-model="form.method" placeholder="resource request type">
          <el-option v-for="item in  methodOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
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
} from 'api/admin/element/index';
import { mapGetters } from 'vuex';
export default {
  name: 'element',
  // props: {
  //   menuId: {
  //     default: '1'
  //   }
  // },
  data() {
    return {
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      typeOptions: ['uri', 'button'],
      form: {
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      },
      rules: {
        code: [{
          required: true,
          message: 'Please input resource code',
          trigger: 'blur'
        }
        ],
        type: [{
          required: true,
          message: 'Please input resource type',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: 'The length is between 2 and 20 characters',
          trigger: 'blur'
        }
        ],
        name: [{
          required: true,
          message: 'Please input resource name',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: 'The length is between 2 and 20 characters',
          trigger: 'blur'
        }
        ],
        uri: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: 'The length is between 2 and 20 characters',
          trigger: 'blur'
        }
        ],
        method: [{
          required: true,
          message: 'Please input resource request type',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: 'The length is between 2 and 20 characters',
          trigger: 'blur'
        }
        ],
        description: [{
          required: true,
          message: 'Please input',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: 'The length is between 2 and 20 characters',
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
        menuId: this.menuId
      },
      dialogFormVisible: false,
      dialogStatus: '',
      menuManager_btn_element_add: false,
      menuManager_btn_element_edit: false,
      menuManager_btn_element_del: false,
      menuId: -1,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      tableKey: 0
    }
  },
  created() {
    this.getList();
    this.menuManager_btn_element_add = this.elements['menuManager:btn_element_add'];
    this.menuManager_btn_element_del = this.elements['menuManager:btn_element_del'];
    this.menuManager_btn_element_edit = this.elements['menuManager:btn_element_edit'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.menuId = this.menuId;
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
      this.form.menuId = this.menuId;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: 'Create',
              message: 'Successful Create',
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
      const set = this.$refs;
      set[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      this.form.menuId = this.menuId;
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
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      };
    }
  }
}
</script>
