webpackJsonp([44],{"6w7O":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),i=a.n(r),s=a("G+M3"),n=a("NYxO");t.default={name:"user",data:function(){return{form:{username:void 0,name:void 0,sex:"男",password:void 0,description:void 0},rules:{name:[{required:!0,message:"请输入用户",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],username:[{required:!0,message:"请输入账户",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:5,max:20,message:"长度在 5 到 20 个字符",trigger:"blur"}]},list:null,total:null,listLoading:!0,listQuery:{page:1,limit:20,name:void 0,serialNumber:void 0,employeeId:void 0,assetType:void 0},sexOptions:["男","女"],dialogFormVisible:!1,dialogStatus:"",userManager_btn_edit:!1,userManager_btn_del:!1,userManager_btn_add:!1,textMap:{update:"编辑",create:"创建"},tableKey:0}},mounted:function(){void 0!==this.$route.params.serialNumber&&(this.listQuery.serialNumber=this.$route.params.serialNumber,a.i(s.d)(this.listQuery)),void 0!==this.$route.params.employeeId&&(this.listQuery.employeeId=this.$route.params.employeeId,a.i(s.d)(this.listQuery))},created:function(){this.getList(),this.userManager_btn_edit=this.elements["userManager:btn_edit"],this.userManager_btn_del=this.elements["userManager:btn_del"],this.userManager_btn_add=this.elements["userManager:btn_add"]},computed:i()({},a.i(n.b)(["elements"])),methods:{getList:function(){var e=this;this.listLoading=!0,a.i(s.d)(this.listQuery).then(function(t){e.list=t.data.rows,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0},handleUpdate:function(e){var t=this;a.i(s.e)(e.id).then(function(e){t.form=e.data,t.dialogFormVisible=!0,t.dialogStatus="update"})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.i(s.f)(e.id).then(function(){t.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var a=t.list.indexOf(e);t.list.splice(a,1)})})},create:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;a.i(s.g)(t.form).then(function(){t.dialogFormVisible=!1,t.getList(),t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},cancel:function(e){this.dialogFormVisible=!1,this.$refs[e].resetFields()},update:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.dialogFormVisible=!1,t.form.password=void 0,a.i(s.h)(t.form.id,t.form).then(function(){t.dialogFormVisible=!1,t.getList(),t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},resetTemp:function(){this.form={username:void 0,name:void 0,sex:"男",password:void 0,description:void 0}}}}},"9Jvk":function(e,t,a){var r=a("VU/8")(a("6w7O"),a("qiIe"),null,null,null);e.exports=r.exports},"G+M3":function(e,t,a){"use strict";function r(e){return a.i(c.a)({url:"/api/asset/record/page",method:"get",params:e})}function i(e){return a.i(c.a)({url:"/api/asset/record",method:"post",data:e})}function s(e){return a.i(c.a)({url:"/api/asset/record/"+e,method:"get"})}function n(e){return a.i(c.a)({url:"/api/asset/record/"+e,method:"delete"})}function o(e,t){return a.i(c.a)({url:"/api/asset/record/"+e,method:"put",data:t})}function l(e){return a.i(c.a)({url:"/api/asset/record/getAsset",method:"post",data:e})}function u(e){return a.i(c.a)({url:"/api/asset/record/returnAsset",method:"post",data:e})}function d(e){return a.i(c.a)({url:"/api/asset/record/changeAsset",method:"post",data:e})}t.d=r,t.g=i,t.e=s,t.f=n,t.h=o,t.a=l,t.b=u,t.c=d;var c=a("Vo7i")},qiIe:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"Class"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.listQuery.assetType,callback:function(t){e.listQuery.assetType=t},expression:"listQuery.assetType"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"search"},on:{click:e.handleFilter}},[e._v("Search")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"No",width:"65"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.recordId))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"160",align:"center",label:"employeeName"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.employeeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"120",align:"center",label:"roomNum"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.roomNum))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"160",align:"center",label:"serialNumber"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.serialNumber))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180",align:"center",label:"borrowedDate"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.borrowedDate))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180",align:"center",label:"returnDate"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.returnDate))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"160",align:"center",label:"assetType"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.assetType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180",align:"center",label:"operatorTime"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.operatorTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"160",align:"center",label:"operatorType"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.operatorType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"160",align:"center",label:"operatorPeople"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.operatorPeople))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",align:"center",label:"isReturned"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.isReturned?a("span",[e._v("No")]):e._e(),e._v(" "),1===t.row.isReturned?a("span",[e._v("Yes")]):e._e()]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.form.name,callback:function(t){e.form.name=t},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"账户",prop:"username"}},["create"==e.dialogStatus?a("el-input",{attrs:{placeholder:"请输入账户"},model:{value:e.form.username,callback:function(t){e.form.username=t},expression:"form.username"}}):a("el-input",{attrs:{placeholder:"请输入账户",readonly:""},model:{value:e.form.username,callback:function(t){e.form.username=t},expression:"form.username"}})],1),e._v(" "),"create"==e.dialogStatus?a("el-form-item",{attrs:{label:"密码",placeholder:"请输入密码",prop:"password"}},[a("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(t){e.form.password=t},expression:"form.password"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"性别"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择"},model:{value:e.form.sex,callback:function(t){e.form.sex=t},expression:"form.sex"}},e._l(e.sexOptions,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"描述"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5},placeholder:"请输入内容"},model:{value:e.form.description,callback:function(t){e.form.description=t},expression:"form.description"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("取 消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.create("form")}}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("form")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});