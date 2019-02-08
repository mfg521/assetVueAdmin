<template>
  <div class="ivu-layout" style="width: 100%; height: 100%; flex: 0 1 auto; ">

    <div class="ivu-layout-content" style="height: 92%">

      <!--背景图片将每个用户对应到具体的位置 index rowNum indexs lineNum-->
      <div class="node" :style="{background: 'url(' + './static/images/rooms/'+floor6.employeeBlocks.roomNum+'.png' + ')' +'0% 0% / 100%' + 'no-repeat'}">
        <div v-for="(employeeBlock,indexBlock) in floor6.employeeBlocks.employeeBlockVoList" :key="index">
          <div v-for="(employees,index) in employeeBlock.employee" :key="index">

            <!--将生成好的employeeBlocks进行渲染-->
            <div v-for="(employe,indexs)  in employees" :key="indexs"
                  :style="{left : employeeBlock.block.intervalWidth*indexs+employeeBlock.block.mleft*1+'%',
                                           top : employeeBlock.block.intervalHeight*index+employeeBlock.block.mtop*1+'%',
                                           width: employeeBlock.block.mwidth*1+'%',height:employeeBlock.block.mheight*1+'%'}"
                 :class=" index+' drag-div ' +indexs +' '+ employeeBlock.block.id" @drop='drop($event)' @dragover='allowDrop($event)'
                 @click="clickOnes(employe,$event)">

              <!--如果当前位置有员工-->
              <div v-if="employe.employeeName!==undefined" draggable="true" class="select-item"
                   @dragstart="drag($event,employe)">
                <img :src="'http://172.30.1.81:8765/api/asset/employee/employeeUrl?employeeUrl='+employe.employeeUrl"
                     :onerror="defaultImg" style="width: 100%;height: 100%">
              </div>

            </div>
          </div>
        </div>
      </div>

      <!--右边两个匡-->
      <div class="showInfo">
        <!--展示用户详细信息-->
        <div class="showImployeeInfo" x-placement="bottom">
          <div class="ivu-tooltip-inner" style="max-width: none">
            <div style=" text-align: center; width: auto;height: auto">
              <!--<img src="../../../static/images/default.png">-->
              <img
                :src="'http://172.30.1.81:8765/api/asset/employee/employeeUrl?employeeUrl='+CurentEmployee.employeeUrl"
                :onerror="defaultImg" style="width: 35%; height: 35%; border-radius: 50%;">
              <p style="margin-bottom: 2%;">
                <span v-if="CurentEmployee.employeeName!==undefined" style="font-weight: bold;"
                      @click="employeeDialog.dialogFormVisible = true">name:{{CurentEmployee.employeeName}}<el-button
                  type="info">Change Emoloyee</el-button></span>

                <span v-else @click="employeeDialog.dialogFormVisible = true">No Employee<el-button
                  type="info">Add new</el-button></span>

              </p>
              <div style="text-align: left;">
                <p style="margin: 0"><span style="margin-right: 5%; font-weight: bold;">department</span>{{CurentEmployee.department}}
                </p>
                <p style="margin: 0"><span style="margin-right: 5%; font-weight: bold;">email_address</span>{{CurentEmployee.emailAddress}}
                </p>
                <p style="margin: 0"><span style="margin-right: 5%; font-weight: bold;">internal_no</span>{{CurentEmployee.internalNo}}
                </p>
                <p style="margin: 0"><span style="margin-right: 5%; font-weight: bold;">dubai_no</span>{{CurentEmployee.dubaiNo}}
                </p>
                <!--<p style="margin: 0"><span-->
                <!--style="margin-right: 5%; margin-top: 5%;font-weight: bold;">Company Details</span></p>-->

                <hr style="color: black"/>
                <p style="margin: 0"><span style="margin-right:5%; font-weight: bold;">Asset Info:</span></p>
              </div>
              <div>
                <a class="guide_item"><i class="iconfont icon-zhuji" @click="clickForAssetInfo('cpu')"></i></a>
                <a class="guide_item"><i class="iconfont icon-computer" @click="clickForAssetInfo('mon')"></i></a>
                <a class="guide_item"><i class="iconfont icon-laptop" @click="clickForAssetInfo('laptop')"></i></a>
                <a class="guide_item"><i class="iconfont icon-telephone2" @click="clickForAssetInfo('phone')"></i></a>
              </div>
            </div>
          </div>
        </div>

        <!--展示资产详细信息-->
        <div class="showAssetInfo" x-placement="bottom">
          <div class="ivu-tooltip-inner" style="max-width: none">
            <div v-if=" this.CurentAseet !== '' " style="text-align: center; width: auto">
              <div style="text-align: left; width: 80%;float: left ">
                <span style="font-weight: bold; clear: both;font-size: 15px">Record Details:</span>
                <hr style="color: black;margin-bottom: 5px;margin-top: 5px"/>
                <p style="margin: 0"><span style="margin-right: 10%; font-weight: bold;">Serial Number</span>{{CurentAseet.serialNumber}}
                </p>
                <p style="margin: 0"><span style="margin-right: 10%; font-weight: bold;">BorrowedDate</span>{{CurentAseet.borrowedDate}}
                </p>
                <!--<p style="margin: 0"><span style="margin-right: 10%; font-weight: bold;">beijing Code</span>{{CurentAseet.beijingCode}}</p>-->
                <!--<p style="margin: 0"><span style="margin-right: 10%; font-weight: bold;">FN Code</span>{{CurentAseet.financeCode}}</p>-->

              </div>
              <div style="width: 20%;float: left;height: auto">
                <a class="guide_item"><i class="iconfont icon-angle-right"></i></a>
              </div>

              <div style="margin-top: 0.5rem;margin-bottom: 0.5rem;clear: both">
                  <span @click="dialog.dialogFormVisible = true"><el-button
                    type="info">Change Another</el-button></span>
                <span @click="returnConfirms"><el-button type="warning">Remove</el-button></span>
              </div>
            </div>
            <div v-else>
              <div>
                <span v-if="this.assetType==='cpu'">NO CPU ASSET</span>
                <span v-else-if="this.assetType==='mon'">No MONITER ASSET</span>
                <span v-else-if="this.assetType==='laptop'">No LAPTOP ASSET</span>
                <span v-else="this.assetType==='phone'">No PHONE ASSET</span>
                <span @click="dialog.dialogFormVisible = true"><el-button type="info">Add new</el-button></span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!--新增修改dialog -->
      <el-dialog :title="dialog.dialogTitle" :visible.sync="dialog.dialogFormVisible">
        <el-form :model="changeAssetForm" ref="recordForm" label-width="100px">

          <el-form-item label="serialNumber" prop="serialNumber">
            <el-input v-model="changeAssetForm.serialNumber"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>

      <!--新增employee dialog     -->
      <el-dialog :title="employeeDialog.dialogTitle" :visible.sync="employeeDialog.dialogFormVisible">
        <el-form :model="changeEmployeeForm" ref="recordForm" label-width="100px">
          <el-form-item label="employeeNum" prop="employeeNum">
            <el-input v-model="changeEmployeeForm.employeeNum"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="employeeDialog.dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEmployee">确 定</el-button>
        </div>
      </el-dialog>

    </div>


  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import {mapState} from 'vuex'
  import {getAssetInfo, returnAsset, changeAsset} from "../../api/asset/record";
  import {changeEmpByDrop, changeOrSaveEmpBlock} from "../../api/asset/employee";

  let dom = '';
  export default {
    data() {
      return {
        employeeDialog: {
          dialogEdit: false,
          dialogTitle: '修改员工信息',
          dialogFormVisible: false
        },

        dialog: {
          dialogEdit: false,
          dialogTitle: '修改资产信息',
          dialogFormVisible: false
        },

        changeEmployeeForm: {
          employeeNum: '',
          currentEmployeeNum: '',
        },

        changeAssetForm: {
          curentSerialNumber: '',
          serialNumber: '',
          employeeUuid: '',
          assetType: ''
        },
        CurrentEmployeeUUID: '',
        CurentAseet: '',
        CurentEmployee: {},
        assetType: '',
        defaultImg: 'this.src="' + require('../../../static/images/default.png') + '"'

      }
    },

    methods: {

      //点击每一个位置来显示右边的匡
      clickOnes(employee, event) {    //
        this.CurentAseet = ''
        this.CurentEmployee = employee;
        //说明是增加
        if (this.CurentEmployee.employeeName === undefined) {
          var xindex = event.srcElement.classList[0]
          var yindex = ''
          var blockId = ''

          //分别处理xindex和yindex是否相同的两种情况
          if (event.srcElement.classList.length === 4) {
            yindex = event.srcElement.classList[2]
            blockId= event.srcElement.classList[3]
          } else {
            yindex = xindex
            blockId= event.srcElement.classList[2]
          }
          this.changeEmployeeForm.xindex = xindex
          this.changeEmployeeForm.yindex = yindex
          this.changeEmployeeForm.blockId = blockId

          //说明是修改
        } else {
          var xindex = event.srcElement.parentElement.parentElement.classList[0]
          var yindex = ''
          var blockId = ''
          if (event.srcElement.parentElement.parentElement.classList.length === 4) {
            yindex = event.srcElement.parentElement.parentElement.classList[2]
            blockId= event.srcElement.parentElement.parentElement.classList[3]
          } else {
            yindex = xindex
            blockId= event.srcElement.parentElement.parentElement.classList[2]
          }
          this.changeEmployeeForm.xindex = xindex
          this.changeEmployeeForm.yindex = yindex
          this.changeEmployeeForm.blockId = blockId
        }
      },

      //根据用户编号和用户的资产号码获取用户对应资产的详细信息
      async clickForAssetInfo(assetType) {
        console.log(assetType)
        this.CurentAseet = ''
        this.assetType = assetType;
        const employeeUuid = this.CurentEmployee.employeeUuid
        const asset = await getAssetInfo({employeeUuid, assetType});
        if (asset.length > 0) {
          this.CurentAseet = asset[0]
          console.log(this.CurentAseet)
        }
      },

      //归还资产
      async returnConfirms() {
        const result = confirm("confirm to Remove Asset?")
        console.log(result)
        if (result) {
          const employeeUuid = this.CurentEmployee.employeeUuid
          const serialNumber = this.CurentAseet.serialNumber
          console.log(serialNumber)
          const result = await returnAsset({employeeUuid, serialNumber});
          console.log(result)
          if (result.code === 0) {
            this.CurentAseet = ''
            this.clickForAssetInfo(this.assetType)

          }

        }
      },

      //增加或者编辑资产进行保存
      async save() {
        console.log(this.form)
        this.changeAssetForm.employeeUuid = this.CurentEmployee.employeeUuid
        this.changeAssetForm.assetType = this.assetType
        this.changeAssetForm.curentSerialNumber = this.CurentAseet.serialNumber
        var changeOrSaveAsset = this.changeAssetForm
        const result = await changeAsset(changeOrSaveAsset)
        if (result.code === 0) {
          this.dialog.dialogFormVisible = false;
          this.$message.success(result.errmsg);
          this.clickForAssetInfo(this.assetType)
        } else {
          this.$message.error(result.errmsg);
        }
      },

      saveEmployee: async function () {
        this.changeEmployeeForm.currentEmployeeNum = this.CurentEmployee.employeeUuid
        const employeeVo = this.changeEmployeeForm
        const result = await changeOrSaveEmpBlock(employeeVo)
        if (result.code === 0) {
          this.$message.success("Change Or Save Employee successfully!");
          this.$store.dispatch('getEmployeeBlock', {roomNum:this.floor6.employeeBlocks.roomNum})
          this.employeeDialog.dialogFormVisible = false

        } else {
          this.$message.error("System Wrong,please try later")
        }


      },

      //进行div拖拽Begin
      //进行拖拽开始
      drag(event, employe) {
        dom = event.currentTarget;
        this.CurrentEmployeeUUID = employe.employeeUuid
      },

      //放下div执行的方法
      async drop(event) {
        //preventDefault方法是阻止元素发生的默认的行为（例如，当点击提交按钮是阻止对表单的提交）
        event.preventDefault()
        const conf = confirm("Are you sure to move here")
        if (conf) {
          if (event.srcElement.className != 'select-item') {
            var xindex = event.srcElement.classList[0]       //要移到的座位坐标，xindex,yindex
            var yindex = ''
            var blockId= ''
            //为了防止xindex和yindex类名一致而只有一个
            if (event.srcElement.classList.length === 4) {
              yindex = event.srcElement.classList[2]
              blockId = event.srcElement.classList[3]
            } else {
              yindex = xindex
              blockId = event.srcElement.classList[2]
            }
            var employeeUuid = this.CurrentEmployeeUUID
            const result = await changeEmpByDrop({employeeUuid, xindex, yindex,blockId})
            if (result.code === 0) {
              event.target.appendChild(dom);
            } else {
              this.$message.error(result.errmsg)
            }

          } else {
            this.$message.error("The seats have been taken")
          }
        } else {
          this.$message.error("Canceled")
        }
      },

      allowDrop(event) {
        event.preventDefault();
      }
      //进行div拖拽End
    },

    computed: {
      //从state中取到employee和room employee [[{},{}],[{},{}],]
      ...mapState(['floor6'])
    },

    async mounted() {

      //当扫描二维码或者查看位置的时候运行此方法，直接通过房间点击进来不会执行
      //给指定div设置颜色 xindex yindex div的坐标
      var xindex = this.$route.params.xindex
      var yindex = this.$route.params.yindex
      if (xindex !== undefined && yindex !== undefined) {
        setTimeout(function () {
          var e
          if (xindex < yindex) {
            e = document.getElementsByClassName(xindex + " drag-div " + yindex)[0].children
          } else {
            e = document.getElementsByClassName(xindex + " drag-div " + yindex)[1].children
          }
          e[0].style.backgroundColor = "red"
        }, 2000)
      }
    },

    components: {
      draggable
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .node {
    width 63%
    padding-bottom 60%
    /*background: url("../../../pages/rooms/6FloorRooms/images/621-622.png") no-repeat*/
    //background-size 63% //背景照片

    position relative
    text-align center
    /*height: 95%*/
    float left

  }

  .showInfo {
    margin-left 1%
    height 95%
    width 35%
    float left
  }

  .showAssetInfo {
    margin-top 0.5rem
    width 100%
    height auto
  }

  .showImployeeInfo {
    height auto
    width 100%
  }

  .select-item {
    width 100%
    height 100%
    background-color: #5bc0de;
    display: inline-block;
    text-align: center;
    border-radius: 3px;
    margin-right: 10px;
    cursor: pointer;
    color: #fff;
  }

  .select-item:hover {
    background-color rgba(170, 170, 170, 0.5)
  }

  //存在的位置
  .drag-div {
    background-color rgba(70, 70, 70, 0.5)
    border 1px solid black
    margin auto 0
    text-align: center;
    width: 5%;
    cursor: pointer;
    height 10%
    position absolute
  }

  .drag-div:hover {
    background-color rgba(170, 170, 170, 0.5)
  }

  .drag-people-label {
    margin-bottom: 0;
  }

  .iconfont {
    font-size 3rem
    padding-right 10%

  }

  .guide_item
    color #fff
    &.on
      color #02a774


</style>
