import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from "../views/Login.vue";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { 
    path: "/novo-fcc",
    name: "NovoFCC",
    component: () => import(/* webpackChunkName: "sfc" */ '../views/NovoFCC.vue')
  },
  { 
    path: "/enviar-fcc/:id",
    name: "EnviarFCC",
    component: () => import(/* webpackChunkName: "enviar" */ '../views/EnviarFCC.vue')
  },
  { 
    path: "/listar-fcc",
    name: "ListarFCC",
    component: () => import(/* webpackChunkName: "listar" */ '../views/ListarFCC.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
