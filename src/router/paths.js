import Home from '@/pages/Home.vue';
import Login from "@/pages/Login.vue";
import NotFound from "@/pages/NotFound.vue";

export default [
  {
    path: '/',
		name: 'Home',
		meta: {
			requiresAuth: true
		},
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { 
    path: "/fcc/novo",
		name: "NovoFCC",
		meta: {
			requiresAuth: true
		},
    component: () => import(/* webpackChunkName: "novo_fcc" */ '@/pages/fcc/Form.vue')
  },
  { 
    path: "/fcc/enviar/:id",
    name: "EnviarFCC",

    components: {
      default: () => import(/* webpackChunkName: "ver_fcc" */ '@/pages/fcc/View.vue'),
      modal: () => import(/* webpackChunkName: "enviar_fcc" */ '@/pages/fcc/Send.vue')
    }
  },
  { 
    path: "/fcc/listar",
    name: "ListarFCC",
    component: () => import(/* webpackChunkName: "listar_fcc" */ '@/pages/fcc/List.vue')
	},
	{ 
    path: "/fcc/ver/:id",
    name: "VerFCC",
    component: () => import(/* webpackChunkName: "ver_fcc" */ '@/pages/fcc/View.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/pages/About.vue')
  },

  { path: '*', component: NotFound }
];