import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthService from "@/services/AuthService";

// As rotas estão aqui
import routes from "./paths";

Vue.use(VueRouter)
  

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    if(!AuthService.isAuthenticated()) {
      next({ 
        path: "/login",
        query: {
          nextUrl: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router