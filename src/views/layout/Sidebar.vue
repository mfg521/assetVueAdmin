<template>
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes='permissionMenus'></sidebar-item>
    </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style>
  .app-wrapper .sidebar-container[data-v-6bdc2997]{
    width: 250px;
  }
  .app-wrapper .main-container[data-v-6bdc2997]{
    margin-left: 250px;
  }
</style>
