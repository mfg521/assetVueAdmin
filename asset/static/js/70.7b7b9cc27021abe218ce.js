webpackJsonp([70],{TG9w:function(e,t,a){"use strict";function r(e){return a.i(o.a)({url:"/api/admin/user/page",method:"get",params:e})}function n(e){return a.i(o.a)({url:"/api/admin/user",method:"post",data:e})}function i(e){return a.i(o.a)({url:"/api/admin/user/"+e,method:"get"})}function s(e){return a.i(o.a)({url:"/api/admin/user/"+e,method:"delete"})}function l(e,t){return a.i(o.a)({url:"/api/admin/user/"+e,method:"put",data:t})}t.a=r,t.d=n,t.b=i,t.c=s,t.e=l;var o=a("Vo7i")},cjkF:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),n=a.n(r),i=a("TG9w"),s=a("5uXp"),l=a("NYxO");t.default={props:{groupId:{default:"1"}},data:function(){return{lItems:[],mItems:[],leaders:[],members:[],list:[],loading:!1,groupManager_btn_userManager:!1}},created:function(){this.initUsers(),this.groupManager_btn_userManager=this.elements["groupManager:btn_userManager"]},computed:n()({},a.i(l.b)(["elements"])),methods:{remoteMemberMethod:function(e){var t=this;""!==e?(this.loading=!0,this.loading=!1,a.i(i.a)({name:e}).then(function(e){t.mItems=e.data.rows,t.total=e.data.total,t.loading=!1})):this.mItems=[]},remoteLeaderMethod:function(e){var t=this;""!==e?(this.loading=!0,this.loading=!1,a.i(i.a)({name:e}).then(function(e){t.lItems=e.data.rows,t.total=e.data.total,t.loading=!1})):this.lItems=[]},onSubmit:function(){var e=this,t={};this.members.length>0&&(t.members=this.members.join()),this.leaders.length>0&&(t.leaders=this.leaders.join()),a.i(s.l)(this.groupId,t).then(function(){e.$emit("closeUserDialog"),e.$notify({title:"Save",message:"Save Successful",type:"success",duration:2e3})})},initUsers:function(){var e=this;a.i(s.m)(this.groupId).then(function(t){e.lItems=t.data.leaders,e.mItems=t.data.members;for(var a=[],r=[],n=0;n<t.data.members.length;n++)a.push(t.data.members[n].id);for(var i=0;i<t.data.leaders.length;i++)r.push(t.data.leaders[i].id);e.members=a,e.leaders=r})}}}},jmoS:function(e,t,a){var r=a("VU/8")(a("cjkF"),a("syIw"),null,null,null);e.exports=r.exports},syIw:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"Leader"}},[a("el-select",{attrs:{multiple:"",filterable:"",remote:"",placeholder:"Please enter keyword","remote-method":e.remoteLeaderMethod,loading:e.loading},model:{value:e.leaders,callback:function(t){e.leaders=t},expression:"leaders"}},e._l(e.lItems,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"Underling"}},[a("el-select",{attrs:{multiple:"",filterable:"",remote:"",placeholder:"Please enter keyword","remote-method":e.remoteMemberMethod,loading:e.loading},model:{value:e.members,callback:function(t){e.members=t},expression:"members"}},e._l(e.mItems,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",[e.groupManager_btn_userManager?a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("Save")]):e._e()],1)],1)},staticRenderFns:[]}}});