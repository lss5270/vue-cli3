<template>
  <div class="menu2">
    <p>菜单2内容^……</p>
    <p>&nbsp;</p>
    <p><button @click="ajaxTest">点击请求ajax</button></p>
    <p>&nbsp;</p>
    <p>ajax放回的json：</p>
    <p v-html="ajaxRes"></p>
  </div>
</template>

<script>
  import request from '../util/request'
  export default {
    name: 'menu2',
    data () {
      return {
        ajaxRes: null
      }
    },
    props: {
      msg: String
    },
    methods: {
      //ajax测试
      ajaxTest() {
        let vm = this
        let par = {
          enterpriseId: 1,
          //enterpriseName: ''
        }
        request.post('/api/ssfm/enterprise/getenterprisebyid', par)
        .then(function(response) {
          //debugger
          //console.log(response);
          vm.ajaxRes = response
        })
        .catch(function(error) {
          console.log('----',error)
        });
      },
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
