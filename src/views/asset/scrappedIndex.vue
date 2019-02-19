<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

      <!--搜索框-->
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;display: inline-table" class="filter-item"
                v-model="mulQuery.keywords" :placeholder="mulQuery.placeholder">
        <el-select v-model="mulQuery.select" @change="searchFieldChange" slot="prepend">
          <el-option label="assetType" value="assetType"></el-option>
          <el-option label="serialNumber" value="serialNumber"></el-option>
          <el-option label="computerModel" value="computerModel"></el-option>
          <el-option label="taggerNumber" value="taggerNumber"></el-option>
        </el-select>
      </el-input>

      <!--搜索按钮-->
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">search</el-button>

      <!--添加按钮-->
      <el-button class="filter-item" v-if="assetManager_btn_add" style="margin-left: 10px;" @click="handleCreate"
                 type="primary" icon="edit">add
      </el-button>

      <el-button class="filter-item"  style="margin-left: 10px;" type="primary" ><a href="http://172.30.1.81:8763/download/contact">下载</a></el-button>

    </div>

    <!--列表-->
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="No" width="65">
        <template scope="scope">
          <span>{{scope.row.assetId}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="computerModel">
        <template scope="scope">
          <span>{{scope.row.computerModel}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="financeCode" width="150">
        <template scope="scope">
          <span>{{scope.row.financeCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="beijingCode" width="150">
        <template scope="scope">
          <span>{{scope.row.beijingCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="serialNumber">
        <template scope="scope">
          <span>{{scope.row.serialNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="assetType">
        <template scope="scope">
          <span>{{scope.row.assetType}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="status">
        <template scope="scope">
          <span v-if="scope.row.assetStatus===0">FREE</span>
          <span v-else-if="scope.row.assetStatus===1">IN USE</span>
          <span v-else>BROKEN</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="taggerNumber">
        <template scope="scope">
          <span>{{scope.row.taggerNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="assetPeople">
        <template scope="scope">
          <span>{{scope.row.assetPeople}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="100" align="center" label="最后更新人">-->
        <!--<template scope="scope">-->
          <!--<span>{{scope.row.updName}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="Operation" width="300">
        <template scope="scope">
          <el-button v-if="assetManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">edit
          </el-button>
          <el-button size="small" type="success" @click="handleRecord(scope.row)">record</el-button>
          <el-button size="small" type="success" @click="handleQrCord(scope.row)">QRCode</el-button>

          <el-button v-if="assetManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">return
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

    <!--创建修改资产共用dialog-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="assetClass">
          <el-select class="filter-item" v-model="form.assetType" placeholder="please select assetType">
            <el-option v-for="item in  assetOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="computerModel" prop="computerModel">
          <el-input v-model="form.computerModel" placeholder="please input computer Model"></el-input>
        </el-form-item>
        <el-form-item label="serialNumber" prop="serialNumber">
          <el-input v-if="dialogStatus == 'create'" v-model="form.serialNumber" placeholder="please input serialNumber"></el-input>
          <el-input v-else v-model="form.serialNumber" placeholder="serialNumber"></el-input>
        </el-form-item>
        <el-form-item label="taggedNumber" prop="taggedNumber">
          <el-input v-if="dialogStatus == 'create'" v-model="form.taggerNumber" placeholder="please input taggerNumber"></el-input>
          <el-input v-else v-model="form.taggerNumber" placeholder="taggerNumber" ></el-input>
        </el-form-item>
        <el-form-item label="financeCode" prop="financeCode">
          <el-input v-if="dialogStatus == 'create'" v-model="form.financeCode" placeholder="please input financeCode"></el-input>
          <el-input v-else v-model="form.financeCode" placeholder="financeCode"></el-input>
        </el-form-item>
        <el-form-item label="beijingCode" prop="beijingCode">
          <el-input v-if="dialogStatus == 'create'" v-model="form.beijingCode" placeholder="please input beijingCode"></el-input>
          <el-input v-else v-model="form.beijingCode" placeholder="beijingCode"></el-input>
        </el-form-item>
        <el-form-item label="assetStatus">
          <el-select class="filter-item" v-model="form.assetStatus" placeholder="please select assetStatus">
            <el-option v-for="item in  assetStatusOptions" :key="item" :label="assetStatusOptionsC[item]" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="描述">-->
          <!--<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容"-->
                    <!--v-model="form.description"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">cancel</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">confirm</el-button>
        <el-button v-else type="primary" @click="update('form')">confire</el-button>
      </div>
    </el-dialog>


    <!--生成二维码对话框-->
    <el-dialog title="edit asset Info" :visible.sync="dialogQrCodeVisible" :close-on-click-modal="false"
               :close-on-press-escape="false">
      <div class="dialogCare">
        <div style="border: 2px solid black;width: 255px;margin-top: 2px;margin-bottom: 2px ">
          <div style="float: left">
            <img src="../../../static/images/others/cpelogo.png" style="width: 26px"/>
            <span style="font-size: 14px"> ASSET DETAILS: </span>
            <p style="margin-top:8px;margin-left: 5px;font-size: 10px;text-align: center;color: black" class="font-6px"><span style="margin-right: 5px; font-weight: bold;font-size: 10px">SN:</span><span style="margin-right: 5px; font-size: 10px;font-weight: bold">{{this.form.serialNumber}}</span></p>
            <p style="margin-left: 5px;font-size: 10px;color: black"><span style="margin-right: 5px; font-weight: bold;font-size: 10px;">TN:</span><span style="margin-right: 5px; font-weight: bold;font-size: 10px;">{{this.form.taggerNumber}}</span></p>
          </div>
          <div>
            <img :src="'http://172.30.1.81:8765/api/asset/employee/qrCode?assetQrcodeAddress='+this.form.assetQrcodeAddress" style="width:83px; height: 83px"/>
          </div>
        </div>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQrCodeVisible = false">cancel</el-button>
        <el-button @click="printBtn()">print</el-button>
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
    putObj,
    getQrCode
  } from 'src/api/asset/asset/index';
  import {mapGetters} from 'vuex';

  var placeholders = {"assetType": "input assetClass","serialNumber": "input serialNumber", "computerModel": "input computerModel","taggerNumber":"input taggerNumber"};
  export default {
    name: 'user',
    data() {
      return {
        form: {
          computerModel: undefined,
          beijingCode: undefined,
          serialNumber: undefined,
          assetType: 'cpu',
          assetStatus: 0,
          assetQrcodeAddress: undefined
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
          assetClass: 2
        },
        assetOptions: ['cpu', 'ldaptop','moniter','phone','avt',
          'server','storage','network switch','work station','it rack','printer','Thin Client','Projector','Fax Machine','others'],
        assetStatusOptions: [0,1,2],
        assetStatusOptionsC:['FREE','IN USE','BROKEN'],
        dialogFormVisible: false,
        dialogStatus: '',
        userManager_btn_edit: false,
        userManager_btn_del: false,
        userManager_btn_add: false,
        textMap: {
          update: 'Update ',
          create: 'Create'
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
      this.assetManager_btn_edit = this.elements['assetManager:btn_edit'];
      this.assetManager_btn_del = this.elements['assetManager:btn_del'];
      this.assetManager_btn_add = this.elements['assetManager:btn_add'];
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
        this.listQuery={}
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
        getObj(row.assetId)
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
            serialNumber: row.serialNumber
          },
        })
      },
      handleQrCord(row){
        getQrCode(row.assetId)
          .then(response=>{
            this.form=response.data;
            this.dialogQrCodeVisible=true;
          })


      },
      handleDelete(row) {
        this.$confirm('This data will be deleted.Do you want to continue?', 'reminder', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
          .then(() => {
            var assetClas=""
            if(row.financeCode===undefined){
              assetClas=1;
            }else {
              assetClas=0;
            }

            putObj(row.assetId,{assetId:row.assetId,assetClass: assetClas})
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
          computerModel: undefined,
          beijingCode: undefined,
          serialNumber: undefined,
          assetType: 'cpu',
          assetStatus: 0,
          assetQrcodeAddress: undefined
        };
      },

      //搜索字段发生变化触发的方法
      searchFieldChange(val) {
        this.mulQuery.placeholder = placeholders[val];
        console.log(`搜索字段： ${val} `);
      },

      printBtn() {
        let newstr = document.getElementsByClassName('dialogCare')[0].innerHTML;
        console.log(newstr)
        window.document.body.innerHTML = newstr;
        let oldstr = window.document.body.innerHTML;
        window.print();
        window.location.reload();   //解决打印之后按钮失效的问题
        window.document.body.innerHTML = oldstr;
        return false;
      },
    }
  }
</script>
<style lang="scss">
  .font-6px{
    transform: scale(0.8);
    font-size: 12px;
  }
</style>
