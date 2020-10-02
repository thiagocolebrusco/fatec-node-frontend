import Vue from 'vue'
// import store from '@/util/vuex.store'

import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import Login from '@/components/pages/login/index'
import Socket from '@/components/pages/socket/socket'
import ProdutosListar from '@/components/pages/produtos/listar'


Vue.use(Router)

export default new Router({
  mode: 'history', // Pode ser utilizado para remover o # da URL
  routes: [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        component: Hello,
        beforeEnter: requireAuth,
    },
    {
        path: '/socket',
        component: Socket,
        beforeEnter: requireAuth,
    },
    {
        path: '/produtos',
        component: ProdutosListar,
        beforeEnter: requireAuth,
    },
  ]
})


function requireAuth(to, from, next){
    if(! localStorage.token){
        next({ path: '/login' })
    } else {
        next()
    }
}