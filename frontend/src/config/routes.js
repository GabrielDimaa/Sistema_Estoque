import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/auth/login'

Vue.use(VueRouter)

const routes = [{
    name: 'login',
    path: '/login',
    component: Login
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router