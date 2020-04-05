import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'; //引入element-ui组件库
import 'element-ui/lib/theme-chalk/index.css'; //引入element-ui组件库样式
Vue.use(ElementUI); //挂载到Vue上

Vue.config.productionTip = false

import axios from 'axios' //导入axios 并添加到Vue类原型上
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://152.136.185.210:8000/api/h8';//全局的 axios 默认值


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
