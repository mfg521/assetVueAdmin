webpackJsonp([61],{"B/IR":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{attrs:{"label-width":"80px"}},[n("el-form-item",{attrs:{label:"允许访问服务"}},[n("el-select",{attrs:{multiple:"",filterable:"",remote:"",placeholder:"请输入服务关键词","remote-method":e.remoteMethod,loading:e.loading},model:{value:e.clients,callback:function(t){e.clients=t},expression:"clients"}},e._l(e.items,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),n("el-form-item",[e.serviceManager_btn_clientManager?n("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]):e._e()],1)],1)},staticRenderFns:[]}},nL73:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("Dd8w"),a=n.n(i),l=n("WqJB"),s=n("NYxO");t.default={props:{serviceId:{default:"1"}},data:function(){return{items:[],clients:[],list:[],loading:!1,serviceManager_btn_clientManager:!1}},created:function(){this.initClients(),this.serviceManager_btn_clientManager=this.elements["serviceManager:btn_clientManager"]},computed:a()({},n.i(s.b)(["elements"])),methods:{remoteMethod:function(e){var t=this;""!==e?(this.loading=!0,n.i(l.a)({name:e}).then(function(e){t.items=e.data.rows,t.total=e.data.total,t.loading=!1})):this.items=[]},onSubmit:function(){var e=this,t={};this.clients.length>0&&(t.clients=this.clients.join()),n.i(l.f)(this.serviceId,t).then(function(){e.$emit("closeClientDialog"),e.$notify({title:"成功",message:"保存成功",type:"success",duration:2e3})})},initClients:function(){var e=this;n.i(l.g)(this.serviceId).then(function(t){e.items=t.data;for(var n=[],i=0;i<t.data.length;i++)n.push(t.data[i].id);e.clients=n})}}}},"s/n5":function(e,t,n){var i=n("VU/8")(n("nL73"),n("B/IR"),null,null,null);e.exports=i.exports}});