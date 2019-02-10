<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
     <el-button-group>
    <el-button type="primary" v-if="menuManager_btn_add" icon="plus" @click="handlerAdd">Add</el-button>
    <el-button type="primary" v-if="menuManager_btn_edit" icon="edit" @click="handlerEdit">Edit</el-button>
    <el-button type="primary" v-if="menuManager_btn_del" icon="delete" @click="handleDelete">Delete</el-button>
  </el-button-group>
  </div>

<el-row>
  <el-col :span="8" style='margin-top:15px;'>
    <el-input
      placeholder="Please input keyword for filtering"
      v-model="filterText">
    </el-input>
    <el-tree
      class="filter-tree"
      :data="treeData"
      node-key="id"
      highlight-current
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="menuTree"
      @node-click="getNodeData"
      default-expand-all
      >
    </el-tree>
  </el-col>
  <el-col :span="16" style='margin-top:15px;'>
     <el-card class="box-card">
    <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
      <el-form-item label="pathCode" prop="code">
          <el-input v-model="form.code" :disabled="formEdit" placeholder="Please input pathCode"></el-input>
      </el-form-item>
          <el-form-item label="title" prop="title">
          <el-input v-model="form.title" :disabled="formEdit"  placeholder="Please input title"></el-input>
      </el-form-item>
          <el-form-item label="parentId" prop="parentId">
          <el-input v-model="form.parentId" :disabled="formEdit" placeholder="please input parentId" readonly></el-input>
      </el-form-item>
      <el-form-item label="icon" prop="icon">
          <el-input v-model="form.icon" :disabled="formEdit" placeholder="Please input icon"></el-input>
      </el-form-item>
          <el-form-item label="srcPath" prop="href">
          <el-input v-model="form.href" :disabled="formEdit" placeholder="Please input resourcePath"></el-input>
      </el-form-item>
      <el-form-item label="type" prop="type">
         <el-select class="filter-item" v-model="form.type"  :disabled="formEdit"  placeholder="Please input the resource request type">
          <el-option v-for="item in  typeOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="sort" prop="orderNum">
          <el-input v-model="form.orderNum" :disabled="formEdit" placeholder="Please input sort order"></el-input>
      </el-form-item>
      <el-form-item label="description"   prop="description">
          <el-input v-model="form.description" :disabled="formEdit" placeholder="Please input description"></el-input>
      </el-form-item>
       <el-form-item label="component"   prop="attr1">
          <el-input v-model="form.attr1" :disabled="formEdit" placeholder="Please input component description"></el-input>
      </el-form-item>
       <el-form-item v-if="formStatus == 'update'">
        <el-button type="primary" @click="update">Update</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
      <el-form-item v-if="formStatus == 'create'">
        <el-button type="primary" @click="create">Save</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
     </el-card>
    <el-card class="box-card">
        <span>Button or resource</span>
      <menu-element :menuId='currentId' ref="menuElement"></menu-element>
    </el-card>
  </el-col>
</el-row>
  </div>
</template>

<script>
import {
  fetchTree, getObj, addObj, delObj, putObj
} from 'api/admin/menu/index';
import { mapGetters } from 'vuex';
export default {
  name: 'menu',
  components: {
    'menu-element': () => import('./components/element')
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['menu', 'dirt'],
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined
      },
      currentId: -1,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.menuManager_btn_add = this.elements['menuManager:btn_add'];
    this.menuManager_btn_del = this.elements['menuManager:btn_del'];
    this.menuManager_btn_edit = this.elements['menuManager:btn_edit'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      fetchTree(this.listQuery).then(data => {
        this.treeData = data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update';
      }
      getObj(data.id).then(response => {
        this.form = response.data;
      });
      this.currentId = data.id;
      this.showElement = true;
      this.$refs.menuElement.menuId = data.id;
      this.$refs.menuElement.getList();
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
      }
    },
    handlerAdd() {
      this.resetForm();
      this.formEdit = false;
      this.formStatus = 'create';
    },
    handleDelete() {
      this.$confirm('This data will be permanently deleted, Are you sure to continue', 'reminder', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList();
          this.resetForm();
          this.onCancel();
          this.$notify({
            title: 'Delete',
            message: 'Successfully delete',
            type: 'success',
            duration: 2000
          });
        });
      });
    },
    update() {
      putObj(this.form.id, this.form).then(() => {
        this.getList();
        this.$notify({
          title: 'Updated',
          message: 'Successfully updated',
          type: 'success',
          duration: 2000
        });
      });
    },
    create() {
      addObj(this.form).then(() => {
        this.getList();
        this.$notify({
          title: 'Created',
          message: 'Successfully created',
          type: 'success',
          duration: 2000
        });
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = '';
    },
    resetForm() {
      this.form = {
        code: undefined,
        title: undefined,
        parentId: this.currentId,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined
      };
    }
  }
}
</script>

