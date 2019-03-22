<template>
  <div class="index_wrapper">
    <!-- 头部 -->
    <div class="index_header">这是头部9966</div>
    <!-- 菜单 -->
    <sidebar-menu :title="menuTitle"/>
    
    <!-- 主内容 -->
    <div class="index_main">
      <p style="padding: 20px">主内容区域…… </p>
      <!-- 嵌套路由 -->
      <router-view/>
    </div>
  </div>
</template>

<script>
  import sidebarMenu from './sidebarMenu'
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data () {
      return {
        menuTitle: '社保费'
      }
    },
    components:{
      sidebarMenu
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  

  .index_wrapper{
    .index_header{
      height: 80px;
      background: #f0f0f0;
    }
    
    .index_main{
      margin-left: 180px;
      height: calc(100% - 80px);
    }
  }
</style>
