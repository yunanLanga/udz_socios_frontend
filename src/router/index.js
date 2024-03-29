//import Vue from "vue";
//import VueRouter from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

//Vue.use(VueRouter);

//import Socios from "../views/Socios";

const routes = [
  {
    path: "/socios",
    name: "SociosView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SociosView.vue"),
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Usuarios.vue"),
  },
  {
    path: "/qoutas",
    name: "QoutasView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/QoutasView.vue"),
  },
  {
    path: "/",
    name: "LoginView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
