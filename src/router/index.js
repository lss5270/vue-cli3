import Vue from 'vue'
import Router from 'vue-router'

/*import Home from '../demo/Home.vue'
import Test from '../Test.vue'
import H5 from '../test/h5.vue'*/
import Home from '../components/home.vue'
import Menu1 from '../views/menu1.vue'
import Menu2 from '../views/menu2.vue'

Vue.use(Router)

/*router.beforeEach((to, from, next) => {
  console.log('开始页面切换');
  console.log(to.fullPath)
  
  next();
});*/

export default new Router({
  //mode: 'history',  //去掉url中的#
  routes: [
    /*{
      path: '/login',
      component: Login,
    },*/
    
    {
      path: '/index',
      component: Home,
      children: [
        {
          path: 'menu1',
          component: Menu1
        },
        {
          path: 'menu2',
          component: Menu2
        }
      ]
    },
    {
      path: '*',
      redirect: '/index', //默认重定向到首页，如果登录页面做好后 这里改成登录页
    },
    
  ]
})