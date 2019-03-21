<template>
  <div class="menu1">
    菜单1内容
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
