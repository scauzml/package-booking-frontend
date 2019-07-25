import Vue from 'vue'
import { store } from "./store/store";
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


import addGood from './components/addGood'
import addGoodFromBoos from './components/addGoodFromBoss'
import GoodDisplay from './components/GoodDisplay'


Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueRouter);
Vue.prototype.$axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头



const routes = [
  { path: '/addGood', name: "addGood", component: addGood },
  { path: '/addGoodFromBoos', name: "addGoodFromBoos", component: addGoodFromBoos },
  { path: '/GoodDisplay', name: "GoodDisplay", component: GoodDisplay },
  // {
  //   path: '/home/:name', name: 'home', component: Home, props: true,
  //   children: [
  //     { path: 'todolistpaly', name: 'todisplay', component: todisplay },
  //     { path: 'name', name: 'name', component: name, props: true }
  //   ]
  // }
]

const router = new VueRouter({
  routes,// short for `routes: routes`
  mode: 'history'/*去掉#*/
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
