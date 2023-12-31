import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Login from '@/views/Login/index.vue'
import SubCategory from '@/views/Subcategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home
                },
                {
                    path: 'category/:id',
                    name: 'category',
                    component: Category
                },
                {
                    path: 'category/sub/:id',
                    name: 'sub-category',
                    component: SubCategory
                },
                {
                    path: 'detail/:id',
                    name: 'detail',
                    component: Detail
                }, {
                    path: 'cartlist',
                    component: CartList
                }, {
                    path: 'checkout',
                    component: Checkout
                }, {
                    path: 'pay',
                    component: Pay
                }, {
                    path: 'paycallback',
                    component: PayBack
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },

    ],
    scrollBehavior() {
        return {
            top: 0
        }
    }
})

export default router
