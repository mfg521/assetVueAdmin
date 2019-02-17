import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: _import('error/401'),
    hidden: true
  },
  {
    path: '/shencha',
    component: _import('singlePages/ShenCha'),
    hidden: true
  },
  {
    path: '/emplpyeeManager',
    component: _import('employeeSingle/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'form',
    noDropdown: true,
    children: [{
      path: 'index',
      component: _import('introduction/index'),
      name: '简述'
    }]
  },
  {
    path: '/building',
    component: Layout,
    redirect: '/building/room',
    name: 'room',
    hidden: true,
    children: [{
      path: 'room',
      name: 'roomChildren',
      component: _import('room/index')
    }]
  },
  {
    path: '/assetManager',
    component: Layout,
    name: 'asset',
    icon: 'setting',
    authority: 'asset',
    children: [{
      path: 'asset',
      component: _import('asset/index'),
      name: 'asset',
      authority: 'assetManager'
    }, {
      path: 'record',
      component: _import('record/index'),
      name: 'record',
      authority: 'assetManager'
    }, {
        path: 'othersAssets',
        component: _import('asset/othersIndex'),
        name: 'othersAssets',
        authority: 'assetManager'
      }, {
      path: 'scrappedAssets',
      component: _import('asset/scrappedIndex'),
      name: 'scrappedIndex',
      authority: 'assetManager'
    }, {
      path: 'check',
      component: _import('checkrecord/index'),
      name: 'check',
      authority: 'assetManager'
    }]
  },
  {
    path: '/officeManager',
    component: Layout,
    name: 'office',
    icon: 'setting',
    authority: 'office',
    children: [{
        path: 'blocks',
        component: _import('block/index'),
        name: 'blocks',
        authority: 'assetManager'
      }]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/baseManager',
    component: Layout,
    name: '基础配置管理',
    icon: 'setting',
    authority: 'baseManager',
    children: [{
      path: 'userManager',
      icon: 'fa-user',
      component: _import('admin/user/index'),
      name: '用户管理',
      authority: 'userManager'
    }, {
      path: 'menuManager',
      icon: 'category',
      component: _import('admin/menu/index'),
      name: '菜单管理',
      authority: 'menuManager'
    }, {
      path: 'groupManager',
      icon: 'group_fill',
      component: _import('admin/group/index'),
      name: '角色权限管理',
      authority: 'groupManager'
    }, {
      path: 'groupTypeManager',
      icon: 'fa-users',
      component: _import('admin/groupType/index'),
      name: '角色类型管理',
      authority: 'groupTypeManager'
    }, {
      path: 'gateLogManager',
      icon: 'viewlist',
      component: _import('admin/gateLog/index'),
      name: '操作日志管理',
      authority: 'gateLogManager'
    }]
  },
  {
    path: '/authManager',
    component: Layout,
    name: '服务权限管理',
    icon: 'setting',
    authority: 'authManager',
    children: [{
      path: 'serviceManager',
      component: _import('auth/service/index'),
      name: '用户管理',
      authority: 'serviceManager'
    }]
  },
  {
    path: '/assetManager',
    component: Layout,
    name: 'record',
    icon: 'setting',
    authority: 'asset',
    children: [{
      path: 'asset',
      component: _import('asset/index'),
      name: 'asset',
      authority: 'assetManager'
    }, {
      path: 'record',
      component: _import('record/index'),
      name: 'record',
      authority: 'assetManager'
    }]
  },
  {
    path: '/buildingO',
    name: '一号楼',
    component: Layout,
    icon: 'setting',
    authority: 'asset',
    children: [{
      path: 'floor6',
      component: _import('buildingO/Floor6/index'),
      name: '一号楼6层',
      authority: 'assetManager'
    },{
      path: 'floor5',
      component: _import('buildingO/Floor5/index'),
      name: '一号楼5层',
      authority: 'assetManager'
    },{
      path: 'floor3',
      component: _import('buildingO/Floor3/index'),
      name: '一号楼3层',
      authority: 'assetManager'
    },{
      path: 'floorG',
      component: _import('buildingO/FloorG/index'),
      name: '一号楼G层',
      authority: 'assetManager'
    },{
      path: 'floor26',
      component: _import('buildingO/Floor26/index'),
      name: '二号楼G层',
      authority: 'assetManager'
    }]
  },
  {
    path: '/employeeManager',
    component: Layout,
    icon: 'setting',
    authority: 'employee',
    children: [{
      path: 'employee',
      component: _import('employee/index'),
      name: 'BJZZ_DG_employee',
      authority: 'employeeManager'
    },{
      path: 'employeeGes',
      component: _import('employee/gesIndex'),
      name: 'gesEmployee',
      authority: 'employeeManager'
    },{
      path: 'employeeMission',
      component: _import('employee/missionIndex'),
      name: 'employeeMission',
      authority: 'employeeManager'
    },{
      path: 'employeeThird',
      component: _import('employee/thirdIndex'),
      name: 'employeeThird',
      authority: 'employeeManager'
    }]
  },
  {
    path: '/monitorManager',
    component: Layout,
    name: '监控模块管理',
    icon: 'setting',
    authority: 'monitorManager',
    children: [{
      path: 'serviceEurekaManager',
      component: _import('monitor/eureka/index'),
      name: 'Eureka注册中心',
      authority: 'serviceEurekaManager'
    }, {
      path: 'serviceMonitorManager',
      component: _import('monitor/service/index'),
      name: '服务状态监控',
      authority: 'serviceMonitorManager'
    }, {
      path: 'serviceZipkinManager',
      component: _import('monitor/zipkin/index'),
      name: '服务状态监控',
      authority: 'serviceZipkinManager'
    }]
  },
  {
    path: '/empManager',
    component: _import('employee/index'),
    name: 'empManager',
    icon: 'setting',
    authority: 'asset'
  }];



