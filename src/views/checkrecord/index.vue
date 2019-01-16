<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

      <!--搜索框-->
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;display: inline-table" class="filter-item"
                v-model="mulQuery.keywords" :placeholder="mulQuery.placeholder">
        <el-select v-model="mulQuery.select" @change="searchFieldChange" slot="prepend">
          <el-option label="submitPeople" value="submitPeople"></el-option>
          <el-option label="serialNumber" value="serialNumber"></el-option>
          <el-option label="class" value="assetType"></el-option>
          <el-option label="isSolved" value="isSolved"></el-option>
        </el-select>
      </el-input>

      <!--搜索按钮-->
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    </div>

    <!--列表-->
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="serialNumber">
        <template scope="scope">
          <span>{{scope.row.serialNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="submitInfo">
        <template scope="scope">
          <span>{{scope.row.submitInfo}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="submitPeople">
        <template scope="scope">
          <span>{{scope.row.submitPeople}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="submitDate">
        <template scope="scope">
          <span>{{scope.row.submitDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="roomNum">
        <template scope="scope">
          <span>{{scope.row.roomNum}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="submitType">
        <template scope="scope">
          <span v-if="scope.row.submitType===0">Error</span>
          <span v-else>Confire</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="isSolved">
        <template scope="scope">
          <span v-if="scope.row.isSolved===0">No</span>
          <span v-else="scope.row.isSolved===1">Yes</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button v-if="checkManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">解决
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页脚-->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    // page   addObj   getObj delObj putObj
    // 分页查询 添加asset 获取    删除   局部修改
    page,
    getObj,
    putObj,
  } from 'src/api/asset/shencha/index';
  import {mapGetters} from 'vuex';

  var placeholders = { "serialNumber": "请输入资产编号","submitPeople": "请输入提交人","assetType": "请输入类型","isSolved": "请输入isSolved",};

  export default {
    name: 'user',
    data() {
      return {
        form: {
          computerModel: undefined,
          beijingCode: undefined,
          serialNumber: undefined,
          assetType: 'cpu',
          assetQrcodeAddress: undefined
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
        },
        dialogFormVisible: false,
        dialogStatus: '',
        errorManager_btn_edit: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,

        // Multiconditional query
        mulQuery: {
          placeholder: placeholders["assetType"],
          select: 'assetName', //搜索框的搜索字段,
          keywords: ''
        },

        dialogQrCodeVisible: false, //编辑对话框的显示状态 改为生成二维码的dialog

      }
    },
    created() {
      this.getList();
      this.checkManager_btn_edit = this.elements['checkManager:btn_edit'];
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {
      getList() {
        this.listLoading = true;
        if (this.mulQuery.keywords !== "") {
          this.listQuery[this.mulQuery.select] = this.mulQuery.keywords;
        }
        page(this.listQuery)
          .then(response => {
            this.list = response.data.rows;
            this.total = response.data.total;
            this.listLoading = false;
          })
      },
      handleFilter() {
        this.listQuery = {}
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

      //搜索字段发生变化触发的方法
      searchFieldChange(val) {
        this.mulQuery.placeholder = placeholders[val];
        console.log(`搜索字段： ${val} `);
      },
    }
  }
</script>
