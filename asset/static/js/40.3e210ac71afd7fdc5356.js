webpackJsonp([40],{EvbL:function(e,t,a){function i(e){a("G8IM")}var l=a("VU/8")(a("Y4Xy"),a("nrOJ"),i,null,null);e.exports=l.exports},G8IM:function(e,t,a){var i=a("Lx5O");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("2caf823a",i,!0)},Lx5O:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#409eff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center}.avatar{width:178px;height:178px;display:block}",""])},Y4Xy:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),l=a.n(i),o=a("egb3"),n=a("NYxO");t.default={name:"user",data:function(){return{form:{photo:void 0,priority:void 0,employeeName:void 0,designation:void 0,department:"Top Management",employeeClass:"GES",emailAddress:void 0,internalNo:void 0,beijingNo:void 0,dubaiNo:void 0,dubaiMobileNo:void 0,employeeUrl:""},rules:{name:[{required:!0,message:"请输入用户",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],emailAddress:[{required:!0,message:"please input emailAddress",trigger:"blur"},{min:3,max:50,message:"长度在 3 到 50 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:5,max:20,message:"长度在 5 到 20 个字符",trigger:"blur"}]},list:null,total:null,listLoading:!0,listQuery:{page:1,limit:20,employeeClass:"GES",employeeName:void 0},sexOptions:["Top Management","Administration","Human Resource","Finance","Business Development","Project Execution ","Project Control","Quality & Standards","Engineering Department"],dialogFormVisible:!1,dialogStatus:"",employeeManager_btn_edit:!1,employeeManager_btn_del:!1,employeeManager_btn_add:!1,textMap:{update:"Edit ",create:"Create"},tableKey:0,imageUrl:""}},created:function(){this.getList(),this.employeeManager_btn_edit=this.elements["employeeManager:btn_edit"],this.employeeManager_btn_del=this.elements["employeeManager:btn_del"],this.employeeManager_btn_add=this.elements["employeeManager:btn_add"]},computed:l()({},a.i(n.b)(["elements"])),methods:{getList:function(){var e=this;this.listLoading=!0,a.i(o.d)(this.listQuery).then(function(t){e.list=t.data.rows,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0},handleUpdate:function(e){var t=this;a.i(o.e)(e.employeeId).then(function(e){t.form=e.data,t.dialogFormVisible=!0,t.dialogStatus="update"})},handleRecord:function(e){this.$router.push({name:"record",params:{employeeId:e.employeeId}})},handleDelete:function(e){var t=this;this.$confirm("This data will be deleted.Do you want to continue?","reminder",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then(function(){a.i(o.f)(e.employeeId).then(function(){t.$notify({title:"Delete",message:"Deleted successfully",type:"success",duration:2e3});var a=t.list.indexOf(e);t.list.splice(a,1)})})},create:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;a.i(o.g)(t.form).then(function(){t.dialogFormVisible=!1,t.getList(),t.$notify({title:"Created",message:"Created successfully",type:"success",duration:2e3})})})},cancel:function(e){this.dialogFormVisible=!1,this.$refs[e].resetFields()},update:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.dialogFormVisible=!1,t.form.password=void 0,a.i(o.h)(t.form.id,t.form).then(function(){t.dialogFormVisible=!1,t.getList(),t.$notify({title:"Update",message:"Updated successfully",type:"success",duration:2e3})})})},resetTemp:function(){this.form={photo:void 0,employeeName:void 0,department:"Top Management",employeeClass:"GES",emailAddress:void 0,internalNo:void 0,beijingNo:void 0,dubaiNo:void 0,dubaiMobileNo:void 0,employeeUrl:""}},handleAvatarSuccess:function(e,t){this.imageUrl=URL.createObjectURL(t.raw),console.log(t.raw),this.form.employeeUrl=e,console.log(this.form.employeeUrl)},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传头像图片大小不能超过 2MB!"),t},download:function(){axios({method:"get",url:"http://172.30.1.81:8763/api/asset/download/contact",responseType:"arraybuffer"}).then(function(e){this.fileDownload(e.data,"poiImport.xlsx")}.bind(this)).catch(function(e){alert("网络请求出错")}.bind(this))}}}},nrOJ:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"employeeName"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.listQuery.employeeName,callback:function(t){e.listQuery.employeeName=t},expression:"listQuery.employeeName"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"search"},on:{click:e.handleFilter}},[e._v("search")]),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"edit"},on:{click:e.handleCreate}},[e._v("add\n    ")]),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"}},[a("a",{attrs:{href:"http://172.30.1.81:8763/download/contact"}},[e._v("Download")])])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{width:"90",align:"center",label:"photo"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:"http://172.30.1.81:8765/api/asset/employee/employeeUrl?employeeUrl="+e.row.employeeUrl}})]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180",align:"center",label:"employeeName"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.employeeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180",align:"center",label:"department"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.department))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"330",align:"center",label:"designation"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.designation))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"250",align:"center",label:"emailAddress"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.emailAddress))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"120",align:"center",label:"roomNum"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.roomNum))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110",align:"center",label:"internalNo"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.internalNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"250",align:"center",label:"beijingNo"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.beijingNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",align:"center",label:"dubaiNo"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.dubaiNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"220",align:"center",label:"dubaiMobileNo"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.dubaiMobileNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"Operator",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(a){e.handleUpdate(t.row)}}},[e._v("edit\n        ")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("delete\n        ")])]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"photo",prop:"photo"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://172.30.1.81:8765/api/asset/employee/uploadimg","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"department"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"please select department"},model:{value:e.form.department,callback:function(t){e.form.department=t},expression:"form.department"}},e._l(e.sexOptions,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"emailAddress",prop:"emailAddress"}},[(e.dialogStatus,a("el-input",{attrs:{placeholder:"please input emailAddress"},model:{value:e.form.emailAddress,callback:function(t){e.form.emailAddress=t},expression:"form.emailAddress"}}))],1),e._v(" "),a("el-form-item",{attrs:{label:"employeeName",prop:"employeeName"}},[a("el-input",{attrs:{placeholder:"please input employeeName"},model:{value:e.form.employeeName,callback:function(t){e.form.employeeName=t},expression:"form.employeeName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"designation",prop:"designation"}},[(e.dialogStatus,a("el-input",{attrs:{placeholder:"please input designation"},model:{value:e.form.designation,callback:function(t){e.form.designation=t},expression:"form.designation"}}))],1),e._v(" "),a("el-form-item",{attrs:{label:"internalNo",prop:"internalNo"}},[(e.dialogStatus,a("el-input",{attrs:{placeholder:"please input internalNo"},model:{value:e.form.internalNo,callback:function(t){e.form.internalNo=t},expression:"form.internalNo"}}))],1),e._v(" "),a("el-form-item",{attrs:{label:"beijingNo",prop:"beijingNo"}},[(e.dialogStatus,a("el-input",{attrs:{placeholder:"please input beijingNo"},model:{value:e.form.beijingNo,callback:function(t){e.form.beijingNo=t},expression:"form.beijingNo"}}))],1),e._v(" "),a("el-form-item",{attrs:{label:"dubaiNo",prop:"dubaiNo"}},[(e.dialogStatus,a("el-input",{attrs:{placeholder:"please input dubaiNo"},model:{value:e.form.dubaiNo,callback:function(t){e.form.dubaiNo=t},expression:"form.dubaiNo"}}))],1),e._v(" "),a("el-form-item",{attrs:{label:"dubaiMobileNo",prop:"dubaiMobileNo"}},[(e.dialogStatus,a("el-input",{attrs:{placeholder:"please input dubaiMobileNo"},model:{value:e.form.dubaiMobileNo,callback:function(t){e.form.dubaiMobileNo=t},expression:"form.dubaiMobileNo"}}))],1),e._v(" "),a("el-form-item",{attrs:{label:"priority",prop:"priority"}},[(e.dialogStatus,a("el-input",{attrs:{placeholder:"please input priority"},model:{value:e.form.priority,callback:function(t){e.form.priority=t},expression:"form.priority"}}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("cancel")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.create("form")}}},[e._v("confire")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("form")}}},[e._v("confire")])],1)],1)],1)},staticRenderFns:[]}}});