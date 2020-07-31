import Vue from 'vue'
import VueRouter from 'vue-router'

import Cliente from '../components/content/Cliente.vue'
import Produto from '../components/content/Produto.vue'
import Fornecedor from '../components/content/Fornecedor.vue'
import Categoria from '../components/content/Categoria.vue'
import Dashboard from '../components/content/Dashboard.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'clientes',
    path: '/clientes',
    component: Cliente
}, {
    name: 'produtos',
    path: '/produtos',
    component: Produto
}, {
    name: 'fornecedores',
    path: '/fornecedores',
    component: Fornecedor
}, {
    name: 'categorias',
    path: '/categorias',
    component: Categoria
}, {
    name: 'dashboard',
    path: '/',
    component: Dashboard
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router