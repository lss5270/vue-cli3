<template>
  <div class="sidebar_menu">
    <h2>标题：{{title}}</h2>
    <ul>
      <li><router-link to="/index/menu1">菜单111</router-link></li>
      <li><router-link to="/index/menu2">菜单222</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebarMenu',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
    
  
</style>
