<template>
  <div class="index_wrapper">
    <!-- 头部 -->
    <div class="index_header">这是头部</div>
    <!-- 菜单 -->
    <div class="sidebar_menu">
      <h2>社保费</h2>
      <ul>
        <li><router-link to="/index/menu1">菜单111</router-link></li>
        <li><router-link to="/index/menu2">菜单222</router-link></li>
      </ul>
    </div>
    <!-- 主内容 -->
    <div class="index_main">
      <p style="padding: 20px">主内容区域…… </p>
      <!-- 嵌套路由 -->
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
    .sidebar_menu{
      width: 180px;
      float: left;
      height: calc(100% - 80px);
      background: #ccc;
      li{
        padding: 10px;
      }
      h2{
        line-height: 40px;
        background: blue;
        padding: 0 20px;
        color: #fff;
      }
    }
    .index_main{
      margin-left: 180px;
      height: calc(100% - 80px);
    }
  }
</style>
