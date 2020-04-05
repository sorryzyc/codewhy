import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('views/home/Home.vue') //路由懒加载
    },
    {
        path: '/category',
        component: () => import('views/category/Category.vue')
    },
    {
        path: '/shopcart',
        component: () => import('views/shopcart/Shopcart.vue')
    },
    {
        path: '/profile',
        component: () => import('views/profile/Profile.vue')
    },
    {
        path: '/detail/:iid', //传递参数
        component: () => import('views/detail/Detail.vue')
    },

]

const router = new VueRouter({
    routes,
    mode: 'history' //h5 history模式
})

export default router